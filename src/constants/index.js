import React from "react"
import { StyleSheet } from "react-native"
import normalize from 'react-native-normalize'
import { COLOR } from "./Color"
import { LAYOUT } from "./Layout"
export * from './Color'
export * from './Layout'
export * from './Root'
export * from './Images'
export const LocalizationContext = React.createContext()
export const Styles = StyleSheet.create({
    centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.modalBackground,
		paddingHorizontal: normalize(20)
	},
    RequestType: {
        borderRadius: normalize(40),
        width: normalize(40),
        height: normalize(40),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: normalize(5)
    },
    googleMap: {
        alignSelf: 'stretch',
        height: LAYOUT.window.height * 0.54
    },
    triangleShapeCSS: {
        alignSelf: 'flex-end',
        width: 0,
        height: 0,
        borderTopWidth: 15,
        borderLeftWidth: 15,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'blue'
    },
    aboutus: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(72, 72, 72)',
        borderRadius: normalize(40),
        width: normalize(50),
        height: normalize(50),
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        color: COLOR.primary
    },
    BoxShadow: {
        shadowOffset: { width: 2, height: 3 },
        shadowColor: COLOR.greyColor,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
    },
    TDL: {
        textDecorationLine: 'underline'
    },

    Hidden: {
        overflow: 'hidden'
    },

    Tcenter: {
        textAlign: 'center'
    },
    Tvcenter: {
        textAlignVertical: 'center'
    },
    Tleft: {
        textAlign: 'left'
    },
    Tright: {
        textAlign: 'right'
    },
    ROW: {
        flexDirection: 'row'
    },
    Wrap: {
        flexWrap: 'wrap'
    },
    Jbetween: {
        justifyContent: 'space-between'
    },
    Jaround: {
        justifyContent: 'space-around'
    },
    Jcenter: {
        justifyContent: 'center'
    },
    Jstart: {
        justifyContent: 'flex-start'
    },
    Jend: {
        justifyContent: 'flex-end'
    },
    AScenter: {
        alignSelf: 'center'
    },
    Acenter: {
        alignItems: 'center'
    },
    Astart: {
        alignItems: 'flex-start'
    },
    Aend: {
        alignItems: 'flex-end'
    },

    PABS: {
        position: 'absolute'
    },
    FW400: {
        fontWeight: '400'
    },
    FW700: {
        fontWeight: '700'
    },
    FWBold: {
        fontWeight: 'bold'
    },


    F10: {
        fontSize: normalize(10)
    },
    F14: {
        fontSize: normalize(14)
    },
    F15: {
        fontSize: normalize(15)
    },
    F16: {
        fontSize: normalize(16)
    },
    F17: {
        fontSize: normalize(17)
    },
    F18: {
        fontSize: normalize(18)
    },
    F19: {
        fontSize: normalize(19)
    },
    F20: {
        fontSize: normalize(20)
    },
    F21: {
        fontSize: normalize(21)
    },
    F22: {
        fontSize: normalize(22)
    },
    F23: {
        fontSize: normalize(23)
    },
    F24: {
        fontSize: normalize(24)
    },
    F25: {
        fontSize: normalize(25)
    },
    F26: {
        fontSize: normalize(26)
    },
    F27: {
        fontSize: normalize(27)
    },
    F28: {
        fontSize: normalize(28)
    },
    F30: {
        fontSize: normalize(30)
    },
    F35: {
        fontSize: normalize(35)
    },
    F40: {
        fontSize: normalize(40)
    },
    F70: {
        fontSize: normalize(70)
    },


    M0: {
        margin: 0
    },
    M5: {
        margin: normalize(5)
    },
    M10: {
        margin: normalize(10)
    },
    M20: {
        margin: normalize(20)
    },
    M30: {
        margin: normalize(30)
    },
    M40: {
        margin: normalize(40)
    },
    M50: {
        margin: normalize(50)
    },

    MT5: {
        marginTop: normalize(5)
    },
    MT10: {
        marginTop: normalize(10)
    },
    MT15: {
        marginTop: normalize(15)
    },
    MT20: {
        marginTop: normalize(20)
    },
    MT30: {
        marginTop: normalize(30)
    },
    MT40: {
        marginTop: normalize(40)
    },
    MT50: {
        marginTop: normalize(50)
    },
    MT60: {
        marginTop: normalize(60)
    },
    MT70: {
        marginTop: normalize(70)
    },

    MB10: {
        marginBottom: normalize(10)
    },
    MB20: {
        marginBottom: normalize(20)
    },
    MB30: {
        marginBottom: normalize(30)
    },
    MB40: {
        marginBottom: normalize(40)
    },
    MB50: {
        marginBottom: normalize(50)
    },
    MB60: {
        marginBottom: normalize(60)
    },
    MB70: {
        marginBottom: normalize(70)
    },

    MV5: {
        marginVertical: normalize(5)
    },
    MV10: {
        marginVertical: normalize(10)
    },
    MV10: {
        marginVertical: normalize(10)
    },
    MV15: {
        marginVertical: normalize(15)
    },
    MV20: {
        marginVertical: normalize(20)
    },
    MV30: {
        marginVertical: normalize(30)
    },
    MV40: {
        marginVertical: normalize(40)
    },
    MV50: {
        marginVertical: normalize(50)
    },

    MH5: {
        marginHorizontal: normalize(5)
    },
    MH10: {
        marginHorizontal: normalize(10)
    },
    MH20: {
        marginHorizontal: normalize(20)
    },
    MH30: {
        marginHorizontal: normalize(30)
    },
    MH40: {
        marginHorizontal: normalize(40)
    },
    MH50: {
        marginHorizontal: normalize(50)
    },

    MR5: {
        marginRight: normalize(5)
    },
    MR10: {
        marginRight: normalize(10)
    },
    MR20: {
        marginRight: normalize(20)
    },
    MR30: {
        marginRight: normalize(30)
    },
    MR40: {
        marginRight: normalize(40)
    },
    MR50: {
        marginRight: normalize(50)
    },

    ML5: {
        marginLeft: normalize(5)
    },
    ML10: {
        marginLeft: normalize(10)
    },
    ML15: {
        marginLeft: normalize(15)
    },
    ML20: {
        marginLeft: normalize(20)
    },
    ML30: {
        marginLeft: normalize(30)
    },
    ML40: {
        marginLeft: normalize(40)
    },
    ML50: {
        marginLeft: normalize(50)
    },


    P5: {
        padding: normalize(5)
    },
    P10: {
        padding: normalize(10)
    },
    P20: {
        padding: normalize(20)
    },
    P30: {
        padding: normalize(30)
    },

    PT5: {
        paddingTop: normalize(5)
    },
    PT10: {
        paddingTop: normalize(10)
    },
    PT15: {
        paddingTop: normalize(15)
    },
    PT20: {
        paddingTop: normalize(20)
    },
    PT25: {
        paddingTop: normalize(25)
    },
    PT30: {
        paddingTop: normalize(30)
    },
    PT40: {
        paddingTop: normalize(40)
    },
    PT50: {
        paddingTop: normalize(50)
    },

    PB10: {
        paddingBottom: normalize(10)
    },
    PB15: {
        paddingBottom: normalize(15)
    },
    PB20: {
        paddingBottom: normalize(20)
    },
    PB30: {
        paddingBottom: normalize(30)
    },
    PB40: {
        paddingBottom: normalize(40)
    },
    PB50: {
        paddingBottom: normalize(50)
    },

    PL5: {
        paddingLeft: normalize(5)
    },
    PL10: {
        paddingLeft: normalize(10)
    },
    PL15: {
        paddingLeft: normalize(15)
    },
    PL20: {
        paddingLeft: normalize(20)
    },
    PL25: {
        paddingLeft: normalize(25)
    },
    PL30: {
        paddingLeft: normalize(30)
    },

    PR10: {
        paddingRight: normalize(10)
    },
    PR20: {
        paddingRight: normalize(20)
    },
    PR50: {
        paddingRight: normalize(50)
    },

    PV5: {
        paddingVertical: normalize(5)
    },
    PV10: {
        paddingVertical: normalize(10)
    },
    PV15: {
        paddingVertical: normalize(15)
    },
    PV20: {
        paddingVertical: normalize(20)
    },
    PV30: {
        paddingVertical: normalize(30)
    },
    PV50: {
        paddingVertical: normalize(50)
    },

    PH5: {
        paddingHorizontal: normalize(5)
    },
    PH10: {
        paddingHorizontal: normalize(10)
    },
    PH15: {
        paddingHorizontal: normalize(15)
    },
    PH20: {
        paddingHorizontal: normalize(20)
    },
    PH30: {
        paddingHorizontal: normalize(30)
    },
    PH40: {
        paddingHorizontal: normalize(40)
    },
    PH50: {
        paddingHorizontal: normalize(50)
    },

    H30: {
        height: normalize(30)
    },
    H40: {
        height: normalize(40)
    },
    H50: {
        height: normalize(50)
    },
    H55: {
        height: normalize(55)
    },
    H60: {
        height: normalize(60)
    },
    H70: {
        height: normalize(70)
    },
    H100: {
        height: normalize(100)
    },
    H200: {
        height: normalize(200)
    },
    H100P: {
        height: '100%'
    },

    W25P: {
        width: '25%'
    },
    W33P: {
        width: '33.33%'
    },
    W50P: {
        width: '50%'
    },
    W75P: {
        width: '75%'
    },
    W100P: {
        width: '100%'
    },
    CLW: {
        color: COLOR.whiteColor
    },
    CLbk: {
        color: COLOR.blackColor
    },
    CLP: {
        color: COLOR.primary
    },
    baseBackground: {
        backgroundColor: COLOR.baseBackground
    },
    BKW: {
        backgroundColor: COLOR.whiteColor
    },
})