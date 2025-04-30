import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import { LAYOUT } from "../constants"
import SideMenu from "./SideMenu"
import Aboutus from "../screens/Public/Aboutus"
import Support from "../screens/Public/Support"
import Payment from "../screens/Public/Payment"
import Messages from "../screens/Public/Messages"
import MessageDetails from "../screens/Public/MessageDetails"

import PendingRequest from "../screens/Attorney/PendingRequest"
import MyRequest from "../screens/Attorney/MyRequest"
import Profile from "../screens/Attorney/Profile"
import ProfileUpdate from "../screens/Attorney/ProfileUpdate"
import UpdatePassword from "../screens/Attorney/UpdatePassword"
import ServiceInProgress from "../screens/Attorney/ServiceInProgress"
import EndTask from "../screens/Attorney/EndTask"
import Subscription from "../screens/Attorney/Subscription"

const Attorney = createStackNavigator(
	{
		pendingrequest: { screen: PendingRequest },
		myrequest: { screen: MyRequest },
		messages: { screen: Messages },
		msgdetails: { screen: MessageDetails },
		payment: { screen: Payment },
		profile: { screen: Profile },
		profileupdate: { screen: ProfileUpdate },
		support: { screen: Support },
		about: { screen: Aboutus },
		updatepassword: { screen: UpdatePassword },
		serviceinprogress: { screen: ServiceInProgress },
		endtask: { screen: EndTask },
		subscription: { screen: Subscription },
	},
	{
		initialRouteName: "pendingrequest",
		headerMode: "none"
	}
)

const RootStack = createDrawerNavigator({
	Home: { screen: Attorney },
}, {
	contentComponent: SideMenu,
	drawerWidth: LAYOUT.window.width * .85,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
})

export default createAppContainer(RootStack)