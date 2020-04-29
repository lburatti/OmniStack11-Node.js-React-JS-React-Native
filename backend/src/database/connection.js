// importando knex
const knex = require('knex');
// importando configurações do banco de dados
const configuration = require('../../knexfile');

// criando variavel ambiente para testes
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// criando conexão development/test, com base na variável ambiente acima
const connection = knex(config);

module.exports = connection;