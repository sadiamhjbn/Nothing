import React, {Component} from 'react';
import 'whatwg-fetch';
import CourseCard from "./CourseCard";
import axios from 'axios';
import {getFromStorage} from "../../utils/storage";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: undefined,
      registeredCourses: [],
    }
  }

  componentDidMount() {
    const cache = getFromStorage('the_main_app');
    if (!cache || !cache.token) {
      return;
    }
    const token = cache.token;
    this.setState({token});
    axios.get(`/api/courses/registered?token=${token}`)
      .then(response => {
        this.setState({registeredCourses: response.data.registeredCourses});
      });
  }

  render(){
   return this.state.registeredCourses.map(course => {
    return <CourseCard key={course.title} duration={course.duration} total={course.total} completed={course.completed} title={course.title}/>;
   });
  }
}


export default Home;
