import React, { Component } from "react"
import { ReactSortable } from "react-sortablejs"
import { cloneDeep } from 'lodash'
import { MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact"

class Sentence extends Component {
  constructor(props) {
    super (props)
  
    // prepare this.state.list to be used by SortableJS
    let list = this.props.sentenceShuffled.map((word, index) => {
      return { id: (++index).toString(), name: word, class: 'sortable' }
    })

    this.state = {
      currentCorrectWord: 0, // stores how many words are correct already while student is sorting
      complete: false, // becomes true when sentence is sorted
      list: list // this object is used by SortableJS and is calculated in componentWillMount
    }
  
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  handleDragEnd() {
    let currentCorrectWord = this.state.currentCorrectWord
    
    while ( this.state.list[currentCorrectWord].name === this.props.sentenceInOrder[currentCorrectWord]) {
      // using lodash cloneDeep to make a deep copy of an array of objects
      let newList = cloneDeep(this.state.list)
      newList[currentCorrectWord].class = 'notSortable'
      currentCorrectWord++
      this.setState({ currentCorrectWord: currentCorrectWord })
      this.setState({ list: newList })

      if ( currentCorrectWord === this.props.sentenceInOrder.length  ) {
        this.props.onCompletion(this.props.number)
        this.setState((state, props) => (
          { complete: true } ))
        let sentenceCompleteAudio = new Audio("bell.wav")
        sentenceCompleteAudio.play()
        break
      }
    }
  }

  render() {
    return (
      <MDBRow>
        <MDBContainer className='sentenceContainer'>
          <MDBCol size='1' className="sentenceNumber">
            <p>{this.props.number}</p> 
          </MDBCol>
          <MDBCol size='10' className="sentence">
            <ReactSortable
              list={this.state.list}
              setList={newState => this.setState({ list: newState })}
              filter=".notSortable"
              // draggable=".sortable"
            >
              {this.state.list.map(item => (
                <MDBBox 
                  className={item.class + ' eachWord'} 
                  key={item.id} 
                  onDragEnd={this.handleDragEnd} 
                  >{item.name}
                </MDBBox>
              ))}
            </ReactSortable>
          </MDBCol>
          <MDBCol size='1' className="check">
              <img className="checkIcon" alt="" src={this.state.complete ? "tick.png" : ""}/>
          </MDBCol>
        </MDBContainer>
      </MDBRow>
    )
  }
}

export default Sentence