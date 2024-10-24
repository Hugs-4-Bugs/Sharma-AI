from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/status', methods=['GET'])
def status():
    return jsonify({'message': 'Server is running'})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)

