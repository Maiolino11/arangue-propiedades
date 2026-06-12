import { useApp } from '../context/AppContext.jsx';
import './VariantSwitcher.css';

export default function VariantSwitcher() {
  const { variant, setVariant } = useApp();

  return (
    <div className="ar-switcher">
      <span className="ar-switcher__label">Variante</span>
      <button className={`ar-switcher__btn${variant === 'A' ? ' is-active' : ''}`} onClick={() => setVariant('A')}>A · Editorial</button>
      <button className={`ar-switcher__btn${variant === 'B' ? ' is-active' : ''}`} onClick={() => setVariant('B')}>B · Inmersiva</button>
    </div>
  );
}
