import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { Container, Content, Icon, Thumbnail } from 'native-base'
import { Images, LAYOUT, Styles } from '../constants'
import { LogOut } from '../redux/actions/authActions'
import normalize from 'react-native-normalize'


const SideMenu = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [sideData, setSideData] = useState([])

  const handleNavigate = (e) => {
    if (e === "login") {
      dispatch(LogOut())
    } else {
      navigation.navigate(e)
    }
  }

  useEffect(() => {
    if (user.flag == 'client') {
      setSideData(LAYOUT.ClientSideMenu)
    } else {
      setSideData(LAYOUT.AttorneySideMenu)
    }
  }, [user])

  return (
    <Container style={{ backgroundColor: 'rgb(26,38,43)' }}>
      <View style={Styles.PV20}>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Image source={Images.profileimg} style={{ borderColor: "rgb(196, 196, 196)", borderWidth: 10, overflow: "hidden", height: normalize(100), width: normalize(100), borderRadius: 100 / 2, alignSelf: 'center' }} />
        </TouchableOpacity>
        <Text style={[Styles.F20, Styles.Tcenter, Styles.FW700, Styles.MT5, { color: 'rgb(211,211,212)' }]}>{user.username}</Text>
        <View style={[Styles.Jcenter, Styles.ROW, Styles.MT5]}>
          <Icon type="SimpleLineIcons" name="envelope-letter" style={[Styles.F24, { color: '#B2BBBC' }]} />
          <Text style={[Styles.F20, Styles.Tcenter, Styles.ML10, { color: 'rgb(211,211,212)' }]}>{user.email}</Text>
        </View>
        <TouchableOpacity onPress={navigation.closeDrawer} style={{ position: 'absolute', top: 10, right: 10 }}>
          <Icon type="AntDesign" name="close" style={{ color: '#B2BBBC', fontSize: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 0.5, borderColor: '#B2BBBC', height: 1 }} />
      <Content contentContainerStyle={styles.PV10}>
        {
          sideData.map((item, key) => (
            <React.Fragment key={key}>
              <TouchableOpacity style={[Styles.ROW, Styles.Acenter]} onPress={() => handleNavigate(item.screen)}>
                <View style={[Styles.ML10, { width: '20%' }]}>
                  <Thumbnail small square source={item.img} />
                </View>
                <View style={{ width: '80%' }}>
                  <Text style={[Styles.F20, { color: 'rgb(211,211,212)' }]}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ borderLeftWidth: 0.5, borderColor: '#B2BBBC', height: normalize(20), marginLeft: normalize(28) }} />
            </React.Fragment>
          ))
        }
      </Content>
    </Container>
  )
}

export default SideMenu

const styles = StyleSheet.create({
  ...Styles
})