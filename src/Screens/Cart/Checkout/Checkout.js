import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Select, Box, Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'

import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'

const countries = require('../../../assets/data/countries.json')

const Checkout = (props) => {
    
  const [orderItems, setOrderItems] = useState()
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [zip, setZip] = useState()
  const [country, setCountry] = useState()
  const [phone, setPhone] = useState()  

  useEffect(() => {
    setOrderItems(props.cartItems)

    return () => {
      setOrderItems()
    }
  }, [])  

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      ShippingAddress: address,
      zip
    }

    props.navigation.navigate('Payment', {order: order})
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Shipping Address'}>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address'}
          name={'ShippingAddress'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
        />
        <Box maxW='300'>
          <Select
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <FontAwesome name='arrow-down' color={'#007aff'}/>
            }}
            isHovered
            selectedValue={country}
            minWidth="250"
            accessibilityLabel='Select your country'
            placeholder='Select your country'
            m={3}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Select.Item 
                        key={c.code}
                        label={c.name}
                        value={c.name}
                    />
            })}
          </Select>
        </Box>
        <View style={{width: '80%', alignItems: 'center'}}>
          <Button
            onPress={() => checkOut()}
          >
            Confirm
          </Button>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  )
}

const mapStateToProps = (state) => {
  const { cartItems } = state
  return {
    cartItems: cartItems
  }
}

export default connect(mapStateToProps)(Checkout)