const generateUniqueId = require('../utils/generateUniqueId');
// importando conexão com banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    async create(request, response) {
        // Para acessar query params: const params = request.params; Para acessar request body:
        const { name, email, whatsapp, city, uf } = request.body;

        // OBS: para testes unitários, essa função foi separa em um arquivo
        // criando ID através do pacote crypto
        const id = generateUniqueId();

        // alinhando conexão (await para esperar essa etapa ser concluida antes de responder)
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id }); // id da ONG usado para login
    }
};