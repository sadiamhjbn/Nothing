import React,{Component} from "react";
import {Card, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

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
          <Col xs="2" className="bg-sidebar border-right border-greenish mt-5">
            <h5>Course Content</h5>
            <ul className="nav flex-column">
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
              <li className="nav-item font-italic">
                <FontAwesomeIcon icon={faCheckCircle} />
                <Link color="darkgreen" to="#" > Introduction</Link>
              </li>
            </ul>
          </Col>
          <Col xs="10">
            <div className="text-center"><h2>Course Name Course Name Course Name Course Name Course Name Course Name</h2></div>
            <Col lg={{size:8, offset:2}} className="embed-responsive embed-responsive-16by9 mt-3">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/sLe3xW0FN2M"
                      allowFullScreen>
              </iframe>
            </Col>
            <Row>
              <Col>
                <Card className="m-3 bg-transparent noborder">
                  <CardHeader>
                    <Nav tabs >
                      <NavItem className="col-4 text-center">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          <h3><strong>Overview</strong></h3>
                        </NavLink>
                      </NavItem>
                      <NavItem className="col-4 text-center">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                         <h3><strong>FAQ</strong></h3>
                        </NavLink>
                      </NavItem >
                      <NavItem className="col-4 text-center">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }}
                        >
                          <h3><strong>Assignment</strong></h3>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <TabContent className="mt-2" activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <p >
                            Egypt, a country linking northeast Africa with the Middle East, dates to the time of the pharaohs.
                            Millennia-old monuments sit along the fertile Nile River Valley, including Giza's colossal Pyramids and Great Sphinx as well as
                            Luxor's hieroglyph-lined Karnak Temple and Valley of the Kings tombs. The capital, Cairo, is home to Ottoman landmarks like
                            Muhammad Ali Mosque and the Egyptian Museum, a trove of antiquities.
                            Egypt, a country linking northeast Africa with the Middle East, dates to the time of the pharaohs.
                            Millennia-old monuments sit along the fertile Nile River Valley, including Giza's colossal Pyramids and Great Sphinx as well as
                            Luxor's hieroglyph-lined Karnak Temple and Valley of the Kings tombs. The capital, Cairo, is home to Ottoman landmarks like
                            Muhammad Ali Mosque and the Egyptian Museum, a trove of antiquities.
                            Egypt, a country linking northeast Africa with the Middle East, dates to the time of the pharaohs.
                            Millennia-old monuments sit along the fertile Nile River Valley, including Giza's colossal Pyramids and Great Sphinx as well as
                            Luxor's hieroglyph-lined Karnak Temple and Valley of the Kings tombs. The capital, Cairo, is home to Ottoman landmarks like
                            Muhammad Ali Mosque and the Egyptian Museum, a trove of antiquities.
                            Egypt, a country linking northeast Africa with the Middle East, dates to the time of the pharaohs.
                            Millennia-old monuments sit along the fertile Nile River Valley, including Giza's colossal Pyramids and Great Sphinx as well as
                            Luxor's hieroglyph-lined Karnak Temple and Valley of the Kings tombs. The capital, Cairo, is home to Ottoman landmarks like
                            Muhammad Ali Mosque and the Egyptian Museum, a trove of antiquities.
                          </p>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <ul>
                            <li><strong>What is JavaScript?</strong></li>
                            =>JavaScript is a client-side as well as server side scripting language that can be inserted into HTML pages and is understood by web browsers. JavaScript is also an Object based Programming language
                            <li><strong>Enumerate the differences between Java and JavaScript?</strong></li>
                            =>Java is a complete programming language. In contrast, JavaScript is a coded program that can be introduced to HTML pages. These two languages are not at all inter-dependent and are designed for the different intent. Java is an object - oriented programming (OOPS) or structured programming language like C++ or C whereas JavaScript is a client-side scripting language.
                            <li><strong>What are JavaScript Data Types?</strong></li>
                            =>Following are the JavaScript Data types:
                            Number
                            String
                            Boolean
                            Object
                            Undefined
                            <li><strong>What is the use of isNaN function?</strong></li>
                            =>isNan function returns true if the argument is not a number otherwise it is false.
                            <li><strong>Between JavaScript and an ASP script, which is faster?</strong></li>
                            =>JavaScript is faster. JavaScript is a client-side language and thus it does not need the assistance of the web server to execute. On the other hand, ASP is a server-side language and hence is always slower than JavaScript. Javascript now is also a server side language (nodejs).
                            <li><strong>What is negative infinity?</strong></li>
                            =>Negative Infinity is a number in JavaScript which can be derived by dividing negative number by zero.

                          </ul>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
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

        </Row>
      </Col>
    );
  }
}
