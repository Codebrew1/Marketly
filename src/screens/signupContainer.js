import React, {Component} from 'react';


import InfluencerSignup from '../components/InfluencerSignup'
import BusinessSignup from '../components/BusinessSignup'


import * as signupActions from '../actions/signupActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class signupContainer extends Component {

    render() {

        let {userType, actions}= this.props;

        if(userType == 'influencer')
            return <InfluencerSignup {...this.props} />
        else
            return <BusinessSignup {...this.props} />

    }
}

function mapStateToProps(state, ownProps) {
    return {
        signup: state.signup
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(signupActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(signupContainer);