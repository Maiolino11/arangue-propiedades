// Central place for contact details and links used across the site.
// TODO: replace CONTACT_EMAIL with the real inbox before going live.
export const WHATSAPP_NUMBER = '543471595464';
export const WHATSAPP_DEFAULT_MESSAGE = 'Hola! Quisiera más información sobre Arangue Propiedades.';
export const CONTACT_EMAIL = 'contacto@aranguepropiedades.com.ar';
export const INSTAGRAM_URL = 'https://instagram.com/aranguepropiedades';
export const FACEBOOK_URL = 'https://facebook.com/aranguepropiedades';

export function whatsappLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink({ to = CONTACT_EMAIL, subject = '', body = '' }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
