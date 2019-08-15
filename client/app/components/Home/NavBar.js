import React, {Component} from "react";
import {Collapse, Form, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import * as PropTypes from "prop-types";

export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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
            <a className="nav-link btn text-left" onClick={this.props.onLogOut}>Log out</a>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}

NavBar.propTypes = {
  onLogOut: PropTypes.func.isRequired
};
