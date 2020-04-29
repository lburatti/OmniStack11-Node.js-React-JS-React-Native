// importando módulo "express"
const express = require('express');
// importando biblioteca celebrate (validações)
const { celebrate, Segments, Joi } = require('celebrate');
// importando controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// separando arquivo de rotas
const routes = express.Router();

// criando ROTAS:

// LOGIN --------------------------------------***

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

// ONGS --------------------------------------*** OK Teste

routes.get('/ongs', OngController.index);

// arquivo."tipo requisição (get/post/put..)"("rota ex: '/contato'", biblioteca validação (celebrate), Controller)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), // string e obrigatório
        email: Joi.string().required().email(), // +.. string, obrigatório e email
        whatsapp: Joi.string().required().min(10).max(11), // number, obrigatório, minimo 10 caracteres e máximo 11
        city: Joi.string().required(), // string e obrigatório
        uf: Joi.string().required().length(2), // string, obrigatório e tamanho de 2 caracteres
    })
}), OngController.create);

// PROFILE --------------------------------------***
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), // validação de usuario logado obrigatória
    }).unknown(),
}), ProfileController.index);

// INCIDENTS --------------------------------------***
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate( // validação body e headers
    {
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required(),
        })
    },
    {
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(), // validação de usuario logado obrigatória
        }).unknown(),
    }
), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


// para disponibilizar o acesso a essas rotas:
module.exports = routes;
