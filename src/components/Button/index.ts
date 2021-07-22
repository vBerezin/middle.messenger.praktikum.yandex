import './styles';
import template from './template';
import { ButtonProps } from './types';

import { Component } from '~modules/Component';

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ template, props });
  }
}
