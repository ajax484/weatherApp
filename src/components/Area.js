import React, { Component } from 'react';
import { countryCodeToCountryName } from './Functions';

export default class Area extends Component {
    render() {
        const {city, country} = this.props;
        return (
            <div className="area">
                <h1 className="city">
                    {city}
                </h1><br/>
                <h3 className="country">
                    {countryCodeToCountryName(country)}
                </h3>
            </div>
        );
    }
}