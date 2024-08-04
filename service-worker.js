const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const userData = 'Username: ' + username + ', Email: ' + email + ', Password: ' + password + '\n';

    const filePath = path.join('/Users/kosta/Documents/Base', 'userdata.txt');

    fs.appendFile(filePath, userData, (err) => {
        if (err) {
            console.error(err); // Выводим ошибку в консоль
            res.status(500).send("Произошла ошибка при сохранении данных пользователя");
        } else {
            res.status(200).json({ message: 'Регистрация прошла успешно!' });
        }
    });
});

const PORT = 8976;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err); // Выводим ошибку в консоль
    } else {
        console.log(`Сервер запущен на порте ${PORT}`);
    }
});
