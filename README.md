# SHARMA - Virtual Assistant

## Overview

SHARMA is a virtual AI assistant built using HTML, CSS, and JavaScript for the frontend, and Node.js with AppleScript for backend functionalities. It enables voice interactions to perform tasks such as opening web applications.

## Project Structure

- `index.html`: Main HTML file for the frontend.
- `style.css`: CSS file for styling the frontend.
- `script.js`: JavaScript file for handling voice recognition and interactions.
- `server.js`: Node.js server script for handling requests to open applications via AppleScript.

## Features

- Voice recognition to process commands.
- Responds to greetings and opens specified applications.
- Supports continuous listening and error handling.

## Prerequisites

- Node.js installed on your Mac.
- An environment that supports AppleScript (macOS).

## Installation and Running

### Frontend

1. Navigate to the directory containing `index.html`, `script.js`, and `style.css`.
2. Open `index.html` in a web browser to run the frontend.

### Backend

1. Navigate to the directory containing `server.js`.

    ```bash
    cd path/to/your/backend
    ```

2. Install the required Node.js packages:

    ```bash
    npm install express applescript
    ```

3. Start the server:

    ```bash
    node server.js
    ```

4. The server will run on `http://localhost:3002`.

## Commands

- **Start the Node.js server:**

    ```bash
    node server.js
    ```

- **Open the frontend:**

    - Simply open `index.html` in your web browser.

## Usage

1. **Start the backend server** by running the Node.js script.

2. **Interact with the virtual assistant** by clicking the microphone button in the web interface. Speak commands such as "open google" or "open telegram".

## Troubleshooting

- Ensure Node.js is properly installed and available in your PATH.
- Check the browser console for frontend errors.
- Verify that AppleScript is enabled and working on your macOS system.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Mozilla Developer Network (MDN)](https://developer.mozilla.org) for documentation and examples.
- AppleScript documentation for scripting macOS applications.

