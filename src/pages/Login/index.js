import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/logo.png';

import style from './styles';

import api from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function handleLogin() {
        const response = await api.post('/users/login', {email, password});

        if (response.status === 200) {
            const user = response.data
            if (user.status == 0)
                navigation.navigate('FirstAccess', {user})
            else navigation.navigate('Home', {user})
        } else {
            alert('Login Incorreto')
        }
    }

    return (
        <View style={style.container}>
            <Image source={Logo} style={style.image}/>
            <TextInput keyboardType='email-address' label="Email" mode='outlined' style={style.input}
                       onChangeText={setEmail} value={email}/>
            <TextInput secureTextEntry passwordRules label="Senha" mode='outlined' style={style.input}
                       onChangeText={setPassword} value={password}/>
            <Button mode='outlined' style={style.button} onPress={() => navigation.navigate('SignUp')}>
                Ainda não sou cadastrado
            </Button>
            <Button mode='contained' style={style.button} onPress={handleLogin}>
                <Text style={style.btnTxt}>ENTRAR</Text>
            </Button>
        </View>
    );
}

export default Login;