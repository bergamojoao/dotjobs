import React, {useEffect, useState} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import {Button, Checkbox, ProgressBar, TextInput, Title} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../assets/logo.png';

import style from './styles';
import api from '../../services/api';
import imgur from "../../services/imgur";
import AsyncStorage from '@react-native-async-storage/async-storage';


async function handleSubmitEmployer(data) {

    const {cep, user_id, address, phone} = data


    const response = await api.post('/employers', {
        phone,
        cep,
        address,
        user_id
    });

    if (response.status === 201) {

        await api.put(`/users/${user_id}`, {
            status: "1"
        })

        await AsyncStorage.setItem('$employer', JSON.stringify(response.data))

    } else {
        alert('Erro de cadastro')
    }
}


async function handleSubmitFreelancer(data) {

    const {cep, user_id, address, phone, rg_picture, cpf_picture, description} = data


    const response = await api.post('/freelancers', {
        phone,
        cep,
        address,
        user_id,
        rg_picture,
        cpf_picture,
        description
    });

    if (response.status === 201) {

        await api.put(`/users/${user_id}`, {
            status: "1"
        })

        await AsyncStorage.setItem('$freelancer', JSON.stringify(response.data))

    } else {
        alert('Erro de cadastro')
    }
}

const Form = (props) => {
    return (
        <View style={style.form}>
            <Title>Informe seu celular</Title>
            <TextInput label="Celular" keyboardType='number-pad' mode='outlined' style={style.input}
                       value={props.phone.phone} onChangeText={props.phone.setPhone}/>
            <Title>Agora seu CEP</Title>
            <TextInput label="CEP" keyboardType="email-address" mode='outlined' style={style.input}
                       value={props.cep.cep} onChangeText={props.cep.setCep}/>
            <Title>Por fim, seu endereço</Title>
            <TextInput label="Endereço" keyboardType="email-address" mode='outlined' style={style.input}
                       value={props.address.address} onChangeText={props.address.setAddress}/>
            <Button style={{marginTop: 15}} icon="arrow-right" mode="contained" onPress={() => props.handleAdvance(2)}>
                Avançar
            </Button>
        </View>
    );
}

const FormFreelancer = (props) => {

    const [rg_picture, setRgPicture] = useState('');
    const [cpf_picture, setCpfPicture] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit() {

        const {phone, address, cep} = props.data;

        const user = props.data.user

        await handleSubmitFreelancer({
            phone,
            address,
            cep,
            rg_picture,
            cpf_picture,
            description,
            user_id: user.id
        })

    }

    async function selectImage(op) {
        const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            alert('Voce precisa dar permissao para enviar uma imagem');
        }

        const resul = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })


        if (!resul.cancelled) {
            let localUri = resul.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();

            formData.append('image', {uri: localUri, name: filename, type});

            try {

                const uploadResponse = await imgur.post('/upload', formData, {
                    headers: {
                        'Authorization': 'Client-ID df52e300ee70c91'
                    }
                })

                if (op === 'rg')
                    setRgPicture(uploadResponse.data.data.link)
                else setCpfPicture(uploadResponse.data.data.link)

            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <ScrollView style={style.form}>
            <Title>Copia do RG (frente e verso)</Title>
            <Button style={{marginTop: 15}} icon="image" mode="contained" onPress={async () => {
                await selectImage("rg")
            }}>
                Selecionar Imagem
            </Button>
            {rg_picture !== '' &&
            <Text style={{fontWeight: 'bold', color: '#0aa134', marginTop: 10, fontSize: 18}}>RG selecionado com
                sucesso!</Text>}
            <Title style={{marginTop: 35}}>Copia do CPF</Title>
            <Button style={{marginTop: 15}} icon="image" mode="contained" onPress={async () => {
                await selectImage("cpf")
            }}>
                Selecionar Imagem
            </Button>
            {cpf_picture !== '' &&
            <Text style={{fontWeight: 'bold', color: '#0aa134', marginTop: 10, fontSize: 18}}>CPF selecionado com
                sucesso!</Text>}
            <Title style={{marginTop: 40}}>Conte-nos um pouco sobre com o que voce trabalha</Title>
            <TextInput label="Descreva com o que voce trabalha" mode='outlined' multiline style={style.input}
                       value={description} onChangeText={setDescription}/>
            <Button style={{marginTop: 5}} icon="arrow-right" mode="contained" onPress={() => props.handleAdvance(5)}>
                Avançar
            </Button>
        </ScrollView>
    );
}

const Option = (props) => {
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const user = props.data.user


    async function handleSubmit() {

        const {phone, address, cep} = props.data;

        if (checked) {

            await handleSubmitEmployer({
                phone,
                address,
                cep,
                user_id: user.id
            })

        }

        if (checked2)
            props.handleAdvance(3)
        else props.handleAdvance(4)


    }

    return (
        <View style={style.form}>
            <Title style={{marginBottom: 20}}>Certo, {user.name}.</Title>
            <Title>Qual é seu interesse no DotJobs?</Title>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                />
                <Text>Gostaria de anunciar um serviço</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    status={checked2 ? 'checked' : 'unchecked'}
                    onPress={() => setChecked2(!checked2)}
                />
                <Text>Sou freelancer e quero procurar serviços</Text>
            </View>

            <Button style={{marginTop: 40}} icon="arrow-right" mode="contained" onPress={handleSubmit}>
                Avançar
            </Button>
        </View>
    );

}

const Confirmation = () => {
    const navigation = useNavigation();
    return (
        <>
            <Icon name="check-circle" size={100} color='#e3b529'/>
            <View style={{width: '70%'}}>
                <Title style={{fontSize: 25, textAlign: 'center'}}>Legal!</Title>
                <Title style={{fontSize: 25, textAlign: 'center'}}>Agora você já pode anunciar ou procurar servicos caso
                    seja freelancer!</Title>
                <Button style={{marginTop: 40}} mode='outlined' onPress={() => {
                    navigation.navigate('Home')
                }}>
                    <Text style={{fontSize: 18}}>IR PARA HOME</Text>
                </Button>
            </View>

        </>

    );
}

const FirstAccess = () => {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(step / 3);
    const [stepText, setStepText] = useState('Etapa 1: Informações básicas')

    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');

    const route = useRoute();

    const user = route.params.user;

    function handleAdvance(passo) {
        setStep(passo);
        setProgress(progress + 0.333333)
        setStepText('Etapa 1: Informações básicas')
    }

    return (
        <View style={style.container}>
            <Image source={Logo} style={style.image}/>
            {step === 1 ? <Form handleAdvance={handleAdvance}
                                phone={{phone, setPhone}}
                                cep={{cep, setCep}}
                                address={{address, setAddress}}
                /> :
                step === 2 ? <Option handleAdvance={handleAdvance} data={{
                        phone, cep, address, user
                    }
                    }/> :
                    step === 3 ? <FormFreelancer handleAdvance={handleAdvance} data={{
                            phone, cep, address, user
                        }
                        }/> :
                        <Confirmation/>
            }
            <View style={style.footer}>
                <ProgressBar progress={progress} style={style.progress}/>
                <Text style={{fontSize: 18}}>{stepText}</Text>
            </View>
        </View>
    );
}

export default FirstAccess;