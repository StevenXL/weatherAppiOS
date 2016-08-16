import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Forecast from './Forecast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40,
  },
});

class weatherAppiOS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      forecast: null,
      zip: '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  handleTextChange(event) {
    const zip = event.nativeEvent.text;

    if (zip.match(/\d{5}/)) {
      this.setState({ zip, forecast: null, error: null }, this.fetchWeather);
    } else {
      this.setState({ error: 'Invalid Input' });
    }
  }

  fetchWeather() {
    const zip = this.state.zip;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=339bc502e738a05e187a870b4780626d&units=imperial`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          forecast: {
            description: responseJson.weather[0].description,
            main: responseJson.weather[0].main,
            temp: responseJson.main.temp,
          },
        });
      })
      .catch((error) => {
        // NOTE: This has to be handled differently in production
        throw new Error(error);
      });
  }

  render() {
    let error;

    if (this.state.error) {
      error = (
        <Text style={styles.error}>Invalid Input</Text>
      );
    }

    let forecast;

    if (this.state.forecast) {
      forecast = <Forecast {...this.state.forecast} />;
    }

    let welcome;

    if (this.state.zip) {
      welcome = `You input ${this.state.zip}`;
    }

    return (
      <View style={styles.container}>

        {error}

        <Text style={styles.welcome}>
          {welcome}
        </Text>

        {forecast}

        <TextInput
          keyboardType="numeric"
          maxLength={5}
          onSubmitEditing={this.handleTextChange}
          style={styles.input}
        />
      </View>
    );
  }
}

export default weatherAppiOS;
