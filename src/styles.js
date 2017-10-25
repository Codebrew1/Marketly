/**
 * Global App Styles
 *
 */
'use strict';

import {
  StyleSheet,
} from 'react-native';

// App Globals
import AppConfig from './config';

/* Styles ==================================================================== */
module.exports = StyleSheet.create({

    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceAroundContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    /* Grid */
    row: {
        left: 0,
        right: 0,
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    flex3: {
        flex: 3,
    },
    flex4: {
        flex: 4,
    },
    flex5: {
        flex: 5,
    },
    flex6: {
        flex: 6,
    },
    flex7: {
        flex: 7,
    },
    flex8: {
        flex: 8,
    },

    /* Text Styles */
    baseText: {
        fontFamily: AppConfig.baseFont,
        fontWeight: '500',
        color: AppConfig.textColor,
        fontSize: AppConfig.baseFontSize,
        lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
    },
    h1: {
        fontFamily: AppConfig.baseFont,
        fontSize: AppConfig.baseFontSize * 2,
        lineHeight: parseInt((AppConfig.baseFontSize * 2) + (AppConfig.baseFontSize * 0.5)),
        color: 'white',
        fontWeight: '800',
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
    },
    h2: {
        fontFamily: AppConfig.baseFont,
        color: 'white',
        fontSize: AppConfig.baseFontSize * 1.5,
        lineHeight: parseInt((AppConfig.baseFontSize * 1.5) + (AppConfig.baseFontSize * 0.5)),
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    h3: {
        fontFamily: AppConfig.baseFont,
        fontWeight: '500',
        color: 'white',
        fontSize: AppConfig.baseFontSize * 1.25,
        lineHeight: parseInt((AppConfig.baseFontSize * 1.25) + (AppConfig.baseFontSize * 0.5)),
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    h4: {
        fontFamily: AppConfig.baseFont,
        fontWeight: '600',
        color: 'white',
        fontSize: AppConfig.baseFontSize * 1.1,
        lineHeight: parseInt((AppConfig.baseFontSize * 1.1) + (AppConfig.baseFontSize * 0.5)),
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    p: {
        fontFamily: AppConfig.baseFont,
        marginBottom: 8,
        fontWeight: '500',
        color: 'white',
        fontSize: AppConfig.baseFontSize,
        lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
        backgroundColor: 'transparent'
    },
    strong: {
        fontWeight: '900',
    },
    /* Give me padding */
    paddingHorizontal: {
        paddingHorizontal: 20,
    },
    paddingLeft: {
        paddingLeft: 20,
    },
    paddingRight: {
        paddingRight: 20,
    },
    paddingVertical: {
        paddingVertical: 20,
    },
    paddingTop: {
        paddingTop: 20,
    },
    paddingBottom: {
        paddingBottom: 20,
    },
    paddingHorizontalSml: {
        paddingHorizontal: 10,
    },
    paddingLeftSml: {
        paddingLeft: 10,
    },
    paddingRightSml: {
        paddingRight: 10,
    },
    paddingVerticalSml: {
        paddingVertical: 10,
    },
    paddingTopSml: {
        paddingTop: 10,
    },
    paddingBottomSml: {
        paddingBottom: 10,
    },
    paddingHorizontal8: {
        paddingHorizontal: 8,
    },
    /* General Spacing */
    hr: {
        left: 0,
        right: 0,
        borderBottomWidth: 1,
        borderBottomColor: AppConfig.borderColor,
        height: 1,
        backgroundColor: 'transparent',
        marginTop: 20,
        marginBottom: 20,
    },
    spacer_5: {
        left: 0, right: 0, height: 1,
        marginTop: 5,
    },
    spacer_10: {
        left: 0, right: 0, height: 1,
        marginTop: 10,
    },
    spacer_15: {
        left: 0, right: 0, height: 1,
        marginTop: 15,
    },
    spacer_20: {
        left: 0, right: 0, height: 1,
        marginTop: 20,
    },
    spacer_25: {
        left: 0, right: 0, height: 1,
        marginTop: 25,
    },
    spacer_30: {
        left: 0, right: 0, height: 1,
        marginTop: 30,
    },
    spacer_40: {
        left: 0, right: 0, height: 1,
        marginTop: 40,
    },
    btnCon:{
        backgroundColor: 'transparent',
        borderRadius: 4,
        marginLeft: 0,
        marginRight: 0
    },
    backgroundImage: {
        flex: 1,
        height: AppConfig.windowHeight,
        width: AppConfig.windowWidth,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    logoText:{
        fontFamily: AppConfig.baseFont,
        fontSize: 25,
        paddingTop: 10,
        color: 'white',
        backgroundColor: 'transparent'
    },
     logoTextSml:{
        fontFamily: AppConfig.baseFont,
        fontSize: 16,
        paddingTop: 7,
        color: 'white',
        backgroundColor: 'transparent'
    },
    p2: {
        fontFamily: AppConfig.baseFont,
        fontWeight: '400',
        color: 'white',
        fontSize: AppConfig.baseFontSize,
        lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
        backgroundColor: 'transparent'
    },
    hide:{
        opacity:0
    },
    show:{
        opacity: 1
    },
});