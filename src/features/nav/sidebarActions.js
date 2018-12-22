import { OPEN_SIDEBAR } from './sidebarConstants';
import { CLOSE_SIDEBAR } from './sidebarConstants';

export const openSidebar = () => {
  return {
    type: OPEN_SIDEBAR,
    payload: { visible: true, dimmerActive: true }
  };
};

export const closeSidebar = () => {
  return {
    type: CLOSE_SIDEBAR,
    payload: { visible: false, dimmerActive: false }
  };
};
