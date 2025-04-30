import React, { useEffect, useState } from "react"
import { Image, Modal, TouchableOpacity, View } from 'react-native'
import { Container, Content, Button, Text, Textarea, Footer, Icon, Toast } from "native-base"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker } from 'react-native-maps'
import { COLOR, Images, LAYOUT, Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { fetchs } from "../../redux/services"
import Loading from "../../theme/Loading"
import normalize from "react-native-normalize"

const RequestAttoreny = ({ navigation }) => {
	const [state, setState] = useState({
		locationResult: null,
		mapRegion: null,
		coordinate: null,
		location: '',
		hasLocationPermissions: false,
		ConsultationModal: false,
		formatted_address: '',
		sub_request_type: 'Traffic',
		map_input_text: ''
	})
	const [data, setData] = useState([])
	const [active, setActive] = useState(null)
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)
	const [courtModal, setCourtModal] = useState(false)
	const [detailModal, setDetailModal] = useState(false)
	const [consultationModal, setConsultationModal] = useState(false)

	useEffect(() => {
		loadList()
		getLocationAsync()
		setActive(null)
	}, [])

	const loadList = async () => {
		setLoading(true)
		setData([])
		const response = await fetchs({ url: Root.client_getRequestType_EndURL })
		if (response.status === "success") {
			if (response.details && response.details.length) {
				setData(response.details)
			}
		} else {
			console.log(response)
		}
		setLoading(false)
	}

	const BookNow = async () => {
		if (active) {
			const param = {
				pickup_address: state.formatted_address,
				request_Type: data.find(e => e.CategoryId == active).CategoryName,
				payment: data.find(e => e.CategoryId == active).CategoryPrice,
				latitude: state.mapRegion?.latitude,
				longitude: state.mapRegion?.longitude,
				sub_request_type: state.sub_request_type,
				description: description,
				map_input_text: state.map_input_text
			}
			navigation.navigate("confirmrequest", param)
		} else {
			Toast.show({ text: "Please select any request type!", buttonText: "Okay", type: "danger", duration: 4000, position: 'bottom' })
		}
	}

	const getLocationAsync = async () => {
		const success = async (location) => {
			setState({ ...state, mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }, coordinate: { latitude: location.coords.latitude, longitude: location.coords.longitude } })
		}
		const error = async (err) => {
			console.log(`ERROR(${err.code}): ${err.message}`)
		}
		await navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
		await navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
	}

	const togglCourtModal = () => {
		setDescription('')
		setActive(2)
		setCourtModal(!courtModal)
		setDetailModal(false)
	}

	const togglcourtDetailModal = () => {
		setDetailModal(!detailModal)
		setCourtModal(false)
	}

	const togglConsultationModal = () => {
		setActive(3)
		setDescription('')
		setConsultationModal(!consultationModal)
	}

	if (loading) {
		return <Loading />
	}

	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="Request My Attorney" />
			<Content showsVerticalScrollIndicator={false}>
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
								},
								map_input_text: data.description
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
				<MapView style={Styles.googleMap} region={state.mapRegion}>
					{state.coordinate ? <Marker coordinate={state.coordinate} /> : null}
				</MapView>
			</Content>
			<View style={Styles.MV10}>
				<Text style={[Styles.F18, Styles.FW700, Styles.Tcenter]}>Pick Your Request Type:</Text>
				<View style={[Styles.ROW, Styles.Jaround, Styles.MT5, Styles.PH5]}>
					<TouchableOpacity onPress={() => setActive(1)}>
						{
							active == 1 ?
								<View style={[Styles.RequestType, { backgroundColor: '#002366', borderWidth: 0, padding: normalize(5) }]}>
									<Image source={Images.attorneys1} style={{ height: '60%', width: '60%' }} tintColor={'#fff'} />
								</View>
								: <View style={[Styles.RequestType, { borderColor: '#002366', backgroundColor: '#fff' }]}>
									<Image source={Images.attorneys1} style={{ height: '60%', width: '60%' }} tintColor={'#000'} />
								</View>
						}
						<Text style={[Styles.F14, Styles.FW700, Styles.Tcenter, { color: '#000' }]}>{'Attorney-\non-Demand'}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={togglCourtModal}>
						{
							active == 2 ?
								<View style={[Styles.RequestType, { backgroundColor: '#002366', borderWidth: 0, padding: normalize(5) }]}>
									<Image source={Images.attorneys2} style={{ height: '60%', width: '60%' }} tintColor={'#fff'} />
								</View>
								: <View style={[Styles.RequestType, { borderColor: '#002366', backgroundColor: '#fff' }]}>
									<Image source={Images.attorneys2} style={{ height: '60%', width: '60%' }} tintColor={'#000'} />
								</View>
						}
						<Text style={[Styles.F14, Styles.FW700, Styles.Tcenter, { color: '#000' }]}>{'Attorney-\nIn-Court'}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={togglConsultationModal}>
						{
							active == 3 ?
								<View style={[Styles.RequestType, { backgroundColor: '#002366', borderWidth: 0, padding: normalize(5) }]}>
									<Image source={Images.attorneys3} style={{ height: '60%', width: '60%' }} tintColor={'#fff'} />
								</View>
								: <View style={[Styles.RequestType, { borderColor: '#002366', backgroundColor: '#fff' }]}>
									<Image source={Images.attorneys3} style={{ height: '60%', width: '60%' }} tintColor={'#000'} />
								</View>
						}
						<Text style={[Styles.F14, Styles.FW700, Styles.Tcenter, { color: '#000' }]}>{'Attorney\nConsultation'}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Footer style={[Styles.Acenter, { backgroundColor: '#66bdac', height: 50 }]}>
				<View>
					<Button onPress={BookNow} full transparent>
						<Text style={[Styles.F20, Styles.CLW, Styles.FW700]}>BOOK NOW</Text>
					</Button>
				</View>
			</Footer>
			<Modal
				animationType="slide"
				transparent={true}
				visible={courtModal}
				onRequestClose={togglcourtDetailModal}
			>
				<View style={Styles.centeredView}>
					<View style={[Styles.W100P, Styles.BKW, Styles.PV20, { borderWidth: 2, borderColor: COLOR.modalBorder }]}>
						<View style={[Styles.MH20]}>
							<Text style={[Styles.F20, Styles.Tcenter, Styles.PB15, { borderBottomWidth: 0.5 }]}>Municipal Court</Text>
							{
								LAYOUT.RadioData.slice(0, 4).map((item, key) => (
									<TouchableOpacity key={key} onPress={() => setState({ ...state, sub_request_type: item.value })}>
										<View style={[Styles.ROW, Styles.MT10, Styles.Acenter]}>
											<View style={{ width: '15%' }}>
												<Image source={state.sub_request_type === item.value ? Images.radiocheck : Images.radiouncheck} style={{ height: 30, width: 30 }} />
											</View>
											<View style={{ width: '85%' }}>
												<Text style={Styles.F18}>{item.label}</Text>
											</View>
										</View>
									</TouchableOpacity>
								))
							}
							<Text style={[Styles.MT20, Styles.F20, Styles.Tcenter, Styles.PB15, { borderBottomWidth: 0.5 }]}>Superior/Supreme Court</Text>
							{
								LAYOUT.RadioData.slice(4, 8).map((item, key) => (
									<TouchableOpacity key={key} onPress={() => setState({ ...state, sub_request_type: item.value })}>
										<View style={[Styles.ROW, Styles.MT10, Styles.Acenter]}>
											<View style={{ width: '15%' }}>
												<Image source={state.sub_request_type === item.value ? Images.radiocheck : Images.radiouncheck} style={{ height: 30, width: 30 }} />
											</View>
											<View style={{ width: '85%' }}>
												<Text style={Styles.F18}>{item.label}</Text>
											</View>
										</View>
									</TouchableOpacity>
								))
							}
						</View>
						<Button onPress={togglcourtDetailModal} style={[Styles.AScenter, Styles.MT10, { backgroundColor: '#002366' }]}>
							<Text style={[Styles.F18, Styles.CLW]}>    Done    </Text>
						</Button>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={detailModal}
				onRequestClose={togglcourtDetailModal}
			>
				<View style={Styles.centeredView}>
					<View style={[Styles.W100P, Styles.BKW, Styles.PV20, { borderWidth: 2, borderColor: COLOR.modalBorder }]}>
						<View style={[Styles.MH20]}>
							<Textarea
								rowSpan={5}
								placeholder="Number of tickets, counts, and/or complaints"
								value={description}
								onChangeText={setDescription}
							/>
						</View>
						<Button onPress={togglcourtDetailModal} style={[Styles.AScenter, Styles.MT10, { backgroundColor: '#002366' }]}>
							<Text style={[Styles.F18, Styles.CLW]}>    Done    </Text>
						</Button>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={consultationModal}
				onRequestClose={togglConsultationModal}
			>
				<View style={Styles.centeredView}>
					<View style={[Styles.W100P, Styles.BKW, Styles.PV20, { borderWidth: 2, borderColor: COLOR.modalBorder }]}>
						<View style={[Styles.MH20]}>
							<Text style={[Styles.F16, Styles.Tcenter, Styles.PB15, Styles.MB10, { borderBottomWidth: 0.5 }]}>Please give a brief description of your case</Text>
							<Textarea
								rowSpan={5}
								placeholder="Enter here"
								keyboardType='default'
								value={description}
								onChangeText={setDescription}
							/>
						</View>
						<Button onPress={togglConsultationModal} style={[Styles.AScenter, Styles.MT10, { backgroundColor: '#002366' }]}>
							<Text style={[Styles.F18, Styles.CLW]}>    Done    </Text>
						</Button>
					</View>
				</View>
			</Modal>
		</Container >
	)
}

export default RequestAttoreny