// Updated App.js with pagination
import React, { Component } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm.component';
import { CardList } from './components/CardList/CardList.component';
import { Pagination } from './components/Pagination/Pagination.component';
import './App.css';
import {ResultsCount} from "./components/ResultsCount/ResultsCount.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      allCards: null, // Store all cards for client-side pagination
      searchField: '',
      cardType: '',
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      totalCards: 0,
      cardsPerPage: 20
    };
  }

  componentDidMount() {
    this.fetchRandomCards();
  }

  fetchRandomCards = () => {
    this.setState({ loading: true, error: null });

    // Fetch a limited number of random cards as initial display
    fetch('https://db.ygoprodeck.com/api/v7/randomcard.php?num=20')
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
            loading: false,
            currentPage: 1,
            totalPages: 1
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

  searchCards = (page = 1) => {
    const { searchField, cardType, cardsPerPage } = this.state;

    // Build the query URL based on the search parameters
    let url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';

    const params = [];
    if (searchField.trim()) {
      params.push(`fname=${encodeURIComponent(searchField)}`);
    }

    if (cardType) {
      params.push(`type=${encodeURIComponent(cardType)}`);
    }

    // If no search parameters, fetch random cards instead
    if (!searchField.trim() && !cardType) {
      this.fetchRandomCards();
      return;
    }

    // First, get the total count by making a request without pagination
    const countUrl = url + params.join('&');

    this.setState({ loading: true, error: null });

    fetch(countUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(countData => {
          if (countData.error) {
            throw new Error(countData.error);
          }

          const allCards = countData.data || [];
          const totalCards = allCards.length;
          const totalPages = Math.ceil(totalCards / cardsPerPage);

          // For small result sets, just use the results we already have
          if (totalCards <= cardsPerPage) {
            this.setState({
              cards: allCards,
              loading: false,
              currentPage: 1,
              totalPages: 1,
              totalCards
            });
            return;
          }

          // For larger result sets, implement client-side pagination
          const startIndex = (page - 1) * cardsPerPage;
          const endIndex = startIndex + cardsPerPage;
          const paginatedCards = allCards.slice(startIndex, endIndex);

          this.setState({
            cards: paginatedCards,
            loading: false,
            currentPage: page,
            totalPages,
            totalCards,
            allCards // Store all cards for client-side pagination
          });

          // Scroll to top when changing pages
          window.scrollTo(0, 0);
        })
        .catch(error => {
          this.setState({
            error: error.message,
            loading: false,
            cards: [],
            currentPage: 1,
            totalPages: 1
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
    this.setState({ currentPage: 1 }, () => {
      this.searchCards(1);
    });
  }

  handlePageChange = (page) => {
    const { allCards, cardsPerPage } = this.state;

    // If we have all cards in memory, do client-side pagination
    if (allCards && allCards.length > 0) {
      const startIndex = (page - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const paginatedCards = allCards.slice(startIndex, endIndex);

      this.setState({
        cards: paginatedCards,
        currentPage: page
      });

      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    } else {
      // If we don't have all cards, make a new API request
      this.searchCards(page);
    }
  }

  render() {
    const { cards, searchField, cardType, loading, error, currentPage, totalPages } = this.state;

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

          {!loading && !error && (
              <ResultsCount
                  totalCards={this.state.totalCards}
                  searchField={searchField}
                  cardType={cardType}
              />
          )}

          <CardList
              cards={cards}
              loading={loading}
              error={error}
          />

          {!loading && !error && cards.length > 0 && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={this.handlePageChange}
              />
          )}
        </div>
    );
  }
}

export default App;
