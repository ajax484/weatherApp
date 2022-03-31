import React, { Component } from 'react';
import { dateToString, getDateTimeFromTimezone } from './Functions';

export default class DateTime extends Component {

    constructor(props) {
        super(props);
        const { timezone } = props;

        this.state = {
            date: getDateTimeFromTimezone(timezone),
            time: getDateTimeFromTimezone(timezone),
            timezone
        }

        this.timeTick = this.timeTick.bind(this);
    }


    timeTick() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    tick() {
        const { timezone } = this.state;

        this.setState({
            date: getDateTimeFromTimezone(timezone),
            time: getDateTimeFromTimezone(timezone)
        });
    }

    render() {
        const { date, time } = this.state;
        return (
            <div className="date-time">
                <h1 className="time">
                    {/* display time in hour and minute */}
                    {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                </h1><br />
                <h3 className="date">
                    {dateToString(date)}
                </h3>
            </div>
        );
    }

    componentDidMount() { this.timeTick() }

    componentWillUnmount() { clearInterval(this.timerID) }

    componentDidUpdate(prevProps) {
        if (this.props.timezone !== prevProps.timezone) {
            this.setState({
                timezone: this.props.timezone
            });
        }
    }

}


// export default class DateTime extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             date: new Date(),
//             time: new Date()
//         }

//         this.timeTick = this.timeTick.bind(this);
//     }


//     timeTick() {
//         this.timerID = setInterval(() => this.tick(), 1000);
//     }

//     componentDidMount() {
//         this.timeTick();
//     }

//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     tick() {
//         this.setState({
//             date: new Date(),
//             time: new Date()
//         });
//     }

//     render() {
//         const { date, time } = this.state;
//         return (
//             <div className="date-time">
//                 <h1 className="time">
//                     {/* display time in hour and minute */}
//                     {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
//                 </h1><br />
//                 <h3 className="date">
//                     {dateToString(date)}
//                 </h3>
//             </div>
//         );
//     }

// }