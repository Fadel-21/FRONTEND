import React, { useState } from "react"
import { StyleSheet, Dimensions } from "react-native"
import {
    Text,
    HStack,
    Avatar,
    Box
} from 'native-base'

const { height, width } = Dimensions.get('window')

const CartItem = (props) => {
    const data = props.item.item
    const [quantity, setQuantity] = useState(props.item.quantity)

    return (
        <HStack
            margin={2}
            style={styles.listItem}
            key={Math.random()}
        >
            <Avatar 
                source={{ 
                    uri: data.image 
                    ? data.image 
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                }}
            />
            <Box style={styles.body}>
                <HStack>
                    <Text>{data.product.name}</Text>
                    <Text position='absolute' left={200}>Rp.{data.product.price}</Text>
                </HStack>
            </Box>
        </HStack>
    )
}

const styles = StyleSheet.create({
    body: {
        margin: 10,
        // alignItems: 'center',
        // flexDirection: 'row',
    },
    listItem: {
        // alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 0
        // justifyContent: 'center'
        // height: 70,
        // width: width / 1.2
    },
  })

export default CartItem