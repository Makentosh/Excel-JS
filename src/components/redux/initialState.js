import {storage} from '@core/utils';


const defaultState = {
  rowState: {},
  colState: {}
}

export const initialState = storage('excelState')
                              ? storage('excelState')
                              : defaultState
