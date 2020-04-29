// importanto pacote (que já vem com os demais) -> para gerar string aleatória (neste caso, ID da ONG)
const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}