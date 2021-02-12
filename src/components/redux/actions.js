import {TABLE_RESIZE} from '@/components/redux/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}
