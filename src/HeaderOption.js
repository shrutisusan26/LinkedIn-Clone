import React from 'react'
import './HeaderOption.css'
import { Avatar, Icon } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function HeaderOption(props) {
  const user = useSelector(selectUser);

  const {title, Icon,avatar,onClick} = props;
  return (
    <div onClick= {onClick} className='headerOption'>
      {Icon && <Icon className='headerOption__icon'/>}
      {avatar && ( 
        <Avatar className='headerOption__icon'>{user?.email[0]}</Avatar>
      )}
      <h3 className='headerOption__title'> {title} </h3>    
    </div>
  )
}

export default HeaderOption
