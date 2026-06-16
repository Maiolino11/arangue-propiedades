const { Database } = require('node-sqlite3-wasm');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'arangue.db'));
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo        TEXT NOT NULL,
    descripcion   TEXT,
    precio        REAL,
    moneda        TEXT DEFAULT 'USD',
    zona          TEXT,
    direccion     TEXT,
    tipo          TEXT,
    operacion     TEXT,
    dormitorios   INTEGER,
    banos         INTEGER,
    m2_cubiertos  REAL,
    m2_totales    REAL,
    cochera       INTEGER DEFAULT 0,
    pileta        INTEGER DEFAULT 0,
    estado        TEXT DEFAULT 'disponible',
    fecha_carga   TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS photos (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    propiedad_id  INTEGER NOT NULL,
    url_foto      TEXT NOT NULL,
    orden         INTEGER DEFAULT 0,
    FOREIGN KEY (propiedad_id) REFERENCES properties(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    email    TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nombre   TEXT
  );
`);

const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
if (userCount === 0) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (email, password, nombre) VALUES (?,?,?)').run('admin@arangue.com', hash, 'Admin');
  console.log('Usuario admin creado: admin@arangue.com / admin123 — cambiá la contraseña en producción');
}

module.exports = db;
