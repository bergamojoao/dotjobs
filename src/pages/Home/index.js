import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper'
import Logo from '../../assets/logo.png';

import api from '../../services/api';

import style from './styles';

const Home = () => {

    const [freelancer, setFreelancer] = useState(null)
    const [employer, setEmployer] = useState(null)
    const navigation = useNavigation()

    useEffect (() => {
        async function getUser(){
            setFreelancer(JSON.parse(await AsyncStorage.getItem('$freelancer')));
            setEmployer(JSON.parse(await AsyncStorage.getItem('$employer')));
            console.log(freelancer, employer)
        }

        getUser()
    },[])

    return (
        <View style={style.container}>
            <Image source={Logo} style={style.image}/>
            {employer && <Title style={{fontSize:30,height:50}}>Empregador</Title>}
            {employer && <Button mode='contained' style={style.button} onPress={()=>{navigation.navigate('CreateService',{employer_id:employer.id})}}>
                <Text style={style.btnTxt}>CADASTRAR SERVIÇO</Text>
            </Button>}
            {employer && <Button mode='contained' style={style.button} onPress={()=>{navigation.navigate('EmployerServices',{employer_id:employer.id})}}>
                <Text style={style.btnTxt}>MEUS SERVIÇOS</Text>
            </Button>}
            {freelancer && <Title style={{fontSize:30,height:50}}>Freelancer</Title>}
            {freelancer && <Button mode='contained' style={style.button} onPress={()=>{navigation.navigate('Services',{freelancer_id:freelancer.id})}}>
                <Text style={style.btnTxt}>BUSCAR SERVIÇOS</Text>
            </Button>}
            {freelancer && <Button mode='contained' style={style.button} onPress={()=>{navigation.navigate('FreelancerInterests',{freelancer_id:freelancer.id})}}>
                <Text style={style.btnTxt}>MEUS INTERESSES</Text>
            </Button>}
        </View>
    );
}

export default Home;