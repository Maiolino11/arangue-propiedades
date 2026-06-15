import logoWhite from '../assets/logo-icon-white.png';
import logoBlue from '../assets/logo-icon-blue.png';

const RATIO = 1367 / 872; // icon width / height

export default function Logo({ size = 38, color = '#fff' }) {
  const src = color === '#fff' || color === 'white' ? logoWhite : logoBlue;
  return (
    <img
      src={src}
      alt="Arangue Propiedades"
      width={Math.round(size * RATIO)}
      height={size}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}
