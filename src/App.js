import React, { Component } from "react";
import Moment from "moment";
import WeatherComp from "./components/weather";
import Loading from "./components/loading";
import "./App.css";

const API = {
  base: "",
  key: "3d3c2fd8419ae71eb8bbca7c783dae82",
};

function renderChildComponent() {
  const { data } = this.state;
  const { forecast } = this.state;
  if (data && forecast) {
    return <WeatherComp data={this.state.data} forecast={this.state.forecast}></WeatherComp>;
  }
return <Loading></Loading>;
}

//https://api.openweathermap.org/data/2.5/find?q=florida&appid=3d3c2fd8419ae71eb8bbca7c783dae82&units=metric
class WeatherApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      forecast: undefined,
    };
  }

  componentDidMount() {
    this.getWeatherInfo();
  }

  getWeatherInfo = async () => {
    return await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=paysandu,&appid=" +
      API.key +
      "&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.getOneCallApi(data))
      .catch((error) => console.log(error));
  };

  getOneCallApi = async (data) => {
    this.setState({ data: data });
    return await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=daily,minutely,current&appid=" + API.key + "&units=metric").then((response) => response.json())
      .then((data) => this.getHourlyForecast(data))
      .catch((error) => console.log(error));
  };

   getHourlyForecast = (data) => {
  let newData = data.hourly.slice(1, 8);
  for (let i = 0; i < newData.length; i++) {
    let t = newData[i].dt;
    newData[i].dt = Moment.unix(t).format('LT');
  }
  this.setState({ forecast: newData });
};

render() {
  return (
    <div className="App">
      {renderChildComponent.call(this)}
    </div>
  );
}
}

export default WeatherApp;
