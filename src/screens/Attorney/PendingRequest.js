import React, { useEffect, useState, Fragment } from "react"
import { useSelector } from "react-redux"
import { Image, View } from 'react-native'
import { Container, Content, Button, Text } from "native-base"
import MapView, { Marker } from 'react-native-maps'
import { Images, LAYOUT, Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { fetchs } from "../../redux/services"

const PendingRequest = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const [state, setState] = useState({
		mapRegion: null,
		coordinate: null,
		locationResult: null,
		hasLocationPermissions: false,
	})
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		checkSubscribed()
		loadList()
	}, [navigation])

	const checkSubscribed = async () => {
		const response = await fetchs({
			url: Root.attorney_UpdateStatus_EndURL, body: {
				attorney_id: user.userid
			}
		})
		// navigation.navigate("subscription")
	}

	const loadList = async () => {
		setLoading(true)
		setRefresh(true)
		setData([])

		const success = async (location) => {
			setState({ ...state, mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }, coordinate: { latitude: location.coords.latitude, longitude: location.coords.longitude } })
			console.log({
				attorney_id: user.userid,
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			})
			const update = await fetchs({
				url: Root.attorney_UpdateAttorneyLocation_EndURL,
				body: {
					attorney_id: user.userid,
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				}
			})
			if (update.status === "success") {
				const response = await fetchs({ url: Root.attorney_pendingRequestLoad_EndURL, body: { attorney_id: user.userid } })
				if (response.status === "success") {
					if (response.request_details && response.request_details.length > 0) {
						setData(response.request_details)
					}
				} else {
					console.log(`response`, response)
				}

				setLoading(false)
				setRefresh(false)
			}
		}
		const error = async (err) => {
			console.log(`ERROR(${err.code}): ${err.message}`)
		}

		navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })

	}

	const acceptDecline = async (flag, item) => {
		const response = await fetchs({
			url: Root.attorney_AcceptDecline_EndURL, body: {
				attorney_id: user.userid,
				flag,
				request_id: item["Request_id"]
			}
		})
		if (response.status === "success") {
			if (flag == 1) {
				navigation.navigate('serviceinprogress', item)
			} else {
				loadList()
			}
		}
	}

	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="Pending Requests" />
			<Content>
				<View>
					{
						data.length > 0 ? data.map((item, i) => (
							<Fragment key={i}>
								<View style={{ height: 250 }}>
									<MapView
										region={{ latitude: Number(item["Latitude"]), longitude: Number(item["Longitude"]), latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
										style={{ alignSelf: 'stretch', height: 250 }}
									>
										<Marker coordinate={{ latitude: Number(item["Latitude"]), longitude: Number(item["Longitude"]) }} ></Marker>
									</MapView>
								</View>
								<View style={{ padding: 10 }}>
									<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text style={{ fontWeight: 'bold', fontSize: 15 }}>Fri, Aug 24, 06:57 PM</Text>
										<Text style={{ fontWeight: 'bold', fontSize: 15 }}>Attorney On Demand</Text>
									</View>
									<Text style={{ fontSize: 16, marginTop: 5 }}>Micro CRN 73584257956</Text>
									<View style={{ flexDirection: 'row', marginTop: 5 }}>
										<Image source={Images.greendot} style={{ height: 20, width: 20 }} />
										<Text style={{ fontSize: 15, color: 'rgb(127,127,127)' }}>Current Location</Text>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 5 }}>
										<Image source={Images.reddot} style={{ height: 20, width: 20 }} />
										<Text style={{ fontSize: 15, color: 'rgb(127,127,127)' }}>45nd Street, New York, 12345</Text>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10 }}>
										<View style={{ width: '45%' }}>
											<Button onPress={() => acceptDecline(0, item)} full style={{ backgroundColor: 'rgb(241, 61, 87)' }}>
												<Text style={{ fontSize: 16 }}>Decline</Text>
											</Button>
										</View>
										<View style={{ width: '10%' }} />
										<View style={{ width: '45%' }}>
											<Button onPress={() => acceptDecline(1, item)} full style={{ backgroundColor: 'rgb(87, 187, 129)' }}>
												<Text style={{ fontSize: 16 }}>Accept</Text>
											</Button>
										</View>
									</View>
								</View>
							</Fragment>
						)) : (
							<View style={[{ width: LAYOUT.window.window, height: LAYOUT.window.height - 100 }, Styles.Jcenter, Styles.Acenter]}>
								<Text style={[Styles.Tcenter]}>No Data Found</Text>
							</View>
						)
					}
				</View>
			</Content>
		</Container>
	)
}

export default PendingRequest
