import './scss/index.scss'
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/components/redux/rootReducer';
import {createStore} from '@core/createStore';
import {storage} from '@core/utils';
import {initialState} from '@/components/redux/initialState';

const store = createStore(rootReducer, initialState)

store.subscribe(state => {
  console.log('APP STATE', state)
  storage('excelState', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
