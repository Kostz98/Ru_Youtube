const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Выберите файл!'); // Проверка наличия файлов
    }

    const videoFile = req.files.video; // Получаем файл из запроса
    const videoName = req.body.videoName; // Получаем имя видео из запроса

    if (!videoName || videoName.trim() === "") {
        return res.status(400).send('Введите имя для видео!'); // Проверяем, что имя видео указано
    }

    const ext = path.extname(videoFile.name); // Получаем расширение файла
    const uploadPath = path.join(__dirname, 'static'

        , `${videoName}${ext}`); // Путь для сохранения с использованием переданного имени и расширения

    videoFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send(`Файл ${videoFile.name} успешно загружен на сервер под именем ${videoName}! <button onclick="goBack()">Назад</button>`);
    });
});

// Функция для перенаправления на предыдущую страницу
function goBack() {
    window.history.back();
}

app.listen(666, () => {
    console.log('Сервер запущен на порту 666');
});
