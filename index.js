const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const CSV_URL = 'https://www.tesourodireto.com.br/documents/d/guest/rendimento-resgatar-csv?download=true';

app.get('/tesouro-csv', async (req, res) => {
    try {
        const response = await fetch(CSV_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (!response.ok) {
            return res.status(response.status).send(`Erro ao acessar CSV: ${response.status}`);
        }

        const text = await response.text();
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.send(text);
    } catch (error) {
        res.status(500).send('Erro interno: ' + error.message);
    }
});

module.exports = app;
