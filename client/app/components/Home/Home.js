import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading : true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:'',
      isLoginOpen: true,
      isRegisterOpen: false,
    };
    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpEmail=this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName=this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName=this.onTextBoxChangeSignUpLastName.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn= this.onSignIn.bind(this);
    this.onLogOut= this.onLogOut.bind(this);
  }

  componentWillMount() {
    const obj = getFromStorage('the_main_app');
      if (obj && obj.token){
        const {token} = obj;
        //verify token
        fetch('/api/account/verify?token='+token)
          .then(res => res.json())
          .then(json => {
            if(json.success){
              this.setState({
                token,
                isLoading: false,
              });
            }else{
              this.setState({
                isLoading: false,
              });
            }
          });
      }
      else{
        this.setState({
          isLoading: false
        });
      }
  }
onTextBoxChangeSignInEmail(event){
    this.setState({
      signInEmail: event.target.value,
    });
}
  onTextBoxChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value,
    });
  }
  onTextBoxChangeSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextBoxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextBoxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextBoxChangeSignUpLastName(event){
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onSignUp(){
    //grab state
    const{
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    //post req to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail :'',
            signUpPassword:'',
            signUpFirstName:'',
            signUpLastName:'',
          });
        }
        else{
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }

      });

  }

  onSignIn(){
    //grab state
    const{
      signInEmail,
      signInPassword,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    //post req to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success){
          setInStorage('the_main_app',{token:json.token});
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail :'',
            signInPassword:'',
            token: json.token,
          });
        }
        else{
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }

      });

  }
  onLogOut(){
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token){
      const {token} = obj;
      //verify token
      fetch('/api/account/logout?token='+token)
        .then(res => res.json())
        .then(json => {
          if(json.success){
            this.setState({
              token:'',
              isLoading: false,
            });
          }else{
            this.setState({
              isLoading: false,
            });
          }
        });
    }
    else{
      this.setState({
        isLoading: false
      });
    }
  }

  // fetch('/api/counters')
  //   .then(res => res.json())
  //   .then(json => {
  //     this.setState({
  //       counters: json
  //     });
  //   });
  // fetch('/api/counters', { method: 'POST' })
  //   .then(res => res.json())
  //   .then(json => {
  //     let data = this.state.counters;
  //     data.push(json);
  //
  //     this.setState({
  //       counters: data
  //     });
  //   });

  newCounter() {

  }

  render() {
    const{
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    }=this.state;
    if(isLoading){
      return (<div><p>Loading...</p></div>);
    }

    if(!token){
      return (
        <div >
          <form >
            {
              (signInError)?(
                <p>{signInError}</p>
              ): (null)
            }
            <p className="text-center">Sign In</p>
            <div className="form-inline">
              <label htmlFor="email" className="mr-sm-2 col-2 offset-3 text-right">Email address</label>
              <input
                className="form-control col-4"
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onTextBoxChangeSignInEmail}
              />
            </div>
            <br/>
            <div className="form-inline">
              <label htmlFor="password" className="mr-sm-2 col-2 offset-3 text-right">Password</label>
              <input
                className="form-control col-4"
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextBoxChangeSignInPassword}
              />
            </div>
            <br/>
            <button className="btn btn-outline-success offset-5" onClick={this.onSignIn}>Sign In</button>
          </form>
          <br/>
          <br/>
          <form>
            {
              (signUpError)?(
                <p>{signUpError}</p>
              ): (null)
            }
            <p className="text-center">Sign Up</p>
            <div className="form-inline">
              <label htmlFor="firstname" className="mr-sm-2 col-2 offset-3">First Name</label>
              <input
                className="form-control col-4"
                type="text"
                placeholder="First Name"
                value={signUpFirstName}
                onChange={this.onTextBoxChangeSignUpFirstName}
              />
            </div>
            <br/>
            <div className="form-inline">
              <label htmlFor="lastname" className="mr-sm-2 col-2 offset-3">Last Name</label>
              <input
                className="form-control col-4"
                type="text"
                placeholder="Last Name"
                value={signUpLastName}
                onChange={this.onTextBoxChangeSignUpLastName}
              />
            </div>
            <br/>
            <div className="form-inline">
              <label htmlFor="email" className="mr-sm-2 col-2 offset-3">Email Address</label>
              <input
                className="form-control col-4"
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={this.onTextBoxChangeSignUpEmail}
              />
            </div>
            <br/>
            <div className="form-inline">
              <label htmlFor="password" className="mr-sm-2 col-2 offset-3">Password</label>
              <input
                className="form-control col-4"
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={this.onTextBoxChangeSignUpPassword}
              />
            </div>
            <br/>
            <button className="btn btn-outline-success offset-5" onClick={this.onSignUp} >Sign Up</button>
          </form>
        </div>
      )
    }
    return (
        <div>
            <p>Account</p>
          <button className="btn btn-outline-success offset-5 " onClick={this.onLogOut}>Log Out</button>
        </div>
    );
  }
}


export default Home;
