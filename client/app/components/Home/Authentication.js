import React, {Component} from "react";
import {Card, Col, Nav, NavItem, NavLink as BNavLink, Row, TabContent, TabPane} from "reactstrap";
import * as PropTypes from "prop-types";
import {getFromStorage, setInStorage} from "../../utils/storage";
import axios from "axios";
export default class Authentication extends Component {
  constructor(props){
    super(props);
    this.state={
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      activeTab: '3',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };
    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const {token} = obj;
      //verify token
      axios.get('/api/account/verify?token=' + token)
        .then(response => {
          this.setState({
            activeTab: '1',
          },()=>{
            if (response.data.success) {
              this.props.onSuccessfulLogIn(token);
            }
          });
        });
    } else {
      this.setState({
        activeTab: '1'
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

  onSignIn(e) {
    e.preventDefault();
    //grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
    this.setState({
      activeTab: '3',
    });
    //post req to backend
    axios.post('/api/account/signin', {
      email: signInEmail,
      password: signInPassword,
    }).then(response => {
        if (response.data.success) {
          setInStorage('the_main_app', {token: response.data.token});
          this.setState({
            signInError: '',
            activeTab: '1',
            signInEmail: '',
            signInPassword: '',
          },()=>this.props.onSuccessfulLogIn(response.data.token));
        } else {
          this.setState({
            signInError: response.data.message,
            activeTab: '1',
          });
        }

      });

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
      activeTab: '3',
    });
    //post req to backend
    axios.post('/api/account/signup', {
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
    }).then(response => {
        if (response.data.success) {
          this.setState({
            signUpError: '',
            activeTab: '1',
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
          });
        } else {
          this.setState({
            signUpError: response.data.message,
            activeTab: '1',
          });
        }

      });

  }

  render() {
    const {
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;
    return(
      <Col lg={{size:4, offset:4}} md={{size:6,offset:3}} sm={{size:10, offset:1}}>
        <Card className="mt-5">
          <div>
            {(this.state.activeTab !== "3") && <Nav tabs className="d-flex justify-content-center">
              <NavItem className="text-center">
                <BNavLink
                  className={this.state.activeTab === "1" ? "active" : ""}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  Sign In
                </BNavLink>
              </NavItem>
              <NavItem className="text-center">
                <BNavLink
                  className={this.state.activeTab === "2" ? "active" : ""}
                  onClick={() => {
                    this.toggle('2');
                  }}
                >
                  Sign Up
                </BNavLink>
              </NavItem>
            </Nav>}
          </div>
          <br/>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <form>
                {
                  (this.signInError) ? (
                    <div className="text-center">
                      <p className="text-danger">{signInError}</p>
                    </div>
                  ) : (null)
                }
                <Row className="form-group">
                  <label htmlFor="email" className=" col-4 text-right col-form-label">Email address</label>
                  <div className="col-6">
                    <input
                      className="form-control" type="email" placeholder="Email" value={signInEmail}
                      onChange={this.onTextBoxChangeSignInEmail}
                    />
                  </div>
                </Row>
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
                <Row className="form-group">
                  <Col xs={{size:4, offset:4}}>
                    <button className="btn btn-outline-greenish" onClick={this.onSignIn}>Sign In</button>
                  </Col>
                </Row>
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
                <Row className="form-group">
                  <label htmlFor="firstname" className=" col-4 text-right col-form-label">First Name</label>
                  <Col xs="6">
                    <input
                      className="form-control" type="text" placeholder="First Name" value={signUpFirstName}
                      onChange={this.onTextBoxChangeSignUpFirstName}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="form-group">
                  <label htmlFor="lastname" className=" col-4 text-right col-form-label">Last Name</label>
                  <Col xs="6">
                    <input
                      className="form-control" type="text" placeholder="Last Name" value={signUpLastName}
                      onChange={this.onTextBoxChangeSignUpLastName}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="form-group">
                  <label htmlFor="email" className=" col-4 text-right col-form-label">Email Address</label>
                  <Col xs="6">
                    <input
                      className="form-control" type="email" placeholder="Email" value={signUpEmail}
                      onChange={this.onTextBoxChangeSignUpEmail}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="form-group">
                  <label htmlFor="password" className=" col-4 text-right col-form-label">Password</label>
                  <Col xs="6">
                    <input
                      className="form-control" type="password" placeholder="Password" value={signUpPassword}
                      onChange={this.onTextBoxChangeSignUpPassword}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className=" form-group">
                  <Col xs={{size:4, offset:4}}>
                    <button className="btn btn-outline-greenish" onClick={this.onSignUp}>Sign Up</button>
                  </Col>
                </Row>
              </form>
            </TabPane>
            <TabPane tabId="3">
              <div className="text-center">
                <h1>Loading...</h1>
              </div>
            </TabPane>
          </TabContent>
        </Card>
      </Col>
    );
  }
}

Authentication.propTypes = {
  onSuccessfulLogIn: PropTypes.func.isRequired,
};
