import React from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";

function Navbar() {
    return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          {/* <a className="navbar-brand" href="#">
            <img src="round_icon.svg" height="30" alt="" />
          </a> */}
          <strong className="white-text">Round English</strong>
        </MDBNavbarBrand>
      </MDBNavbar>
    );
}

export default Navbar;