import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';


/** CSS Styles for the Projects Page */
const styles = {
    containerStyle: {
        marginBottom: 25,
    },
    showMoreStyle: {
        margin: 25,
    },
};


const Projects = (props) => {

    /** Grabs theme, header, and sets initial values for the states */
    const theme = useContext(ThemeContext);
    const { header } = props;
    const [data, setData] = useState(null);
    const [showMore, setShowMore] = useState(false);


    /** Grabs data from the json file for the Projects Page when it loads */
    useEffect(() => {
        fetch(endpoints.projects, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);


    const numberOfItems = showMore && data ? data.length : 6;


    /** Returns HTML with info about the Projects Page and its CSS Styles */
    return (
        <>
            <Header title={header} />
            {data
                ? (
                    <div className="section-content-container">
                        <Container style={styles.containerStyle}>
                            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                                {data.projects?.slice(0, numberOfItems).map((project) => (
                                    <Fade key={project.title}>
                                        <ProjectCard project={project} />
                                    </Fade>
                                ))}
                            </Row>

                            {!showMore
                                && (
                                    <Button
                                        style={styles.showMoreStyle}
                                        variant={theme.bsSecondaryVariant}
                                        onClick={() => setShowMore(true)}
                                    >
                                        show more
                                    </Button>
                                )}
                        </Container>
                    </div>
                ) : <FallbackSpinner />}
        </>
    );
};

/** Info about required prop types for each section */
Projects.propTypes = {
    header: PropTypes.string.isRequired,
};

export default Projects;
