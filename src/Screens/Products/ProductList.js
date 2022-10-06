import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

import ProductCard from './ProductCard'

const {width} = Dimensions.get('screen')

const ProductList = (props) => {

    const {item} = props;

    return (
        <TouchableOpacity 
            style={{width: '50%'}}
            onPress={() => 
                props.navigation.navigate('product detail', { item: item})
            }
        >
                <View style={{
                    width: width / 2,
                    backgroundColor: 'gainsboro'
                }}>
                    <ProductCard {...item}/>
                </View>
        </TouchableOpacity>
    )
}

export default ProductList