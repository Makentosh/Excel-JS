import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/components/redux/rootReducer';
import {initialState} from '@/components/redux/initialState';
import {Header} from '@/components/header/Header';
import {Excel} from '@/components/excel/Excel';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {debounce, storage} from '@core/utils';

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce(state => {
      console.log('APP STATE', state);
      storage('excelState', state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
