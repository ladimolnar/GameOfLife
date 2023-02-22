// TODO: Delete. This is here just for testing purposes. 
import React, { useState, useEffect } from 'react';

async function populateWeatherData(selectedState) {
    console.log('fetching data for weatherforecast');
    const response = await fetch('weatherforecast');
    const data = await response.json();
    console.log('weatherforecast data: ' + JSON.stringify(data));
    return data;
}


export default function WeatherForecast({ selectedState }) {
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log('WeatherForecast invoked. selectedState: ' + selectedState)

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            const data = await populateWeatherData();

            setForecasts(data);
            setLoading(false);
        };
        fetchData();

    }, [selectedState]);

    const renderForecastsTable = (forecasts) => {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        forecasts.map(forecast =>
                            <tr key={forecast.date}>
                                <td>{forecast.date}</td>
                                <td>{forecast.temperatureC}</td>
                                <td>{forecast.temperatureF}</td>
                                <td>{forecast.summary}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        );
    }

    const contents = loading
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : renderForecastsTable(forecasts);

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server. Functional version.</p>
            {contents}
        </div>
    );
}
