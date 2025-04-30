import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Image, TouchableOpacity, View, ImageBackground } from 'react-native'
import { Container, Content, Button, Item, Input, Form, Text, Toast } from "native-base"
import * as GoogleSignIn from 'expo-google-sign-in'
import { COLOR, Images, LAYOUT, Root, Styles } from "../../constants"
import { fetchs } from "../../redux/services"
import { setUserInfo } from "../../redux/actions/authActions"
import Loading from "../../theme/Loading"

const Login = ({ navigation }) => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		pass: '',
		token: ''
	})

	const _syncUserWithStateAsync = async () => {
		const user = await GoogleSignIn.signInSilentlyAsync()
		setLoading(true)
		const formData = new FormData()
		formData.append('email', user.email)
		formData.append('token', user.auth.idToken)
		const { data } = await Api.login(formData)
		const result = await Api.getProfile(formData)
		if (result.data.status === "success") {
			dispatch(setUserInfo({ ...data.userInfo, ...result.data.data[0] }))
		} else {
			dispatch(setUserInfo(data.userInfo))
		}
		setLoading(false)
	}

	// const initAsync = async () => {
	//     await GoogleSignIn.initAsync({ clientId: '274299446199-ma6majcins68frkdm3ler73rp3n4t3r9.apps.googleusercontent.com' })
	//     _syncUserWithStateAsync()
	// }

	const signInAsync = async () => {
		try {
			await GoogleSignIn.askForPlayServicesAsync()
			const { type, user } = await GoogleSignIn.signInAsync()
			if (type === 'success') {
				_syncUserWithStateAsync()
			}
		} catch ({ message }) {
			alert('login: Error:' + message)
		}
	}

	const handleLogin = async () => {
		if (loginInfo.email == "") {
			Toast.show({ text: "Email is Required!", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		} else if (loginInfo.pass == "") {
			Toast.show({ text: "Password is Required!", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		} else {
			setLoading(true)
			const response = await fetchs({ url: Root.login_EndURL, body: loginInfo })
			if (response.status === "failed") {
				Toast.show({ text: response.error_list[0].message, buttonText: "x", type: "danger", duration: 4000, position: 'top' })
			} else if (response['Login Details'][0].flag == '1') {
				let clientData = response['Login Details'][0]
				const clientProfile = await fetchs({
					url: Root.client_profileDetail_EndURL,
					body: { userid: clientData.ClientId }
				})
				if (clientProfile.status === "success") {
					let client = clientProfile.client_profile_details[0]
					dispatch(setUserInfo({
						userid: client["ClientId"],
						email: client["Email"],
						username: client["Username"],
						profile_image: client["Profile Image"],
						location: client["Location"],
						mobile_number: client["Mobile Number"],
						emergency_number: client["Emergency Contact"],
						emergency_name: client["Emergency Name"],
						language_spoken: client["Languages Spoken"],
						perfered_language: client["Perfered Language"],
						preactice_area: client["Preactice Area"],
						flag: 'client',
					}))
				} else {
					console.log(clientProfile)
				}
			} else if (response["Login Details"][0].flag == '2') {
				let attorneyData = response['Login Details'][0]
				const attorneyProfile = await fetchs({
					url: Root.attorney_profileDetail_EndURL,
					body: { userid: attorneyData.ContractorId }
				})
				if (attorneyProfile.status === "success") {
					let attorney = attorneyProfile.contractor_profile_details[0]
					dispatch(setUserInfo({
						userid: attorney["ContractorId"],
						email: attorney["Email"],
						username: attorney["Username"],
						profile_image: attorney["Profile Image"],
						location: attorney["Location"],
						mobile_number: attorney["Mobile Number"],
						language_spoken: attorney["Languages Spoken"],
						perfered_language: attorney["Perfered Language"],
						preactice_area: attorney["Preactice Area"],
						bio: attorney["Bio"],
						flag: 'contractor',
					}))
				} else {
					console.log(attorneyProfile)
				}
			}
			setLoading(false)
		}
	}

	if (loading) {
		return (<Loading />)
	}

	return (
		<Container>
			<ImageBackground source={Images.backgroundimg} style={[Styles.W100P, Styles.H100P]}>
				<Content>
					<Form style={[Styles.MH20, Styles.PB20]}>
						<View style={{ height: 90 }} />
						<Image source={Images.logo} style={{ height: 200, width: 200, alignSelf: 'center' }} />
						<Item regular style={Styles.MT50}>
							<Input
								style={Styles.CLW}
								value={loginInfo.email}
								onChangeText={email => setLoginInfo({ ...loginInfo, email })}
								placeholder="Email/Phone Number"
								placeholderTextColor={COLOR.whiteColor}
							/>
						</Item>
						<Item regular style={Styles.MT10}>
							<Input
								style={{ color: COLOR.whiteColor }}
								secureTextEntry={true}
								value={loginInfo.pass}
								onChangeText={pass => setLoginInfo({ ...loginInfo, pass })}
								placeholder="Password"
								placeholderTextColor={COLOR.whiteColor}
							/>
						</Item>
						<Button onPress={handleLogin} full style={{ height: 65, marginTop: 20, backgroundColor: 'rgb(7, 77, 149)' }}>
							<Text style={Styles.F16}>Login</Text>
						</Button>
						<View style={[Styles.ROW, Styles.Jbetween, Styles.MT20]}>
							<Text style={Styles.CLW} onPress={() => navigation.navigate("forgetPassword")}>Forgot Password?</Text>
							<Text style={Styles.CLW} onPress={() => navigation.navigate("signup")}>Register</Text>
						</View>
						<Text style={[Styles.CLW, Styles.Tcenter, Styles.MT10]}>OR</Text>
						<View style={[Styles.ROW, Styles.Jbetween, Styles.MT20]}>
							<TouchableOpacity>
								<Image source={Images.loginwithFb} style={{ height: 50, width: LAYOUT.window.width * 0.4, resizeMode: 'contain' }} />
							</TouchableOpacity>
							<TouchableOpacity>
								<Image source={Images.loginwithGoogle} style={{ height: 50, width: LAYOUT.window.width * 0.4, resizeMode: 'contain' }} />
							</TouchableOpacity>
						</View>
					</Form>
				</Content>
			</ImageBackground>
		</Container>
	)
}

export default Login