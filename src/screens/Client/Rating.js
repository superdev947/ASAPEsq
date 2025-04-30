import React, { useState } from "react"
import { Image, View } from 'react-native'
import { Container, Body, Text, Content, Card, CardItem, Button, Icon, Toast } from "native-base"
import { Images, Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { Rating } from 'react-native-ratings'
import { fetchs } from "../../redux/services"
import { useSelector } from "react-redux"

const RatingScreen = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const { request_id } = navigation.state.params
	const [state, setState] = useState({
		rate_professional: 1,
		rate_timeliness: 1,
		rate_communicate: 1,
		rate_knowledge: 1,
		rate_overall: 1,
	})
	const ratingCompleted = (key, value) => {
		state[key] = value
	}
	const handleSubmit = async () => {
		const response = await fetchs({
			url: Root.client_Rating_EndURL, body: {
				request_id,
				client_id: user.userid,
				attorney_id: "",
				professionalism: state.rate_professional,
				timelines: state.rate_timeliness,
				communication_skill: state.rate_communicate,
				legal_knowledge: state.rate_knowledge,
				overall: state.rate_overall,
			}
		})
		if (response.status == "success") {
			Toast.show({ text: "You rated the Attorney!", buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
			navigation.navigate("receipt", { request_id })
			// navigation.navigate("myrequest")
		}
	}
	return (
		<Container>
			<Headers
				title="Rating"
				event={() => navigation.goBack()}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F35]} />}
			/>
			<Content>
				<View style={{ marginTop: 20, marginLeft: 50, marginRight: 50 }}>
					<Card>
						<CardItem>
							<Body>
								<Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', width: "100%" }}>Please rate your Attorney</Text>
							</Body>
						</CardItem>
					</Card>
				</View>
				<Image learge source={Images.profileimg} style={{ marginTop: 20, borderColor: "rgb(196, 196, 196)", borderWidth: 10, overflow: "hidden", height: 100, width: 100, borderRadius: 120 / 2, alignSelf: 'center' }} />
				<Text style={[Styles.Tcenter, Styles.MT10]}>John Smith</Text>
				<Text style={[Styles.Tcenter, Styles.F15, Styles.MT20]}>Professionalism</Text>
				<Rating
					type='star'
					style={[Styles.MT5]}
					jumpValue={1}
					ratingCount={5}
					imageSize={20}
					startingValue={state.rate_professional}
					// showRating
					onFinishRating={(rate) => ratingCompleted('rate_professional', rate)}
				/>
				<Text style={[Styles.Tcenter, Styles.F15, Styles.MT20]}>Timeliness</Text>
				<Rating
					type='star'
					style={[Styles.MT5]}
					jumpValue={1}
					ratingCount={5}
					imageSize={20}
					startingValue={state.rate_timeliness}
					// showRating
					onFinishRating={(rate) => ratingCompleted('rate_timeliness', rate)}
				/>
				<Text style={[Styles.Tcenter, Styles.F15, Styles.MT20]}>Communication Skills</Text>
				<Rating
					type='star'
					style={[Styles.MT5]}
					jumpValue={1}
					ratingCount={5}
					imageSize={20}
					startingValue={state.rate_communicate}
					// showRating
					onFinishRating={(rate) => ratingCompleted('rate_communicate', rate)}
				/>
				<Text style={[Styles.Tcenter, Styles.F15, Styles.MT20]}>Legal Knowledge of Subject Matter</Text>
				<Rating
					type='star'
					style={[Styles.MT5]}
					jumpValue={1}
					ratingCount={5}
					imageSize={20}
					startingValue={state.rate_knowledge}
					// showRating
					onFinishRating={(rate) => ratingCompleted('rate_knowledge', rate)}
				/>
				<Text style={[Styles.Tcenter, Styles.F15, Styles.MT20]}>Overall</Text>
				<Rating
					type='star'
					style={[Styles.MT5]}
					jumpValue={1}
					ratingCount={5}
					imageSize={20}
					startingValue={state.rate_overall}
					// showRating
					onFinishRating={(rate) => ratingCompleted('rate_overall', rate)}
				/>
				<View style={[{ marginLeft: 35, marginRight: 35 }, Styles.MV20]}>
					<Button onPress={() => handleSubmit()} full style={{ backgroundColor: 'rgb(56,214,160)' }}>
						<Text >SUBMIT RATING</Text>
					</Button>
				</View>
			</Content>
		</Container>
	)
}

export default RatingScreen
