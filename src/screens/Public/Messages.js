import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Image, TouchableOpacity, View, FlatList } from 'react-native'
import { Container, Text } from "native-base"
import { fetchs } from "../../redux/services"
import { Images, Styles, Root } from "../../constants"
import Loading from "../../theme/Loading"
import Headers from "../../theme/Headers"

const Messages = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		loadList()
	}, [navigation])

	const loadList = async () => {
		setLoading(true)
		setRefresh(true)
		setData([])
		const response = await fetchs({ url: Root.attorney_messageList_EndURL, body: { user_id: user.userid, flag: user.flag } })
		if (response.status === "success") {
			setLoading(false)
			setRefresh(false)
			if (response.details && response.details.length) {
				setData(response.details)
			}
		} else {
			setLoading(false)
			setRefresh(false)
		}
	}
	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="Messages" />
			{loading && <Loading />}
			{!loading && data.length === 0 && (
				<Text style={[Styles.Tcenter]}>No Data Found</Text>
			)}
			{!loading && data.length > 0 && (
				<FlatList
					data={data}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={[Styles.MH10, { borderBottomWidth: 0.5 }]}>
							<TouchableOpacity onPress={() => navigation.navigate("msgdetails", { Name: item.Name, AttorneyId: item.AttorneyId })}>
								<Text style={Styles.Tright}>{item.DateTime}</Text>
								<View style={[Styles.ROW, Styles.PB10]}>
									<View style={{ width: '25%' }}>
										<Image style={[Styles.H50, Styles.Hidden, { width: 50, borderRadius: 50 / 2, alignSelf: 'center' }]} source={Images.profileimg} />
									</View>
									<View style={{ width: '75%' }}>
										<Text style={[Styles.FW700, Styles.PB10]}>{item.Name}</Text>
										<Text style={[Styles.PL10]}>{item.Message}</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					)}
					refreshing={refresh}
					onRefresh={loadList}
					keyExtractor={(item, index) => `${index}`}
				/>
			)}
		</Container>
	)
}

export default Messages
