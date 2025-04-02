// src/components/CardList/CardList.component.jsx
import React from 'react';
import { CardDisplay } from '../CardDisplay/CardDisplay.component';
import './CardList.styles.css';

export const CardList = ({ cards, loading, error }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Summoning cards from the Shadow Realm...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error">Error loading cards: {error}</div>;
    }

    if (cards.length === 0) {
        return <div className="no-results">No cards found. Try another search term.</div>;
    }

    return (
        <div className="card-list">
            {cards.map((card, index) => (
                <CardDisplay key={`${card.id}-${index}`} card={card} />
            ))}
        </div>
    );
};