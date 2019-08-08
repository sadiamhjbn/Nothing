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
 render(){
   return(
     <>
       <CourseCard duration="34:12" total="6" completed="6" title="Course Name"/>
       <CourseCard duration="40:00" total="6" completed="3" title="Course Name"/>
       <CourseCard duration="49:00" total="6" completed="0"  title="Course Name"/>
       <CourseCard duration="40:00" total="6" completed="6" title="Course Name"/>
     </>
   )
 }
}


export default Home;
