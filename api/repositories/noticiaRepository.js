const fs = require('fs');
const path = './noticias.json';

const Noticia = require('../models/noticiaModel');

let noticias = [];

const carregarNoticias = () => {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path);
        noticias = JSON.parse(data);
    }
};

const salvarNoticias = () => {
    fs.writeFileSync(path, JSON.stringify(noticias, null, 2), 'utf-8');
};

const gerarId = () => {
    const ids = noticias.map(noticia => noticia.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

class NoticiaRepository {
    static getAll() {
        carregarNoticias();
        return noticias;
    }

    static getById(id) {
        carregarNoticias();
        return noticias.find(noticia => noticia.id === id);
    }

    static create(noticiaData) {
        carregarNoticias();

        const id = gerarId();

        const noticia = new Noticia(
            id,
            noticiaData.title,
            noticiaData.description,
            noticiaData.date,
            noticiaData.url,
            noticiaData.source
        );

        noticias.push(noticia);
        salvarNoticias();

        return noticia;
    }

    static delete(id) {
        carregarNoticias();
        const index = noticias.findIndex(noticia => noticia.id === id);
        if (index === -1) return null;

        noticias.splice(index, 1);
        salvarNoticias();

        return true;
    }
}

module.exports = NoticiaRepository;
