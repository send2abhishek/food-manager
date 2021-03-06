import React, { Component } from "react";
import "./Modal.css";
import Aux from "../../../hoc/Auxilliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log("Modal component did updated called");
  }

  shouldComponentUpdate(nextprops, nextState) {
    return (
      nextprops.show !== this.props.show ||
      nextprops.children !== this.props.children
    );
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
