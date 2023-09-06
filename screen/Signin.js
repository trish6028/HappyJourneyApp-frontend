import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import baseUrl from '../common/url.js'


export default function Log({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
  

    const handleSignUp = async () => {
        if (password !== reEnterPassword) {
          Alert.alert("Passwords don't match");
          return;
        }
    
        try {
          const response = await fetch(`${baseUrl}/api/users/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
    
          const data = await response.json();
          console.log(data);
    
          if (data.message === 'Signup successful') {
            alert('Signup successful. You can now log in.');
          } else {
            alert('Signup failed. Please try again.');
          }
        } catch (error) {
          console.error('Error during signup:', error);
        }
      };
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ImageBackground source={require('./assets/vv.png')} style={styles.image}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>SIGN UP</Text>
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
                    <View style={styles.inputContainer}>
                        <Image style={styles.icon} source={require('./assets/key_4085421.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder="Re - Enter Password"
                            placeholderTextColor="#576574"
                            secureTextEntry={true}
                            value={reEnterPassword}
                            onChangeText={setReEnterPassword}
                        />
                    </View>

                    <Text style={{ position: 'relative', top: 25, right: 70, fontSize: 19 }}>Already have an account</Text>
                    <TouchableOpacity style={styles.button1}  >
                        <Text onPress={()=> {navigation.navigate('Log')}} style={{ color: 'black', fontSize: 22, position: 'relative', top: 5, fontFamily: 'LilitaOne-Regular', left: 45 }}>log in</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleSignUp}  style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
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
        marginVertical: 10,
        width: '90%',
    },
    input: {
        flex: 1,
        padding: 10,
        color: 'black',
        fontSize: 17,
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
        bottom: 6,
        left: 30
    },
});
