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
      result.push({ id: id.toString(), name: word});
      id++;
    });

    this.state = {
      sentenceInOrder: this.props.sentenceInOrder, // array that stores the split sentence
      currentCorrectWord: 0, // stores how many words are correct already while student is sorting
      currentlyLeft: [], // array that stores the words still left to be sorted
      complete: false, // becames true when sentence is sorted
      sentenceShuffled: this.props.sentenceShuffled, // array that stores the shuffled sentence
      list: result // this object is used by SortableJS and is calculated in componentWillMount
    };
  
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragEnd() {

  }

  render() {
    return (
      <MDBRow>
        <MDBContainer className='sentenceContainer'>
          <MDBCol size='1' className="sentenceNumber">
            <p>1</p> 
          </MDBCol>
          <MDBCol size='10' className="sentence">
            <ReactSortable
              list={this.state.list}
              setList={newState => this.setState({ list: newState })}
            >
              {this.state.list.map(item => (
                <MDBBox className='eachWord sortable' key={item.id} onDragEnd={this.handleDragEnd} >{item.name}</MDBBox>
              ))}
            </ReactSortable>
          </MDBCol>
          <MDBCol size='1' className="check">
            <img className="checkIcon" alt="" id="icon{{@index}}" />
          </MDBCol>
        </MDBContainer>
      </MDBRow>
    );
  }
}