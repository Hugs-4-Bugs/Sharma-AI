# import speech_recognition as sr
# from pocketsphinx import LiveSpeech, get_model_path

# def main():
#     # Initialize the recognizer
#     recognizer = sr.Recognizer()

#     # Initialize the LiveSpeech object with a keyword
#     model_path = get_model_path()
#     keyword = 'hey sharma'  # Replace with your desired wake word

#     # Create a speech recognition object
#     speech = LiveSpeech(
#         kws=keyword,
#         lm=False,
#         dic=False,
#         audio_device='default'
#     )

#     print("Listening for wake word...")
    
#     for phrase in speech:
#         print(f"Detected wake word: {phrase}")
#         # Respond to the detected wake word
#         # You can add your custom response here
#         print("Yes, go ahead!")

# if __name__ == "__main__":
#     main()





from flask import Flask, jsonify
import threading
import time

app = Flask(__name__)

wake_word_detected = False

@app.route('/status', methods=['GET'])
def status():
    global wake_word_detected
    return jsonify({'wake_word_detected': wake_word_detected})


def simulate_wake_word_detection():
    global wake_word_detected
    while True:
        time.sleep(10)  # Simulate detection every 10 seconds
        wake_word_detected = not wake_word_detected

if __name__ == "__main__":
    threading.Thread(target=simulate_wake_word_detection).start()
    app.run(host='0.0.0.0', port=5001, debug=True)

