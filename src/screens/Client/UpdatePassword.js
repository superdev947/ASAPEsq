import React, { useState } from "react"
import { useSelector } from "react-redux"
import { View } from 'react-native'
import { Container, Text, Content, Button, Form, Item, Input, Toast, Icon } from "native-base"
import { Root, Styles } from "../../constants"
import { fetchs } from "../../redux/services"
import Headers from "../../theme/Headers"

const UpdatePassword = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const [state, setState] = useState({
		newPassword: '',
		password: '',
		cpassword: '',
	})

	const changePasswordClientApiCall = async () => {
		if (state.password == "") {
			Toast.show({ text: "old password is Required!", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		} else if (state.newPassword == "") {
			Toast.show({ text: "New Password is Required!", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		} else if (state.cpassword == "") {
			Toast.show({ text: "Confirm Password is Required!", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		} else if (state.cpassword !== state.newPassword) {
			Toast.show({ text: "Confirm Password is not match!", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		} else {
			const response = await fetchs({
				url: Root.client_UpdatePassword_EndURL, body: {
					userid: user.userid,
					oldpassword: state.password,
					newpassword: state.newPassword,
				}
			})
			if (response.status == "success") {
				navigation.navigate('profile')
				Toast.show({ text: response.message, buttonText: "x", type: "success", duration: 4000, position: 'bottom' })
			} else {
				Toast.show({ text: response.message, buttonText: "x", type: "danger", duration: 4000, position: 'bottom' })
			}
		}
	}

	return (
		<Container>
			<Headers
				title="Update Password"
				event={() => navigation.goBack()}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F35]} />}
			/>
			<Content>
				<Form style={{ marginLeft: 15, marginRight: 15, marginTop: 15 }}>
					<Text style={{ marginLeft: 15 }}>Old Password</Text>
					<Item style={{ marginTop: 10 }}>
						<Input
							value={state.password}
							onChangeText={e => setState({ ...state, password: e })}
							placeholderTextColor='#c2c2c2'
							placeholder='Enter Here'
							secureTextEntry={true}
						/>
					</Item>
					<Text style={{ marginTop: 10, marginLeft: 15 }}>New Password</Text>
					<Item style={{ marginTop: 10 }}>
						<Input
							value={state.newPassword}
							onChangeText={e => setState({ ...state, newPassword: e })}
							placeholderTextColor='#c2c2c2'
							placeholder='Enter Here'
							secureTextEntry={true}
						/>
					</Item>
					<Text style={{ marginTop: 10, marginLeft: 15 }}>Confirm New Password</Text>
					<Item style={{ marginTop: 10 }}>
						<Input
							value={state.cpassword}
							onChangeText={e => setState({ ...state, cpassword: e })}
							placeholderTextColor='#c2c2c2'
							placeholder='Enter Here'
							secureTextEntry={true}
						/>
					</Item>
					<View style={{ marginLeft: 20, marginRight: 20 }}>
						<Button onPress={changePasswordClientApiCall} full style={{ height: 50, marginTop: 20, backgroundColor: 'rgb(7, 77, 149)' }}>
							<Text style={{ fontSize: 16 }}>UPDATE</Text>
						</Button>
					</View>
					<View style={{ height: 20 }} />
				</Form>
			</Content>
		</Container>
	)
}

export default UpdatePassword
