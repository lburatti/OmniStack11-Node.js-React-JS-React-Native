// importando função
const generateUniqueId = require('../../src/utils/generateUniqueId');

// describe('Nome do teste', arrow function () => {})
describe('Generate Unique ID', () => {
    // it('Descrição do teste', arrow function () => {})
    it('should generate an unique ID', () => {
        const id = generateUniqueId();
        // experado().tenha tamanho de ()
        expect(id).toHaveLength(8);
    })
})
