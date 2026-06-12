import { Link } from 'react-router-dom';
import './PropertyCard.css';

export default function PropertyCard({ item }) {
  const status = item.status || '';

  return (
    <Link to={`/propiedad/${item.slug}`} className="ar-card">
      <div className="ar-card__media">
        <img src={item.img} alt={item.title} loading="lazy" />
        <span className="ar-card__type">{item.type}</span>

        {status === 'oportunidad' && (
          <span className="ar-card__badge ar-card__badge--oportunidad">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg>
            Oportunidad
          </span>
        )}
        {status === 'nuevo' && (
          <span className="ar-card__badge ar-card__badge--nuevo">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7-6.3-4.5L5.7 20.3 8 13.3 2 8.9h7.6z" /></svg>
            Nuevo ingreso
          </span>
        )}
        {status === 'reservado' && (
          <span className="ar-card__badge ar-card__badge--reservado">Reservado</span>
        )}
        {status === 'vendido' && (
          <span className="ar-card__badge ar-card__badge--vendido">Vendido</span>
        )}
      </div>

      <div className="ar-card__body">
        <div className="ar-card__price-row">
          <span className="ar-card__price">{item.price}</span>
          <span className="ar-card__op">{item.op}</span>
        </div>
        <h3 className="ar-card__title">{item.title}</h3>
        <div className="ar-card__loc">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B36A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          {item.loc}
        </div>
        <div className="ar-card__specs">
          {item.beds > 0 && (
            <span className="ar-card__spec">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B6478" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 17v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" /><path d="M2 17h20M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 17v3M22 17v3" /></svg>
              {item.beds}
            </span>
          )}
          {item.baths > 0 && (
            <span className="ar-card__spec">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B6478" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2M4 12h16a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1zM6 19l-1 2M19 19l1 2" /></svg>
              {item.baths}
            </span>
          )}
          <span className="ar-card__spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B6478" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 3 3 21M21 9V3h-6M3 15v6h6" /></svg>
            {item.area}
          </span>
        </div>
      </div>
    </Link>
  );
}
