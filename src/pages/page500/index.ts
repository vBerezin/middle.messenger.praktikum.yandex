import { PageError } from '~components/PageError';
import { ROUTES } from '~common/scripts/vars/routes';

export const page500 = new PageError({
  title: '500',
  text: 'Мы уже фиксим',
  button: {
    mods: 'white',
    text: 'Назад к чатам',
    attributes: {
      href: ROUTES.messenger,
    },
  },
});