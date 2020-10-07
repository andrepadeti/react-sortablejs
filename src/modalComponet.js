import React, { useState } from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'

export default function Modal(props) {
  const [ modal, setModal ] = useState( (props.modal === 'true') ? true : false )
  // if (props.modal) setModal(true)

  const toggle = () => {
    setModal( !modal )
  }

    return (
      // should I use <MDBContainer> to wrap it all?
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
    )
}