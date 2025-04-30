import React, { useEffect, useRef, useState } from "react"
import { Image, Linking, StatusBar, TouchableOpacity, View } from 'react-native'
import { Container, Content, Button, Text, Textarea, Footer, Icon, Toast, CheckBox } from "native-base"
import MapView, { Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { COLOR, Images, LAYOUT, Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { fetchs } from "../../redux/services"
import { useSelector } from "react-redux"
import { Rating } from "react-native-ratings"

const radioButtons = [
	"Call",
	"Text",
	"Email",
	"Unable to contact Attorney",
	"Attorney no longer needed",
	"Attorney failed to show",
	"Other"
]

const RequestInProgress = ({ navigation }) => {
	const request = navigation.state.params
	const latitude = request.latitude ? request.latitude : request.Latitude
	const longitude = request.longitude ? request.longitude : request.Longitude
	const { user } = useSelector(state => state.auth)
	const mapAutoCompletes = useRef(null)
	const [state, setState] = useState({
		mapRegion: {
			latitude: Number(latitude),
			longitude: Number(longitude),
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		},
		coordinate: {
			latitude: Number(latitude),
			longitude: Number(longitude),
		},
		hasLocationPermissions: false,
		iscallModalVisible: false,
		isCancelModalVisible: false,
		isAgreementModalVisible: false,
		isAgreementCheckbox: true,
		selectedContactType: "Call",
		selectedCancelReason: "Unable to contact Attorney",
		otherCancelReason: "",
		attorney_rate: 0
	})
	console.log(request)

	const agreementText = `By checking this box, I hereby execute with my electronic signature, this Retainer Agreement for legal services provided by the Attorney assigned to represent me regarding Job ID:${request.Request_id} initiated on ${request["Request Date"]}.`
	const togglecallModal = () => {
		setState({ ...state, iscallModalVisible: !state.iscallModalVisible, isCancelModalVisible: false })
	}
	const toggleAgreementModal = () => {
		setState({ ...state, isAgreementModalVisible: !state.isAgreementModalVisible })
	}
	const toggleCancelModalModal = () => {
		setState({ ...state, isCancelModalVisible: !state.isCancelModalVisible, iscallModalVisible: false })
	}
	const contact = async () => {
		if (state.selectedContactType == "Text") {
			navigation.navigate("messages")
		} else if (state.selectedContactType == "Email") {
			await Linking.openURL("mailto:")
		} else if (state.selectedContactType == "Call") {
			await Linking.openURL("tel:")
		}
	}
	const cancelRequest = async () => {
		var cancelReason = state.selectedCancelReason
		if (state.selectedCancelReason == "Other") {
			cancelReason = state.otherCancelReason
		}
		var response = await fetchs({
			url: Root.client_Cancel_Request_EndURL, body: {
				request_id: request.Request_id,
				reason: cancelReason
			}
		})
		if (response.status === "success") {
			Toast.show({ text: response.message, buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
			navigation.navigate("myrequest")
		} else {
			Toast.show({ text: "Error! Please try again later.", buttonText: "Okay", type: "danger", duration: 4000, position: 'bottom' })
		}
	}

	useEffect(() => {
		getRetainerAgreement()
		mapAutoCompletes.current?.setAddressText(request["Pickup Address"] ? request["Pickup Address"] : "")
	}, [])

	const getRetainerAgreement = async () => {
		if (!request['Attorney Id']) {
			alert("Your request has been sent to nearby attorneys. Once an attorney accepts your request, we will notify you. You can check on your requests in the My Requests tab.")
			return
		}
		toggleAgreementModal()
	}

	const accpetAgreement = async () => {
		const response = await fetchs({
			url: Root.client_RetainerAgreement_EndURL, body: {
				attorney_id: request['Attorney Id'],
				client_id: user.userid,
				request_id: request.Request_id,
				agreement_text: agreementText,
				flag: "client"
			}
		})
		if (response['status'] == "success") {
			Toast.show({ text: "You agreed with Retainer Agreement.", buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
		}
		toggleAgreementModal()
	}

	const ratingAttorney = async (rate) => {
		var response = await fetchs({
			url: Root.client_Rating_Attorney_EndURL, body: {
				request_id: request.Request_id,
				client_id: user.userid,
				rating: rate
			}
		})
		if (response.status === "success") {
			Toast.show({ text: "You rated an Attorney successfully.", buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
		}
	}

	return (
		<Container>
			<Headers
				title="Request In-Progress"
				event={() => navigation.goBack()}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F30]} />}
			/>
			<Content style={{ backgroundColor: 'blue' }}>
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
						ref={mapAutoCompletes}
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
								<Icon type="Entypo" name="controller-record" style={[Styles.F18, { color: '#00c100' }]} />
							</View>
						}
						renderRightButton={() =>
							<View style={[Styles.Jcenter, Styles.PR10]}>
								<Icon type="MaterialIcons" name="location-pin" style={[Styles.F30, { color: '#b6b6b6' }]} />
							</View>
						}
					/>
				</View>
				<MapView style={[Styles.googleMap, { height: LAYOUT.window.height * 0.7 }]} region={state.mapRegion}>
					{state.coordinate ?
						<Marker coordinate={state.coordinate} />
						: null}
				</MapView>
			</Content>
			<View style={[Styles.PV15, Styles.PH10, Styles.ROW, Styles.Jbetween, { backgroundColor: 'rgb(0,35,102)' }]}>
				<Text style={[Styles.F16, Styles.CLW]}> {request["Request Type"]} </Text>
				<TouchableOpacity disabled={request['Attorney Id'] ? false : true} onPress={() => navigation.navigate("receipt", { request_id: request.Request_id })}>
					<Text style={[Styles.F15, Styles.Tright, Styles.CLW]}>Receipt</Text>
				</TouchableOpacity>
			</View>
			<View style={Styles.ROW}>
				<View style={Styles.W50P}>
					<Text style={[Styles.MT40, Styles.FW700, Styles.F18, Styles.AScenter]}>Attorney ID</Text>
					<Text style={[Styles.F18, Styles.MT15, Styles.AScenter]}>{request['Attorney Id'] ? request['Attorney Id'] : "-"}</Text>
				</View>
				<View style={[Styles.W50P, { borderLeftWidth: 0.5 }]}>
					<Image learge source={Images.profileimg} style={[Styles.MT15, Styles.Hidden, Styles.AScenter, { height: 50, width: 50, borderRadius: 50 / 2 }]} />
					<Text style={[Styles.F18, Styles.FW700, Styles.AScenter]}>{request['Attorney Id'] ? request['Attorney Id'] : "Still Not assigned"}</Text>
					{/* <Image source={Images.star} style={[Styles.AScenter]}/>
					 */}
					<Rating
						type='star'
						style={[Styles.MT5, Styles.MB20]}
						jumpValue={1}
						ratingCount={5}
						imageSize={20}
						startingValue={state.attorney_rate}
						readonly={request['Attorney Id'] ? false : true}
						onFinishRating={(rate) => ratingAttorney(rate)}
					/>
				</View>
			</View>
			{state.isCancelModalVisible === true ?
				<View style={[Styles.Acenter, Styles.Jcenter, Styles.PH20, { zIndex: 1, flex: 1, backgroundColor: COLOR.modalBackground, position: 'absolute', width: LAYOUT.window.width, height: LAYOUT.window.height - StatusBar.currentHeight }]}>
					<View style={[Styles.W100P, Styles.BKW, Styles.PV20, { borderWidth: 2, borderColor: COLOR.modalBorder }]}>
						<View style={[Styles.MH20]}>
							<Text style={[Styles.FW700, Styles.F22, Styles.Tcenter, Styles.PB10, { borderBottomWidth: 0.5 }]}>Reason for Cancellation</Text>
							{
								radioButtons.slice(3, 7).map((cancelreason, i) => (
									<View style={[Styles.ROW, Styles.MT10]} key={i}>
										<View style={{ width: '15%' }}>
											<TouchableOpacity onPress={() => setState({ ...state, selectedCancelReason: cancelreason })}>
												<Image source={state.selectedCancelReason === cancelreason ? Images.radiocheck : Images.radiouncheck} style={{ height: 30, width: 30 }} />
											</TouchableOpacity>
										</View>
										<View style={{ width: '85%' }}>
											<Text style={[Styles.F18, Styles.FW700]}>{cancelreason}</Text>
										</View>
									</View>
								))
							}
							{
								state.selectedCancelReason === "Other" ?
									<Textarea style={Styles.MT15} value={state.otherCancelReason} onChangeText={(e) => setState({ ...state, otherCancelReason: e })} rowSpan={5} bordered placeholder="Please write your cancellation reason" />
									: null
							}
						</View>
						<Text style={[Styles.F14, Styles.MT15, Styles.PH20]}>*Cancellation Fee will be incurred</Text>
						<View style={[Styles.ROW, Styles.PH20, Styles.MT10, Styles.Jbetween]}>
							<View style={{ width: '47%' }}>
								<Button full onPress={toggleCancelModalModal} style={{ backgroundColor: 'rgb(176,176,176)' }}>
									<Text style={[Styles.F18, Styles.CLW, Styles.Tcenter]}>Don't Cancel</Text>
								</Button>
							</View>
							<View style={{ width: '47%', borderLeftWidth: 1, borderColor: '#fff' }}>
								<Button full onPress={() => cancelRequest()} style={{ backgroundColor: 'rgb(176,176,176)' }}>
									<Text style={[Styles.F18, Styles.CLW, Styles.Tcenter]}>OK</Text>
								</Button>
							</View>
						</View>
					</View>
				</View>
				: null}
			{state.iscallModalVisible === true ?
				<View style={[Styles.Acenter, Styles.Jcenter, Styles.PH20, { zIndex: 1, flex: 1, backgroundColor: COLOR.modalBackground, position: 'absolute', width: LAYOUT.window.width, height: LAYOUT.window.height - StatusBar.currentHeight }]}>
					<View style={[Styles.W100P, Styles.BKW, Styles.PV20, { borderWidth: 2, borderColor: COLOR.modalBorder }]}>
						<View style={[Styles.MH20]}>
							{
								radioButtons.slice(0, 3).map((contactmethod, i) => (
									<View style={[Styles.ROW, Styles.MT10]} key={i}>
										<View style={{ width: '15%' }}>
											<TouchableOpacity onPress={() => setState({ ...state, selectedContactType: contactmethod })}>
												<Image source={state.selectedContactType === contactmethod ? Images.radiocheck : Images.radiouncheck} style={{ height: 30, width: 30 }} />
											</TouchableOpacity>
										</View>
										<View style={{ width: '85%' }}>
											<Text style={[Styles.F18, Styles.FW700]}>{contactmethod}</Text>
										</View>
									</View>
								))
							}
						</View>
						<View style={[Styles.W100P, Styles.MT20, Styles.PH20, Styles.ROW, Styles.Jbetween, { borderLeftWidth: 1, borderColor: '#fff' }]}>
							<Button onPress={() => contact()} style={[{ width: '45%', backgroundColor: 'rgb(102,189,172)' }, Styles.Jcenter]}>
								<Text style={[Styles.F18, Styles.CLW]}>CALL NOW</Text>
							</Button>
							<Button onPress={togglecallModal} style={[{ width: '45%', backgroundColor: 'rgb(176,176,176)' }, Styles.Jcenter]}>
								<Text style={[Styles.F18, Styles.CLW]}>CANCEL</Text>
							</Button>
						</View>
					</View>
				</View>
				: null}
			{state.isAgreementModalVisible === true ?
				<View style={[Styles.Acenter, Styles.Jcenter, Styles.PH20, { zIndex: 1, flex: 1, backgroundColor: COLOR.modalBackground, position: 'absolute', width: LAYOUT.window.width, height: LAYOUT.window.height - StatusBar.currentHeight }]}>
					<View style={[Styles.W100P, Styles.BKW, Styles.PV20, { borderWidth: 2, borderColor: COLOR.modalBorder }]}>
						<View style={[Styles.MH20]}>
							<Text style={[Styles.F19, Styles.Tcenter, Styles.PB10, { borderBottomWidth: 0.5 }]}>Retainer Agreement</Text>
							<Text style={[Styles.MV20, { lineHeight: 20 }]}>{agreementText}</Text>
						</View>
						<View style={[Styles.MH10, Styles.ROW, Styles.Acenter]}>
							<CheckBox checked={state.isAgreementCheckbox} style={[Styles.MR20]} color="rgb(0,35,102)" onPress={() => setState({ ...state, isAgreementCheckbox: !state.isAgreementCheckbox })} />
							<Text style={[Styles.F15, Styles.W75P]}>{`I have read & accept the terms of the Retainer Agreement`}</Text>
						</View>
						<View style={[Styles.W100P, Styles.MT20, Styles.PH20, Styles.Jbetween, { borderLeftWidth: 1, borderColor: '#fff' }]}>
							<Button onPress={() => accpetAgreement()} disabled={!state.isAgreementCheckbox} style={[{ backgroundColor: 'rgb(102,189,172)' }, Styles.AScenter, Styles.PH20]}>
								<Text style={[Styles.F18, Styles.CLW]}>Okay</Text>
							</Button>
						</View>
					</View>
				</View>
				: null}
			<Footer style={{ backgroundColor: 'rgb(102,189,172)', height: 50 }}>
				<View style={Styles.ROW}>
					<View style={[Styles.W50P]}>
						<Button onPress={toggleCancelModalModal} full transparent >
							<Text style={[Styles.F18, Styles.CLW]}>Cancel Request</Text>
						</Button>
					</View>
					<View style={[Styles.W50P, { borderLeftWidth: 0.5 }]}>
						<Button onPress={togglecallModal} full transparent disabled={request['Attorney Id'] ? false : true} >
							<Text style={[Styles.F18, Styles.CLW]}>Contact Attorney</Text>
						</Button>
					</View>
				</View>
			</Footer>
		</Container>
	)
}
export default RequestInProgress
