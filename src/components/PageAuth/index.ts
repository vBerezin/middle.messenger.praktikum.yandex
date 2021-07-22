import './styles';
import template from './template';
import { PageAuthProps } from './types';

import { Component } from '~modules/Component';

export class PageAuth extends Component<PageAuthProps> {
  constructor(props: PageAuthProps) {
    super({ template, props });
  }

  mounted() {
    this.props.form.mount(this.refs.form);
  }
}
