import {$} from '@core/dom';

export function resizeHandler($root, e) {

  return new Promise((resolve) => {
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
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')

        $resizer.css({right: 0})
      } else {
        $parent.css({height: `${value}px`})
        $resizer.css({bottom: 0})
      }

      document.onmousemove = null
      document.onmouseup = null
      $resizer.removeClass('active')

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

    }
  })
}
