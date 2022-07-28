import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};
const modalsWindow = (modalName) => modals[modalName];
export default modalsWindow;

// import React, { useState } from 'react';
// import { useImmer } from 'use-immer';
// import getModal from './modals/index.js';

// // BEGIN (write your solution here)
// const MyModal = (props) => {
//   const {
//     type, show, addTask, closeWindow, tasks, actualTaskId, renameTask, removeTask,
//   } = props;
//   const Result = getModal(type);
//   return (
//     <>
//       <Result show={show}
//       actualTaskId={actualTaskId}
//       removeTask={removeTask}
//       renameTask={renameTask}
//       addTask={addTask}
//       tasks={tasks} closeWindow={closeWindow}/>
//     </>
//   )
// }

// const TaskComponent = ({ task, id, openRenameWindow, openDeleteWindow }) => {
//   return (
//     <div id={id}>
//       <span className="mr-10">{task}</span>
//       <button
//         type="button"
//         className="border-0 btn btn-link mr-3 text-decoration-none"
//         data-testid="item-rename"
//         onClick={openRenameWindow}
//       >rename</button>
//       <button
//         type="button"
//         className="border-0 btn btn-link text-decoration-none"
//         data-testid="item-remove"
//         onClick={openDeleteWindow}
//       >remove</button>
//     </div>
//   )
// };

// const App = () => {
//   const [typeModal, setTypeModal] = useState(null);
//   const [show, setShow] = useState(true);
//   const [actualTaskId, setActualTaskId] = useState(null);
//   const [tasks, updateTasks] = useImmer([]);
//   const addTask = (task) => {
//     updateTasks(draft => { draft.unshift(task) });
//   };

//   const renameTask = (actualTaskId, actualText) => {
//     updateTasks(draft => {
//       draft.map((item) => {
//         if (item.id === actualTaskId) {
//           item.task = actualText;
//         }
//       })
//     })
//   }

//   const removeTask = (actualTaskId) => {
//     updateTasks(draft => draft.filter((task) => task.id !== actualTaskId));
//   }
//   const closeWindow = () => setShow(false);
//   const openAddWindow = () => {
//     setTypeModal('adding');
//     setShow(true);
//   }
//   const openRenameWindow = (e) => {
//     setTypeModal('renaming');
//     setActualTaskId(e.target.parentNode.id);
//     setShow(true);
//   }
//   const openDeleteWindow = (e) => {
//     setTypeModal("removing");
//     setActualTaskId(e.target.parentNode.id);
//     setShow(true);
//   };
//   return (
//     <>
//       <div className="mb-3">
//         <button
//           type="button"
//           data-testid="item-add"
//           className="btn btn-secondary"
//           onClick={openAddWindow}
//           >add</button>
//       </div>
//       <React.Fragment>
//         {tasks.length ? tasks.map((elem) => <TaskComponent
//           task={elem.task}
//           key={elem.id}
//           id={elem.id}
//           openRenameWindow={openRenameWindow}
//           openDeleteWindow={openDeleteWindow}/>) : null}
//       </React.Fragment>
//       <React.Fragment>
//         {typeModal ? <MyModal removeTask={removeTask} renameTask={renameTask} actualTaskId={actualTaskId} type={typeModal} addTask={addTask} tasks={tasks} show={show} closeWindow={closeWindow} /> : null }
//       </React.Fragment>
//     </>
//   )
// };

// export default App;