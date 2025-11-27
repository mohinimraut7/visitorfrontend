import { useEffect,useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import User from './pages/User';
import Home from './pages/Home';
import Rolemaster from './pages/Rolemaster';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TenderComponent from './pages/TenderComponents';

import ConsumerComponent from './pages/ConsumerComponents';
import EntryForm from './pages/EntryForm';
import FeedbackForm from './pages/FeedbackForm';
import VisitorMaster from './pages/VisitorMaster';



const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  
  const toastIdRef = useRef(null);

  const today = new Date(); 
  
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    const storedData = localStorage.getItem("resdata");
    if (storedData) {
      const resData = JSON.parse(storedData);
      if (resData.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: resData,
        });
        navigate('/');
      }
    }
  }, [dispatch]);

  


    
  const handleLogout = () => {
    localStorage.removeItem("resdata");
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  };

  return (
    <>
  
          <Sidebar />
      <Routes>
       
        {isAuthenticated ? (
          <>
           <Route path="/" element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/rolemaster" element={<Rolemaster />} />
            <Route path="/tendercomponent" element={<TenderComponent />} />
            <Route path="/consumercomponent" element={<ConsumerComponent />} />
             <Route path="/visitormaster" element={<VisitorMaster />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/entryform" element={<EntryForm />} />
              <Route path="/feedback" element={<FeedbackForm />} />


             

            <Route path="/logout" element={<Button sx={{ color: '#0d2136' }} onClick={handleLogout}>Logout</Button>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default App;
  
