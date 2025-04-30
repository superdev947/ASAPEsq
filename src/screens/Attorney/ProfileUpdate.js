import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Image, Text, View } from "react-native"
import { Button, Container, Content, Form, Icon, Input, Item, Textarea, Toast } from "native-base"
import { Images, LAYOUT, Root, Styles } from "../../constants"
import { fetchs } from "../../redux/services"
import { updateUserInfo } from "../../redux/actions/authActions"
import Headers from "../../theme/Headers"
import normalize from "react-native-normalize"
import DropDownPicker from 'react-native-dropdown-picker'
const ProfileUpdate = ({ navigation }) => {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	const [userInfo, setUserInfo] = useState(user)
	const [request, setRequest] = useState('24-hour')
	const [distanceUnit, setDistanceUnit] = useState('KM')
	const [open, setOpen] = useState(false)
	const [language, setLanguage] = useState([])

	const updateProfileApicall = async () => {
		const language_spoken = JSON.stringify(language)
		const response = await fetchs({
			url: Root.attorney_updateProfile_EndURL, body: {
				userid: userInfo.userid,
				email: userInfo.email,
				username: userInfo.username,
				location: userInfo.location,
				mobile_number: userInfo.mobile_number,
				language_spoken,
				profile_pic: userInfo.imageStr,
				emergency_number: userInfo.emergency_number,
				emergency_name: userInfo.emergency_name,
				bio: userInfo.bio,
				perfered_language: userInfo.perfered_language,
				preactice_area: userInfo.preactice_area,
			}
		})
		if (response.status == "success") {
			setUserInfo({ ...userInfo, language_spoken })
			dispatch(updateUserInfo({ ...userInfo, language_spoken }))
			navigation.navigate('profile')
			Toast.show({ text: "Successfully Updated!", buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
		} else {
			Toast.show({ text: response.status_message, buttonText: "x", type: "danger", duration: 4000, position: 'top' })
		}
	}

	useEffect(() => {
		try {
			setLanguage(JSON.parse(userInfo.language_spoken))
		} catch (error) {
			setLanguage([])
		}
	}, [])
	

	return (
		<Container>
			<Headers
				title="Update Profile"
				event={() => navigation.goBack()}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F35]} />}
			/>
			<Content>
				<Image learge source={Images.profileimg} style={{ marginTop: 10, borderColor: "rgb(196, 196, 196)", borderWidth: 13, overflow: "hidden", height: 100, width: 100, borderRadius: 100 / 2, alignSelf: 'center' }} />
				<Text style={{ fontSize: 22, color: 'rgb(72, 72, 72)', textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>{userInfo.username}</Text>
				<Form style={{ marginLeft: 15, marginRight: 15, marginTop: 15 }}>
					<View style={[Styles.ROW]}>
						<Icon type="Fontisto" name="email" size={24} style={[{color:'grey', fontSize:24}, Styles.MH10]} />
						<Text style={{ fontWeight: 'bold' }}>Email</Text>
					</View>
					<Item>
						<Input placeholder={'email'} onChangeText={e => setUserInfo({ ...userInfo, email: e })} value={userInfo.email} />
					</Item>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
						<Icon type="FontAwesome" name="location-arrow" size={24} style={[{color:'grey', fontSize:24}, Styles.MH10]} />
						<Text style={{ fontWeight: 'bold' }}>Location</Text>
					</View>
					<Item>
						<Input placeholder={'location'} onChangeText={e => setUserInfo({ ...userInfo, location: e })} value={userInfo.location} />
					</Item>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
						<Icon type="Feather" name="phone" style={[{color:'grey', fontSize:24}, Styles.MH10]} />
						<Text style={{ fontWeight: 'bold' }}>Mobile Number</Text>
					</View>
					<Item>
						<Input placeholder={'Mobile'} onChangeText={e => setUserInfo({ ...userInfo, mobile_number: e })} value={userInfo.mobile_number} />
					</Item>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
						<Image source={Images.face} style={[{ height: 24, width: 24 }, Styles.MH10]} tintColor="grey"/>
						<Text style={{ fontWeight: 'bold' }}>Preferred Language</Text>
					</View>
					<Item>
						<Input placeholder={'Preferred Language'} onChangeText={e => setUserInfo({ ...userInfo, perfered_language: e })} value={userInfo.perfered_language} />
					</Item>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
						<Image source={Images.language} style={[{ height: 24, width: 24 }, Styles.MH10]} tintColor="grey"/>
						<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Languages Spoken</Text>
					</View>
					<DropDownPicker
						multiple={true}
						searchable={true}
						mode="BADGE"
						open={open}
						setOpen={setOpen}
						value={language}
						setValue={setLanguage}
						items={LAYOUT.LanguageList}
						style={{ borderColor: '#D3D3D3', borderRadius: 0, borderWidth: 0, borderBottomWidth: 1 }}
					/>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter, Styles.ML5]} >
						<Image source={Images.stopWatch} style={[{ height: 24, width: 24 }, Styles.MH10]} tintColor="grey"/>
						<Text style={{ fontWeight: 'bold' }}>Time Clock</Text>
					</View>
					<View style={{ borderBottomWidth: 0.3, paddingBottom: 8, borderColor: '#D3D3D3', marginLeft: 10 }}>
						<View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, height: 30, width: 150, backgroundColor: 'rgb(236,236,236)' }}>
							<View style={{ backgroundColor: request == '24-hour' ? '#fff' : 'rgb(236,236,236)', marginTop: 2, marginBottom: 2, marginLeft: 1, width: '45%' }}>
								<Text onPress={() => setRequest("24-hour")} style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>24-hour</Text>
							</View>
							<View style={{ backgroundColor: request == '12-hour' ? '#fff' : 'rgb(236,236,236)', marginTop: 1, marginBottom: 1, marginLeft: 1, width: '45%' }}>
								<Text onPress={() => setRequest("12-hour")} style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>12-hour</Text>
							</View>
						</View>
					</View>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter, Styles.ML5]} >
						<Image source={Images.speedIcon} style={[{ height: 24, width: 24, resizeMode:'contain' }, Styles.MH10]} tintColor="grey"/>
						<Text style={{ fontWeight: 'bold' }}>KM or Miles</Text>
					</View>
					<View style={{ borderBottomWidth: 0.3, paddingBottom: 8, borderColor: '#D3D3D3', marginLeft: 10 }}>
						<View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, height: 30, width: 150, backgroundColor: 'rgb(236,236,236)' }}>
							<View style={{ backgroundColor: distanceUnit == 'KM' ? '#fff' : 'rgb(236,236,236)', marginTop: 2, marginBottom: 2, marginLeft: 1, width: '45%' }}>
								<Text onPress={() => setDistanceUnit("KM")} style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>KM</Text>
							</View>
							<View style={{ backgroundColor: distanceUnit == 'Miles' ? '#fff' : 'rgb(236,236,236)', marginTop: 1, marginBottom: 1, marginLeft: 1, width: '45%' }}>
								<Text onPress={() => setDistanceUnit("Miles")} style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>Miles</Text>
							</View>
						</View>
					</View>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter, Styles.ML5]}>
						<Image source={Images.p4} style={[{ height: 27, width: 27 }, Styles.MH10]} />
						<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Practice Areas</Text>
					</View>
					<Item>
						<Textarea onChangeText={e => setUserInfo({ ...userInfo, preactice_area: e })} value={userInfo.preactice_area} />
					</Item>
					<View style={[Styles.ROW, Styles.MT15, Styles.Acenter, Styles.ML5]}>
						<Image source={Images.p5} style={[{ height: 30, width: 30 }, Styles.MH10]} />
						<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Brief Bio</Text>
					</View>
					<Item>
						<Textarea onChangeText={e => setUserInfo({ ...userInfo, bio: e })} value={userInfo.bio} />
					</Item>
					<View style={{ marginLeft: 20, marginRight: 20 }}>
						<Button onPress={updateProfileApicall} full style={{ height: 50, marginTop: 20, backgroundColor: 'rgb(7, 77, 149)' }}>
							<Text style={{ fontSize: 16, color: "white" }}>UPDATE NOW</Text>
						</Button>
					</View>
					<View style={{ height: 20 }} />
				</Form>
			</Content>
		</Container>
	)
}

export default ProfileUpdate