import React from 'react'
import { TouchableOpacity, Image} from 'react-native'
import { Body, Header, Icon, Left, Right, Title } from 'native-base'
import { Images, Styles } from '../constants'
import normalize from 'react-native-normalize'

const Headers = ({event, title, icon=<Icon type="Feather" name="menu" style={[Styles.CLW, Styles.F24]}/>}) => {
  return (
    <Header style={{backgroundColor:'rgb(72, 72, 72)',height:normalize(80)}}>
      <Left style={{flex: 1}}>
        <TouchableOpacity onPress={event}>{icon}</TouchableOpacity>
      </Left>
      <Body style={{flex: 3}}>
        <Title style={[{alignSelf:'center'}, Styles.F20]}>{title}</Title>
      </Body>
      <Right style={{flex: 1}}>
        {/* <Icon type="Feather" name="bell" style={[Styles.CLW, Styles.F24]}/> */}
      </Right>
    </Header>
  )
}

export default Headers