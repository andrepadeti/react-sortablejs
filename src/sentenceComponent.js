import React, { useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { cloneDeep } from 'lodash'
import { MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact"

const Sentence = ({ number, currentCorrectWord, sentenceInOrder, sentenceShuffled, onCompletion }) => {
  const [complete, setComplete] = useState(false) // for the tick when sentence is complete

  // prepare list to be used by SortableJS
  let result = []
  sentenceShuffled.forEach((word, index) => {
    result.push({ id: `${number}${index++}`, name: word, class: 'sortable' })
  })

  const [list, setList] = useState(result) // for the ReactSortable component

  const handleDragEnd = () => {
    let newList = cloneDeep(list)
    while (list[currentCorrectWord].name === sentenceInOrder[currentCorrectWord]) {
      newList[currentCorrectWord].class = 'notSortable'
      currentCorrectWord++
      // setList(list => newList)
      setList(newList)

      if (currentCorrectWord === sentenceInOrder.length) {
        onCompletion(number) // let parent component know one of its children is complete
        setComplete(true) // show tick
        let sentenceCompleteAudio = new Audio("bell.wav")
        sentenceCompleteAudio.play()
        break
      }
    }
  }

  return (
    <MDBRow>
      <MDBContainer className='sentenceContainer'>
        <MDBCol size='1' className="sentenceNumber">
          <p>{number}</p>
        </MDBCol>
        <MDBCol size='10' className="sentence">
          <ReactSortable
            filter=".notSortable"
            list={list}
            setList={setList}
            animation={150}
          >
            {list.map(item => (
              <MDBBox className={`${item.class} eachWord`} key={item.id} onDragEnd={handleDragEnd} >{item.name}</MDBBox>
            ))}
          </ReactSortable>
        </MDBCol>
        <MDBCol size='1' className="check">
          <img className="checkIcon" alt="" src={complete ? "tick.png" : ""} />
        </MDBCol>
      </MDBContainer>
    </MDBRow>
  )
}

export default Sentence