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
      zip: '',
      forecast: {
        description: 'few clouds',
        main: 'Clouds',
        temp: 45.7,
      },
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    const zip = event.nativeEvent.text;
    this.setState({ zip });

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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You input {this.state.zip}
        </Text>

        <Forecast {...this.state.forecast} />

        <TextInput
          style={styles.input}
          onSubmitEditing={this.handleTextChange}
        />
      </View>
    );
  }
}

export default weatherAppiOS;
