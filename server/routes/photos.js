const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database');
const auth = require('../middleware/auth');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Solo se permiten imágenes'));
    cb(null, true);
  },
});

const router = express.Router();

router.post('/:propertyId', auth, upload.array('photos', 15), (req, res) => {
  const { propertyId } = req.params;
  if (!req.files?.length) return res.status(400).json({ error: 'No se recibieron archivos' });

  const existing = db.prepare('SELECT COUNT(*) as c FROM photos WHERE propiedad_id=?').get(propertyId).c;
  if (existing + req.files.length > 15) {
    req.files.forEach(f => { try { fs.unlinkSync(f.path); } catch {} });
    return res.status(400).json({ error: `Límite 15 fotos. Ya tenés ${existing}.` });
  }

  const insert = db.prepare('INSERT INTO photos (propiedad_id, url_foto, orden) VALUES (?,?,?)');
  req.files.forEach((file, i) => {
    insert.run(propertyId, `/uploads/${file.filename}`, existing + i);
  });

  res.json(db.prepare('SELECT * FROM photos WHERE propiedad_id=? ORDER BY orden').all(propertyId));
});

router.delete('/:id', auth, (req, res) => {
  const photo = db.prepare('SELECT * FROM photos WHERE id=?').get(req.params.id);
  if (!photo) return res.status(404).json({ error: 'No encontrada' });
  try { fs.unlinkSync(path.join(UPLOAD_DIR, path.basename(photo.url_foto))); } catch {}
  db.prepare('DELETE FROM photos WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

router.put('/reorder', auth, (req, res) => {
  const { photos } = req.body;
  if (!Array.isArray(photos)) return res.status(400).json({ error: 'Formato inválido' });
  const update = db.prepare('UPDATE photos SET orden=? WHERE id=?');
  photos.forEach(({ id, orden }) => update.run(orden, id));
  res.json({ ok: true });
});

module.exports = router;
