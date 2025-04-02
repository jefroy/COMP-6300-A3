// src/components/ResultsCount/ResultsCount.component.jsx
import React from 'react';
import './ResultsCount.styles.css';

export const ResultsCount = ({ totalCards, searchField, cardType }) => {
    let message = '';

    if (searchField || cardType) {
        message = `Found ${totalCards} card${totalCards !== 1 ? 's' : ''}`;

        if (searchField && cardType) {
            message += ` matching "${searchField}" and type "${cardType}"`;
        } else if (searchField) {
            message += ` matching "${searchField}"`;
        } else if (cardType) {
            message += ` of type "${cardType}"`;
        }
    }

    return totalCards > 0 ? (
        <div className="results-count">
            {message}
        </div>
    ) : null;
};