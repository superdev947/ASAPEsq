import React, { useEffect, useState, Fragment } from "react"
import { Image, View } from 'react-native'
import { Container, Content, Button, Text, Input, Textarea, Toast } from "native-base"
import MapView, { Marker } from 'react-native-maps'
import { Images, LAYOUT, Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { fetchs } from "../../redux/services"
import MapViewDirections from 'react-native-maps-directions'

const ServiceInProgress = ({ navigation }) => {
	const [state, setState] = useState({
		mapRegion: null,
		coordinate: null,
		locationResult: null,
		hasLocationPermissions: false,
		comment: ""
	})

	const request = navigation.state.params

	useEffect(() => {
		getLocationAsync()
	}, [])

	const getLocationAsync = () => {
		const success = async (location) => {
			setState({ ...state, mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0522, longitudeDelta: 0.0021 }, coordinate: { latitude: location.coords.latitude, longitude: location.coords.longitude } })
		}
		const error = async (err) => {
			console.log(`ERROR(${err.code}): ${err.message}`)
		}

		navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
	}

	const startTask = async () => {
		const response = await fetchs({
			url: Root.attorney_StartTask_EndURL,
			body: {
				request_id: request.id,
				comment: state.comment,
				taskStatus: "StartTask"
			}
		})
		if (response.status === "success") {
			Toast.show({ text: "The task is started successfully!", buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
			navigation.navigate("pendingrequest", request)
		}
	}

	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="Service In Progress" />
			<Content>
				<View style={{ backgroundColor: 'rgb(236,236,236)' }}>
					<Textarea
						placeholder="Enter here"
						style={{ backgroundColor: "#fff", marginHorizontal: 10, marginTop: 10, height: 100, paddingVertical: 10 }}
						value={state.comment}
						onChangeText={e => setState({ ...state, comment: e })}
					/>
					<View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
						<MapView
							style={{ alignSelf: 'stretch', height: LAYOUT.window.height * .45 }}
							region={state.mapRegion}
							onRegionChangeComplete={(mapRegion) => setState({ ...state, mapRegion })}
						>
							{
								state.coordinate && request ?
									<Fragment>
										<Marker coordinate={state.coordinate} ></Marker>
										<Marker coordinate={{ latitude: Number(request["Latitude"]), longitude: Number(request["Longitude"]) }} ></Marker>
										<MapViewDirections
											origin={state.coordinate}
											destination={{ latitude: Number(request["Latitude"]), longitude: Number(request["Longitude"]) }}
											apikey={Root.googleMapApiKey}
											strokeWidth={3}
											strokeColor="hotpink"
											onError={(err) => {
												alert("Sorry! route not found!")
											}}
										/>
									</Fragment>
									: null
							}
						</MapView>
					</View>
				</View>
			</Content>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ width: '25%' }}>
					<Image source={Images.clock} style={{ height: 45, width: 45, alignSelf: 'flex-end' }} />
				</View>
				<View style={[{ width: '75%' }, Styles.PL10]}>
					<Text style={[{ color: 'rgb(22,68,124)' }, Styles.F18, Styles.FWBold]}>ATTORNEY IN TRANSIT</Text>
					<Text style={{ fontSize: 16, color: 'rgb(92,157,208)' }}>The Client has been Notified</Text>
				</View>
			</View>
			<View style={{ marginLeft: 50, marginRight: 50, borderBottomWidth: 1, borderColor: 'rgb(211,211,212)', marginTop: 5, height: 1 }} />
			<View style={{ marginLeft: 100, marginRight: 100, marginTop: 10, marginBottom: 10 }}>
				<Button full style={{ backgroundColor: 'rgb(87, 187, 129)' }} onPress={() => startTask()}>
					<Text style={{ fontSize: 16 }}>Start Task</Text>
				</Button>
			</View>
		</Container>
	)
}

export default ServiceInProgress
