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
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    $resizer.addClass('active')

    const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

    if (e.target.dataset.resize === 'col') {

      document.onmousemove = event => {
        const delta = Math.floor(event.pageX - coords.right)
        const value = coords.width + delta

        $parent.css({width: `${value}px`})
        cells.forEach(el => el.style.width = value + 'px')

      }
    } else if (e.target.dataset.resize === 'row') {
      document.onmousemove = event => {
        const delta = Math.floor(event.pageY - coords.bottom)
        const value = coords.height + delta

        $parent.css({height: `${value}px`})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      $resizer.removeClass('active')
    }


  }

}


// document.onmouseleave = () => {
//   document.onmousemove = null
//   $resizer.removeClass('active')
// }
