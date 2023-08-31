import { View, Text, StyleSheet, FlatList, ImageBackground, } from 'react-native'
import { FAB } from 'react-native-paper'
import React from 'react'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        desc: '  The name Kalutara is a name broken from the name Kalutota '
        
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Fourth Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Fifth Item',
    },
];

const Item = ({ title, desc }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text  >{desc}</Text>
    </View>
);

export default function Journey() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground source={require('./assets/vv.png')} style={styles.image}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.text}>Journey</Text>
                    <FAB
                        icon="plus"
                        style={styles.fab}

                    />
                </View>

                <View style={{ flex: 8 }}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) =>
                            <Item title={item.title} desc={item.desc} />
                           
                            
                        }
                        keyExtractor={item => item.id}
                    />
                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 65,
        color: '#7155EB',
        position: 'relative',
        top: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 2, height: 1.2 },
        textShadowRadius: 10,
        alignSelf: 'center'
    },
    item: {
        backgroundColor: '#B5A5F7',
        marginVertical: 10,
        height: 180,
        width: 350,
        borderRadius: 15,
        elevation: 10,
        alignSelf: 'center'
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
        backgroundColor: '#B5A5F7'
    },
})