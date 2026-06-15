import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { ZONA_NAMES } from '../data/properties.js';
import './Empresa.css';

const VALUES = [
  {
    title: 'Transparencia',
    text: 'Información clara y real sobre cada propiedad, sin sorpresas durante el proceso.',
  },
  {
    title: 'Cercanía',
    text: 'Acompañamos a cada cliente de forma personalizada, desde la consulta hasta la firma.',
  },
  {
    title: 'Profesionalismo',
    text: 'Equipo de asesores matriculados (COCIR 2601) con conocimiento del mercado regional.',
  },
];

export default function Empresa() {
  return (
    <div>
      <PageHeader
        crumb="Empresa"
        title="Quiénes somos"
        subtitle="Inmobiliaria con más de una década de trayectoria en Cañada de Gómez y la región, acompañando a familias y empresas en la compra, venta y alquiler de propiedades."
      />

      <section className="ar-empresa ar-section">
        <div className="ar-empresa__about">
          <h2 className="ar-empresa__h2">Nuestra historia</h2>
          <p>
            Arangue Propiedades nació en Cañada de Gómez con el objetivo de ofrecer un
            servicio inmobiliario cercano, transparente y profesional. A lo largo de los
            años fuimos sumando experiencia y confianza, ampliando nuestra zona de
            cobertura a Rosario, Las Parejas, Armstrong, Carcarañá y otras localidades de
            la región.
          </p>
          <p>
            Hoy trabajamos con casas, departamentos, terrenos, campos y galpones,
            asesorando tanto a quienes buscan su próxima propiedad como a quienes
            necesitan vender, alquilar o tasar la suya.
          </p>
        </div>
      </section>

      <section className="ar-empresa ar-section">
        <h2 className="ar-empresa__h2">Nuestros valores</h2>
        <div className="ar-grid-3 ar-empresa__values">
          {VALUES.map((v) => (
            <div key={v.title} className="ar-empresa__value">
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ar-empresa ar-section">
        <h2 className="ar-empresa__h2">Dónde operamos</h2>
        <p className="ar-empresa__lead">Trabajamos en toda la región, con presencia en:</p>
        <div className="ar-empresa__zonas">
          {ZONA_NAMES.map((z) => (
            <span key={z} className="ar-empresa__zona-chip">{z}</span>
          ))}
        </div>
      </section>

      <section className="ar-empresa ar-section">
        <div className="ar-empresa__cta">
          <div>
            <h2 className="ar-empresa__h2">¿Querés vender o alquilar tu propiedad?</h2>
            <p className="ar-empresa__lead">Solicitá una tasación gratuita y sin compromiso.</p>
          </div>
          <Link to="/tasaciones" className="ar-empresa__cta-btn">Pedir tasación</Link>
        </div>
      </section>
    </div>
  );
}
