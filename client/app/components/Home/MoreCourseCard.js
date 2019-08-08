import React, {Component} from 'react';
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col,Button} from "reactstrap";

export default class MoreCourseCard extends Component {
  render() {
    return (
      <Col lg="3" md="4" sm="6" >
        <Card color="greenish" className="text-white mt-3">
          <CardHeader><h3><CardTitle>{this.props.title}</CardTitle></h3></CardHeader>
          <CardBody className="font-weight-light">
            <CardText>Category: <span className="text-monospace">{this.props.category}</span></CardText>
            <CardText>Duration: <span className="text-monospace">{this.props.duration}</span></CardText>
            <CardText>Total Assignment: <span className="text-monospace">{this.props.total}</span></CardText>
          </CardBody>
          <CardFooter>
            <Button outline color="info">Enroll</Button>
          </CardFooter>
        </Card>
      </Col>
    )

  }
}
