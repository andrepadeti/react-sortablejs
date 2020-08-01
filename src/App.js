import React from 'react';
// import logo from './logo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer } from "mdbreact";
import Navbar from './navComponent';
import Title from './titleComponent';
import Sentence from './sentenceComponent';
import loadSentences from './sentences'
import './App.css';

function App() {
  // get sentences prepared
  var sentences = loadSentences(["The first sentence.","The second sentence.","Yet another sentence."]);

  // prepare component for each sentence
  let renderSentences = [];
  sentences.forEach((sentence) => {
    renderSentences.push(
      <Sentence 
        key={sentence.number.toString()} 
        number={sentence.number}
        sentenceInOrder={sentence.sentenceInOrder}
        sentenceShuffled={sentence.sentenceShuffled}
      />);
  });

  // console.log(renderSentences);
  return (
    <>
      <Navbar />
      <MDBContainer className='mainContainer'>
        <Title />
        {renderSentences}
      </MDBContainer>
    </>
   );
}

export default App;
