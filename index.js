const express = require('express');
const fs = require('fs');
const path = require('path');

let object = {
    "main": 0,
    "about": 0
};

if (fs.existsSync(path.join(__dirname, 'counter.json'))) {
    object = JSON.parse(fs.readFileSync(path.join(__dirname, 'counter.json'), 'utf-8'));
}

const app = express();

app.get('/', (req, res) => {
    object.main += 1;
    res.send(`<h1>Корневая страница</h1>
              <p>Просмотров: ${object.main}</p>
              <a href="/about">Ссылка на страницу About</a>`);
    fs.writeFileSync(path.join(__dirname, 'counter.json'), JSON.stringify(object));
});

app.get('/about', (req, res) => {
    object.about += 1;
    res.send(`<h1>Страница about</h1>
              <p>Просмотров: ${object.about}</p>
              <a href="/">Ссылка на страницу Main</a>`);
    fs.writeFileSync(path.join(__dirname, 'counter.json'), JSON.stringify(object));
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>Страницы не существует</h1>');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
