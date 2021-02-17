import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];
    this.prepare();
    // this.storeSub = null;
  }

  $emit(e, ...args) {
    this.emitter.emit(e, ...args)
  }

  $on(e, fn) {
    const unsub = this.emitter.subscribe(e, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {

  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }

  toHTML() {
    return ''
  }

  prepare() {

  }

  init() {
    this.initDOMListeners()
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    // this.storeSub.unsubscribe()
  }
}
