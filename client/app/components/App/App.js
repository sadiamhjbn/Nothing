import React, {Component} from 'react';
import './App.scss';
import 'whatwg-fetch';
import * as PropTypes from "prop-types";
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
    this.onSuccessfulLogIn = this.onSuccessfulLogIn.bind(this);
    this.onSuccessfulLogOut = this.onSuccessfulLogOut.bind(this);
  }

  onSuccessfulLogIn(token){
    this.setState({
      token: token,
    });
  }
  onSuccessfulLogOut(){
    this.setState({
      token: null,
    });
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
          <NavBar onSuccessfulLogOut={this.onSuccessfulLogOut}/>
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
