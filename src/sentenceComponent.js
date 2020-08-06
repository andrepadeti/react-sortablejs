import React, { useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact"

export default function Sentence(props) {
  
  // prepare list to be used by SortableJS
  let id = 1
  let result = []
  props.sentenceShuffled.forEach((word) => {
    result.push({ id: id.toString(), name: word, class: 'sortable'})
    id++
  });

  const [ list, setList ] = useState(result)

  let complete = false
  let currentCorrectWord = 0

  const handleDragEnd = () => {
    
    while ( list[currentCorrectWord].name === props.sentenceInOrder[currentCorrectWord]) {
      let newList = list
      newList[currentCorrectWord].class = 'notSortable'
      currentCorrectWord++
      setList(newList);

      if ( currentCorrectWord === props.sentenceInOrder.length  ) {
        props.onCompletion(props.number);
        complete = true
        let sentenceCompleteAudio = new Audio("bell.wav");
        sentenceCompleteAudio.play();
        break;
      }
    }
  }

  return (
    <MDBRow>
      <MDBContainer className='sentenceContainer'>
        <MDBCol size='1' className="sentenceNumber">
          <p>{props.number}</p> 
        </MDBCol>
        <MDBCol size='10' className="sentence">
          <ReactSortable
            list={list}
            setList={setList}
            filter=".notSortable"
            // draggable=".sortable"
          >
            {list.map(item => (
              // OR className={item.class + ' eachWord'} below is the template literals (strings) implementation
              <MDBBox className={`${item.class} eachWord`} key={item.id} onDragEnd={handleDragEnd} >{item.name}</MDBBox>
            ))}
          </ReactSortable>
        </MDBCol>
        <MDBCol size='1' className="check">
            <img className="checkIcon" alt="" src={complete ? "tick.png" : ""}/>
        </MDBCol>
      </MDBContainer>
    </MDBRow>
  );
}