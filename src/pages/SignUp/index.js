import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import {Button, ProgressBar, TextInput, Title} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../assets/logo.png';

import style from './styles';

const Form = (props) => {
  return (
      <View style={style.form}>
        <Title>Primeiro insira seu nome completo</Title>
        <TextInput label="Nome completo" mode='outlined' style={style.input}/>
        <Title>Agora o email que irá usar</Title>
        <TextInput label="Email" keyboardType="email-address" mode='outlined' style={style.input}/>
        <Title>Por fim, sua senha.</Title>
        <TextInput secureTextEntry passwordRules label="Senha" mode='outlined' style={style.input}/>
        <Button style={{marginTop:15}} icon="arrow-right" mode="contained" onPress={props.handleAdvance}>
          Avançar
        </Button>
      </View>
  );
}

const Confirmation = () => {
  const navigation = useNavigation();
  return (
    <>
      <Icon name="envelope" size={100} color='#e3b529' />
      <View style={{width:'70%'}}>
        <Title style={{fontSize:25,textAlign:'center'}}>Enviamos um e-mail para você, assim que confirmar o e-mail, poderá entrar em sua conta.</Title>
        <Button style={{marginTop:40}} mode='outlined' onPress={()=>{navigation.navigate('Login')}}>
          <Text style={{fontSize:18}}>Ir para o login</Text>
        </Button>
      </View>
      
    </>

  );
}

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0.3);
  const [stepText, setStepText] = useState('Etapa 1: Informações básicas')

  function handleAdvance(){
    setStep(2);
    setProgress(0.5)
    setStepText('Etapa 2: Confirmação de email')
  }
  return (
      <View style={style.container}>
        <Image source={Logo}style={style.image}/>
        {step === 1 ? <Form handleAdvance={handleAdvance}/> : <Confirmation/>}
        <View style={style.footer}>
          <ProgressBar progress={progress} style={style.progress}/>
          <Text style={{fontSize:18}}>{stepText}</Text>
        </View>
      </View>
  );
}

export default SignUp;