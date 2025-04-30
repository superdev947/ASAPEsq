import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import { LAYOUT } from "../constants"
import SideMenu from "./SideMenu"
import Aboutus from "../screens/Public/Aboutus"
import Support from "../screens/Public/Support"
import Payment from "../screens/Public/Payment"
import MessageDetails from "../screens/Public/MessageDetails"
import Messages from "../screens/Public/Messages"

import ConfirmRequest from "../screens/Client/ConfirmRequest"
import MyRequest from "../screens/Client/MyRequest"
import Profile from "../screens/Client/Profile"
import ProfileUpdate from "../screens/Client/ProfileUpdate"
import Receipt from "../screens/Client/Receipt"
import RequestInProgress from "../screens/Client/RequestInProgress"
import Rating from "../screens/Client/Rating"
import UpdatePassword from "../screens/Client/UpdatePassword"
import RequestAttoreny from "../screens/Client/RequestAttoreny"

const Cient = createStackNavigator(
	{
		requestattorney: { screen: RequestAttoreny },
		myrequest: { screen: MyRequest },
		messages: { screen: Messages },
		payment: { screen: Payment },
		profile: { screen: Profile },
		support: { screen: Support },
		about: { screen: Aboutus },

		inProgress: { screen: RequestInProgress },
		rating: { screen: Rating },
		msgdetails: { screen: MessageDetails },
		confirmrequest: { screen: ConfirmRequest },
		receipt: { screen: Receipt },
		profileupdate: { screen: ProfileUpdate },
		updatepassword: { screen: UpdatePassword },
	},
	{
		initialRouteName: "requestattorney",
		headerMode: "none"
	}
)

const RootStack = createDrawerNavigator({
	Home: { screen: Cient },
}, {
	contentComponent: SideMenu,
	drawerWidth: LAYOUT.window.width * .75,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
})

export default createAppContainer(RootStack)