const NoticiaRepository = require('../repositories/noticiaRepository');

class NoticiaController {
    static getAll(req, res) {
        const noticias = NoticiaRepository.getAll();
        res.json(noticias);
    }

    static getById(req, res) {
        const noticiaId = parseInt(req.params.id);

        if (!noticiaId || noticiaId <= 0) {
            return res.status(404).json({ message: 'Id da notícia é inválido' });
        }

        const noticia = NoticiaRepository.getById(noticiaId);

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

    static deleteById(req, res) {
        const noticiaId = parseInt(req.params.id);


        if (!noticiaId || noticiaId <= 0) {
            return res.status(404).json({ message: 'Id da notícia é inválido' });
        }


        const deletedNoticia = NoticiaRepository.delete(noticiaId);

        if (!deletedNoticia) {
            return res.status(404).json({ message: 'Notícia não encontrada' });
        }

        res.status(200).json({ message: `Notícia com ID ${noticiaId} deletada com sucesso!` });
    }
}

module.exports = NoticiaController;
