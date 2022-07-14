import AuthProvider from './context/AuthProvider.jsx';

import MainPage from './MainPage.jsx';

function App() {
  return (
    <AuthProvider>
      <div className='h-100' id='chat'>
        <MainPage />
      </div>
    </AuthProvider>
  )
}

export default App;
