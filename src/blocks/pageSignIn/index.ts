import { PageAuth } from '~components/PageAuth';
import { formSignIn } from '~blocks/formSignIn';

export const pageSignIn = new PageAuth({
  form: formSignIn,
});
