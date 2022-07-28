import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  addChannel: Add,
  removing: Remove,
  renaming: Rename,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];