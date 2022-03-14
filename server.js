const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Serves the contents of /dist as static files so index.html can import them
app.use(express.static('./dist', { extensions: ['js'] }));

// Returns index.html no matter the url path
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));