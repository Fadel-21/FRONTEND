import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text, Image, Stack, HStack, FlatList, VStack, Avatar } from 'native-base'

var {width} = Dimensions.get('window')

const SearchedProduct = (props) => {
  const { productsFiltered } = props;

  return (
    <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("product detail", {item: item})
                        }}
                        key={item._id.$oid}
                    >
                        <VStack
                            // onPress={() => {
                            //     props.navigation.navigate("product detail", {item: item})
                            // }}
                            // key={item._id.$oid}
                        >
                            <HStack
                                space={[2, 3]}
                                borderBottomWidth={1}
                                margin={1}
                                padding={1}
                            >
                                <Avatar
                                    size='60px'
                                    source={{uri: item.image ?
                                        item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                            }}
                                />
                                <VStack>
                                    <Text>{item.name}</Text>
                                    <Text note>{item.description}</Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf:  'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </View>
  );
};

export default SearchedProduct

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})