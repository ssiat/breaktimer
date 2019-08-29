import React, { Component } from 'react'
import Setting from './Setting.json'
import Timer from './Timer'

const timeTable = Setting.timeTable;

export default class Clock extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            time: new Date(),
            isTimerEnable: false,
            subject: null
        }
    }

    componentDidMount() {
        setInterval(this.update, 10)
    }

    update = () => {
        this.setState({
            time: new Date()
        })
        
        if ( !this.state.isTimerEnable ) {
            timeTable.forEach(subject => {
                if ( ((subject.startHour * 100 + subject.startMinute) <= (this.state.time.getHours() * 100 + this.state.time.getMinutes())) && ((this.state.time.getHours() * 100 + this.state.time.getMinutes()) < (subject.endHour * 100 + subject.endMinute)) ) {
                    this.setState({
                        isTimerEnable: true,
                        subject: subject
                    })
                }
            });
        } else {
            if ( ((this.state.subject.startHour * 100 + this.state.subject.startMinute) > (this.state.time.getHours() * 100 + this.state.time.getMinutes())) || ((this.state.time.getHours() * 100 + this.state.time.getMinutes()) >= (this.state.subject.endHour * 100 + this.state.subject.endMinute)) ) {
                this.setState({
                    isTimerEnable: false,
                })
            }
        }
    }

    render() {
        const h = this.state.time.getHours()
        const m = this.state.time.getMinutes()
        const s = this.state.time.getSeconds()
        const subject = this.state.subject

        if ( this.state.isTimerEnable ) {
            return (
                <div>
                    <h3>{subject.subject}</h3>
                    <Timer endDate={new Date().setHours(subject.endHour, subject.endMinute, 0)} />
                </div>
            )
        } else {
            return (
                <div>
                    {h}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)}
                </div>
            )
        }
    }
}
