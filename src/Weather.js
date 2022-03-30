import React, { Component } from 'react';
import axios from 'axios';
import TemperatureList from './components/TemperatureList';
import DateTime from './components/DateTime';
import Area from './components/Area';
import Form from './components/Form';

import './assets/weather.css';
import { unixToDay } from './components/Functions';

//weather api call using axios
const DEFAULT_CITY = 'lagos';

const PATH_BASE = 'http://api.openweathermap.org/data/2.5/forecast';
const PATH_SEARCH = '/daily?';
const PATH_CITY = 'q=';
const PATH_COUNT = 'cnt=';
const PATH_UNIT = 'units=metric';
const PATH_APPID = 'appid=';
const API_KEY = 'c0c4a4b4047b97ebc5948ac9c48c0559';

// const temperatureListe = [
//     { day: 'Mon', temp: 12, icon: 'sun', weather: 'sunny' },
//     { day: 'Tue', temp: 10, icon: 'sun', weather: 'cloudy' },
//     { day: 'Wed', temp: 8, icon: 'sun', weather: 'windy' },
//     { day: 'Thu', temp: 8, icon: 'sun', weather: 'drizzle' },
//     { day: 'Fri', temp: 4, icon: 'sun', weather: 'rainy' },
//     { day: 'Sat', temp: -2, icon: 'sun', weather: 'snow' },
//     { day: 'Sun', temp: 12, icon: 'sun', weather: 'sunny' }
// ];


export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            searchCity: DEFAULT_CITY,
            currentCity: null,
            error: null,
            isFetched: false
        }

        this.needsToFetchWeather = this.needsToFetchWeather.bind(this);
        this.setSearchWeather = this.setSearchWeather.bind(this);
        this.fetchPreviousWeather = this.fetchPreviousWeather.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    needsToFetchWeather(searchCity) {
        console.log(this.state.weather[searchCity]);
        return !this.state.weather[searchCity];
    }

    setSearchWeather(res, searchCity) {
        const { city, list } = res;
        const { name, country, timezone } = city;
        const weatherList = this.state.weather;
        const temperatureList = [];

        list.forEach(item => {
            const { dt, temp, weather } = item;

            temperatureList.push(
                {
                    day: unixToDay(dt),
                    temperature: temp.day,
                    weatherDescription: weather[0].weatherDescription,
                    weatherIcon: weather[0].icon
                }
            );
        });

        const currentCity = {
            city: name,
            country,
            timezone,
            temperatureList
        }

        const newWeather = {
            [searchCity]: currentCity,
            ...weatherList
        }

        this.setState({
            isFetched: true,
            searchCity,
            currentCity,
            weather: newWeather
        })

        // console.log(newWeather);
        console.log('api call:', this.state.currentCity);
    }

    fetchPreviousWeather(searchCity) {
        const { weather } = this.state;

        weather[searchCity] && this.setState({
            currentCity: weather[searchCity]
        })

        console.log('cache log:', this.state.currentCity)
    }


    fetchWeather(searchCity, count = 7) {
        const api = `${PATH_BASE}${PATH_SEARCH}${PATH_CITY}${searchCity}&${PATH_COUNT}${count}&${PATH_UNIT}&${PATH_APPID}${API_KEY}`;

        axios(api)
            .then(res => {
                this.setSearchWeather(res.data, searchCity)
            })
            .catch(error => {
                this.setState({ error });
                console.log(error);
            })
    }

    onSearchChange(event) {
        this.setState({
            searchCity: event.target.value
        });
    }

    onSearchSubmit(event) {
        const { searchCity } = this.state;
        this.needsToFetchWeather(searchCity) ? this.fetchWeather(searchCity) : this.fetchPreviousWeather(searchCity);
        event.preventDefault();
    }

    render() {
        const { currentCity, isFetched, searchCity } = this.state;
        const { city, country, timezone, temperatureList } = (isFetched && currentCity) || {};
        // console.log(currentCity);
        return (
            <div className="weather" >
                {isFetched ?
                    <>
                        <div className="weather-top">
                            <DateTime
                                timezone={timezone}
                            />
                            <Form
                                value={searchCity}
                                onChange={this.onSearchChange}
                                onSubmit={this.onSearchSubmit}
                            />
                            <Area
                                country={country}
                                city={city}
                            />
                        </div>

                        <TemperatureList
                            temperatureList={temperatureList}
                        />
                    </>
                    : null}
            </ div>
        )
    }

    componentDidMount() {
        const { searchCity } = this.state;
        this.fetchWeather(searchCity);
    }
}





