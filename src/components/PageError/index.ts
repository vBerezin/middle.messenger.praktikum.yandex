import './styles';
import template from './template';

import { Component } from '~modules/Component';

import { Button } from '~components/Button';
import { PageErrorProps, PageErrorState } from '~components/PageError/types';

export class PageError extends Component<PageErrorProps, PageErrorState> {
  private readonly button: Button;

  constructor(props: PageErrorProps) {
    super({ template, props });
    if (this.props.button) {
      this.button = new Button(this.props.button);
    }
  }

  mounted(): void {
    if (this.button) {
      this.button.mount(this.refs.footer);
    }
  }
}
