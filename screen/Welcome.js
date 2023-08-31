import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

export default function Welcome() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/p.png')} style={styles.images}>
      <Text style={styles.heading}>HAPPY JOURNEY</Text>
      <Text style={styles.heading2}>to  renew your beautiful memories</Text>
      <TouchableOpacity  style={styles.button}  >
                    <Image style={{ width: 25, height: 15, position: 'relative', top: 20, left: 90 }} source={require('./assets/icons8-arrow-100.png')} />
                    <Text style={{ color: 'white', fontSize: 23, position: 'relative',bottom:2, right:9,  fontFamily:'LilitaOne-Regular' }}>Get Started</Text>
                </TouchableOpacity>

      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 49,
    fontFamily: 'LilitaOne-Regular',
    color: '#7155EB',
    position:'relative',
    marginTop: 330,
    alignSelf:'center'
  },
  heading2: {
    fontSize: 18,
    alignSelf: "center",
    color: '#8A8781',
    
  },
  button: {
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 3,
    alignItems: 'center',
    backgroundColor: '#7155EB',
    height: 60,
    width: 230,
    alignSelf: 'center',
    elevation: 5,
    position: 'relative',
    top: 100
  },
  images: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
})