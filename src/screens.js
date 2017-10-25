import { Navigation } from 'react-native-navigation';

import guest from './screens/guest';
import home from './screens/home';
import influencerList from './screens/influencerList';
import userProfile from './screens/userProfile';
import defaultPage from './screens/defaultPage';
import login from './screens/login';
import settings from './screens/settings';
import signupContainer from './screens/signupContainer';
import verifyEmail from './screens/verifyEmail';
import forgotPassword from './screens/forgotPassword';
import createService from './screens/createService';
import createPost from './screens/createPost';
import cart from './screens/cart';
import notifications from './screens/notifications';
import serviceReview from './screens/serviceReview';
import serviceDetails from './screens/serviceDetails';
import paymentDetails from './screens/paymentDetails';
import addCard from './screens/addCard';
import Navbar from './components/Navbar';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('guest', () => guest, store, Provider);
	Navigation.registerComponent('home', () => home, store, Provider);
	Navigation.registerComponent('user-profile', () => userProfile, store, Provider);
	Navigation.registerComponent('login', () => login, store, Provider);
	Navigation.registerComponent('signup', () => signupContainer, store, Provider);
	Navigation.registerComponent('verify-email', () => verifyEmail, store, Provider);
	Navigation.registerComponent('forgot-password', () => forgotPassword, store, Provider);
	Navigation.registerComponent('default-page', () => defaultPage, store, Provider);
	Navigation.registerComponent('settings', () => settings, store, Provider);
	Navigation.registerComponent('influencer-list', () => influencerList, store, Provider);
	Navigation.registerComponent('create-service', () => createService, store, Provider);
	Navigation.registerComponent('create-post', () => createPost, store, Provider);
	Navigation.registerComponent('cart', () => cart, store, Provider);
	Navigation.registerComponent('notifications', () => notifications, store, Provider);
	Navigation.registerComponent('service-review', () => serviceReview, store, Provider);
	Navigation.registerComponent('service-details', () => serviceDetails, store, Provider);
	Navigation.registerComponent('payment-details', () => paymentDetails, store, Provider);
	Navigation.registerComponent('add-card', () => addCard, store, Provider);

	// Cart Button
	Navigation.registerComponent('navbar', () => Navbar, store, Provider);

}
