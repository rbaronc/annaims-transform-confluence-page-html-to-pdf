const express = require('express');
const { htmlToPdfBuffer } = require('./transform.js');

const app = express();
const PORT = 3005;

app.use(express.text({ type: ['text/plain', 'text/html'], limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.post('/transform', async (req, res) => {
  let html = req.body;

  if (typeof html !== 'string' && req.body && typeof req.body.html === 'string') {
    html = req.body.html;
  }

  if (typeof html !== 'string' || !html.trim()) {
    return res.status(400).json({ error: 'Expected HTML as request body (text/plain or JSON { "html": "..." })' });
  }

  try {
    const pdfBuffer = await htmlToPdfBuffer(html);
    res.json({ pdf: pdfBuffer.toString('base64') });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Transform failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
