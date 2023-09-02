import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

let color = null;

/** Styles for the Experience Page */
const styles = {
    ulStyle: {
        listStylePosition: 'outside',
        paddingLeft: 20,
        fontWeight: 'bold',
    },
    subtitleContainerStyle: {
        marginTop: 10,
        marginBottom: 10,
    },
    subtitleStyle: {
        display: 'inline-block',
    },
    inlineChild: {
        display: 'inline-block',
    },
    itemStyle: {
        marginBottom: 10,
    },
};

function Experience(props) {

    /** Grabs theme, header, and sets initial value for the state for data */
    const theme = useContext(ThemeContext);
    const { header } = props;
    const [data, setData] = useState(null);


    /** Sets the div background color based on the theme */
    color = theme.color === '#eee' ? 'rgba(1, 1, 1, 0.3)' : 'rgba(211, 211, 211, 0.3)';


    /** Grabs data from the json file for the Experience Page when it loads */
    useEffect(() => {
        fetch(endpoints.experiences, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res.experiences))
            .catch((err) => err);
    }, []);


    /** Returns HTML with info about the Experience Page and its CSS Styles */
    return (
        <>
            <Header title={header} />

            {data
                ? (
                    <div className="section-content-container">
                        <Container>
                            <Timeline
                                lineColor={theme.timelineLineColor}
                            >
                                {data.map((item) => (
                                    <Fade>
                                        <TimelineItem
                                            key={item.title + item.dateText}
                                            dateText={item.dateText}
                                            dateInnerStyle={{ background: theme.accentColor }}
                                            style={styles.itemStyle}
                                            bodyContainerStyle={{ color: theme.color }}
                                        >
                                            <h2 className="item-title" style={{ background: color }}>
                                                {item.title}
                                            </h2>
                                            <div style={{ ...styles.subtitleContainerStyle, background: color }}>
                                                <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                                                    {item.subtitle}
                                                </h4>
                                                {item.workType && (
                                                    <h5 style={styles.inlineChild}>
                                                        &nbsp;·
                                                        {' '}
                                                        {item.workType}
                                                    </h5>
                                                )}
                                            </div>
                                            <ul style={{ ...styles.ulStyle, background: color }}>
                                                {item.workDescription.map((point) => (
                                                    <div key={point}>
                                                        <li>
                                                            <ReactMarkdown
                                                                children={point}
                                                                components={{
                                                                    p: 'span',
                                                                }}
                                                            />
                                                        </li>
                                                        <br />
                                                    </div>
                                                ))}
                                            </ul>
                                        </TimelineItem>
                                    </Fade>
                                ))}
                            </Timeline>
                        </Container>
                    </div>
                ) : <FallbackSpinner />}
        </>
    );
}

/** Info about required prop types for each section */
Experience.propTypes = {
    header: PropTypes.string.isRequired,
};

export default Experience;
