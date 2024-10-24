# # Using this code we need to have the microphone or audio input device.If you are not using a microphone,
# # this might be an error in the script related to its configuration or dependencies.

# from flask import Flask, jsonify
# import threading
# import speech_recognition as sr
# from pocketsphinx import LiveSpeech, get_model_path

# app = Flask(__name__)

# # Variable to store wake word detection status
# wake_word_detected = False

# @app.route('/status', methods=['GET'])
# def get_status():
#     return jsonify({'wake_word_detected': wake_word_detected})

# def wake_word_detection():
#     global wake_word_detected
#     model_path = get_model_path()
#     keyword = 'hey sharma'  # Replace with your desired wake word
#     speech = LiveSpeech(
#         kws=keyword,
#         lm=False,
#         dic=False,
#         audio_device='default'
#     )

#     for phrase in speech:
#         wake_word_detected = True
#         print("Wake word detected!")

# if __name__ == '__main__':
#     # Start wake word detection in a separate thread
#     detection_thread = threading.Thread(target=wake_word_detection)
#     detection_thread.daemon = True
#     detection_thread.start()

#     # Run Flask server
#     app.run(host='0.0.0.0', port=5002)












# disable the audio input


from flask import Flask, jsonify
import threading

app = Flask(__name__)

# Variable to store wake word detection status
wake_word_detected = False

@app.route('/status', methods=['GET'])
def get_status():
    global wake_word_detected
    return jsonify({'wake_word_detected': wake_word_detected})

def wake_word_detection():
    global wake_word_detected
    # Comment out the real wake word detection if no microphone is used
    # Uncomment and modify the lines below if you have a mock detection or want to use a different approach
    # Example: Simulate wake word detection every 10 seconds for testing
    import time
    while True:
        # Simulate wake word detection
        wake_word_detected = True
        print("Simulated wake word detected!")
        time.sleep(10)  # Simulate detection interval

if __name__ == '__main__':
    # Start wake word detection in a separate thread
    detection_thread = threading.Thread(target=wake_word_detection)
    detection_thread.daemon = True
    detection_thread.start()

    # Run Flask server
    app.run(host='0.0.0.0', port=5004)  # Ensure this port is not in use
@app.route('/reset_status', methods=['POST'])
def reset_status():
    global wake_word_detected
    wake_word_detected = False
    return jsonify({'status': 'success'})
