const express = require('express');
const applescript = require('applescript');
const app = express();
const port = 3000;

app.use(express.json());

// Route for opening applications
app.post('/open-app', (req, res) => {
    const { appName } = req.body;

    let script;
    switch (appName.toLowerCase()) {
        case 'telegram':
            script = `tell application "Telegram" to activate`;
            break;
        case 'calculator':
            script = `tell application "Calculator" to activate`;
            break;
        // Add more cases for different applications as needed
        default:
            script = `tell application "${appName}" to activate`;
            break;
    }

    console.log(`Executing AppleScript: ${script}`);

    applescript.execString(script, (err, rtn) => {
        if (err) {
            console.error('Error executing AppleScript:', err);
            return res.status(500).send(`Failed to open application: ${err}`);
        }

        console.log('Successfully opened application:', appName);
        res.send(`Opening ${appName}`);
    });
});

// Error handling middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).send('500 - Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
