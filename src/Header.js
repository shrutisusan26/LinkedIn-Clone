import React from 'react'
import './Header.css'
import mainLogo from'./linkedin.png';
import me from'./IMG-4368.jpg';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import HeaderOption from './HeaderOption';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from './features/userSlice';
import { auth } from './firebase';
import { selectUser } from './features/userSlice';


function Header() {
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutOfApp= () => {
    dispatch(logout());
    auth.signOut();
  }
  return (
    <div className='header'>
      <div className='header__left'>
          <img src={mainLogo} alt=""/>
          <div className='header__search'>
          <SearchIcon/>
          <input type="text" placeholder='Search'/>
          </div>
      </div>
      <div className='header__right'>
          <HeaderOption title="Home" Icon= {HomeIcon}/>
          <HeaderOption title="My Network" Icon= {SupervisorAccount}/>
          <HeaderOption title="Jobs" Icon= {BusinessCenterIcon}/>
          <HeaderOption title="Messaging" Icon= {ChatIcon}/>
          <HeaderOption title="Notifications" Icon= {NotificationsIcon}/>
          {user && <HeaderOption avatar={true} title="Logout" onClick={logoutOfApp}/>}

      </div>
    </div>
  )
}

export default Header
