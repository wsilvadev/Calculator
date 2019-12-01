import React, { Component } from "react";
import { View, Text, AppRegistry } from "react-native";

import Style from "./style";
import InputButton from "./inputButton";

// Define the input Buttons will be displayed in the calculator
const inputButtons = [
  ["C"],
  [1, 2, 3, "/"],
  [4, 5, 6, "*"],
  [7, 8, 9, "-"],
  [0, ".", "=", "+"]
];
class ReactCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      previousInputValue: 0,
      selectSymbol: null
    };
  }
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>{this._renderInputButtons()}</View>
      </View>
    );
  }

  /**
   * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
   */
  _renderInputButtons() {
    var views = [];

    for (var r = 0; r < inputButtons.length; r++) {
      let row = inputButtons[r];

      let inputRow = [];
      for (var i = 0; i < row.length; i++) {
        let input = row[i];
        inputRow.push(
          <InputButton
            value={input}
            highlight={this.state.selectSymbol === input}
            onPress={this._onInputButtonPressed.bind(this, input)}
            key={r + "-" + i}
          />
        );
      }

      views.push(
        <View style={Style.inputRow} key={"row-" + r}>
          {inputRow}
        </View>
      );
    }
    return views;
  }

  _onInputButtonPressed(input) {
    switch (typeof input) {
      case "number":
        return this._handleNumbleInput(input);
      case "string":
        return this._handleStringInput(input);
    }
  }
  _handleStringInput(str) {
    switch (str) {
      case "/":
      case "*":
      case "+":
      case "-":
      case "C":
        this.setState({
          selectSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case "=":
        let simbol = this.state.selectSymbol,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;

        if (!simbol) {
          return;
        }
        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + simbol + inputValue),
          selectSymbol: null
        });
    }
  }
  _handleNumbleInput(num) {
    let inputValue = this.state.inputValue * 10 + num;
    this.setState({ inputValue: inputValue });
  }
}

AppRegistry.registerComponent("ReactCalculator", () => ReactCalculator);
export default ReactCalculator;
