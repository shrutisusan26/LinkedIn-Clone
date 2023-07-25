import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { useDispatch } from 'react-redux';
import {login} from './features/userSlice';
function Login() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[profilePicture, setprofilePicture] = useState('');
    const dispatch = useDispatch();

    const loginToApp =(e) =>{
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email,password)
        .then((userAuth) =>{
          dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileurl: userAuth.user.photoURL,
          }));
        })
        .catch(error=>alert(error));
    }
    const register= () =>{
        if(!name){
            return alert('Please enter a full name');
        }
        auth.createUserWithEmailAndPassword(email,password)
        .then((userAuth)=>{
            userAuth.user.updateProfile({
                displayName: name,
                photoURL:profilePicture
            })
            .then(()=>{
              dispatch(
                  login({
                      email: userAuth.user.email,
                      uid: userAuth.user.uid,
                      displayName: name,
                      photourl: profilePicture
                  }))
            }
          )
        })
        .catch(error=>alert(error));
    }

  return (
    <div className='login'>
      <img src = "https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks" alt = ""/>
      <form>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Full Name (required if registering)'/>
        <input type="text"  value={profilePicture} OnChange={(e)=>setprofilePicture(e.target.value)} placeholder='Profile Picture URL (optional)'/>
        <input type="email"  value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
        <button type="submit" onClick={loginToApp}>Sign In</button>
      </form>
      <p>Not a member?{" "}
      <span className='login__register' onClick={register}> Register Now</span>
      </p>
    </div>
  )
}

export default Login
