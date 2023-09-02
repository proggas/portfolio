import React, { useState, useEffect, useContext } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import { ThemeContext } from 'styled-components';

let color = null;

/** Styles for the Home Page */
const styles = {
    nameStyle: {
        fontSize: '5em',
    },
    inlineChild: {
        display: 'inline-block',
        fontSize: '2em',
        fontWeight: 'bold',

    },
    mainContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },

};

function Home() {

    /** Grabs theme and sets initial value for the state for data */
    const [data, setData] = useState(null);
    const theme = useContext(ThemeContext);


    /** Sets the div background color based on the theme */
    color = theme.color === '#eee' ? 'rgba(1, 1, 1, 0.3)' : 'rgba(211, 211, 211, 0.3)';


    /** Grabs data from the json file for the Home Page when it loads */
    useEffect(() => {
        fetch(endpoints.home, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);


    /** Returns HTML with info about the Home Page and its CSS Styles */
    return data ? (
        <Fade>
            <div style={{ ...styles.mainContainer, background: color }}>
                <h1 style={styles.nameStyle}>{data?.name}</h1>
                <div style={{ flexDirection: 'row' }}>
                    <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
                    <Typewriter
                        options={{
                            loop: true,
                            autoStart: true,
                            strings: data?.roles,
                        }}
                    />
                </div>
                <Social />
            </div>
        </Fade>
    ) : <FallbackSpinner />;
}

export default Home;
