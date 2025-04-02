// src/App.js
import React, { Component } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm.component';
import { CardList } from './components/CardList/CardList.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      searchField: '',
      cardType: '',
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchRandomCards();
  }

  fetchRandomCards = () => {
    this.setState({ loading: true, error: null });

    // Fetch a limited number of random cards as initial display
    fetch('https://db.ygoprodeck.com/api/v7/randomcard.php?num=12')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // If the API returns a single card object, convert it to an array
          const cardsArray = Array.isArray(data) ? data : [data];
          this.setState({
            cards: cardsArray,
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            error: error.message,
            loading: false
          });
          console.error('Error fetching random cards:', error);
        });
  }

  searchCards = () => {
    const { searchField, cardType } = this.state;

    // Build the query URL based on the searchField and cardType
    let url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';

    const params = [];
    if (searchField.trim()) {
      params.push(`fname=${encodeURIComponent(searchField)}`);
    }

    if (cardType) {
      params.push(`type=${encodeURIComponent(cardType)}`);
    }

    // If no search parameters, fetch random cards instead
    if (params.length === 0) {
      this.fetchRandomCards();
      return;
    }

    url += params.join('&');

    this.setState({ loading: true, error: null });

    fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }

          this.setState({
            cards: data.data || [],
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            error: error.message,
            loading: false,
            cards: []
          });
          console.error('Error searching cards:', error);
        });
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  }

  handleCardTypeChange = e => {
    this.setState({ cardType: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.searchCards();
  }

  render() {
    const { cards, searchField, cardType, loading, error } = this.state;

    return (
        <div className="App">
          <div className="app-header">
            <h1 className="app-title">Yu-Gi-Oh! Card Explorer</h1>
            <p className="app-subtitle">Search the ancient card catalog</p>
          </div>

          <SearchForm
              handleChange={this.handleChange}
              handleCardTypeChange={this.handleCardTypeChange}
              handleSubmit={this.handleSubmit}
              searchField={searchField}
              cardType={cardType}
          />

          <CardList
              cards={cards}
              loading={loading}
              error={error}
          />
        </div>
    );
  }
}

export default App;