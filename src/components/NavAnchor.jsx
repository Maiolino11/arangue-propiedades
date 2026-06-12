import { Link, useNavigate } from 'react-router-dom';

// Smooth-scrolls to an in-page section id; if it's not on the current page,
// navigates home first and scrolls there once it mounts.
export default function NavAnchor({ id, children, className, style, onClick: extraOnClick }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 78, behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
    if (extraOnClick) extraOnClick(e);
  };

  return (
    <Link to={`/#${id}`} onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
}
