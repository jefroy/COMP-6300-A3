// src/components/Pagination/Pagination.component.jsx
import React from 'react';
import './Pagination.styles.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Create an array of page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];

        // Always show first page
        pageNumbers.push(1);

        // Calculate range around current page
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        // Add ellipsis after first page if needed
        if (start > 2) {
            pageNumbers.push('...');
        }

        // Add pages around current page
        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        // Add ellipsis before last page if needed
        if (end < totalPages - 1) {
            pageNumbers.push('...');
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <div className="page-numbers">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="ellipsis">...</span>
                    ) : (
                        <button
                            key={page}
                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                className="pagination-button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};