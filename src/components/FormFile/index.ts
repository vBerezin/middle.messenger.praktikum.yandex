import './styles';
import template from './template';
import { FormFileState, FormFileProps } from './types';
import { FormFileEvents } from './events';

import { Component } from '~modules/Component';

import { Button } from '~components/Button';

export class FormFile extends Component<FormFileProps, FormFileState, FormFileEvents> {
  static events = FormFileEvents;

  private button: Button;

  constructor(props: FormFileProps) {
    super({ template, props });
    this.button = new Button({
      mods: ['blue', 'block'],
      class: 'form-file__submit',
      attributes: {
        type: 'submit',
      },
      text: 'Отправить',
      ...props.button,
    });
  }

  reset() {
    if (this.el) {
      this.el.reset();
    }
    this.setState({ value: null });
    return this;
  }

  created() {
    const { input } = this.refs;
    this.el.addEventListener('change', () => {
      const file = input.files[0];
      this.setState({
        value: {
          file,
          name: file.name,
        },
      });
      this.emit(FormFile.events.change, this.state);
    });
    this.el.addEventListener('submit', (event) => this.props.submit.call(this, event, this.state));
  }

  updated() {
    if (this.state.value) {
      this.button.mount(this.refs.footer);
    }
  }
}
