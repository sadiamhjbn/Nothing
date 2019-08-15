import React, {Component} from 'react';
import './App.scss';
import 'whatwg-fetch';
import * as PropTypes from "prop-types";
import {getFromStorage, setInStorage} from "../../utils/storage";
import {Row} from "reactstrap";
import Home from "../Home/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./NotFound";
import MoreCourses from "../Home/MoreCourses";
import NavBar from "../Home/NavBar";
import Authentication from "../Home/Authentication";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',

    };

    this.onLogOut = this.onLogOut.bind(this);
    this.onSuccessfulLogIn = this.onSuccessfulLogIn(this);
  }

  onSuccessfulLogIn(token){
    this.setState({
      token: token,
    });
  }

  onLogOut() {
    this.setState({
      activeTab: '3',
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
              activeTab: '1',
            });
          } else {
            this.setState({
              activeTab: '1',
            });
          }
        });
    } else {
      this.setState({
        activeTab: '1'
      });
    }
  }

  render() {
    const {
      token,
    } = this.state;

    if (!token) {
      return (
        <Authentication onSuccessfulLogIn={this.onSuccessfulLogIn}/>
      )
    }
    return (
      <Router>
        <div>
          <NavBar onLogOut={this.onLogOut}/>
          <Row className="mx-3">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/courses" component={MoreCourses}/>
              <Route component={NotFound}/>
            </Switch>
          </Row>
        </div>
      </Router>
    );
  }
}

App.propTypes = {children: PropTypes.any};

export default App;
