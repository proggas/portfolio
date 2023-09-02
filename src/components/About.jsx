import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import { ThemeContext } from 'styled-components';

let color = null;

/** CSS Styles for the About Page */
const styles = {
    introTextContainer: {
        margin: 10,
        flexDirection: 'column',
        whiteSpace: 'pre-wrap',
        textAlign: 'left',
        fontSize: '1.2em',
        fontWeight: 500,
        padding: '10px',
    },
    introImageContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },

};

function About(props) {
    /** Grabs theme & header and makes a state for the data for the About Page */
    const { header } = props;
    const [data, setData] = useState(null);
    const theme = useContext(ThemeContext);

    /** Colors div background depending on the theme */
    color = theme.color === '#eee' ? 'rgba(1, 1, 1, 0.3)' : 'rgba(211, 211, 211, 0.3)';

    /** Function used for parsing text */
    const parseIntro = (text) => (
        <ReactMarkdown
            children={text}
        />
    );

    /** Gets data from the json file when About Page is loaded */
    useEffect(() => {
        fetch(endpoints.about, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);

    /** Returns HTML with info about the About Page and its CSS Styles */
    return (
        <>
            <Header title={header} />
            <div className="section-content-container">
                <Container>
                    {data ?
                        (
                            <div className='about-div about-div-phone'>
                                <div style={{ ...styles.introTextContainer, background: color }}
                                    className="about-text-phone about-text">
                                    {parseIntro(data.about)}
                                </div>
                                <div style={{ ...styles.introImageContainer }}>
                                    <img src={data?.imageSource} alt="profile" className="about-pfp about-pfp-phone" />
                                </div>
                            </div>
                        )
                        : <FallbackSpinner />}
                </Container>
            </div>
        </>
    );
}

/** Info about required prop types for each section */
About.propTypes = {
    header: PropTypes.string.isRequired,
};

export default About;
