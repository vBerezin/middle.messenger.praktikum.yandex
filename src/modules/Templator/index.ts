import { ROUTES } from '~common/scripts/routes';
import { TemplatorCompiler, TemplatorProps } from '~modules/Templator/types';

/**
 * @param { Function } compiler - parcel при импорте .pug файла возвращает функцию pug.compile
 * @param { Object } data - параметры передаваемые в pug при компиляции шаблона
 * @function Compile  - Компилирует pug шаблон с параметрами и возвращает Element
 * */

export class Templator {
  data: Record<string, any>;

  compiler: TemplatorCompiler;

  constructor(props: TemplatorProps) {
    this.data = props.data;
    this.compiler = props.compiler;
  }

  compile() {
    const template = window.document.createElement('template');
    template.innerHTML = this.compiler({
      ROUTES,
      data: this.data,
    });
    const { children } = template.content;
    if (children.length > 1) {
      throw new Error('Шаблон должен иметь 1 родительский элемент');
    }
    return template.content.children[0];
  }
}
