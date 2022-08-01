import { useState, useRef} from 'react';
// import { Link, useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../../store/index'

const AuthForm = () => {
//   const history = useHistory()
  const emialInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()

//   const dispatch = useDispatch();
//   let loginDetails = useSelector(state => state.auth)
//   console.log(loginDetails.userId)

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) =>{
    e.preventDefault()

    const enteredEmail = emialInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value
    if(enteredPassword !== confirmPassword){
        return console.log('Enter valid password')
    }
    setIsLoading(true)

    
    let url;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSEUjS4Yo_JE1fkMSYtgVhYIqJAAjeER0'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSEUjS4Yo_JE1fkMSYtgVhYIqJAAjeER0'
    }
    fetch(url, {
      method:'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'content-Type': 'application/json'
      } 
    }).then(res => {
      setIsLoading(false)
      if(res.ok){
        return res.json()
      }else{
        return res.json().then(data => {
          let errorMessage = 'Authentication Failed';
          // if(data && data.error && data.error.message){
          //   errorMessage = data.error.message
          // }
          throw new Error(errorMessage);
          
        })
      }
    }).then((data) => {
        alert('Authentication Successful')
        console.log('User has successfully signed up')
        // dispatch(authActions.login({token: data.idToken, userId: enteredEmail.replace('@','').replace('.','')}))
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('email', enteredEmail.replace('@','').replace('.',''))
    //   history.replace('/Welcome')
  })
    .catch((err) =>{
      alert(err.errorMessage)
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emialInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>

        {!isLogin && (<div className={classes.control}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' id='confirmPassword' required ref={confirmPasswordInputRef}/>
        </div>)}

        {/* <Link to="/Login/forgotPassword">Forgot Password?</Link> */}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p> Sending Request...!</p>}
          
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
