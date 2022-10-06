import { StyleSheet } from 'react-native'
import React from 'react'
import { Badge, Text, Box, VStack } from 'native-base'

import { connect } from 'react-redux'

const CartIcon = (props) => {
  return (
  <>
    {props.cartItems.length ? (
        <Badge 
            style={styles.badge}
            colorScheme="danger" rounded="full" variant="solid"
            _text={{
                fontSize: 11
              }}
        >
            {props.cartItems.length}
        </Badge>
    ) : null}
  </>
  )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        left: 20,
        top: -8,
    },
})

export default connect(mapStateToProps)(CartIcon);