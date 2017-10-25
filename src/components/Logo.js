import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

// App Globals
import AppConfig from './../config'
import AppStyles from './../styles'

// Todo: proptypes

class Logo extends Component {

    renderLogo= () => {
        if(this.props.small)
            return <Image source={require('./../../images/logo/logo_m.png')} />;
        else
           return <Image source={require('./../../images/logo/logo_b.png')} />
    }

	render() {         

		return (

            <View style={this.props.containerStyle} >

                {this.renderLogo()}
                <Text style={(this.props.small) ? AppStyles.logoTextSml : AppStyles.logoText}>{AppConfig.appName}</Text>
            </View>
		);
	}
}


export default Logo;
