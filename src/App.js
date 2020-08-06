import React, { useState } from 'react'
// import logo from './logo.svg'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"
import { MDBContainer } from "mdbreact"
import Navbar from './navComponent'
import Title from './titleComponent'
import Sentence from './sentenceComponent'
import loadSentences from './sentences'
import Modal from './modalComponet'
import './App.css'

export default function App(props) {
  // get sentences prepared
  let sentences = loadSentences(["A slightly longer sentence.","The second sentence.","Yet another sentence."])
  
  // whether we should show the modal
  const [ showModal, setShowModal ] = useState( false )

  // checks whether all sentences have been sorted
  const handleCompletion = (whichSentence) => {
    // changes status of the current correct sentence
    sentences[whichSentence - 1].complete = true
    
    // do the complete checking
    let allComplete = []
    sentences.forEach(x => {
      allComplete = x.complete
    })

    // if all sentences have been complete, show modal
    setShowModal(allComplete)
  }

  // const showModal = () => {
  //   return false
  // }

  // prepare component for each sentence
  let renderSentences = []
  let modalSentences = []
  sentences.forEach( each => {
    renderSentences.push(
      <Sentence 
        key={each.number.toString()} 
        number={each.number}
        sentenceInOrder={each.sentenceInOrder}
        sentenceShuffled={each.sentenceShuffled}
        onCompletion={handleCompletion} 
      />
    )
    modalSentences.push(
      <p key={each.number.toString()} >{each.number}. {each.text}</p>
    )
  })
  

  return (
    <>
      <Modal sentences={modalSentences} modal={showModal} />
      <Navbar />
      <MDBContainer className='mainContainer'>
        <Title />
        {renderSentences}
      </MDBContainer>
    </>
  )
}