import React from "react";
import Aux from "../../hoc/Auxilliary";
import "./layout.css";
const layout = props => (
  <Aux>
    <div>Toolbar, sideDrawer, Backdrop</div>
    <main className="content">{props.children}</main>
  </Aux>
);

export default layout;
