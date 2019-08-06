import React, {Component} from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Progress,
  Collapse, Navbar, NavbarToggler, NavbarBrand, Form, CardBody, CardHeader, CardFooter
} from 'reactstrap';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';
import CourseCard from "./CourseCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      activeTab: '1',
      isOpen: false,
    };
    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentWillMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const {token} = obj;
      //verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextBoxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextBoxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextBoxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextBoxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextBoxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextBoxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onSignUp() {
    //grab state
    const {
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
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }

      });

  }

  onSignIn() {
    //grab state
    const {
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
        if (json.success) {
          setInStorage('the_main_app', {token: json.token});
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }

      });

  }

  onLogOut() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const {token} = obj;
      //verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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
    const {
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
    } = this.state;
    if (isLoading) {
      return (
        <div>
          <div className="col-4 offset-4 mt-5">
            <h1>Loading...</h1>
          </div>
        </div>
      );
    }

    if (!token) {
      return (
        <div>

          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 mt-5 card">
            <div>
              <Nav tabs className="d-flex justify-content-center">
                <NavItem className="text-center">
                  <NavLink
                    className={this.state.activeTab === '1' ? "active" : ""}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Sign In
                  </NavLink>
                </NavItem>
                <NavItem className="text-center">
                  <NavLink
                    className={this.state.activeTab === '2' ? "active" : ""}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Sign Up
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <br/>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <form>
                  {
                    (signInError) ? (
                      <div className="text-center">
                        <p className="text-danger">{signInError}</p>
                      </div>
                    ) : (null)
                  }
                  <div className="form-group row">
                    <label htmlFor="email" className=" col-4 text-right col-form-label">Email address</label>
                    <div className="col-6">
                      <input
                        className="form-control" type="email" placeholder="Email" value={signInEmail}
                        onChange={this.onTextBoxChangeSignInEmail}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="form-group row">
                    <label htmlFor="password" className=" col-4 text-right col-form-label">Password</label>
                    <div className="col-6">
                      <input
                        className="form-control" type="password" placeholder="Password" value={signInPassword}
                        onChange={this.onTextBoxChangeSignInPassword}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="form-group row">
                    <div className="offset-4 col-4">
                      <button className="btn btn-outline-greenish" onClick={this.onSignIn}>Sign In</button>
                    </div>
                  </div>

                </form>
              </TabPane>
              <TabPane tabId="2">
                <form>
                  {
                    (signUpError) ? (
                      <div className="text-center">
                        <p className="text-danger">{signUpError}</p>
                      </div>
                    ) : (null)
                  }
                  <div className="form-group row">
                    <label htmlFor="firstname" className=" col-4 text-right col-form-label">First Name</label>
                    <div className="col-6">
                      <input
                        className="form-control" type="text" placeholder="First Name" value={signUpFirstName}
                        onChange={this.onTextBoxChangeSignUpFirstName}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="form-group row">
                    <label htmlFor="lastname" className=" col-4 text-right col-form-label">Last Name</label>
                    <div className="col-6">
                      <input
                        className="form-control" type="text" placeholder="Last Name" value={signUpLastName}
                        onChange={this.onTextBoxChangeSignUpLastName}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="form-group row">
                    <label htmlFor="email" className=" col-4 text-right col-form-label">Email Address</label>
                    <div className="col-6">
                      <input
                        className="form-control" type="email" placeholder="Email" value={signUpEmail}
                        onChange={this.onTextBoxChangeSignUpEmail}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="form-group row">
                    <label htmlFor="password" className=" col-4 text-right col-form-label">Password</label>
                    <div className="col-6">
                      <input
                        className="form-control" type="password" placeholder="Password" value={signUpPassword}
                        onChange={this.onTextBoxChangeSignUpPassword}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className=" form-group row">
                    <div className="offset-4 col-4">
                      <button className="btn btn-outline-greenish" onClick={this.onSignUp}>Sign Up</button>
                    </div>
                  </div>
                </form>
              </TabPane>
            </TabContent>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Navbar color="darkgreen" light expand="md" className="sticky-top text-white">
          <NavbarBrand className="text-white" href="/">Home</NavbarBrand>
          <Nav navbar className=" mx-auto">
            <Form inline>
              <input className="form-control bg-transparent border-bodycolor  mx-auto text-center text-white" placeholder="Search"
                     type="text"/>
            </Form>
          </Nav>
          <NavbarToggler onClick={this.toggleNavbar}/>
          <Collapse className="flex-grow-0" isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <a className="nav-link text-white" href="#">More Courses</a>
              </NavItem>
              <NavItem>
                <a className="nav-link text-white" href="#">Manage account</a>
              </NavItem>
              <NavItem>
                <a className="nav-link text-white btn text-left" onClick={this.onLogOut}>Log out</a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Row className="mx-3">
          <CourseCard duration="34:12" total="6" completed="6" title="Course Name"/>
          <CourseCard duration="40:00" total="6" completed="3" title="Course Name"/>
          <CourseCard duration="49:00" total="6" completed="0"  title="Course Name"/>
          <CourseCard duration="40:00" total="6" completed="6" title="Course Name"/>
        </Row>


      </div>
    );
  }
}


export default Home;
