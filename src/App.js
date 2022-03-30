import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

// NASA_API_KEY = zew9wtUqWykOus3nwaOfh9M0qw3tPgLcIHYA3s44
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;

class App extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    setSearchTopStories(result) {
        const { hits, page } = result;
        const { searchKey, results } = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        //axios fetch
        axios(`${url}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this._isMounted && this.setSearchTopStories(result.data))
            .catch(error => this._isMounted && this.setState({ error }))
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });

        this.needsToSearchTopStories(searchTerm) && this.fetchSearchTopStories(searchTerm);
        console.log('searched');
        event.preventDefault();

    }

    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        console.log(`clicked this id: ${id}`);

        const updatedHits = hits.filter(item => item.objectID !== id);

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        })
    }

    render() {
        const {
            searchTerm,
            results,
            searchKey,
            error
        } = this.state;

        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];


        return (
            <div className='App'>

                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit}
                >
                    Search
                </Search>
                <br />

                {error ?
                    <div>Something went wrong.</div>

                    : <>
                        <div className="interactions">
                            <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                                More
                            </Button>
                        </div><br /><Table
                            list={list}
                            onDismiss={this.onDismiss} /><br /><div className="interactions">
                            <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                                More
                            </Button>
                        </div>
                    </>
                }

            </div >

        )
    }

    componentDidMount() {
        this._isMounted = true;
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        this.fetchSearchTopStories(searchTerm);

    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}

const Search = ({
    value,
    onChange,
    onSubmit,
    children
}) =>
    <form onSubmit={onSubmit}>
        <input type="text"
            value={value}
            onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>



const Table = ({
    list,
    onDismiss }) =>
    <div className='list'>
        {list.map(item => {
            return (
                <div className='item' key={item.objectID}>
                    <span>{item.objectID}.</span><br />
                    <span>{item.title}</span><br />
                    <span>{item.url}</span><br />
                    <span>{item.author}</span><br />
                    <span>{item.num_comments}</span><br />
                    <span>{item.points}</span><br />
                    <Button
                        className="button"
                        onClick={() => { onDismiss(item.objectID) }}
                    >
                        Dismiss
                    </Button>
                    <br />
                </div>
            )
        })}
    </div>

const Button = ({
    onClick,
    className = '',
    children,
}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>

export default App;