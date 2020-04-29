// importando conexão com banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;  // paginação

        const [count] = await connection('incidents') // quantidade total de incidents
            .count();

        const incidents = await connection('incidents') // com paginação
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // por pagina
            .offset((page - 1) * 5) // repetições exceto page 1
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']); // para trazer quantidade total no header
        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        // no header ficam: autenticação de usuário, localização(idioma) -> acessando dados do usuario logado
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        // pegando id do incident
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' }); // sem autorização
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // No content (sem conteudo)
    }
}