import React from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";

const Navbar = () => (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Game</strong>
        </MDBNavbarBrand>
      </MDBNavbar>
    );

export default Navbar;