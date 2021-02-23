import React, {useEffect, useState} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import {Button, Checkbox, ProgressBar, TextInput, Title} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native';
import Logo from '../../assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

import style from './styles';

const CreateService = () => {

    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');

    async function handleSubmit() {

        const response = await api.post('/services', {
            description,
            localization:address,
            price
        });

        if (response.status === 200) {
            navigation.navigate('Home');
        } else {
            console.log("erro", response.data)
        }

    }

    return (
        <View style={style.container}>
            <Image source={Logo} style={style.image}/>
            <View style={style.form}>
                <Title  style={{fontSize:30, paddingTop:10, paddingBottom:10}}>Cadastro de serviço</Title>
                <Title>Descreva seu serviço</Title>
                <TextInput label="Descricao" mode='outlined' multiline style={style.input}
                        value={description} onChangeText={setDescription}/>
                <Title>Onde será realizado o serviço?</Title>
                <TextInput label="Endereço" mode='outlined' style={style.input}
                        value={address} onChangeText={setAddress}/>
                <Title>Quanto custará?</Title>
                <TextInput label="Preço" keyboardType="number-pad" mode='outlined' style={style.input}
                        value={price} onChangeText={setPrice}/>
                <Button style={{marginTop: 15}} mode="contained" onPress={handleSubmit}>
                    CADASTRAR
                </Button>
            </View>
        </View>
    );
}

export default CreateService;