const express = require('express');
const db = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();

const toB = (v) => (v ? 1 : 0);

router.get('/', auth, (req, res) => {
  const rows = db.prepare(`
    SELECT p.*,
      (SELECT url_foto FROM photos WHERE propiedad_id = p.id ORDER BY orden LIMIT 1) AS foto_principal,
      (SELECT COUNT(*) FROM photos WHERE propiedad_id = p.id) AS total_fotos
    FROM properties p
    ORDER BY p.fecha_carga DESC
  `).all();
  res.json(rows.map(r => ({ ...r, cochera: !!r.cochera, pileta: !!r.pileta })));
});

router.get('/:id', auth, (req, res) => {
  const prop = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id);
  if (!prop) return res.status(404).json({ error: 'Propiedad no encontrada' });
  const fotos = db.prepare('SELECT * FROM photos WHERE propiedad_id = ? ORDER BY orden').all(req.params.id);
  res.json({ ...prop, cochera: !!prop.cochera, pileta: !!prop.pileta, fotos });
});

router.post('/', auth, (req, res) => {
  const { titulo, descripcion, precio, moneda, zona, direccion, tipo, operacion,
    dormitorios, banos, m2_cubiertos, m2_totales, cochera, pileta, estado } = req.body;
  if (!titulo?.trim()) return res.status(400).json({ error: 'El título es requerido' });

  const { lastInsertRowid } = db.prepare(`
    INSERT INTO properties
      (titulo, descripcion, precio, moneda, zona, direccion, tipo, operacion,
       dormitorios, banos, m2_cubiertos, m2_totales, cochera, pileta, estado)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).run(
    titulo.trim(), descripcion || null, precio || null, moneda || 'USD',
    zona || null, direccion || null, tipo || null, operacion || null,
    dormitorios || null, banos || null, m2_cubiertos || null, m2_totales || null,
    toB(cochera), toB(pileta), estado || 'disponible'
  );
  res.status(201).json({ id: lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { titulo, descripcion, precio, moneda, zona, direccion, tipo, operacion,
    dormitorios, banos, m2_cubiertos, m2_totales, cochera, pileta, estado } = req.body;
  if (!titulo?.trim()) return res.status(400).json({ error: 'El título es requerido' });

  db.prepare(`
    UPDATE properties SET
      titulo=?, descripcion=?, precio=?, moneda=?, zona=?, direccion=?,
      tipo=?, operacion=?, dormitorios=?, banos=?, m2_cubiertos=?, m2_totales=?,
      cochera=?, pileta=?, estado=?
    WHERE id=?
  `).run(
    titulo.trim(), descripcion || null, precio || null, moneda || 'USD',
    zona || null, direccion || null, tipo || null, operacion || null,
    dormitorios || null, banos || null, m2_cubiertos || null, m2_totales || null,
    toB(cochera), toB(pileta), estado || 'disponible', req.params.id
  );
  res.json({ ok: true });
});

router.patch('/:id/status', auth, (req, res) => {
  const { estado } = req.body;
  if (!['disponible', 'reservado', 'vendido'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }
  db.prepare('UPDATE properties SET estado=? WHERE id=?').run(estado, req.params.id);
  res.json({ ok: true });
});

router.delete('/:id', auth, (req, res) => {
  const photos = db.prepare('SELECT * FROM photos WHERE propiedad_id=?').all(req.params.id);
  const fs = require('fs');
  const path = require('path');
  photos.forEach(p => {
    const fp = path.join(__dirname, '..', 'uploads', path.basename(p.url_foto));
    try { fs.unlinkSync(fp); } catch {}
  });
  db.prepare('DELETE FROM properties WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
