export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(e) {
  return e.target.dataset.type === 'cell'
}
