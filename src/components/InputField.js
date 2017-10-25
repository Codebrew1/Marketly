import React, { Component } from 'react';
import MaterialField from 'react-native-md-textinput';
import {
  MKTextField
} from 'react-native-material-kit';

// App Globals
import AppConfig from './../config'
import AppStyles from './../styles'

// Todo: proptypes ---------
// 


class InputField extends Component {

	render() {

        let {label, value, keyboardType, maxLength, inputStyle, onChangeText, secureTextEntry, multiline, height, autoFocus, focusNext, returnKeyType}= this.props;

        inputStyle={
            height: 35,
            ...inputStyle
            
        };

        return (
            <MKTextField
                ref='inputField'
                text={value}
                maxLength={maxLength ? maxLength : 100}
                tintColor='rgba(255,255,255,0.2)'
                highlightColor='white'
                underlineSize={1}
                keyboardType={keyboardType}
                placeholder={label}
                password={secureTextEntry}
                floatingLabelEnabled
                placeholderTextColor='rgba(255,255,255,0.6)'
                onChangeText={(value) => onChangeText(value)}
                textInputStyle={{ height: 40, marginTop: 12,fontSize: 14, color: 'white' }}
                style={{ backgroundColor: 'transparent', marginTop: 10 }}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={focusNext}
                returnKeyType={returnKeyType}
            />
        )
	}
}


export default InputField;
