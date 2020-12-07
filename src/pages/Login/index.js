import React from 'react';
import { Image, Text, View } from 'react-native';
import {Button, TextInput} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.png';

import style from './styles';

const Login = () => {
  const navigation = useNavigation();
  return (
      <View style={style.container}>
        <Image source={Logo}style={style.image}/>
        <TextInput keyboardType='email-address' label="Email" mode='outlined' style={style.input}/>
        <TextInput secureTextEntry passwordRules label="Senha" mode='outlined' style={style.input}/>
        <Button mode='outlined' style={style.button} onPress={() => navigation.navigate('SignUp')}>
          Ainda não sou cadastrado
        </Button>
        <Button mode='contained' style={style.button} onPress={() => alert('Logou-se')}>
          <Text style={style.btnTxt}>ENTRAR</Text>
        </Button>
      </View>
  );
}

export default Login;