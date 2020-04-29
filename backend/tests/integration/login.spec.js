const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('LOGIN', () => {
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
    it('should be able to LOGIN', async () => {
        const response = await request(app)
            .post('/sessions')
            .send({
                id: "90e07865",
            })
        // expect(response.body).toHaveProperty('name');
        console.log(response.body);
    })
});