import { createReducer } from '../../app/common/util/createReducer';
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from './sidebarConstants';

const initialState = {};

export const openSidebar = (state, payload) => {
  return payload;
};

export const closeSidebar = (state, payload) => {
  return payload;
};

export default createReducer(initialState, {
  [OPEN_SIDEBAR]: openSidebar,
  [CLOSE_SIDEBAR]: closeSidebar
});
