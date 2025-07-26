const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // per permettere chiamate dal frontend (in sviluppo)
app.use(bodyParser.json());

/* DB in memoria (solo per demo, su produzione usa un DB reale) */
const users = {}; 
// users = {
//   "email@example.com": {
//     password: "password123",
//     favorites: ["Sistemi embedded", "Machine learning"]
//   }
// }

// Registrazione/Login (endpoint unico per semplicità)
app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email e password richiesti" });

  if (!users[email]) {
    // Registrazione
    users[email] = { password, favorites: [] };
    return res.json({ message: 'Registrazione completata', email });
  } else if (users[email].password === password) {
    // Login
    return res.json({ message: 'Login effettuato', email, favorites: users[email].favorites });
  } else {
    return res.status(401).json({ error: 'Password errata' });
  }
});

// Aggiungi un progetto ai preferiti
app.post('/favorites/add', (req, res) => {
  const { email, project } = req.body;
  if (!email || !project) return res.status(400).json({ error: "Email e progetto richiesti" });

  if (!users[email]) return res.status(404).json({ error: "Utente non trovato" });

  if (!users[email].favorites.includes(project)) {
    users[email].favorites.push(project);
  }

  res.json({ favorites: users[email].favorites });
});

// Rimuovi un progetto dai preferiti
app.post('/favorites/remove', (req, res) => {
  const { email, project } = req.body;
  if (!email || !project) return res.status(400).json({ error: "Email e progetto richiesti" });

  if (!users[email]) return res.status(404).json({ error: "Utente non trovato" });

  users[email].favorites = users[email].favorites.filter(p => p !== project);

  res.json({ favorites: users[email].favorites });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
