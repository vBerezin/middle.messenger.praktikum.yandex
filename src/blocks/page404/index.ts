import { ROUTES } from '~common/scripts/routes';

import { PageError } from '~components/PageError';

export const page404 = new PageError({
  title: '404',
  text: 'Не туда попали',
  button: {
    mods: 'white',
    text: 'Вернуться на главную',
    attributes: {
      href: ROUTES.root,
    },
  },
});
