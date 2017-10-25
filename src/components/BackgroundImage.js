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

class BackgroundImage extends Component {

	render() {

        if(this.props.blur)
            return <Image style={[AppStyles.backgroundImage]} source={require('./../../images/bg/bg_blur.png')}>
                {this.props.children}
            </Image>;

		return (

            <Image style={AppStyles.backgroundImage} source={require('./../../images/bg/bg.png')}>
                {this.props.children}
            </Image>
		);
	}
}


export default BackgroundImage;
