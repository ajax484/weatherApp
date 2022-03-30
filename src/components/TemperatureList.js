import React, { Component } from 'react';

const PATH_ICON_URL = 'http://openweathermap.org/img/wn/';
const PATH_APPEND = '@2x.png';

export default class TemperatureList extends Component {

    render() {
        const { temperatureList } = this.props;

        return (
            <div className='temperature-list'>
                {temperatureList.map((day) => {
                    return (
                        <div className='day-item' key={day.day}>
                            <h4 className='day'>{day.day}</h4>
                            <img src={`${PATH_ICON_URL}${day.weatherIcon}${PATH_APPEND}`} alt={`${day.weatherDescription}`} />
                            <h2 className='temp'>{day.temperature}&deg;</h2>
                        </div>
                    );
                })}
            </div>
        );
    }
}