import React, { Component } from "react"
import Sound from "react-sound"

import { Consumer } from "../../../context"
import Rhyme from "./RhymeComp/Rhyme"
import PracticeRhyme from "./RhymeComp/PracticeRhyme"

import config from "../../../config"
import { loadSpreadsheet } from "../../../services/loadSpreadsheet"
import { shuffle } from "../../../services/shuffle"
import SelectForm from "../../General/SelectForm"
import LoadingAnim from "../../General/LoadingAnim"
import "./css/Freestyle.css"
import SettingsContainer from "../../Layout/SettingsMenu/SettingsContainer"
import ArrowBoard from "../../Layout/ArrowBoard"

import * as fs from "fs"

const INTERVAL_TIME = 7000

class Freestyle extends Component {
  constructor(props) {
    super(props)
    this.intervalId
  }
  ////////////////////////////////////////////////////////////////////////////////////
  state = {
    currentRhyme: "",
    okSetInt: false,
    index: 0,
    song: ""
  }
  ////////////////////////////////////////////////////////////////////////////////////
  componentDidUpdate() {
    if (this.state.okSetInt) {
      clearInterval(this.intervalId)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  ///////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey.bind(this))
    this.randomSong()
    clearInterval(this.intervalId)
  }
  //////////////////////////////////////////////////////////////////////////////////
  handleKey(e) {
    if (e.keyCode === 37) {
      clearInterval(this.intervalId)
      this.handleKeyDown("LEFT")
    } else if (e.keyCode === 39) {
      clearInterval(this.intervalId)
      this.handleKeyDown("RIGHT")
    }
    this.intervalId = -1
  }

  handleLeftArrow = () => {
    //clearInterval(this.intervalId);
    this.handleKeyDown("LEFT")
  }
  handleRightArrow = () => {
    //clearInterval(this.intervalId);
    this.handleKeyDown("RIGHT")
  }
  ////////////////////////////////////////////////////////////////////////////////////
  handleKeyDown = key => {
    console.log(this.props.context.rhymes[this.state.index])
    switch (key) {
      case "LEFT":
        if (this.state.index === 0) {
          this.setState((state, props) => ({
            index: this.props.context.rhymes.length - 1,
            okSetInt: true
          }))
        } else {
          this.setState((prevState, props) => ({
            index: this.state.index - 1,
            okSetInt: true
          }))
        }
        break
      case "RIGHT":
        if (this.state.index + 1 === this.props.context.rhymes.length) {
          this.setState((prevState, props) => ({
            index: 0,
            okSetInt: true
          }))
        } else {
          this.setState((prevState, props) => ({
            index: this.state.index + 1,
            okSetInt: true
          }))
        }
        break
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  tick() {
    if (this.intervalId === -1) return
    if (this.state.index !== this.props.context.rhymes.length - 1) {
      this.setState((prevState, props) => ({
        index: prevState.index + 1
      }))
    } else {
      this.setState((prevState, props) => ({
        index: 0
      }))
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  randomSong = () => {
    var min = 0
    var max = 4
    var randNum = Math.floor(Math.random() * (max - min)) + min
    console.log(randNum)
    switch (randNum) {
      case 0:
        this.setState((prevState, props) => ({
          song: "no_games_prod_by_chase_moore.mp3"
        }))
        break
      case 1:
        this.setState((prevState, props) => ({
          song: "vienna173_prod_by_chase_moore.mp3"
        }))
        break
      case 2:
        this.setState((prevState, props) => ({ song: "came_to_rock.mp3" }))
        break
      case 3:
        this.setState((prevState, props) => ({
          song: "bob_prod_by_chase_moore.mp3"
        }))
        break
      case 4:
        this.setState((prevState, props) => ({ song: "advancement.mp3" }))
        break
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////

  freestyleMode = (index, mode, randomSong) => {
    return !mode ? (
      <div className="container">
        <Sound
          url={this.state.song}
          playStatus={Sound.status.PLAYING}
          loop={true}
        />
        <SettingsContainer exitSession={this.props.exitSession} />
        <Rhyme rhyme={this.props.rhymes[index]} />
        <ArrowBoard
          clickLeft={this.handleLeftArrow}
          clickRight={this.handleRightArrow}
        />
      </div>
    ) : (
      <div className="container">
        <Sound
          url={this.state.song}
          playStatus={Sound.status.PLAYING}
          loop={true}
        />
        <SettingsContainer exitSession={this.props.exitSession} />
        <PracticeRhyme rhyme={this.props.rhymes[index]} />
        <ArrowBoard
          clickLeft={this.handleLeftArrow}
          clickRight={this.handleRightArrow}
        />
      </div>
    )
  }

  render() {
    const { currentRhyme, index } = this.state
    return (
      <Consumer>
        {value => {
          const { loading, mode } = value
          return !loading ? (
            <div>{this.freestyleMode(index, mode)}</div>
          ) : (
            <div className="container" />
          )
        }}
      </Consumer>
    )
  }
}

export default props => (
  <Consumer>{value => <Freestyle {...props} context={value} />}</Consumer>
)

//export default Freestyle;
