import React, { useState,useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image , Alert} from 'react-native';
import baseUrl from '../common/url.js'


export default function Log({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLoginPress = async () => {
        if (!username || !password) {
          Alert.alert('Login Error', 'Please enter your username and password.');
          return;
        }
    
        try {
          const response = await fetch(`${baseUrl}/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setPassword('');
            setUsername('');
            console.log(data);
    
            if (response.status === 200) {
              
              Alert.alert('Login Successful', 'Welcome!');
              navigation.navigate('Journey');
            } else {
              Alert.alert('Login Failed', 'Your username or password is incorrect.');
            }
          } else {
            const text = await response.text();
            Alert.alert('Login Failed', 'An error occurred. Please try again.');
          }
        } catch (error) {
          Alert.alert('Login Failed', 'An error occurred. Please try again.');
        }
      };
    
  

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ImageBackground source={require('./assets/vv.png')} style={styles.image}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>LOG IN</Text>
                </View>

                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', marginTop: 45 }}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.icon} source={require('./assets/user.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="#576574"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.icon} source={require('./assets/password.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#576574"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Text style={{ position: 'relative', top: 25, right:97, fontSize:19 }}>Create an account</Text>
                    <TouchableOpacity onPress={()=> {navigation.navigate('Signin')}}   style={styles.button1}  >
                        <Text style={{ color: 'black', fontSize: 22, position: 'relative', top: 5, fontFamily: 'LilitaOne-Regular' }}>sign up</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLoginPress}   style={styles.button}>
                        <Text style={styles.buttonText}>log in</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    text: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 65,
        color: '#7155EB',
        position: 'relative',
        top: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 2, height: 1.2 },
        textShadowRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.4,
        borderColor: '#7155EB',
        borderRadius: 15,
        marginVertical: 19,
        width: '90%',
       
    },
    input: {
        flex: 1,
        padding: 10,
        color: 'black',
        fontSize: 22,
        

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
        
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'LilitaOne-Regular',
        position: 'relative',
        top: 9,
    },
    icon: {
        height: 29,
        width: 29,
        marginHorizontal: 10,
        opacity: 0.5,
    },
    button1: {
   
        alignItems: 'center',
        height: 60,
        width: 250,
        position: 'relative',
        bottom:6,
        left:30 
    
      },

   
});
