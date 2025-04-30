import React from "react"
import { useSelector } from "react-redux"
import Guest from "./Guest"
import Client from "./Client"
import Attorney from "./Attorney"
import { Text } from "native-base"

export default () => {
	const { isLogin, user } = useSelector(state => state.auth)
	if (!isLogin) {
		return <Guest />
	} else if (user.flag === 'client') {
		return <Client />
	} else if (user.flag === 'contractor') {
		return <Attorney />
	} else {
		return <Text>not flag</Text>
	}
}