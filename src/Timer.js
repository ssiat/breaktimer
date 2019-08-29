import React, { Component } from 'react'
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <h1>Done.</h1>;
    } else {
      // Render a countdown
      return <h1>{(minutes < 10 ? '0' + minutes : minutes)}:{(seconds < 10 ? '0' + seconds : seconds)}</h1>;
    }
};

export default class Timer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    render() {
        return (
            <Countdown
                date={this.props.endDate}
                renderer={renderer}
            />
        )
    }
}