import os
from moviepy.editor import VideoFileClip

def convert_ts_to_mp4(input_file, output_file):
    clip = VideoFileClip(input_file)
    clip.write_videofile(output_file)

def process_ts_files(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if filename.endswith(".ts"):
            output_file = os.path.join(folder_path, f"{os.path.splitext(filename)[0]}.mp4")
            convert_ts_to_mp4(file_path, output_file)
            os.remove(file_path)

# Передайте путь к папке для обработки
process_ts_files("/Users/kosta/PycharmProjects/pythonProject1/static")

