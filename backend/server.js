const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Renovate Max2Max API' });
});

app.post('/api/quote', (req, res) => {
  const { name, phone, email, type, details } = req.body;
  console.log('Quote request:', { name, phone, email, type, details });
  res.json({ success: true, message: 'Quote request received' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
