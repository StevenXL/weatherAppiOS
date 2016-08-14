import React, { Component } from 'react';
import { Image,
  StyleSheet,
  Text,
  TextInput,
  View } from 'react-native';

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
        temp: '45.7',
      },
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    this.setState({ zip: event.nativeEvent.text });
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

