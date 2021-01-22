import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }


  toHTML() {
    return createTable()
  }


  onMousedown(e) {
    const type = e.target.dataset.resize;
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    let value;

    $resizer.addClass('active')
    if (type === 'col') {

      document.onmousemove = event => {
        const delta = Math.floor(event.pageX - coords.right)
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      }
    } else if (type === 'row') {
      document.onmousemove = event => {
        const delta = Math.floor(event.pageY - coords.bottom)
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px', right: '-5000px'})
      }
    }

    document.onmouseup = () => {

      if (type === 'col') {
        $parent.css({width: `${value}px`})
        this.$root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: `${value}px`})
      }

      document.onmousemove = null
      document.onmouseup = null
      $resizer.removeClass('active')
      $resizer.css({right: 0, bottom: '100%'})
    }


  }

}


// document.onmouseleave = () => {
//   document.onmousemove = null
//   $resizer.removeClass('active')
// }
