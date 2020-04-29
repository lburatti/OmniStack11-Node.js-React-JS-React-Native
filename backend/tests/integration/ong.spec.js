// importando biblioteca supertest + app.js + connection com banco de dados
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

// dessa forma são executadas as migrations e fica salvo os dados de teste no banco test.sqlite
describe('ONG', () => {
    // antes de cada teste, desfazer + executar todas migrations
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    // depois de todos os testes, encerrar conexão
    afterAll(async () => {
        await connection.destroy();
    });
    // testes
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            // para testar ONG logada:
            // .set('Authorization', 'id de uma ONG')
            .send({
                name: "ONG SP",
                email: "ongsp@email.com.br",
                whatsapp: "1199559955",
                city: "São Paulo",
                uf: "SP"
            })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});
