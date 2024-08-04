import shutil
import requests
import os

url = input('Введите ссылку:')
output_file = input('Введите название выходново видео:')
save_directory = "/Users/kosta/Downloads/rutubee"  # новый путь сохранения
number_of_files = int(input("Введите количество файлов для загрузки: "))  # количество файлов для загрузки

if not os.path.exists(save_directory):  # убедимся, что папка существует
    os.makedirs(save_directory)

for i in range(0, number_of_files+1):
    segment_url = url.replace(url[url.find('segment-'):url.find('-v1-a1')], f"segment-{i}")
    response = requests.get(segment_url)
    if response.status_code == 200:
        with open(os.path.join(save_directory, f"segment-{i}-v1-a1.ts"), 'wb') as f:
            f.write(response.content)
        print(f"Файл segment-{i}-v1-a1.ts успешно загружен")

# Второй скрипт - удаление файлов меньше 378 * 378 байт
for filename in os.listdir(save_directory):
    file_path = os.path.join(save_directory, filename)
    if os.path.isfile(file_path) and os.path.getsize(file_path) < 378 * 378:
        os.remove(file_path)
        print(f"Файл {file_path} удален")

# Третий скрипт - склеивание файлов
file_suffix = '-v1-a1.ts'  # суффикс всех файлов
output_file_path = output_file  # указываем конкретное имя для результирующего файла

with open(output_file_path, 'wb') as output_file:
    for i in range(1, number_of_files+1):
        input_file_path = os.path.join(save_directory, f'segment-{i}{file_suffix}')
        if os.path.exists(input_file_path):
            with open(input_file_path, 'rb') as input_file:
                shutil.copyfileobj(input_file, output_file)
                print(f'Файл {input_file_path} склеен')
        else:
            print(f'Файл {input_file_path} не найден')

print('Склеивание завершено. Результирующий файл сохранен в', output_file_path)

