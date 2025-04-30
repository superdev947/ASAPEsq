import React, { useState } from "react"
import { Image, ImageBackground, StatusBar, TouchableOpacity, View } from 'react-native'
import { Container, Content, Text } from "native-base"
import { Images, LAYOUT, Root, Styles } from "../../constants"
import normalize from "react-native-normalize"
import { useSelector } from "react-redux"
import base64 from 'base-64'
import Loading from "../../theme/Loading"
import { WebView } from 'react-native-webview'
import { fetchs } from "../../redux/services"

const Subscription = ({ navigation }) => {
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [changed, setChanged] = useState(false)
    const [state, setState] = useState({
        open: false,
        url: ""
    })

    const paypalPay = () => {
        setLoading(true)
        var data = "grant_type=client_credentials"
        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": "99",
                    "currency": "USD",
                    "details": {
                        "subtotal": "99",
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "0",
                        "shipping_discount": "0",
                        "insurance": "0"
                    }
                }

            }],
            "redirect_urls": {
                "return_url": Root.paymentSuccess,
                "cancel_url": Root.paymentError
            }
        }

        var xhr = new XMLHttpRequest()
        xhr.withCredentials = true

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var accessToken = JSON.parse(this.responseText).access_token
                var sendData = JSON.stringify(dataDetail)

                var xhr = new XMLHttpRequest()
                xhr.withCredentials = true

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        var response = JSON.parse(this.responseText)
                        var approval_link = response.links.filter(item => item.rel == "approval_url")[0].href
                        console.log('approval_link :>> ', approval_link)
                        setState({ ...state, open: true, url: approval_link })
                        setLoading(false)
                    }
                })

                xhr.open("POST", "https://api.sandbox.paypal.com/v1/payments/payment")
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken)
                xhr.setRequestHeader("Content-Type", "application/json")

                xhr.send(sendData)
            }
        })

        xhr.open("POST", "https://api.sandbox.paypal.com/v1/oauth2/token")
        xhr.setRequestHeader("Authorization", "Basic " + base64.encode(Root.paypalClientID + ":" + Root.paypalSecret))
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

        xhr.send(data)
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    const onNavigationChange = async (e) => {
        if (changed) {
            return
        }
        if (e.url.includes(Root.paymentSuccess) || e.url.includes(Root.paymentError)) {
            setChanged(true)
        }
        if (e.url.includes(Root.paymentSuccess)) {
            const response = await fetchs({
                url: Root.attorney_UpdateStatus_EndURL, body: {
                    attorney_id: user.userid
                }
            })
            console.log('response :>> ', response)
            if (response.status === "success") {
                alert("Thank you for submitting an application. You should receive an email within the next 48 hours regarding how to fill in your information for a background check. Once we have reviewed your application, you will receive an email to let you know if you have been approved.")
                navigation.navigate("login")
            }
            setState({ ...state, open: false, url: "" })
            setChanged(false)
        } else if (e.url.includes(Root.paymentError)) {
            setState({ ...state, open: false, url: "" })
            setChanged(false)
        }
    }

    return (
        <Container>
            <Content>
                <ImageBackground source={Images.backgroundimg} style={[{ width: LAYOUT.window.width, height: LAYOUT.window.height }, Styles.Acenter, Styles.Acenter]}>
                    <View style={[Styles.Acenter, Styles.MT70]}>
                        <Image source={Images.logo} style={[{ width: normalize(100), height: normalize(100), resizeMode: "contain" }]} />
                        <Image source={Images.logoelq} style={[{ resizeMode: "contain", height: normalize(30) }, Styles.MT10]} />
                        <Text style={[Styles.CLW, Styles.Tcenter, Styles.FWBold, Styles.F24, Styles.MV20]}>$99/Year</Text>
                        <View style={[Styles.ROW]}>
                            <Text style={[Styles.CLW, Styles.W75P, Styles.Tcenter]}>Please pay $99 for 1 year and use unlimited app for 1 year.</Text>
                        </View>
                        <TouchableOpacity style={[Styles.MT20, Styles.PV20, Styles.PH50, { backgroundColor: "#0090d4", borderRadius: 10 }]} onPress={() => paypalPay()}>
                            <Text style={[Styles.CLW]}>Pay</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                {state.open &&
                    <View style={{ position: "absolute", top: 0, left: 0, width: LAYOUT.window.width, height: LAYOUT.window.height - StatusBar.currentHeight, backgroundColor: 'white' }}>
                        <WebView source={{ uri: state.url }} style={[Styles.W100P, Styles.H100P]} onNavigationStateChange={onNavigationChange} />
                    </View>
                }
            </Content>
        </Container>
    )
}

export default Subscription
