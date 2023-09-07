import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, KeyboardAvoidingView, Modal, TouchableOpacity, TextInput, Button, Alert, ScrollView} from 'react-native';
import { FAB } from 'react-native-paper';
import baseUrl from '../common/url.js';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

export default function Journey({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);

    const formatDateTime = dateTime => {
        return moment(dateTime).format('MMMM Do YYYY, h:mm:ss a');
      };
    
    
    const loadData = () => {
        fetch(`${baseUrl}/api/journey/getJourney`)
            .then(response => response.json())
            .then(json => {
                const sortedData = json.sort((a, b) => new Date(b.event_datetime) - new Date(a.event_datetime));
                setData(sortedData);
            });

    };

    useEffect(() => {
        loadData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {

            closeModal();
        }, [])
    );

    const savePlace = () => {

        Alert.alert(
            'Confirmation',
            'Do you want to save this place?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {

                        const data = {
                            title,
                            descrip: description,
                            latitude,
                            longitude,
                        };

                        fetch(`${baseUrl}/api/journey/saveJourney`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                console.log('Place saved successfully:', result);
                                loadData();

                            })
                            .catch((error) => {
                                console.error('Error saving place:', error);

                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/vv.png')} style={styles.image}>
                <View style={styles.header}>
                    <Text style={styles.text}>Journey</Text>
                    <FAB
                        icon="plus"
                        style={styles.fab}
                        onPress={openModal}
                    />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inputContainer}
                >
                    <Modal visible={modalVisible} animationType="fade">
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.input}
                                multiline
                                placeholder="Title"
                                placeholderTextColor="white"
                                onChangeText={(text) => setTitle(text)}
                            />
                               
                              <TextInput
                                style={styles.input}
                                multiline
                                numberOfLines={4}
                                placeholder="Description"
                                placeholderTextColor="white"
                                onChangeText={(text) => setDescription(text)}
                            />

                               
                          
                            <TextInput
                                style={styles.input}
                                placeholder="Latitude"
                                placeholderTextColor="white"
                                onChangeText={(text) => setLatitude(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Longitude"
                                placeholderTextColor="white"
                                onChangeText={(text) => setLongitude(text)}
                            />
                            <TouchableOpacity style={styles.saveButton}    onPress={savePlace}><Text  style={styles.closeButtonText}  >Save Place</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.mapButton}
                                onPress={() =>
                                    navigation.navigate('Maps', { latitude, longitude })

                                }
                                > 
                                <Text style={styles.closeButtonText} >View on Map</Text></TouchableOpacity>

                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>

                <View style={{ flex: 29 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude , title: item.title , descrip: item.descrip,datetime: item.event_datetime})}

                            >
                                 <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: '700' }}>   {item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 15 }}>   {item.descrip.length > 50 ? item.descrip.substring(0, 50) + '...' : item.descrip}</Text>
                                <Text style={{ textAlign: 'center' }}>{formatDateTime(item.event_datetime)}</Text>


                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 3,
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
        alignSelf: 'center',
    },
    item: {
        backgroundColor: '#B5A5F7',
        marginVertical: 10,
        height: 180,
        width: 350,
        borderRadius: 15,
        elevation: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 32,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        top: 0,
        backgroundColor: '#B5A5F7',
    },
    inputContainer: {
        flex: 5,
    },
    map: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a29bfe',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        width: 180,
        elevation: 10,
        width: 355,
    },
    saveButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1B9CFC',
        borderRadius: 5,
        width: 180,
        elevation: 10,
        width: 355,
    },
    mapButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#33d9b2',
        borderRadius: 5,
        width: 180,
        elevation: 10,
        width: 355,
    },
    

    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor:'white',
      borderRadius:15,
        marginBottom: 20,
        height:55,
        width:355,
        fontSize:20,
        color:'white'
    },
    itemContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        width: 360,
        height: 160,
        borderRadius: 13,
        padding: 25,
        backgroundColor: '#C5B7FE',
        marginTop: 20,
        elevation: 10,
    },
});
