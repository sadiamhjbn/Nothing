import React, {Component} from "react";
import {Collapse, Form, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import * as PropTypes from "prop-types";
import {getFromStorage} from "../../utils/storage";
import axios from "axios";

export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.onLogOut= this.onLogOut.bind(this);
  }
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
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
      axios.get('/api/account/logout?token=' + token)
        .then(response => {
          if (response.data.success) {
            this.setState({
              token: '',
              activeTab: '1',
            });
            this.props.onSuccessfulLogOut(response.data.token);
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
    return <Navbar color="darkgreen" dark expand="md" className="sticky-top text-white">
      <NavbarBrand tag={NavLink} to="/">Home</NavbarBrand>
      <Nav navbar className=" mx-auto">
        <Form inline>
          <input className="form-control bg-transparent border-bodycolor  mx-auto text-center text-white"
                 placeholder="Search"
                 type="text"/>
        </Form>
      </Nav>
      <NavbarToggler onClick={this.props.onNavbarToggle}/>
      <Collapse className="flex-grow-0" isOpen={this.props.isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink className="nav-link" to="/courses">More Courses</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="#">Manage account</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" onClick={this.onLogOut} to="#">Log out</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}

NavBar.propTypes = {
  onSuccessfulLogOut: PropTypes.func.isRequired
};
