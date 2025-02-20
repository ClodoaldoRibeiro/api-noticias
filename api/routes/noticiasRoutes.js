const express = require('express');

module.exports = app => {
    const NoticiaController = require('../controllers/noticiaController');

    // Rotas da API
    app.route('/api/v1/noticias').get(NoticiaController.getAll);
    app.route('/api/v1/noticias/:id').get(NoticiaController.getById);
    app.route('/api/v1/noticias').post(NoticiaController.create);
    app.route('/api/v1/noticias/:id').delete(NoticiaController.delete);
}