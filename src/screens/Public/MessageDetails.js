import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Container, Footer, FooterTab, Icon, Input, Item } from "native-base"
import { LAYOUT, Root, Styles } from "../../constants"
import { fetchs } from "../../redux/services"
import Loading from "../../theme/Loading"
import Headers from "../../theme/Headers"

const MessageDetails = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const params = navigation.state.params
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [data, setData] = useState([])
	const flatList = useRef()

	useEffect(() => {
		loadList()
	}, [navigation])

	const loadList = async () => {
		setLoading(true)
		setData([])
		const response = await fetchs({ url: Root.attorney_chatHistory_EndURL, body: { client_id: user.userid, attorney_id: params.AttorneyId } })
		if (response.status === "success") {
			setLoading(false)
			if (response.details && response.details.length) {
				setData(response.details)
			}
		} else {
			setLoading(false)
		}
	}

	const sendMessageApiCall = async () => {
		const response = await fetchs({
			url: Root.attorney_sendMessage_EndURL, body: {
				client_id: user.userid,
				attorney_id: params.AttorneyId,
				flag: user.flag,
				message
			}
		})
		let mgs = {
			AttorneyId: params.AttorneyId,
			ClientId: user.userid,
			Flag: user.flag,
			Message: message,
			Name: user.username
		}
		if (response.status === "success") {
			setData([...data, Object.assign({}, mgs)])
			setMessage('')
		} else {

		}
	}

	const scrollToEnd = (w, h) => {
		if (flatList) {
			flatList.current.scrollTo({ y: h })
		} else {
			console.log(flatList)
		}
	}

	return (
		<Container>
			<Headers
				title={params.Name}
				event={() => navigation.navigate('messages', { refresh: true })}
				icon={<Icon type="Feather" name="chevron-left" style={[Styles.CLW, Styles.F35]} />}
			/>
			{loading && <Loading />}
			{!loading && data.length === 0 && (
				<Text style={Styles.Tcenter}>No Data Found</Text>
			)}
			{!loading && data.length > 0 && (
				<ScrollView
					ref={flatList}
					showsVerticalScrollIndicator={false}
					onContentSizeChange={scrollToEnd}
				>
					{data.map((item, key) => (
						<View style={{ marginLeft: 100, marginRight: 10 }} key={key}>
							<View style={{ marginTop: 10 }}>
								<View style={{ backgroundColor: 'blue', padding: 20, borderRadius: 7, borderBottomRightRadius: 0 }}>
									<Text style={{ color: '#fff' }}>{item.Message}</Text>
								</View>
								<View style={Styles.triangleShapeCSS} />
							</View>
						</View>
					))}
				</ScrollView>
			)}
			<Footer>
				<FooterTab style={{ backgroundColor: 'rgb(239,239,244)' }}>
					<View style={[Styles.ROW]}>
						<View style={[Styles.Jcenter, Styles.PH20, { width: LAYOUT.window.width }]}>
							<Item regular style={{ backgroundColor: '#fff', borderRadius: 7 }}>
								<Input
									value={message}
									onChangeText={e => setMessage(e)}
									placeholder='Type a message..'
								/>
								<TouchableOpacity onPress={sendMessageApiCall}>
									<Icon type='MaterialIcons' name='send' style={[Styles.F30, Styles.CLbk]} />
								</TouchableOpacity>
							</Item>
						</View>
					</View>
				</FooterTab>
			</Footer>
		</Container>
	)
}

export default MessageDetails