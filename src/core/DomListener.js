import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for Dom')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      if (!this[method]) {
        const name = this.name || ''

        throw new Error(
            `Метод ${method} не существует в ${name} компонент`
        )
      }

      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {

  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
