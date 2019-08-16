import React, {Component} from 'react';
import MoreCourseCard from "./MoreCourseCard";
import {getFromStorage} from "../../utils/storage";
import axios from "axios";

export default class MoreCourses extends Component{
  constructor(props) {
    super(props);

    this.state = {
      token: undefined,
      moreCourses: [],
    }
  }

  componentDidMount() {
    const cache = getFromStorage('the_main_app');
    if (!cache || !cache.token) {
      return;
    }
    const token = cache.token;
    this.setState({token});
    axios.get(`/api/courses/more?token=${token}`)
      .then(response => {
        this.setState({moreCourses: response.data.moreCourses});
      });
  }
  render() {
    return this.state.moreCourses.map(course => {
      return <MoreCourseCard key={course.title} duration={course.duration} total={course.total} category={course.category} title={course.title}/>;
    });
  }
}
