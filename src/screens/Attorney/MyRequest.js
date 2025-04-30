import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Image, TouchableOpacity, View, FlatList } from 'react-native'
import { Container, Text } from "native-base"
import normalize from 'react-native-normalize'
import { Images, Root, Styles } from "../../constants"
import { fetchs } from "../../redux/services"
import Loading from "../../theme/Loading"
import Headers from "../../theme/Headers"

const MyRequest = ({ navigation }) => {
	const { user } = useSelector(state => state.auth)
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [flag, setFlag] = useState('upcoming')
	const [data, setData] = useState([])

	useEffect(() => {
		loadList()
	}, [navigation, flag])

	const loadList = async () => {
		setLoading(true)
		setRefresh(true)
		setData([])
		const response = await fetchs({ url: Root.attorney_Myrequest_EndURL, body: { attorney_id: user.userid, flag } })
		if (response.status === "success") {
			if (response.past_details && response.past_details.length) {
				setData(response.past_details)
			} else if (response.upcoming_details && response.upcoming_details.length) {
				setData(response.upcoming_details)
			}
		} else {
			console.log(response)
		}
		setLoading(false)
		setRefresh(false)
	}

	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="My Requests" />
			<View style={[Styles.ROW, Styles.M10, Styles.P5, { borderRadius: normalize(5), backgroundColor: 'rgb(236,236,236)', }]}>
				<TouchableOpacity
					onPress={() => setFlag("upcoming")}
					style={[{ backgroundColor: flag != 'past' ? '#fff' : 'rgb(236,236,236)', borderRadius: normalize(5), elevation: flag != 'past' ? 2 : 0, width: '55%' }]}
				>
					<Text style={[Styles.Tcenter, Styles.F18, Styles.MV10]}>Upcoming Requests</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFlag("past")}
					style={[{ backgroundColor: flag != 'upcoming' ? '#fff' : 'rgb(236,236,236)', borderRadius: normalize(5), elevation: flag != 'upcoming' ? 2 : 0, width: '45%' }]}
				>
					<Text style={[Styles.Tcenter, Styles.F18, Styles.MV10]}>Past Requests</Text>
				</TouchableOpacity>
			</View>
			{loading && <Loading />}
			{!loading && data.length === 0 && (
				<Text style={Styles.Tcenter}>No Data Found</Text>
			)}
			{!loading && data.length > 0 && (
				<FlatList
					data={data}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={[Styles.ROW, Styles.PH20, Styles.MT10, Styles.PB10, { borderBottomWidth: 0.5 }]}>
							<View style={{ width: '20%' }}>
								<Image source={Images.work} style={{ width: normalize(50), height: normalize(50), resizeMode: 'contain' }} />
							</View>
							<View style={{ width: '60%' }}>
								<Text style={[Styles.F18, Styles.MT10, Styles.FW700]}>{item["Request Date"]}</Text>
								<Text style={[Styles.F16]}>{item['Description']}</Text>
								<View style={[Styles.ROW]}>
									<Image source={Images.greendot} style={{ height: 20, width: 20 }} />
									<Text style={[Styles.F14]}>{item["Pickup Address"]}</Text>
								</View>
								<View style={Styles.ROW}>
									<Image source={Images.reddot} style={{ height: 20, width: 20 }} />
									<Text style={[Styles.F14]}>45th Street, New York, 12345</Text>
								</View>
							</View>
							<View style={{ width: '20%' }}>
								<Text style={[Styles.F18, Styles.FW700, Styles.Tright, Styles.MT10]}>$ {item["Payment"] ? item["Payment"] : 0}</Text>
							</View>
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

export default MyRequest