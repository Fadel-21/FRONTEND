import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  Stack,
  Text,
  HStack,
  VStack,
  Heading,
  Avatar,
  Box,
  Button,
  Divider,
} from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'

import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem'

const { height, width } = Dimensions.get('window')

const Cart = (props) => {

    var total = 0;
    props.cartItems.forEach(cart => {
      return (total += cart.product.price)
    })

    return (
      <>
        {props.cartItems.length ? (
          <Stack>
            <Heading alignSelf={'center'}>Cart</Heading>
            <SwipeListView
              data={props.cartItems}
              renderItem={(data) => (
                <CartItem item={data}/>
              )}
              renderHiddenItem={(data) => (
                <TouchableOpacity 
                  style={styles.hiddenContainer}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <View style={styles.hiddenButton}>
                      <FontAwesome name='trash' color={'white'} size={30} />
                  </View>
                </TouchableOpacity>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
            <VStack space={3} divider={<Divider />} w="100%">
              <HStack justifyContent="space-between">
                  <Text style={styles.price}>Rp.{total}</Text>
                <HStack space={3}>
                  <Button
                    onPress={() => props.clearCart()}
                  >
                    Clear
                  </Button>
                  <Button
                    colorScheme='green'
                    onPress={() => props.navigation.navigate('Checkout')}
                  >
                      Checkout
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </Stack>
        ) : (
          <Stack style={styles.emptyContainer}>
            <Text>Looks like your cart is empty</Text>
            <Text>Add products to your cart to get started</Text>
          </Stack>
        )}
      </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
      cartItems: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height / 2 + 100 + 100,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  body: {
    margin: 10,
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -360,
    left: 0
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red'
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 45,
    width: width / 1.2,
    marginTop: 10,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);