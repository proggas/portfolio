import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';


/** CSS Styles for the Skills Page */
const styles = {
    iconStyle: {
        height: 75,
        width: 75,
        margin: 10,
        marginBottom: 0,
    },
    introTextContainer: {
        whiteSpace: 'pre-wrap',
    },
};


function Skills(props) {

    /** Grabs header and initializes state 'data' */
    const { header } = props;
    const [data, setData] = useState(null);


    /** Function for displaying the intro from the 'intro' section of the json file for Skills Page */
    const renderSkillsIntro = (intro) => (
        <h4 style={styles.introTextContainer}>
            <ReactMarkdown children={intro} />
        </h4>
    );


    /** Grabs data from the json file for the Skills Page when it loads */
    useEffect(() => {
        fetch(endpoints.skills, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);


    /** Returns HTML with info about the Skills Page and its CSS Styles */
    return (
        <>
            <Header title={header} />
            {data ? (
                <Fade>
                    <div className="section-content-container">
                        <Container>
                            {renderSkillsIntro(data.intro)}
                            {data.skills?.map((rows) => (
                                <div key={rows.title}>
                                    <br />
                                    <h3>{rows.title}</h3>
                                    {rows.items.map((item) => (
                                        <div key={item.title} style={{ display: 'inline-block' }} className='skills-div'>
                                            <img
                                                style={styles.iconStyle}
                                                src={item.icon}
                                                alt={item.title}
                                            />
                                            <p><b>{item.title}</b></p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Container>
                    </div>
                </Fade>
            ) : <FallbackSpinner />}
        </>
    );
}

/** Info about required prop types for each section */
Skills.propTypes = {
    header: PropTypes.string.isRequired,
};

export default Skills;
