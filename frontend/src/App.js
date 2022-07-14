import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/'></Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
