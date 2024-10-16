import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/app.scss";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./components/Home";
import ChatPage from './components/ChatPage';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoutes from './components/ProtectedRoutes';

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';

const App = () => {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:3000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // Listen to socket events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Main App Layout */}
        <Route element={<AppLayout />}>
          {/* Change default route to Home */}
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="chat" element={<ProtectedRoutes><ChatPage /></ProtectedRoutes>} />
          <Route path="profile/:id" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="account/edit" element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>} />
        </Route>
  
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
  
};

export default App;
