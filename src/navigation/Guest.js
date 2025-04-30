import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Guest/Login'
import SignUp from "../screens/Guest/SignUp"
import AttorneySignUp from "../screens/Guest/AttorneySignUp"
import ForgetPassword from "../screens/Guest/ForgetPassword"

const Guest = createStackNavigator(
	{
		login: { screen: Login },
		signup: { screen: SignUp },
		a_signup: { screen: AttorneySignUp },
		forgetPassword: { screen: ForgetPassword },
	},
	{
		initialRouteName: 'login',
		headerMode: "none"
	}
)

export default createAppContainer(Guest)