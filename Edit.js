import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {datasource} from './Data.js';

const Edit = ({navigation, route}) => {
    const [letter, setLetter] = useState(route.params.key);
    const [type, setType] = useState(route.params.type);

    return (
        <View style={{marginTop: 40}}>
            <Text>Letter: </Text>
            <TextInput value={letter}
                       maxLenth={1}
                       style={{borderWidth: 1}}
                       onChangeText={(text) => setLetter(text)}
            />
            <Picker onValueChange={(text) => setType(text)}>
                <Picker.Item label="Vowels" value="Vowels"/>
                <Picker.Item label="Consonants" value="Consonants"/>
            </Picker>
            <Button title="Save"
                    onPress={() => {
                        let item = {key: letter};
                        let indexnum = 1;
                        if (type == "Vowels") {
                            indexnum = 0;
                        }
                        datasource[indexnum].data[route.params.index].key = letter;
                        navigation.navigate("Home");
                    }}
            />
            <Button title='Delete' onPress={() => {
                let indexnum = 1;
                if (route.params.type === "Vowels") {
                    indexnum = 0;
                }
                Alert.alert('Confirm Delete', 'Are you sure?', [
                    {
                        text: 'Yes', onPress: () => {
                            datasource[indexnum].data.splice(route.params.index, 1);
                            navigation.navigate('Home');
                        }
                    },
                    {text: 'No'}
                ]);
            }} />
        </View>
    )
};


export default Edit;