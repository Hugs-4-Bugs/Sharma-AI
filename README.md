
# Sharma AI

## Overview

Sharma AI is a voice-activated virtual assistant that allows users to interact with their computer using voice commands. Built using HTML, CSS, and JavaScript for the frontend, and Node.js with AppleScript for backend functionalities, Sharma AI enables tasks such as opening web applications through simple voice interactions.

## Project Structure

- **frontend/**
  - `index.html`: Main HTML file for the user interface.
  - `style.css`: CSS file for styling the frontend.
  - `script.js`: JavaScript file for handling voice recognition and user interactions.

- **backend/**
  - `server.js`: Node.js server script for processing voice commands and executing AppleScript commands.

- **wake_word_detection/**: Python scripts and configurations for implementing wake word detection.

- **requirements.txt**: Lists Python dependencies required for the project.

## Features

- **Voice Recognition**: Processes user commands through voice input.
- **Wake Word Detection**: Activates the assistant using a specified trigger word (e.g., "Hey Sharma").
- **Application Control**: Opens specified applications and performs tasks on macOS using AppleScript.
- **Continuous Listening**: Supports background listening for voice commands.
- **Error Handling**: Includes mechanisms to handle common errors and provide feedback.

## Prerequisites

- **Node.js**: Version 12 or higher.
- **Python**: Version 3.7 or higher for wake word detection.
- **AppleScript**: Enabled on macOS for backend operations.

## Installation and Running

### 1. Clone the Repository

```bash
git clone https://github.com/Hugs-4-Bugs/Sharma-AI.git
cd Sharma-AI
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Open `index.html` in your preferred web browser to launch the user interface.

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd ../backend
```

Install required Node.js packages:

```bash
npm install express applescript
```

Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:3002`.

### 4. Wake Word Detection Setup

Navigate to the `wake_word_detection/` directory:

```bash
cd ../wake_word_detection
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the wake word detection script:

```bash
python detect_wake_word.py
```

### 5. Full System Integration

With the frontend, backend, and wake word detection running, interact with Sharma AI by saying the configured wake word followed by your command.

## Usage

1. **Start the backend server** by running the Node.js script (`server.js`).
2. **Launch the frontend** by opening `index.html` in your web browser.
3. **Interact with the virtual assistant** by using voice commands like "open google" or "open telegram".

## Troubleshooting

- Ensure Node.js and Python are properly installed and available in your PATH.
- Verify that AppleScript is enabled and functioning on macOS.
- Check the browser console for any frontend errors and backend logs for server-related issues.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Mozilla Developer Network (MDN)](https://developer.mozilla.org) for documentation and examples.
- AppleScript documentation for scripting macOS applications.
