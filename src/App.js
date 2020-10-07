import React, { useState } from 'react'
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
  let sentences = loadSentences(["The first test sentence.", "The second test sentence.", "Yet another test sentence."])

  // whether we should show the modal
  const [showModal, setShowModal] = useState(true)

  // checks whether all sentences have been sorted
  const handleCompletion = (whichSentence) => {
    // changes status of the current correct sentence
    sentences[whichSentence - 1].complete = true

    // do the complete checking
    let allComplete = []
    sentences.forEach(each => {
      allComplete = each.complete
    })

    // if all sentences have been sorted, show modal
    setShowModal(allComplete)
  }

  // prepare component for each sentence
  let renderSentences = []
  let modalSentences = []
  sentences.forEach(each => {
    renderSentences.push(
      <Sentence
        key={each.number.toString()}
        number={each.number}
        currentCorrectWord={each.currentCorrectWord}
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