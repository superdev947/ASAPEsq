import React, { useState } from "react"
import { View } from 'react-native'
import { Container, Content, Button, Text, Textarea } from "native-base"
import MapView from 'react-native-maps'
import { LAYOUT } from "../../constants"
import Headers from "../../theme/Headers"

const EndTask = ({ navigation }) => {
	const request = navigation.state.params

	const [state, setState] = useState({
		mapRegion: { latitude: Number(request["Latitude"]), longitude: Number(request["Longitude"]) },
		comment: ""
	})

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
						</MapView>
					</View>
				</View>
			</Content>
			<View style={{ marginLeft: 50, marginRight: 50, borderBottomWidth: 1, borderColor: 'rgb(211,211,212)', marginTop: 5, height: 1 }} />
			<View style={{ marginLeft: 100, marginRight: 100, marginTop: 10, marginBottom: 10 }}>
				<Button full style={{ backgroundColor: 'rgb(87, 187, 129)' }}>
					<Text style={{ fontSize: 16 }}>Start Task</Text>
				</Button>
			</View>
		</Container>
	)
}

export default EndTask
