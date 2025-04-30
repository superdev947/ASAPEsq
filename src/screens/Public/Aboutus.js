import React from "react"
import { Image, Text, TouchableOpacity } from "react-native"
import { Container, Content, Icon, View } from "native-base"
import { Images, Styles } from "../../constants"
import normalize from "react-native-normalize"
import Headers from "../../theme/Headers"

const Aboutus = ({ navigation }) => {
	return (
		<Container>
			<Headers event={() => navigation.openDrawer()} title="About Us" />
			<Content contentContainerStyle={Styles.P20}>
				<Text style={Styles.Tcenter}>Contact Us</Text>
				<View style={[Styles.ROW, Styles.Jbetween, Styles.MT20, Styles.PH30]}>
					<TouchableOpacity style={Styles.aboutus}>
						<Icon type='FontAwesome' name="facebook" style={[Styles.CLW, Styles.F24]} />
					</TouchableOpacity>
					<TouchableOpacity style={Styles.aboutus}>
						<Icon type='FontAwesome' name="twitter" style={[Styles.CLW, Styles.F24]} />
					</TouchableOpacity>
					<TouchableOpacity style={Styles.aboutus}>
						<Icon type='Zocial' name="email" style={[Styles.CLW, Styles.F24]} />
					</TouchableOpacity>
					<TouchableOpacity style={Styles.aboutus}>
						<Icon type='FontAwesome' name="phone" style={[Styles.CLW, Styles.F24]} />
					</TouchableOpacity>
				</View>
				<Text style={[Styles.Tcenter, Styles.MT50]}>About Us</Text>
				<View style={[Styles.Jbetween, Styles.ROW, Styles.MT20]}>
					<View style={[Styles.Jcenter, Styles.Acenter, { width: '48%' }]}>
						<Image source={Images.logo} style={{ width: normalize(80), height: normalize(80), resizeMode: 'contain' }} />
					</View>
					<View style={{ height: normalize(80), borderRightWidth: 1, borderColor: 'grey' }} />
					<View style={{ height: normalize(80), width: '48%', justifyContent: 'center' }}>
						<Text style={Styles.Tcenter}>ASAPEsq</Text>
						<Text style={Styles.Tcenter}>www.abc.com</Text>
					</View>
				</View>
			</Content>
		</Container>
	)
}
export default Aboutus
