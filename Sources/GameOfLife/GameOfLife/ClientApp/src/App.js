import React, { Component } from 'react';
import Hello from "./components/Hello.jsx";
import WeatherForecast from "./components/WeatherForecast.jsx";

import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                <Hello />
                <WeatherForecast />
            </>
            //  <Layout>
            //    <Routes>
            //      {AppRoutes.map((route, index) => {
            //        const { element, ...rest } = route;
            //        return <Route key={index} {...rest} element={element} />;
            //      })}
            //    </Routes>
            //  </Layout>
        );
    }
}
