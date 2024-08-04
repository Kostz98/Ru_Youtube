const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const ipAddress = req.ip;
    const userDataFilePath = path.join('/Users/kosta/Documents/Base', 'userdata.txt');
    const userLogFilePath = path.join('/Users/kosta/Documents/Base', 'users.txt');

    fs.readFile(userDataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Произошла ошибка при попытке входа");
        }

        try {
            const users = data.split('\n');
            let isLoggedIn = false;
            for (let i = 0; i < users.length; i++) {
                const userInfo = users[i].split(', ');
                const userData = {
                    username: userInfo[0].split(': ')[1],
                    password: userInfo[2].split(': ')[1]
                };
                if (userData.username == username && userData.password == password) {
                    isLoggedIn = true;
                    const userInfo = 'IP-адрес: ' + ipAddress + ', Пользователь: ' + username + '\n';
                    fs.appendFile(userLogFilePath, userInfo, (err) => {
                        if (err) {
                            console.error('Ошибка при записи информации в файл users.txt:', err);
                        } else {
                            console.log('Информация успешно записана в файл users.txt');
                        }
                    });
                    break;
                }
            }
            if (isLoggedIn) {
                res.status(200).send('Успешный вход');
            } else {
                res.status(401).send('Неверное имя пользователя или пароль');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Произошла ошибка при обработке данных пользователя");
        }
    });
});

const PORT = 8957;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порте ${PORT}`);
});
