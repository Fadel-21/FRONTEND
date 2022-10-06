import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import {
    HStack,
    Text,
    Avatar,
    Box,
    Heading,
    Center,
    VStack,
    Button,
} from 'native-base'

import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'

var { width, height } = Dimensions.get('window')

const Confirm = (props) => {
    
    const confirmOrder = () => {

        setTimeout(() => {
            props.clearCart()
            props.navigation.navigate('Cart')
        }, 500)
    }

    const confirm = props.route.params

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Heading size='lg'>
                    Confirm Order
                </Heading>
                {props.route.params ?
                    <View style={{ borderWidth: 1, borderColor: 'orange'}}>
                        <Text style={styles.shipping}>Shipping to:</Text>
                        <Center>
                            <View style={{padding: 8}}>
                                <Text>Address: {confirm.order.order.ShippingAddress}</Text>
                                <Text>Phone: {confirm.order.order.phone}</Text>
                                <Text>City: {confirm.order.order.city}</Text>
                                <Text>Country: {confirm.order.order.country}</Text>
                                <Text>Zip Code: {confirm.order.order.zip}</Text>
                            </View>
                        </Center>
                        <Center>
                            <Heading size='md'>Items:</Heading>
                        </Center>
                        {confirm.order.order.orderItems.map((x) => {
                            return (
                                <VStack
                                    width={width / 1.2} 
                                    backgroundColor='white'
                                    key={x.product.name}
                                >
                                    <HStack m={2}>
                                        <Avatar mr={2} source={{
                                            uri: x.product.image ? x.product.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                                        />
                                        <Center>
                                            <HStack>
                                                <Text ml={10}>{x.product.name}</Text>
                                                <Text position='absolute' left={145}>Rp.{x.product.price}</Text>
                                            </HStack>
                                        </Center>
                                    </HStack>
                                </VStack>
                            )
                        })}
                    </View>
                : null}
                    <Button 
                        my={5}
                        onPress={() => confirmOrder()}
                    >
                        Place Order
                    </Button>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8      
    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default connect(null, mapDispatchToProps)(Confirm);