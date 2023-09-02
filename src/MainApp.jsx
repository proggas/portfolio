import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {

    /** Initializes the state 'data' */
    const [data, setData] = useState(null);


    /** Grabs data from the routes json file which is used for the navbar routes */
    useEffect(() => {
        fetch(endpoints.routes, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);


    /** Returns HTML for the main components of the app */
    return (
        <div className="MainApp">
            <NavBarWithRouter />
            <main className="main">
                <Switch>
                    <Suspense fallback={<FallbackSpinner />}>
                        <Route exact path="/" component={Home} />
                        {data
                            && data.sections.map((route) => {
                                const SectionComponent = React.lazy(() => import('./components/' + route.component));
                                return (
                                    <Route
                                        key={route.headerTitle}
                                        path={route.path}
                                        component={() => (
                                            <SectionComponent header={route.headerTitle} />
                                        )}
                                    />
                                );
                            })}
                    </Suspense>
                </Switch>
            </main>
        </div>
    );
}

export default MainApp;
