import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    button: {
        paddingTop: 20,
        paddingBottom: 20,
        marginHorizontal: 20,
        borderRadius: 5,
    },

    parent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5,
        marginRight: 10,
    }
});

const Home = ({navigation}) => {
    const [mydata, setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if (datastr!= null) {
            let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        } else {
            setMyData(datasource);
        }
    };

    getData();

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.parent} onPress={()=> {
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Edit", {index:index, type:section.title, key:item.key, name:item.name, image:item.image, copies:item.copies, datastring:datastr});
            }}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={{flex: 1}}>
                    <Text style={styles.textStyle}>Title: {item.name}</Text>
                    <Text style={styles.textStyle}>ISBN: {item.key}</Text>
                    <Text style={styles.textStyle}>Copies: {item.copies}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1, paddingTop: 40, marginBottom: 20}}>
            <View style={styles.button}>
                <Button
                    title="Add Book"
                    onPress={()=>{
                        let datastr = JSON.stringify(mydata)
                        navigation.navigate("Add", {datastring: datastr})}}
                />
            </View>
            <StatusBar hidden={true} />
            <SectionList
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={({section: {title}}) => (
                    <View style={styles.title}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default Home;
