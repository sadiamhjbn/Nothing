import React, {Component} from 'react';
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Progress, Row} from "reactstrap";
export default class CourseCard extends Component{
  render(){
    const progress = this.props.completed/this.props.total*100;
    let color, progresscolor;
    if(progress===100) {color="complete";
    progresscolor ="dark";
    }
    else if(progress===0){
      color="enrolled";
      progresscolor ="warning";
    }
    else{
      color="continuous";
      progresscolor ="info";
    }
    return(
      <Col lg="3" sm="6">
        <Card color={color} className="text-white mt-3">
          <CardHeader><h3><CardTitle>{this.props.title}</CardTitle></h3></CardHeader>
          <CardBody className="lead">
            <CardText>Duration: <span className="text-monospace">{this.props.duration}</span></CardText>
            <CardText>Total Assignment: <span className="text-monospace">{this.props.total}</span></CardText>
            <CardText>Completed Assignment: <span className="text-monospace">{this.props.completed}</span></CardText>
          </CardBody>
          <CardFooter>
            <Progress className="text-darkgreen" value={progress} color={progresscolor} style={{height:'1.5rem'}}>{progress}%</Progress>
          </CardFooter>
        </Card>
      </Col>
    )

  }
}
