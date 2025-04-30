import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, Button, Text, Footer, Icon, Item, Input } from "native-base"
import MapView, { Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { COLOR, Images, LAYOUT, Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { fetchs, GetCardType } from "../../redux/services"
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import normalize from "react-native-normalize"

const ConfirmRequest = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const mapAutoComplete = useRef(null)
	const request = navigation.state.params
	const [state, setState] = useState({
		mapRegion: {
			latitude: request.latitude,
			longitude: request.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		},
		coordinate: {
			latitude: request.latitude,
			longitude: request.longitude,
		},
		hasLocationPermissions: false,
		locationResult: null,
	})
	const [card, setCard] = useState(null)
	const [isDatePicker, setDatePicker] = useState(false)
	const [date, setDate] = useState(null)

	const loadList = async () => {
		const response = await fetchs({ url: Root.client_fetchCardsData_EndURL, body: { user_id: user.userid } })
		if (response.status === "success") {
			if (response.payment_details && response.payment_details.length) {
				const carddata = response.payment_details.find(e => e.Flag === '1')
				if (carddata) {
					setCard(carddata)
				} else {
					setCard(null)
				}
			}
		} else {
			console.log(response)
		}
	}

	const confirm = async () => {
		let datetime = (date ? date : new Date())
		const body = {
			...request,
			request_date: moment(datetime).format('MMM DD, YYYY hh:mm A'),
			user_id: user.userid
		}
		console.log(body)
		const response = await fetchs({ url: Root.client_Request_EndURL, body })
		console.log(response);
		if (response.status === 'success') {
			Alert.alert(
				"Alert",
				"Your request has been sent to nearby attorneys. Once an attorney accepts your request, we will notify you. You can check on your requests in the My Requests tab.",
				[
					{
						text: 'OK',
						onPress: () => navigation.navigate("requestattorney")
					}
				]
			)
		}
	}

	useEffect(() => {
		loadList()
		mapAutoComplete.current?.setAddressText(request.map_input_text)
	}, [navigation])

	return (
		<Container>
			<Headers
				title="Confirm Request"
				event={() => navigation.goBack()}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F30]} />}
			/>
			<Content style={{ backgroundColor: 'blue' }}>
				<DateTimePickerModal
					isVisible={isDatePicker}
					mode="datetime"
					onConfirm={e => {
						setDate(e)
						setDatePicker(false)
					}}
					onCancel={() => setDatePicker(false)}
				/>
				<View style={{ backgroundColor: COLOR.primary }}>
					<GooglePlacesAutocomplete
						placeholder='Location'
						minLength={2}
						autoFocus={false}
						returnKeyType={'search'}
						keyboardAppearance={'light'}
						listViewDisplayed='false'
						fetchDetails={true}
						renderDescription={row => row.description}
						ref={mapAutoComplete}
						onPress={(data, details = null) => {
							setState({
								...state,
								formatted_address: details.formatted_address,
								mapRegion: {
									latitude: details.geometry.location.lat,
									longitude: details.geometry.location.lng,
									latitudeDelta: 0.0922,
									longitudeDelta: 0.0421
								},
								coordinate: {
									latitude: details.geometry.location.lat,
									longitude: details.geometry.location.lng
								}
							})
						}}
						query={{ key: LAYOUT.googleMapsApiKey, language: 'en' }}
						styles={LAYOUT.googleMapsStyle}
						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={200}
						renderLeftButton={() =>
							<View style={[Styles.Jcenter, Styles.PL10]}>
								<Icon type="Entypo" name="controller-record" style={[Styles.F18, { color: '#00c100', }]} />
							</View>
						}
						renderRightButton={() =>
							<View style={[Styles.Jcenter, Styles.PR10]}>
								<Icon type="MaterialIcons" name="location-pin" style={[Styles.F30, { color: '#b6b6b6' }]} />
							</View>
						}
					/>
					{date ?
						<Item style={[Styles.PL10]}>
							<Icon type="Entypo" name="controller-record" style={[Styles.F18, { color: '#00c100' }]} />
							<Input defaultValue={moment(date).format('MMM DD, YYYY hh:mm A')} style={{ color: '#fff', backgroundColor: COLOR.primary, fontSize: normalize(20) }} />
							<Icon type="AntDesign" name="calendar" style={[Styles.F26, { color: '#b6b6b6' }]} />
						</Item>
						: null}
				</View>
				<MapView style={[Styles.googleMap, { height: LAYOUT.window.height * 0.7 }]} region={state.mapRegion}>
					{state.coordinate ?
						<Marker coordinate={state.coordinate} />
						: null}
				</MapView>
			</Content>
			<View style={Styles.ROW}>
				<View style={[Styles.W50P, Styles.AScenter]}>
					<Text style={[Styles.FW700, Styles.F18, Styles.AScenter]}> Your Fee </Text>
					<Text style={[Styles.F18, Styles.MT10, Styles.AScenter]}> $ {request.payment} </Text>
				</View>
				<View style={[Styles.W50P, Styles.AScenter, { borderLeftWidth: 0.5 }]}>
					{
						card ?
							<TouchableOpacity onPress={() => navigation.navigate('payment', { isback: true })}>
								<Image learge source={Images.visa} style={[Styles.MT10, Styles.AScenter, { height: 50, width: 50 }]} />
								<Text style={[Styles.F14, Styles.MT5, Styles.AScenter]}>
									{GetCardType(card["Card Number"]).title}*******{card["Card Number"].slice(card["Card Number"].length - 4, card["Card Number"].length)}
								</Text>
							</TouchableOpacity>
							:
							<TouchableOpacity onPress={() => navigation.navigate('payment', { isback: true })}>
								<Image learge source={Images.visa} style={[Styles.MT10, Styles.AScenter, { height: 50, width: 50 }]} />
								<Text style={[Styles.F14, Styles.MT5, Styles.AScenter]}>
									Add Card Details
								</Text>
							</TouchableOpacity>
					}
				</View>
			</View>
			<Footer style={{ backgroundColor: 'rgb(102,189,172)', height: 50 }}>
				<View style={{ flexDirection: 'row' }}>
					<View style={Styles.W50P}>
						<Button onPress={() => setDatePicker(true)} full transparent >
							<Text style={[Styles.F18, Styles.CLW, Styles.Tcenter]}>Request Later</Text>
						</Button>
					</View>
					<View style={[Styles.W50P, { borderLeftWidth: 0.5 }]}>
						<Button onPress={confirm} full transparent >
							<Text style={[Styles.F18, Styles.CLW, Styles.Tcenter]}>Confirm Request</Text>
						</Button>
					</View>
				</View>
			</Footer>
		</Container>
	)
}

export default ConfirmRequest
