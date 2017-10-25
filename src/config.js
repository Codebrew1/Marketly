/**
 * Global App Config
 *
 */
'use strict';

import Dimensions from 'Dimensions';
var window = Dimensions.get('window');

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

let AppConfig = {
	// App Details
	appName: 'Marketly',
	baseAPIUrl: 'http://35.163.236.101:8002/',

	// Window Dimensions
	windowHeight: window.height,
	windowWidth: window.width,

	// Grid
	windowWidthHalf: window.width * 0.5,
	windowWidthYhird: window.width * 0.333,
	windowWidthYwoThirds: window.width * 0.666,
	windowWidthQuarter: window.width * 0.25,
	windowWidthThreeQuarters: window.width * 0.75,

	//Instagram
	InstagramClientId: '2d7a3c9d36c4403a9d89ee21fd3d07d4',


	// Fonts
	baseFont: "Open Sans",
	baseFontSize: 14,


	// Colors
	prominentColor: '#1f233c',
	prominentColorLight: '#343855',
	primaryColor: "#dc3352",
	primaryColorBTN: 'rgba(171,55,83,0.9)',
	secondaryColor: "#257f87",
	secondaryColorBTN: 'rgba(37,127,135,0.9)',
	textColor: "#555",
	borderColor: "#E7E7E7",
}

export let navigatorStyle= {
	navBarBackgroundColor: AppConfig.prominentColor,
	screenBackgroundColor: AppConfig.prominentColor,
	statusBarTextColorSchemeSingleScreen: 'light',
	navBarTextColor: 'white',
	navBarTextFontFamily: 'Open Sans',
	navBarButtonColor: 'white',
	statusBarColor: AppConfig.prominentColor
}

export default AppConfig;