import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';


import '../css/education.css';

function Education(props) {
    /** Grabs theme, header, and sets initial states */
    const theme = useContext(ThemeContext);
    const { header } = props;
    const [data, setData] = useState(null);
    const [width, setWidth] = useState('50vw');
    const [mode, setMode] = useState('VERTICAL_ALTERNATING');

    /** Grabs data from json file when Education Page is loaded and sets the screen width */
    useEffect(() => {
        fetch(endpoints.education, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);

        if (window?.innerWidth < 576) {
            setMode('VERTICAL');
        }

        if (window?.innerWidth < 576) {
            setWidth('90vw');
        } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
            setWidth('90vw');
        } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
            setWidth('75vw');
        } else {
            setWidth('50vw');
        }
    }, []);

    /** Sets the classes for the divs on the Education Page based on the theme */
    let div_class = theme.color === '#eee' ? 'education-div-light' : 'education-div-dark';
    let classes = ["section-content-container", div_class];

    /** Returns HTML with the data from the json file and sets CSS Styles based on the theme */
    return (
        <>
            <Header title={header} />
            {data ? (
                <Fade>
                    <div id="education-div" style={{ width }} className={classes.join(" ")}>
                        <Container>
                            <Chrono
                                hideControls
                                allowDynamicUpdate
                                useReadMore={false}
                                items={data.education}
                                cardHeight={250}
                                mode={mode}
                                theme={{
                                    primary: theme.accentColor,
                                    secondary: theme.accentColor,
                                    cardBgColor: theme.chronoTheme.cardBgColor,
                                    cardForeColor: theme.chronoTheme.cardForeColor,
                                    titleColor: theme.chronoTheme.titleColor,
                                }}
                            >
                                <div className="chrono-icons">
                                    {data.education.map((education) => (education.icon ? (
                                        <img
                                            key={education.icon.src}
                                            src={education.icon.src}
                                            alt={education.icon.alt}
                                        />
                                    ) : null))}
                                </div>
                            </Chrono>
                        </Container>
                    </div>
                </Fade>
            ) : <FallbackSpinner />}
        </>
    );
}

/** Info about required prop types for each section */
Education.propTypes = {
    header: PropTypes.string.isRequired,
};

export default Education;
