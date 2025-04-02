// src/components/SearchForm/SearchForm.component.jsx
import React from 'react';
import './SearchForm.styles.css';

export const SearchForm = ({ handleSubmit, handleChange, searchField, cardType, handleCardTypeChange }) => (
    <div className="search-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search card name..."
                    onChange={handleChange}
                    value={searchField}
                    name="searchField"
                />
            </div>

            <div className="form-group">
                <select
                    className="type-select"
                    onChange={handleCardTypeChange}
                    value={cardType}
                    name="cardType"
                >
                    <option value="">All Card Types</option>
                    <option value="Effect Monster">Effect Monster</option>
                    <option value="Normal Monster">Normal Monster</option>
                    <option value="Ritual Monster">Ritual Monster</option>
                    <option value="Fusion Monster">Fusion Monster</option>
                    <option value="Synchro Monster">Synchro Monster</option>
                    <option value="XYZ Monster">XYZ Monster</option>
                    <option value="Pendulum Monster">Pendulum Monster</option>
                    <option value="Link Monster">Link Monster</option>
                    <option value="Spell Card">Spell Card</option>
                    <option value="Trap Card">Trap Card</option>
                </select>
            </div>

            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    </div>
);