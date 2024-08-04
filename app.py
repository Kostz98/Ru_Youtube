from flask import Flask, render_template, request
import os

app = Flask(__name__)

# Определение маршрута для отображения списка видеофайлов
@app.route('/')
def index():
    # Выбор видеофайлов с расширением .mov и .mp4 из папки "static"
    video_files = [f for f in os.listdir('static') if f.endswith('.mov') or f.endswith('.mp4') or f.endswith('.ts')]
    return render_template('vse_video.html', video_files=video_files)

# Определение маршрута для поиска видео
@app.route('/search', methods=['GET'])
def search_videos():
    query = request.args.get('query')
    video_folder = "/Users/kosta/PycharmProjects/pythonProject1/static"
    video_files = [f for f in os.listdir(video_folder) if f.endswith(('.mp4', '.mov', '.avi', '.ts'))]
    if query:
        # Фильтруем список видео файлов на основе запроса
        results = [video for video in video_files if query.lower() in video.lower()]
        return render_template('search_video.html', query=query, results=results)
    return "Введите поисковый запрос"

# Определение маршрута для загрузки видео
@app.route('/upload_video')
def upload_video():
    return render_template('upload_video.html')

@app.route('/login')
def login():
    return render_template('Home_login.html')

@app.route('/registration')
def registration():
    return render_template('registration.html')

@app.route('/login_to_account')
def login_to_account():
    return render_template('login_to_account.html')

# Запуск приложения Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1289, debug=True)
