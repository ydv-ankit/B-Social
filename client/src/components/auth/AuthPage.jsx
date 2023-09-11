import './authpage.css'

export default function AuthPage() {
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
            <button><img src="assets/icons/google.png" alt="" /><span>Sign up with Google</span></button>
          </div>
        </div>
      </div>
    </div>
  )
}
