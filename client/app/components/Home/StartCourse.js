import React,{Component} from "react";

export default class StartCourse extends Component{
  render() {
    return (
      <div className="embed-responsive embed-responsive-21by9 mt-3 row">
        <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/sLe3xW0FN2M"
                allowFullScreen>
        </iframe>
      </div>
    );
  }
}
