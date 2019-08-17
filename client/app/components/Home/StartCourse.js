import React,{Component} from "react";
import {Card, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';

export default class StartCourse extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Col xs="12">
        <Row>
          <Col lg={{size:6, offset:3}} md={{size:8, offset:2}} className="embed-responsive embed-responsive-16by9 mt-3">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/sLe3xW0FN2M"
                    allowFullScreen>
            </iframe>
          </Col>
        </Row>
        <Row>
          <Col lg={{size:8, offset:2}}>
            <Card className="m-3 bg-transparent">
            <CardHeader>
              <Nav tabs >
                <NavItem className="col-3 text-center">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Course Contents
                  </NavLink>
                </NavItem>
                <NavItem className="col-3 text-center">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Overview
                  </NavLink>
                </NavItem>
                <NavItem className="col-3 text-center">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Q/A
                  </NavLink>
                </NavItem >
                <NavItem className="col-3 text-center">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}
                  >
                    Assignments
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <TabContent className="mt-2" activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <ul>
                      <li>content1</li>
                      <li>content2</li>
                      <li>content3</li>
                    </ul>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <p className="lead">Egypt, a country linking northeast Africa with the Middle East, dates to the time of the pharaohs. Millennia-old monuments sit along the fertile Nile River Valley, including Giza's colossal Pyramids and Great Sphinx as well as Luxor's hieroglyph-lined Karnak Temple and Valley of the Kings tombs. The capital, Cairo, is home to Ottoman landmarks like Muhammad Ali Mosque and the Egyptian Museum, a trove of antiquities.</p>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <ul>
                      <li><strong>question1</strong></li>
                      =>answer1
                      <li><strong>question2</strong></li>
                      =>answer2
                    </ul>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <h4>Tab 4 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
          </Col>
        </Row>

      </Col>
    );
  }
}
