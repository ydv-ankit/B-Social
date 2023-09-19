import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserDb } from '../../utils/userAPI';
import { auth, googleAuth } from "../../fireAuth/auth";
import { signInWithPopup } from "firebase/auth";
import { setCookies } from "../../utils/cookies";

import './authpage.css';

export default function AuthPage() {

  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(false);
  const [error, setError] = useState();

  async function handleSignIn() {
    signInWithPopup(auth, googleAuth).then((data) => {
      createUserDb(data);
      setCookies("userId", data.user.uid);
      setLoginStatus(true);
    }).catch((err) => {
      setError("Login Failed");
    })
  }

  useEffect(() => {
    if (loginStatus) {
      navigate('/');
    }
  }, [navigate, loginStatus])

  return (
    <div className="auth">
      <div className="authWrapper">
        <div className="authLeft">
          <img src="assets/icons/twitter-x.png" alt="" />
        </div>
        <div className="authRight">
          <h1>Happening Now</h1>
          <h3>Join today.</h3>
          <div className="authOptions">
            <button onClick={handleSignIn}><img src="assets/icons/google.png" alt="" /><span>Sign In with Google</span></button>
          </div>
          <div className="authError">
            {
              error ? `${error}` : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}
