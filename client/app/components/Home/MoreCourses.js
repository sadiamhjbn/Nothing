import React, {Component} from 'react';
import MoreCourseCard from "./MoreCourseCard";
import {
  Nav, NavItem, Row, Collapse, Navbar, NavbarToggler, NavbarBrand, Form
} from 'reactstrap';

export default class MoreCourses extends Component() {
  render() {
    return (
      <>
        <MoreCourseCard duration="34:12" total="6" category="JavaScript" title="Course Name"/>
        <MoreCourseCard
          duration="40:00"
          total="6"
          category="JavaScript"
          title="Course Name"/>
        <MoreCourseCard
          duration="49:00"
          total="6"
          category="JavaScript"
          title="Course Name"/>
        <MoreCourseCard
          duration="40:00"
          total="6"
          category="JavaScript"
          title="Course Name"/>
      </>
    )
  }
}
