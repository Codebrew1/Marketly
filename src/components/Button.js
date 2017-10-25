import React, { Component } from 'react';
import { Button as ElementsButton } from 'react-native-elements';

// App Globals
import AppConfig from './../config'
import AppStyles from './../styles'

// Todo: proptypes

class Button extends Component {

	render() {

		const {title, type, loading, onPress}= this.props;
		return (
			
			<ElementsButton
                title={title}
                onPress={onPress}
                loading={loading}
                raised
                small
                fontWeight='500'
                fontSize={14}
                borderRadius={4}
                fontFamily={AppConfig.baseFont}
                containerViewStyle={AppStyles.btnCon}
                buttonStyle={{backgroundColor: (type=='primary') ? AppConfig.primaryColorBTN : AppConfig.secondaryColorBTN , padding: 15 }}
            />
		);
	}
}



export default Button;
