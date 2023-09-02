import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';


/** CSS Styles for the Socials Page */
const styles = {
    iconStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
};


function Social() {

    /** Grabs theme and initializes state 'data' */
    const theme = useContext(ThemeContext);
    const [data, setData] = useState(null);


    /** Grabs data from the json file for the Socials Page when it loads */
    useEffect(() => {
        fetch(endpoints.social, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);


    /** Returns HTML with info about the Socials Page and its CSS Styles */
    return (
        <div className="social">
            {data ? data.social.map((social) => (
                <SocialIcon
                    key={social.network}
                    style={styles.iconStyle}
                    url={social.href}
                    network={social.network}
                    bgColor={theme.socialIconBgColor}
                    target="_blank"
                    rel="noopener"
                />
            )) : null}
        </div>
    );
}

export default Social;
