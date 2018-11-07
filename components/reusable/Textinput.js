import React, { Component } from 'react';
import { View, TextInput, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

class Textinput extends Component {
  state = {
    isFocused: false,
    borderColor: 'rgba(0,0,0,0.45)',
    borderBottomWidth: 1
  };

  handleFocus = () => this.setState({
    isFocused: true,
    borderColor: '#ff5555',
    borderBottomWidth: 2
  });

  handleBlur = () => this.setState({
    isFocused: false,
    borderColor: 'rgba(0,0,0,0.45)',
    borderBottomWidth: 1
  });

  componentWillMount() {
    this.animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  componentDidUpdate() {
    Animated.timing(this.animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 500,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0]
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12]
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#b9b9b9', '#DE2E2E']
      })
    };
    return (
      <View style={{ paddingTop: 15 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={[{width: this.props.inputLength}, {height: 26, 
    fontSize: 14, 
    color: '#000', 
    borderBottomWidth: this.state.borderBottomWidth, 
    borderBottomColor: this.state.borderColor}]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          underlineColorAndroid='rgba(0,0,0,0)'
        />
      </View>
    );
  }
}

const styles = {
  defaultInputStyle: {
    
  }
}
export default Textinput;
