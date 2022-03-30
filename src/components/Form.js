import React, { Component } from 'react';

export default class Form extends Component {
    render() {
        const { value, onChange, onSubmit } = this.props;
        return (
            <form onSubmit={onSubmit} className='weather-form'>
                <input type="text" value={value} onChange={onChange}/>
                <button type="submit">Search</button>
            </form>
        );
    }
}

