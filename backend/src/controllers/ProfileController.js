// importando conexão com banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // acessando dados do usuario logado
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
    
        return response.json(incidents);
    }
}