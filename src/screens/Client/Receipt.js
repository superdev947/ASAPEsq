import React, { useState } from "react"
import { TouchableOpacity, View } from 'react-native'
import { Container, Text, Content, Button, Icon, Input, Toast } from "native-base"
import { Root, Styles } from "../../constants"
import Headers from "../../theme/Headers"
import { fetchs } from "../../redux/services"
import { useSelector } from "react-redux"

const radioButtons = [
	"No Tip",
	"$10",
	"$15",
	"Custom"
]

const Receipt = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const { request_id } = navigation.state.params
	const [state, setState] = useState({
		activeTip: "$10",
		customTip: "15"
	})
	const handleSubmit = async () => {
		const tips = state.activeTip === "No Tip" ? "0" : state.activeTip === "$10" ? "10" : state.activeTip === "$15" ? "15" : state.customTip
		const response = await fetchs({
			url: Root.client_Tips_Infomation_EndURL, body: {
				tips,
				client_id: user.userid,
				request_id,
				attorney_id: ""
			}
		})
		if (response.status == "success") {
			Toast.show({ text: "Successfully Submitted!", buttonText: "Okay", type: "success", duration: 4000, position: 'bottom' })
			// navigation.navigate("rating", {request_id})
		}
	}
	return (
		<Container>
			<Headers
				title="Receipt"
				event={() => navigation.goBack()}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F35]} />}
			/>
			<Content contentContainerStyle={Styles.PV20}>
				<Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>$0.01</Text>
				<Text style={[Styles.MT20, Styles.ML20, Styles.Tleft, Styles.F17]}>13 June2020,12:51:10</Text>
				<View style={{ marginLeft: 20, marginRight: 20 }}>
					<Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}>SERVICE</Text>
					<Text note>Attorney on call</Text>
					<Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}>LOCATION</Text>
					<Text note>64, Princeton Hightstown Road, NJ</Text>
					{/* <Image learge source={Images.profi} style={{marginTop:10, borderColor: "rgb(196, 196, 196)", borderWidth: 13,overflow: "hidden",height: 120,width: 120,borderRadius: 120 / 2,alignSelf:'center'}} /> 
					<Text style={{marginTop:20,fontSize:20,textAlign:'center',fontWeight:'bold'}}>Driver 2</Text>
					<Image source={Images.emptystar} style={{marginTop:10, height:42,width:266,alignSelf:'center'}}/> */}
					<View style={[Styles.MT40, Styles.MB20, { flexDirection: 'row', justifyContent: 'space-between' }]}>
						{
							radioButtons.map((radiobutton, i) => (
								<TouchableOpacity style={{ backgroundColor: radiobutton === state.activeTip ? "rgb(13, 59, 147)" : "#ffffff", borderColor: "rgb(13, 59, 147)", borderWidth: 2, overflow: "hidden", height: 75, width: 75, borderRadius: 75 / 2, alignSelf: 'center' }} key={i} onPress={() => setState({ ...state, activeTip: radiobutton })} >
									<Text style={{ marginTop: 25, textAlign: 'center', color: radiobutton === state.activeTip ? "#ffffff" : "#000000" }}>{radiobutton}</Text>
								</TouchableOpacity>
							))
						}
					</View>
					{
						state.activeTip === "Custom" ?
							<Input style={[Styles.W25P, Styles.F15, Styles.AScenter, { borderColor: "#a7a7a7", borderWidth: 0.4, borderRadius: 10 }]} value={state.customTip} onChangeText={e => setState({ ...state, customTip: e })} placeholder="Enter here" keyboardType="numeric" />
							: null
					}
					<View style={{ marginLeft: 35, marginRight: 35, marginTop: 20 }}>
						<Button onPress={() => handleSubmit()} full style={{ backgroundColor: 'rgb(56,214,160)' }}>
							<Text >SUBMIT</Text>
						</Button>
						<TouchableOpacity style={[Styles.MT20]} onPress={() => navigation.navigate("rating", { request_id })}>
							<Text style={[Styles.Tcenter]}>Give a Review</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Content>
		</Container>
	)
}

export default Receipt
