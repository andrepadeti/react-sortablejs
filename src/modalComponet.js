import React, { useState } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'

export default function Modal(props) {
  const [ modal, setModal ] = useState( (props.modal === 'true') ? true : false )
  
  // if (props.modal) setModal(true)

  const toggle = () => {
    setModal( !modal )
  }

    return (
      <MDBContainer>
        {/* BUTTON */}
        {/* <MDBBtn color="info" onClick={toggle}>Click</MDBBtn> */}
        {/* MODAL */}
        <MDBModal isOpen={modal} toggle={toggle}    >
          <MDBModalHeader toggle={toggle}>Well done!</MDBModalHeader>
          <MDBModalBody>
            You've put all sentences in order:
            <br /><br />
            {props.sentences}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
}