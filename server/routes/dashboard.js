const express = require('express');
const db = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM properties').get().c;
  const disponibles = db.prepare("SELECT COUNT(*) as c FROM properties WHERE estado='disponible'").get().c;
  const reservadas = db.prepare("SELECT COUNT(*) as c FROM properties WHERE estado='reservado'").get().c;
  const vendidas = db.prepare("SELECT COUNT(*) as c FROM properties WHERE estado='vendido'").get().c;
  const recientes = db.prepare(
    'SELECT id, titulo, tipo, precio, moneda, estado, fecha_carga FROM properties ORDER BY fecha_carga DESC LIMIT 5'
  ).all();
  res.json({ total, disponibles, reservadas, vendidas, recientes });
});

module.exports = router;
