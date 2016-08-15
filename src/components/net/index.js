import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../../styles/clrs';

const HEIGHT = [1, 2, 3, 4, 5, 6]; // width
const HEATMAP = [
  { low: 0, high: 10, color: 'blue'},
  { low: 11, high: 100, color: 'red'},
];

export default class Net extends Component {
  getRandomCellColor() {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    return randomValue;
  }

  getHeatmapColor(cellColor) {
    for (let i = 0; i < HEATMAP.length; i++) {
      const range = HEATMAP[i];

      if (range.low <= cellColor && range.high >= cellColor) {
        return range.color;
      }
    }

    return color;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.net}>
          { this.generateGrid() }
        </View>
      </View>
    );
  }

  generateGrid() {
    return HEIGHT.map((row) => this.generateRow(row));
  }

  generateCell(col) {
    const cellColor = this.getRandomCellColor();

    return (
      <View style={[styles.cell, {backgroundColor: this.getHeatmapColor(cellColor)}]}
          key={col}>
        <Text>{cellColor}</Text>
      </View>
    );
  }

  generateRow(row) {
    return (
      <View style={styles.row} key={row}>
        { HEIGHT.map((col) => this.generateCell(col)) }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.red,
    borderWidth: 1,
  },
  net: {
    margin: 40,
  },
  row: {
    height: 40,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderWidth: 1,
  },
});
