import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import InputOption  from './InputOption';
import { CalendarViewDay, Subscriptions, EventNote} from '@mui/icons-material';
import Posts from './Posts';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";
function Feed() {
  const user = useSelector(selectUser);

  const [input,setInput] = useState('');
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
      })));
    })
  },[]) 


  const sendPost = (e)=>{
      e.preventDefault();
      db.collection("posts").add({
        name: user.displayName,
        description : user.email,
        message: input,
        photourl: user.photourl|| '' ,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })

      setInput('');
  }
  return (
    <div className='Feed'>
      <div className='Feed__inputContainer'>
        <div className='Feed__input'>
            <CreateIcon />
            <form>
                <input value= {input} onChange = {e=> setInput(e.target.value)} type="text"/>
                <button onClick = {sendPost} type="submit">Send</button>
            </form>
        </div>
        <div className='Feed__inputOptions'>
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
            <InputOption Icon={Subscriptions} title="Video" color="#E7A33E" />
            <InputOption Icon={EventNote} title="Event" color="#COCBCD" />
            <InputOption Icon={CalendarViewDay} title="Write article" color="#7FC15E" />
        </div>
      </div>
      <FlipMove>
      {posts.map(({id, data : {name, description, message, photourl}}) => (
        <Posts  
        key ={id} 
        name= {name} 
        description ={description}
        message={message} 
        photourl={photourl}
         />
      ))}
      </FlipMove>
      
    </div>
  )
}

export default Feed
