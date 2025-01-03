import React,{useState} from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [ISBN, setISBN] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [copies, setCopies] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate('Home');
    }

    return (
        <View style={{padding:10, justifyContent:"center",  flex:1}}>
            <View style={{padding:10}}>
                <Text style={{fontWeight: "bold"}}>Name:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setName(text)} />
            </View>

            <View style={{padding:10}}>
                <Text style={{fontWeight: "bold"}}>ISBN:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setISBN(text)} />
            </View>

            <RNPickerSelect placeholder={{label: "Select type"}} onValueChange={(value) => setType(value)}
                            items={[
                                { label: 'Fictional', value: 'Fictional' },
                                { label: 'Non-fictional', value: 'Non-fictional' },
                            ]}
            />
            <Text style={{fontWeight: "bold"}}>Image URL:</Text>
            <TextInput style={{borderWidth: 1}} onChangeText={(text) => setImage(text)}/>

            <View style={{padding:10}}>
                <Text style={{fontWeight: "bold"}}>Copies:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setCopies(parseInt(text))} keyboardType={"numeric"}/>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <View style={{ flex: 1, padding: 5 }}>
                    <Button
                        title="SUBMIT"
                        onPress={() => {
                            let mydata = JSON.parse(route.params.datastring);
                            let item = { key: ISBN, name: name, image: image, copies: copies, type: type };
                            let indexnum = 1;
                            if (type == "Fictional") {
                                indexnum = 0;
                            } else if (type == "Non-fictional") {
                                indexnum = 1;
                            }
                            mydata[indexnum].data.push(item);
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }}
                    />
                </View>
                <View style={{ flex: 1, padding: 5 }}>
                    <Button
                        title="BACK"
                        onPress={() => navigation.navigate("Home")}
                    />
                </View>
            </View>

        </View>
    )
}

export default Add;
