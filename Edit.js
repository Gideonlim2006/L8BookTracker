import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {
    let mydata = JSON.parse(route.params.datastring)
    let myindex = route.params.index;

    const [name, setName] = useState(route.params.name);
    const [ISBN, setISBN] = useState(route.params.key);
    const [image, setImage] = useState(route.params.image);
    const [copies, setCopies] = useState(route.params.copies);

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate('Home');}

    return(
        <View style={{padding:10, justifyContent:"center", flex:1}}>
            <View style={{padding:10}}>
                <Text style={{fontWeight: "bold"}}>Name:</Text>
                <TextInput style={{borderWidth: 1}} value={name} onChangeText={(text) => setName(text)} />
            </View>

            <View style={{padding:10}}>
                <Text style={{fontWeight: "bold"}}>ISBN:</Text>
                <TextInput style={{borderWidth: 1}} value={ISBN} onChangeText={(text) => setISBN(text)} />
            </View>

            <View>
                <Text style={{fontWeight: "bold"}}>Image URL:</Text>
                <TextInput style={{borderWidth: 1}} value={image} onChangeText={(text) => setImage(text)}/>
            </View>

            <View style={{padding:10}}>
                <Text style={{fontWeight: "bold"}}>Copies:</Text>
                <TextInput
                    style={{borderWidth: 1}}
                    value={String(copies)}
                    onChangeText={(text) => setCopies(Number(text) || 0)}
                    keyboardType={"numeric"}
                />

            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="SAVE"
                        onPress={() => {
                            let indexnum = 1;
                            if (route.params.type == "Fictional") {
                                indexnum = 0;
                            } else if (route.params.type == "Non-fictional") {
                                indexnum = 1;
                            }
                            mydata[indexnum].data[route.params.index] = {
                                key: ISBN,
                                name: name,
                                image: image,
                                copies: copies
                            }
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="DELETE"
                        onPress={() => {
                            let indexnum = 1;
                            if (route.params.type == "Fictional") {
                                indexnum = 0;
                            } else if (route.params.type == "Non-fictional") {
                                indexnum = 1;
                            }
                            Alert.alert("Are you sure?",'',
                                [{text: 'Yes', onPress: ()=> {
                                        mydata[indexnum].data.splice(myindex, 1);
                                        let stringdata = JSON.stringify(mydata);
                                        setData(stringdata);
                                    }},
                                    {text: 'No'}])
                        }}
                    />
                </View>
            </View>
            <Button title="Back" onPress={()=>{navigation.navigate("Home")}}/>
        </View>
    )

}

export default Edit;
