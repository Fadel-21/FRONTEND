import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../assets/logo/logo.jpg')}
        resizeMode='contain'
        style={{height: 50}}
      />
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    }
})