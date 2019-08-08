import React, {Component} from 'react';
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Progress, Row} from "reactstrap";

export default class CourseCard extends Component {
  render() {
    const progress = this.props.completed / this.props.total * 100;
    let color, progressColor;
    if (progress === 100) {
      color = "complete";
      progressColor = "dark";
    } else if (progress === 0) {
      color = "enrolled";
      progressColor = "transparent";
    } else {
      color = "continuous";
      progressColor = "info";
    }
    return (
      <Col lg="3" md="4" sm="6" >
        <Card color={color} className="text-white mt-3">
          <CardHeader><h3><CardTitle>{this.props.title}</CardTitle></h3></CardHeader>
          <CardBody className="font-weight-light">
            <CardText>Duration: <span className="text-monospace">{this.props.duration}</span></CardText>
            <CardText>Total Assignment: <span className="text-monospace">{this.props.total}</span></CardText>
            <CardText>Completed Assignment: <span className="text-monospace">{this.props.completed}</span></CardText>
          </CardBody>
          <CardFooter>
            <Progress barClassName={progress ? "text-white" : "text-dark"} value={progress} color={progressColor}
                      style={{height: '1.5rem'}}>{progress}%</Progress>
          </CardFooter>
        </Card>
      </Col>
    )

  }
}
