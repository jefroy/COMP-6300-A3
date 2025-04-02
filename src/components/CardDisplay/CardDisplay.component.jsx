// src/components/CardDisplay/CardDisplay.component.jsx
import React from 'react';
import './CardDisplay.styles.css';

export const CardDisplay = ({ card }) => {
    // Function to colorize card based on type
    const getCardTypeColor = () => {
        if (card.type.includes('Monster')) {
            if (card.type.includes('Effect')) return 'effect-monster';
            if (card.type.includes('Fusion')) return 'fusion-monster';
            if (card.type.includes('Synchro')) return 'synchro-monster';
            if (card.type.includes('XYZ')) return 'xyz-monster';
            if (card.type.includes('Link')) return 'link-monster';
            if (card.type.includes('Ritual')) return 'ritual-monster';
            if (card.type.includes('Pendulum')) return 'pendulum-monster';
            return 'normal-monster';
        } else if (card.type.includes('Spell')) {
            return 'spell-card';
        } else if (card.type.includes('Trap')) {
            return 'trap-card';
        }
        return '';
    };

    return (
        <div className={`card-container ${getCardTypeColor()}`}>
            <div className="card-image-container">
                <img
                    src={card.card_images[0].image_url}
                    alt={card.name}
                    className="card-image"
                />
            </div>
            <div className="card-info">
                <h2>{card.name}</h2>
                <div className="card-type">{card.type}</div>

                {card.type.includes('Monster') && (
                    <div className="card-stats">
                        <div className="stat">
                            <span className="stat-label">Level/Rank:</span>
                            <span className="stat-value">{card.level || 'N/A'}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">ATK:</span>
                            <span className="stat-value">{card.atk}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">DEF:</span>
                            <span className="stat-value">{card.def}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Attribute:</span>
                            <span className="stat-value">{card.attribute}</span>
                        </div>
                    </div>
                )}

                <div className="card-desc">
                    <p>{card.desc}</p>
                </div>
            </div>
        </div>
    );
};