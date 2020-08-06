import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs";
import { MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact";

export default class Sentence extends Component {
  constructor(props) {
    super (props);
  
    // prepare this.state.list to be used by SortableJS
    let id = 1;
    let result = [];
    this.props.sentenceShuffled.forEach((word) => {
      result.push({ id: id.toString(), name: word, class: 'sortable'});
      id++;
    });

    this.state = {
      sentenceInOrder: this.props.sentenceInOrder, // array that stores the split sentence
      sentenceShuffled: this.props.sentenceShuffled, // array that stores the shuffled sentence
      currentCorrectWord: 0, // stores how many words are correct already while student is sorting
      currentlyLeft: [], // array that stores the words still left to be sorted
      complete: false, // becames true when sentence is sorted
      list: result // this object is used by SortableJS and is calculated in componentWillMount
    };
  
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragEnd() {
    let currentCorrectWord = this.state.currentCorrectWord;
    
    while ( this.state.list[currentCorrectWord].name === this.state.sentenceInOrder[currentCorrectWord]) {
      let newList = this.state.list;
      newList[currentCorrectWord].class = 'notSortable';
      currentCorrectWord++;
      this.setState({ currentCorrectWord: currentCorrectWord });
      this.setState({ list: newList });

      if ( currentCorrectWord === this.state.sentenceInOrder.length  ) {
        this.props.onCompletion(this.props.number);
        this.setState((state, props) => (
          { complete: true } ));
          let sentenceCompleteAudio = new Audio("bell.wav");
          sentenceCompleteAudio.play();
        break;
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
                <MDBBox className={item.class + ' eachWord'} key={item.id} onDragEnd={this.handleDragEnd} >{item.name}</MDBBox>
              ))}
            </ReactSortable>
          </MDBCol>
          <MDBCol size='1' className="check">
              <img className="checkIcon" alt="" src={this.state.complete ? "tick.png" : ""}/>
          </MDBCol>
        </MDBContainer>
      </MDBRow>
    );
  }
}