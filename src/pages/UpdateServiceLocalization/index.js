import React, {useEffect, useState} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import {Button, Checkbox, ProgressBar, TextInput, Title} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native';
import Logo from '../../assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

import style from './styles';

const UpdateServiceLocalization = () => {

    const [address, setAddress] = useState('');
    const navigation = useNavigation();

    async function handleUpdate() {

        const response = await api.put('/services/localization', {
            localization:address
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
                <Title  style={{fontSize:30, paddingTop:10, paddingBottom:10}}>Localização do serviço</Title>
                <Title>Onde será realizado o serviço?</Title>
                <TextInput label="Endereço" mode='outlined' style={style.input}
                        value={address} onChangeText={setAddress}/>
                <Button style={{marginTop: 15}} mode="contained" onPress={handleUpdate}>
                    ATUALIZAR
                </Button>
            </View>
        </View>
    );
}

export default UpdateServiceLocalization;