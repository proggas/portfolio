import React from 'react';
import { Spinner } from 'react-bootstrap';

/** Fallback Spinner is used for when a page is loading */

/** Styles for the Fallback Spinner */
const styles = {
    spinnerContainerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
};

/** Returns HTML for the Fallback Spinner with its CSS Styles */
function FallbackSpinner() {
    return (
        <div style={styles.spinnerContainerStyle}>
            <Spinner animation="grow" />
        </div>
    );
}

export default FallbackSpinner;
