import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constans';


const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excelState')
                              ? normalize(storage('excelState'))
                              : defaultState
