import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';


const styles = {
    nameStyle: {
        fontSize: '5em',
    },
    inlineChild: {
        display: 'inline-block',

    },
    mainContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    resume_div: {
        marginTop: "300px",
        marginBot: "500px",
    }

};

function Resume() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(endpoints.resume, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);

    return data ? (
        //<Fade>
        <div style={styles.mainContainer}>
            <h1 style={styles.nameStyle}>Resume</h1>
            <div style={styles.resume_div}>

                <img src="../images/resume/resume_1.png" width="50%" className="resumeImage"></img>

            </div>

        </div>
        //</Fade>
    ) : <FallbackSpinner />;
}

export default Resume;