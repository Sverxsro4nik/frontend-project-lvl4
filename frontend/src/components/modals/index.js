import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  addChannel: Add,
  removing: Remove,
  renaming: Rename,
};
const modalWindows = (modalName) => modals[modalName];

export default modalWindows;
