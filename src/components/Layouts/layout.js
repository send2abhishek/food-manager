import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import "./layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };
  sideDrawerToogleHandler = () => {
    this.setState(prevstate => {
      return { showSideDrawer: !prevstate.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar DrawerToogleClicked={this.sideDrawerToogleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
