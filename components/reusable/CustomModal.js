import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
class CustomModal extends Component {
  render() {
    // Destructioring to avoíd redudant code
    const { isVisible, children, close } = this.props;
    const { containerStyle } = styles;
    return (
      <Modal
         isVisible={isVisible}
         onBackdropPress={close}
         style={{ margin: 0 }}
      >
        <View style={containerStyle}>
         {children}
        </View>
       </Modal>
     );
   }

  }


  const styles = {
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: HEIGHT,
      width: WIDTH
    }
  };

export default CustomModal;
