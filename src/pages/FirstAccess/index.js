import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import {Button, Checkbox, ProgressBar, TextInput, Title} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../assets/logo.png';

import style from './styles';

const Form = (props) => {
  return (
      <View style={style.form}>
        <Title>Informe seu celular</Title>
        <TextInput label="Celular" keyboardType='number-pad' mode='outlined' style={style.input}/>
        <Title>Agora seu CEP</Title>
        <TextInput label="CEP" keyboardType="email-address" mode='outlined' style={style.input}/>
        <Title>Por fim, seu endereço</Title>
        <TextInput label="Endereço" keyboardType="email-address" mode='outlined' style={style.input}/>
        <Button style={{marginTop:15}} icon="arrow-right" mode="contained" onPress={props.handleAdvance}>
          Avançar
        </Button>
      </View>
  );
}

const Option = (props) => {
  const [checked,setChecked] = useState(false);
  return (
    <View style={style.form}>
      <Title style={{marginBottom:20}}>Qual é seu interesse no DotJobs?</Title>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={()=>setChecked(!checked)}
        />
        <Text>Gostaria de anunciar um serviço</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={()=>setChecked(!checked)}
        />
        <Text>Sou freelancer e quero procurar serviços</Text>
      </View>

      <Button style={{marginTop:40}} icon="arrow-right" mode="contained" onPress={props.handleAdvance}>
        Avançar
      </Button>
    </View> 
  );

}

const Confirmation = () => {
  const navigation = useNavigation();
  return (
    <>
      <Icon name="check-circle" size={100} color='#e3b529' />
      <View style={{width:'70%'}}>
        <Title style={{fontSize:25,textAlign:'center'}}>Legal!</Title>
        <Title style={{fontSize:25,textAlign:'center'}}>Agora você já pode anunciar o que está precisando e aguardar algum freelancer se interessar!</Title>
        <Button style={{marginTop:40}} mode='outlined' onPress={()=>{navigation.navigate('Login')}}>
          <Text style={{fontSize:18}}>ANUNCIAR AGORA</Text>
        </Button>
      </View>
      
    </>

  );
}

const FirstAccess = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(step/3);
  const [stepText, setStepText] = useState('Etapa 1: Informações básicas')

  function handleAdvance(){
    setStep(step+1);
    setProgress(progress+0.333333)
    setStepText('Etapa 1: Informações básicas')
  }
  return (
      <View style={style.container}>
        <Image source={Logo}style={style.image}/>
        {step === 1 ? <Form handleAdvance={handleAdvance}/> : step === 2 ? <Option handleAdvance={handleAdvance}/> : <Confirmation/>}
        <View style={style.footer}>
          <ProgressBar progress={progress} style={style.progress}/>
          <Text style={{fontSize:18}}>{stepText}</Text>
        </View>
      </View>
  );
}

export default FirstAccess;