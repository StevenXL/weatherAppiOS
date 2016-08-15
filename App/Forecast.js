import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const style = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  mainText: {
    flex: 2,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

const Forecast = ({ description, main, temp }) =>
  <View>
    <Text style={style.bigText}>
      {main}
    </Text>

    <Text style={style.mainText}>
      Current conditions: {description}
    </Text>

    <Text style={style.bigText}>
      {temp} &deg;F
    </Text>
  </View>;

Forecast.propTypes = {
  description: React.PropTypes.string.isRequired,
  main: React.PropTypes.string.isRequired,
  temp: React.PropTypes.number.isRequired,
};

export default Forecast;
