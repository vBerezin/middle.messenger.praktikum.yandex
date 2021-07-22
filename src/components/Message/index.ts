import './styles';
import template from './template';
import { MessageProps, MessageState } from './types';

import { Component } from '~modules/Component';

export class Message extends Component<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super({ template, props });
  }
}
