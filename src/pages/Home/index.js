import React from 'react';
import {Image, Text, View} from 'react-native';
import Logo from '../../assets/logo.png';

import api from '../../services/api';

import style from './styles';

const Home = () => {
    return (
        <View style={style.container}>
            <Image source={Logo} style={style.image}/>
            <Text>Home</Text>
        </View>
    );
}

export default Home;