const NoticiaRepository = require('../repositories/noticiaRepository');

class NoticiaController {
    static getAll(req, res) {
        const noticias = NoticiaRepository.getAll();
        res.json(noticias);
    }

    static getById(req, res) {
        const { id } = req.params;
        const noticia = NoticiaRepository.getById(id);

        if (!noticia) {
            return res.status(404).json({ message: 'Notícia não encontrada' });
        }

        res.json(noticia);
    }

    static create(req, res) {
        const noticiaData = req.body;

        if (!noticiaData.title || !noticiaData.description || !noticiaData.date || !noticiaData.url || !noticiaData.source) {

            return res.status(400).json({ message: 'Campos obrigatórios estão faltando.' });
        }

        const noticia = NoticiaRepository.create(noticiaData);

        res.status(201).json(noticia);
    }

    static delete(req, res) {
        const { id } = req.params;
        const deletedNoticia = NoticiaRepository.delete(id);

        if (!deletedNoticia) {
            return res.status(404).json({ message: 'Notícia não encontrada' });
        }

        res.status(204).send();
    }
}

module.exports = NoticiaController;
