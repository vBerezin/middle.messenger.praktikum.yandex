import './styles';
import template from './template';

import { EVENTS } from '~common/scripts/events';

import { Component } from '~modules/Component';

import { FormAuthProps } from '~components/FormAuth/types';
import { FormAuth } from '~components/FormAuth';

export class PageAuth extends Component<FormAuthProps> {
  form: FormAuth;

  constructor(props: FormAuthProps) {
    super({template, props});
    this.form = new FormAuth(props);
    this.on(EVENTS.component.update, () => this.mountForm());
    this.mountForm();
  }

  mountForm() {
    const formContainer = this.el.querySelector('.page-auth__form');
    if (formContainer) {
      this.form.mount(formContainer);
    }
  }
}
