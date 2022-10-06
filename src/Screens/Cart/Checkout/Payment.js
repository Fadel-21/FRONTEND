import { View } from 'react-native'
import React, { useState } from 'react'
import {
    Stack,
    Heading,
    HStack,
    VStack,
    Text,
    Radio,
    Select,
    Avatar,
    Box,
    Button
} from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

const methods = [
    { name: 'Cash on Delivery', value: 1},
    { name: 'Bank Transfer', value: 2},
    { name: 'Card Payment', value: 3}
]

const paymentCards = [
    { name: 'Wallet', value: 1},
    { name: 'Visa', value: 2},
    { name: 'MasterCard', value: 3},
    { name: 'Other', value: 4}
]

const Payment = (props) => {
  
    const order = props.route.params

    const [ selected, setSelected ] = useState()
    const [ card, setCard ] = useState()

    return (
        <Stack>
            <VStack space={1} alignItems="center" my={5}>
                <Heading size='md'>Choose your payment method</Heading>
            </VStack>
            {methods.map((item, index) => {
                return (
                    <Box 
                        // maxW='150'
                        borderBottomWidth={1}
                        my={2}
                        mx={3}
                        key={item.name}
                    >
                        <Radio.Group
                            name="myPaymentGroup"
                            value={selected}
                            onChange={nextValue => {
                                setSelected(nextValue)
                            }}
                        >
                            <Radio value={item.value}>
                                {item.name}
                            </Radio>
                        </Radio.Group>
                    </Box>
                )
            })}
            {selected == 3 ? (
                <Box maxW='230'>
                    <Select
                    _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <FontAwesome name='arrow-down' color={'#007aff'}/>
                    }}
                    selectedValue={card}
                    accessibilityLabel='Choose your payment card'
                    placeholder='Choose your payment card'
                    m={3}
                    onValueChange={(x) => setCard(x)}
                    >
                        {paymentCards.map((c, index) => {
                            return <Select.Item 
                                        key={c.name}
                                        label={c.name} 
                                        value={c.name}/>
                        })}
                    </Select>
                </Box>
            ) : null}
            <Button
                my={5}
                mx={120}
                onPress={() => props.navigation.navigate('Confirm', {order})}
            >
                Confirm
            </Button>
        </Stack>
    )
}

export default Payment