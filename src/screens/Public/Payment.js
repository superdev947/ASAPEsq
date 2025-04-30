import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FlatList, Image, Text, View, TouchableOpacity, StatusBar, Alert } from "react-native"
import { Button, Container, Content, Footer, FooterTab, Icon, Toast } from "native-base"
import normalize from "react-native-normalize"
import { CreditCardInput } from "../../CreditCardInput"
import { LAYOUT, Root, Styles } from "../../constants"
import { fetchs, GetCardType } from "../../redux/services"
import Headers from "../../theme/Headers"
import Loading from "../../theme/Loading"

const Payment = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const [active, setActive] = useState(null)
	const [isVisible, setIsVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [data, setData] = useState([])
	const [cardData, setCardData] = useState({
		valid: false,
	})
	const isback = navigation.state.params?.isback

	useEffect(() => {
		loadList()
	}, [navigation])

	const loadList = async () => {
		setLoading(true)
		setRefresh(true)
		setData([])
		const response = await fetchs({ url: Root.client_fetchCardsData_EndURL, body: { user_id: user.userid } })
		if (response.status === "success") {
			if (response.payment_details && response.payment_details.length) {
				setData(response.payment_details)
			}
		} else {
			console.log(response)
		}
		setLoading(false)
		setRefresh(false)
	}


	const setDefaultCardApiCall = async (unique_card_id) => {
		setActive(unique_card_id)
		const response = await fetchs({ url: Root.client_DefaultCard_EndURL, body: { user_id: user.userid, unique_card_id } })
		if (response.status == "success") {
			loadList()
		} else {
			Toast.show({ text: response.message, buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		}
	}

	const addCardApiCall = async () => {
		setIsVisible(!isVisible)
		if (cardData.valid) {
			const response = await fetchs({
				url: Root.client_AddCard_EndURL, body: {
					cardnumber: cardData.values.number.replace(/\s/g, ''),
					exp_date: cardData.values.expiry,
					holder_name: cardData.values.name,
					user_id: user.userid
				}
			})
			if (response.status == "success") {
				loadList()
				Toast.show({ text: response.message, buttonText: "Okay", type: "success", duration: 4000, position: 'top' })
			} else {
				Toast.show({ text: response.message, buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
			}
		} else {
			Toast.show({ text: "Failed !", buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		}
	}

	const deleteCardDetails = async (unique_id) => {
		const response = await fetchs({ url: Root.client_DeleteCard_EndURL, body: { user_id: user.userid, unique_id } })
		if (response.status == "success") {
			loadList()
			Toast.show({ text: response.message, buttonText: "Okay", type: "success", duration: 4000, position: 'top' })
		} else {
			Toast.show({ text: response.message, buttonText: "Okay", type: "danger", duration: 4000, position: 'top' })
		}
	}

	const deleteCard = (unique_id) => {
		Alert.alert(
			"Alert",
			"Are you sure you want to remove this card?",
			[
				{
					text: 'No',
					onPress: () => { },
					style: "cancel"
				},
				{
					text: 'Yes',
					onPress: () => deleteCardDetails(unique_id)
				}
			]
		)
	}

	return (
		<Container>
			{
				isback ?
					<Headers
						title="Payment"
						event={() => navigation.goBack()}
						icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F35]} />}
					/> :
					<Headers event={() => navigation.openDrawer()} title="Payment" />
			}
			<Text style={[Styles.MV10, Styles.MH20, Styles.F20]}>Payment Methods</Text>
			{loading && <Loading />}
			{!loading && data.length === 0 && (
				<Content>
					<Text style={[Styles.Tcenter]}>No Data Found</Text>
				</Content>
			)}
			{!loading && data.length > 0 && (
				<FlatList
					data={data}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View>
							<TouchableOpacity style={[Styles.MT10, Styles.ROW, Styles.PB10]} onPress={() => setDefaultCardApiCall(item.UniqueId)}>
								<View style={{ width: '30%' }}>
									<Image source={GetCardType(item["Card Number"]).image} style={{ width: normalize(80), height: normalize(50), alignSelf: 'center' }} />
								</View>
								<View style={[Styles.ROW, Styles.Acenter, Styles.Jbetween, { width: '70%' }]}>
									<Text style={[Styles.MT10, Styles.ML10, Styles.FW700]}>
										{GetCardType(item["Card Number"]).title}*******{item["Card Number"].slice(item["Card Number"].length - 4, item["Card Number"].length)}
									</Text>
									<View style={[Styles.MR20, Styles.ROW]}>
										{item.Flag == '1' ?
											<Icon type="MaterialIcons" name="check-circle" style={[Styles.F24, { color: 'green' }]} />
											: null}
										<TouchableOpacity onPress={() => deleteCard(item.UniqueId)} style={[Styles.H100P]}>
											<Icon type="MaterialIcons" name="delete" style={[Styles.F24, { color: 'red' }]} />
										</TouchableOpacity>
									</View>
								</View>
							</TouchableOpacity>
							<View style={{ borderBottomWidth: 0.5 }} />
						</View>
					)}
					refreshing={refresh}
					onRefresh={loadList}
					keyExtractor={(item, index) => `${index}`}
				/>
			)}
			{isVisible ?
				<View style={[Styles.Acenter, Styles.Jcenter, { zIndex: 1, flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', width: LAYOUT.window.width, height: LAYOUT.window.height - StatusBar.currentHeight }]}>
					<View style={{ width: LAYOUT.window.width - 50, backgroundColor: '#fff', borderWidth: 2, borderColor: 'rgb(176,176,176)' }}>
						<View style={[Styles.ROW, Styles.Jbetween, Styles.PH20, Styles.MV20]}>
							<Text style={Styles.F20}>ADD CARD DETAILS</Text>
							<TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
								<Icon type="AntDesign" name="close" style={{ color: '#000', fontSize: 20 }} />
							</TouchableOpacity>
						</View>
						<CreditCardInput onChange={(card) => setCardData({ ...cardData, ...card })} requiresName requiresCVC={false} />
						<View style={{ height: 20 }} />
						<Button full onPress={addCardApiCall} style={{ backgroundColor: 'rgb(102,189,172)', marginTop: 10 }}>
							<Text style={{ color: '#fff', fontSize: 14 }}>ADD CARD</Text>
						</Button>
					</View>
				</View>
				: null}
			<Footer style={[Styles.H60]}>
				<FooterTab>
					<Button vertical full onPress={() => setIsVisible(!isVisible)} style={{ backgroundColor: 'rgb(102,189,172)' }}>
						<Text style={[Styles.F14, Styles.CLW]}>Add New Card</Text>
					</Button>
				</FooterTab>
			</Footer>
		</Container>
	)
}
export default Payment