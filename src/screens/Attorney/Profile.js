import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity, Image, View, Text, Alert } from "react-native"
import { Container, Content, Item, Input, Form, Toast, Icon, Textarea } from "native-base"
import { Images, LAYOUT, Root, Styles } from '../../constants'
import { fetchs } from '../../redux/services'
import Headers from '../../theme/Headers'
import { LogOut } from '../../redux/actions/authActions'
import normalize from 'react-native-normalize'
import DropDownPicker from 'react-native-dropdown-picker'

const Profile = ({ navigation }) => {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	const [open, setOpen] = useState(false)
	const [languageSpoken, setLanguageSpoken] = useState([])

	const deleteButtonAlert = () => {
		Alert.alert(
			'Delete Account',
			'Are you sure you want to delete your account?',
			[
				{ text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
				{ text: 'YES', onPress: () => deleteAccountClientApiCall() },
			]
		)
	}

	const deleteAccountClientApiCall = async () => {
		const response = await fetchs({
			url: Root.attorney_DeleteAccount_EndURL, body: {
				contractor_id: user.userid
			}
		})
		if (response.status == "success") {
			dispatch(LogOut())
		} else {
			Toast.show({ text: response.status_message, buttonText: "x", type: "danger", duration: 4000, position: 'top' })
		}
	}

	useEffect(() => {
		try {
			const language_spoken = JSON.parse(user.language_spoken)
			setLanguageSpoken(language_spoken)
		} catch (error) {
			setLanguageSpoken([])
		}
	}, [user])

	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="My Profile" />
			<Content>
				<View style={{ zIndex: 0, minHeight: 800 }}>
					<View style={{ backgroundColor: 'rgb(236,236,236)', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{ fontSize: 20, marginTop: 5 }}>Profile Details</Text>
							<TouchableOpacity onPress={() => navigation.navigate('profileupdate')}>
								<Image source={Images.editicon} style={{ height: 40, width: 40 }} />
							</TouchableOpacity>
						</View>
					</View>
					<Image learge source={Images.profileimg} style={{ marginTop: 10, borderColor: "rgb(196, 196, 196)", borderWidth: 13, overflow: "hidden", height: 100, width: 100, borderRadius: 100 / 2, alignSelf: 'center' }} />
					<Text style={{ fontSize: 22, color: 'rgb(72, 72, 72)', textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>{user.username}</Text>
					<Form style={{ marginLeft: 15, marginRight: 15, marginTop: 10 }}>
						<View style={[Styles.ROW, Styles.Acenter]}>
							<Icon type="Fontisto" name="email" size={24} style={[{color:'grey', fontSize:24}, Styles.MH10]} />
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Email</Text>
						</View>
						<Item>
							<Input style={{ color: '#c2c2c2' }} editable={false} value={user.email} />
						</Item>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Icon type="FontAwesome" name="location-arrow" size={24} style={[{color:'grey', fontSize:24}, Styles.MH10]} />
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Location</Text>
						</View>
						<Item>
							<Input style={{ color: '#c2c2c2' }} editable={false} value={user.location} />
						</Item>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Icon type="Feather" name="phone" style={[{color:'grey', fontSize:24}, Styles.MH10]} />
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Mobile Number</Text>
						</View>
						<Item>
							<Input style={{ color: '#c2c2c2' }} editable={false} value={user.mobile_number} />
						</Item>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Image source={Images.face} style={[{ height: 24, width: 24 }, Styles.MH10]} tintColor="grey"/>
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Preferred Language</Text>
						</View>
						<Item>
							<Input style={{ color: '#c2c2c2' }} editable={false} value={user.perfered_language} />
						</Item>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Image source={Images.language} style={[{ height: 24, width: 24 }, Styles.MH10]} tintColor="grey"/>
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Languages Spoken</Text>
						</View>
						<DropDownPicker
							multiple={true}
							searchable={true}
							disabled
							mode="BADGE"
							open={open}
							value={languageSpoken}
							setOpen={setOpen}
							items={LAYOUT.LanguageList}
							style={{ borderColor: '#D3D3D3', borderRadius: 0, borderWidth: 0, borderBottomWidth: 1 }}
						/>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Image source={Images.stopWatch} style={[{ height: 24, width: 24 }, Styles.MH10]} tintColor="grey"/>
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Time Clock</Text>
						</View>
						<View style={{ borderBottomWidth: 0.3, paddingBottom: 8, borderColor: '#D3D3D3' }}>
							<View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, height: 30, width: 150, backgroundColor: 'rgb(236,236,236)' }}>
								<View style={{ backgroundColor: '#fff', marginTop: 2, marginBottom: 2, marginLeft: 1, width: '45%' }}>
									<Text style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>24-hour</Text>
								</View>
								<View style={{ backgroundColor: 'rgb(236,236,236)', marginTop: 1, marginBottom: 1, marginLeft: 1, width: '45%' }}>
									<Text style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>12-hour</Text>
								</View>
							</View>
						</View>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Image source={Images.speedIcon} style={[{ height: 24, width: 24, resizeMode:'contain' }, Styles.MH10]} tintColor="grey"/>
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>KM or Miles</Text>
						</View>
						<View style={{ borderBottomWidth: 0.3, paddingBottom: 8, borderColor: '#D3D3D3' }}>
							<View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, height: 30, width: 150, backgroundColor: 'rgb(236,236,236)' }}>
								<View style={{ backgroundColor: '#fff', marginTop: 2, marginBottom: 2, marginLeft: 1, width: '45%' }}>
									<Text style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>KM</Text>
								</View>
								<View style={{ backgroundColor: 'rgb(236,236,236)', marginTop: 1, marginBottom: 1, marginLeft: 1, width: '45%' }}>
									<Text style={{ textAlign: 'center', fontSize: 13, marginTop: 7, marginBottom: 7 }}>Miles</Text>
								</View>
							</View>
						</View>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Image source={Images.p4} style={[{ height: 27, width: 27 }, Styles.MH10]} />
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Practice Areas</Text>
						</View>
						<Item>
							<Textarea style={{ color: '#c2c2c2' }} disabled value={user.preactice_area} />
						</Item>
						<View style={[Styles.ROW, Styles.MT15, Styles.Acenter]}>
							<Image source={Images.p5} style={[{ height: 30, width: 30 }, Styles.MH10]} />
							<Text style={{ fontWeight: 'bold', marginTop: 5 }}>Brief Bio</Text>
						</View>
						<Item>
							<Textarea style={{ color: '#c2c2c2' }} disabled value={user.bio} />
						</Item>
						<TouchableOpacity onPress={() => navigation.navigate('updatepassword')} style={{ padding: 10, backgroundColor: 'rgb(236,236,236)', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
							<Text>Change Password</Text>
							<Icon type="Feather" name="chevron-right" style={[Styles.CLbk, Styles.F20]} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => deleteButtonAlert()} style={{ padding: 10, backgroundColor: 'rgb(236,236,236)', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
							<Text>Delete Account</Text>
							<Icon type="Feather" name="chevron-right" style={[Styles.CLbk, Styles.F20]} />
						</TouchableOpacity>
						<View style={{ height: 20 }} />
					</Form>
				</View>
			</Content>
		</Container>
	)
}

export default Profile