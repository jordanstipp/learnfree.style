import React, { Component } from "react"
import PropTypes from "prop-types"
import { Consumer } from "../../../../context"
import RhymeComp from "./RhymeComp"
import "./Rhyme.css"

class PracticeRhyme extends Component {
  state = {
    randNum: 0
  }

  buildUnderscore = randNum => {
    const { rhyme } = this.props
    var underscore = ""
    for (
      let i = 0;
      i < rhyme.sentence.length - rhyme.rhymeGroup[randNum].length;
      i++
    ) {
      underscore += "_"
    }
    return underscore
  }

  selectRandomVal = () => {
    const { rhyme } = this.props

    return Math.floor(
      Math.random() *
        (rhyme.rhymeGroup.length - 1 - (rhyme.rhymeGroup.length - 3)) +
        (rhyme.rhymeGroup.length - 3)
    )
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { rhyme } = this.props
          var randNum = this.selectRandomVal()
          return rhyme.sentence === "" ? (
            <div className="practice-container">
              {" "}
              <h1>{"[No sentence provided]"}</h1>
            </div>
          ) : (
            <div className="practice-container container">
              <h1>{rhyme.sentence}</h1>
              <div className="practice-container-child">
                <h1 id="underscore">{this.buildUnderscore(randNum)}</h1>
                <h1>{rhyme.rhymeGroup[randNum]}</h1>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default props => (
  <Consumer>{value => <PracticeRhyme {...props} context={value} />}</Consumer>
)
