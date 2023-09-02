import React, { useState, useEffect } from 'react';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import Header from './Header';


function Resume({ header }) {
    /** Initializes the state 'data' */
    const [data, setData] = useState(null);


    /** Grabs data from the json file for the Resume Page when it loads */
    useEffect(() => {
        fetch(endpoints.resume, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);


    /** Returns HTML with info about the Resume Page */
    return data ? (
        <>
            <Header title={header} />
            <div>
                <img src="../images/resume/resume_1.png" width="50%" className="resumeImage resume-pic"></img>
            </div>
        </>
    ) : <FallbackSpinner />;
}

export default Resume;