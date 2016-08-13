/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import validator from 'validator';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class weatherAppiOS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      description: '',
      temperature: '',
      zipCode: '',
    };

    this.fetchWeather = this.fetchWeather.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  fetchWeather() {
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipCode},us&APPID=339bc502e738a05e187a870b4780626d`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const description = responseJson.weather[0].description;
        const temperature = responseJson.main.temp;

        this.setState({description, temperature, loaded: true});
      })
      .catch((error) => console.error(error));
  }

  handleTextChange(text) {
    this.setState({zipCode: text});
  }

  render() {
    let currentWeather;

    if (this.state.loaded) {
      currentWeather = (
        <View>
          <Text>It is currenty {this.state.description}</Text>
          <Text>Current Temperature: {this.state.temperature}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {currentWeather}

        <TextInput
          autoFocus
          keyboardType="number-pad"
          maxLength={5}
          onSubmitEditing={this.fetchWeather}
          onChangeText={this.handleTextChange}
          placeholder="Please enter a U.S. zip code..."
          value={this.state.zipCode}
          style={styles.userInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  userInput: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

AppRegistry.registerComponent('weatherAppiOS', () => weatherAppiOS);
