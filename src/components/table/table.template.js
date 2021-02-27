import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constans';
import {parse} from '@/core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}


function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}


function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}


function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })

    return `<div class="cell" 
              style="${styles}; width: ${width}"
              contenteditable 
              data-id="${id}"
              data-type="cell"
              data-value="${data || ''}"
              data-col="${col}">
                ${parse(data) || ''}
      </div>`
  }
}

function toColumn({col, index, width}) {
  const resizer = `<div class="col-resize" 
                        data-resize="col"></div>`

  return `
    <div class="column" data-type="resizable" 
          style="width:${width}" data-col="${index}">
      ${col}
      ${resizer}
    </div>
  `
}

function createRow(content, index, state) {
  const resizer = index
      ? `<div class="row-resize" 
              data-resize="row"></div>`
      : ''

  const height = getHeight(state, index)

  return `
    <div class="row" 
         data-type="resizable" 
         style="height: ${height}"
         data-row="${index}">
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
        </div>
      <div class="row-data">
      ${content}
      </div>
    </div>
  `
}


export function createTable(rowsCount = 15, state = {}) {

  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, null, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(cells, row + 1, state.rowState))
  }

  return rows.join('')
}
