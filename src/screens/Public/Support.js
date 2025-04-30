import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Accordion, Container, Text, Icon, Content } from "native-base"
import { Root, Styles } from "../../constants"
import { fetchs } from "../../redux/services"
import Loading from "../../theme/Loading"
import Headers from "../../theme/Headers"

const Support = ({ navigation }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		loadList()
	}, [navigation])

	const loadList = async () => {
		setLoading(true)
		setData([])
		const response = await fetchs({ url: Root.support_FAQ_EndURL })
		if (response.status == "success") {
			setLoading(false)
			if (response.details && response.details.length) {
				setData(response.details)
			}
		} else {
			setLoading(false)
		}
	}
	const _renderHeader = (item, expanded) => (
		<View style={[Styles.ROW, Styles.P10, Styles.Jbetween, Styles.Acenter, { borderBottomWidth: 0.5, borderColor: 'grey' }]}>
			<Text style={Styles.FW700}> {" "}{item.Questions} </Text>
			{expanded
				? <Icon type='Entypo' style={Styles.F16} name="chevron-thin-up" />
				: <Icon type='Entypo' style={Styles.F16} name="chevron-thin-down" />}
		</View>
	)

	const _renderContent = (item) => (
		<Text style={Styles.P10}> {item.Answers} </Text>
	)

	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="Support & FAQ" />
			<Content contentContainerStyle={Styles.P10}>
				{loading && <Loading />}
				{!loading && data.length === 0 && (
					<Text style={[Styles.Tcenter]}>No Data Found</Text>
				)}
				{!loading && data.length > 0 && (
					<Accordion
						dataArray={data}
						animation={true}
						style={{ borderWidth: 0 }}
						expanded={[0]}
						renderHeader={_renderHeader}
						renderContent={_renderContent}
					/>
				)}
			</Content>
		</Container>
	)
}

export default Support