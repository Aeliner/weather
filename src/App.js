import React, { Component } from "react";
import Moment from "moment";
import WeatherComp from "./components/weather";
import "animate.css";
import Loading from "./components/loading";
import SearchForm from './components/search-form';
import "./App.css";

const API = {
  base: "",
  key: "3d3c2fd8419ae71eb8bbca7c783dae82",
};

function renderChildComponent() {
  const { data } = this.state;
  const { forecast } = this.state;
  const { tempType } = this.state;
  const {loading} = this.state;
  
  if (data && forecast && tempType) {
    this.state.oldTempType = this.state.tempType;
    return <WeatherComp data={this.state.data} forecast={this.state.forecast} tempType={this.state.tempType}></WeatherComp>;
  }
  
}

//https://api.openweathermap.org/data/2.5/find?q=florida&appid=3d3c2fd8419ae71eb8bbca7c783dae82&units=metric
class WeatherApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      forecast: undefined,
      tempType : undefined,
      oldTempType: undefined,
      searchResult: [],
    };
  }

  componentDidMount() {
    //this.getWeatherInfo();
    this.getWeatherInfo(3441243);
  }

  searchCity = async(e) =>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    e.target.elements.city.value = "";
    if(city){
      debugger;
      return await fetch("https://api.openweathermap.org/data/2.5/find?q="+city+"&appid="+API.key+"&units=metric").then((response) => response.json())
      .then((data) => {
        if(data.list)
        this.setState({searchResult : data.list})
      })
      .catch((error) => this.setState({searchResult : []}));
    }
  }

  searchKey = async(e) =>{
    e.preventDefault();
    const city = e.target.value;
    if(city){
      return await fetch("https://api.openweathermap.org/data/2.5/find?q="+city+"&appid="+API.key+"&units=metric").then((response) => response.json())
      .then((data) => {
        if(data.list)
        this.setState({searchResult : data.list})
      })
      .catch((error) => this.setState({searchResult : []}));
    }
  }

  getWeatherInfo = async (id) => {
    this.setState({ loading : true});
    return await fetch(
      "https://api.openweathermap.org/data/2.5/weather?id="+id+"&appid=" +
      API.key +
      "&units=metric"
    )
      .then((response) => {
        this.setState({ searchResult : []});
        return response.json();
      })
      .then((data) => this.getOneCallApi(data))
      .catch((error) => console.log(error));
  };

  getOneCallApi = async (data) => {
    let tempVal = Math.round(data.main.temp);
    let tempType;
    if(tempVal <= 0){
      tempType = "hardCold";
    }
    if(tempVal > 0 && tempVal <= 16){
      tempType = "lightCold";
    }
    if(tempVal > 16 && tempVal <= 23){
      tempType = "neutral";
    }
    if(tempVal > 23 && tempVal <= 35){
      tempType = "lightHot";
    }
    else if(tempVal > 35){
      tempType = "hardHot";
    }
    this.setState({tempType : tempType});
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
      <SearchForm searchCity={this.searchCity} searchKey ={this.searchKey} searchResult={this.state.searchResult} getWeatherInfo={this.getWeatherInfo}></SearchForm>
       {renderChildComponent.call(this)}
    </div>
  );
}
}

export default WeatherApp;
