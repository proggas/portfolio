import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import Header from './Header';


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
    resume_header: {
        marginTop: '400px',
    }

};

function Resume({ header }) {
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
        <>

            <div style={styles.mainContainer}>
                <h1 style={{ ...styles.resume_header }} className='resume-h1 header'>{header}</h1>
                <div>
                    <img src="../images/resume/resume_1.png" width="50%" className="resumeImage resume-pic"></img>

                </div>

            </div>
        </>
    ) : <FallbackSpinner />;
}

export default Resume;