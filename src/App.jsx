import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';

let color = null;

function App() {
    window.matchMedia = null;

    /** Default theme is dark mode */
    const darkMode = useDarkMode(true);

    /** Sets body's class depending on the theme in order to change the background pictures */
    color = darkMode.value ? 'body-dark' : 'body-light';

    if (color === 'body-dark') {
        document.body.classList.remove('body-light');
    } else {
        document.body.classList.remove('body-dark');
    }

    document.body.classList.add(color);

    /** Returns the basic structure of the app and provides the context for the theme */
    return (
        <AppContext.Provider value={{ darkMode }}>
            <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
                <GlobalStyles />
                <div className="App">
                    <BrowserRouter>
                        <MainApp />
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </AppContext.Provider>
    );

}

export default App;
