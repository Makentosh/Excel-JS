import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }

  $emit(e, ...args) {
    this.emitter.emit(e, ...args)
  }

  $on(e, fn) {
    const unsub = this.emitter.subscribe(e, fn)
    this.unsubscribers.push(unsub)
  }

  toHTML() {
    return ''
  }

  prepare() {

  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
