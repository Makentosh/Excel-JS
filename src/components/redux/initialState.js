import {storage} from '@core/utils';
import {defaultStyles} from '@/constans';


const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excelState')
                              ? normalize(storage('excelState'))
                              : defaultState
