import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { gyroscope } from "react-native-sensors";
const Dimensions = require("Dimensions");
const PixelRatio = require("PixelRatio");
const window = Dimensions.get("window");

const deviceWidth = window.width;
const deviceHeight = window.height;

const imageWidth = 4 * deviceWidth;
const imageHeight = 4 * deviceHeight;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: `http://pilar.usal.edu.ar/archivos/pilar/imagenes/plano_con_instrucciones_2013.jpg`,
      y: 0,
      x: 0
    };
  }

  componentDidMount() {
    const subscription = gyroscope.subscribe(({ y, x }) => {
      this.setState(state => ({
        y: y + state.y,
        x: x + state.x
      }));
    });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    const positionOnScreenX = -imageWidth / 2;
    const positionOnScreenY = -imageHeight / 2;
    // The y axis of the sensor data resembles what we need for the x axis
    // in the image
    const movementX = -this.state.y / 1000 * imageWidth;
    const movementY = -this.state.x / 1000 * imageHeight;

    return (
      <View style={styles.container}>
        <Image
          translateX={positionOnScreenX + movementX}
          translateY={positionOnScreenY + movementY}
          style={styles.image}
          source={{ uri: this.state.image }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    height: imageHeight,
    width: imageWidth
  }
});
