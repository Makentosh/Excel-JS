import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/components/redux/actions';
import {defaultTitle} from '@/constans';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  static className = 'excel__header'

  toHTML() {
    const title = this.store.getState().title || defaultTitle

    return `
         <input class="input" 
         type="text" 
         value="${title}">

        <div>
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
      `
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(changeTitle($target.text()))

  }
}
