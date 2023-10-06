import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import Login from './components/account/Login';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = localStorage.getItem('accessToken');
  return token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
console.log("isAuthenticated is", isAuthenticated);
  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/account' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
