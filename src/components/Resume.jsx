import React, { useState, useEffect } from 'react';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import Header from './Header';


const styles = {
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
            <Header title={header} />
            <div>
                <img src="../images/resume/resume_1.png" width="50%" className="resumeImage resume-pic"></img>
            </div>
        </>
    ) : <FallbackSpinner />;
}

export default Resume;