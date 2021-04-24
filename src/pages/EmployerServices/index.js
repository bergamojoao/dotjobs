import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Touchable } from 'react-native'
import { Modal, Button} from 'react-native-paper'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import api from '../../services/api'

export default function EmployerServices({route, navigation}) {
    const [services, setServices] = useState([])
    const [service_id, setServiceId] = useState(null)

    const [errorMessage, setErorrMessage] = useState(null)


    async function getServices() {
            try {
                const {employer_id} = route.params
                const response = await api.get(`/services/byEmployer/${employer_id}`)
                setServices(response.data)
            } catch(error) {
                setErorrMessage('Não foi possível encontrar serviços')
            }
    }

    useEffect(() => {getServices()}, [])

    return (
        <View style={style.container}>
            <View>
                <View>
                    <FlatList 
                        data={services} 
                        style={{ marginBottom: 100, paddingTop: 10 }}
                        keyExtractor={ data => data.id }
                        ListHeaderComponent={
                            () => (
                                <View style={{marginLeft:20}}>
                                    <Text>{`Voce possui ${services.length} serviços cadastrados.`}</Text>
                                </View>
                            )
                        }
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity style={style.card} onPress={()=>{navigation.navigate('ServiceInterests',{service_id: item.id})}}>
                                    <View style={style.info}>
                                        <Image style={style.image} source={{
                                            uri: item.picture !== undefined ?
                                            item.picture :
                                            'https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/person-people-man-profile-human-512.png'
                                        }} />
                                        <View>
                                            <Text style={{fontSize: 17, paddingBottom: 5}}>{item.description}</Text>
                                            <Text style={{fontWeight: 'bold'}}>{item.localization}</Text>
                                        </View>
                                    </View>
                                    <View style={style.visualInfo}>
                                        <Text style={style.price}>R$ {item.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
        paddingTop: 30
    },
    header: {
        elevation: 2,
        height: 90,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        borderColor: '#929292',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    card: {
        width: '90%',
        height: 80,
        flex: 1,        
        elevation: 4,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 10,
        marginVertical: 6
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },  
    image: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#d4d4d4',
        marginRight: 10
    },  
    stars:{
        flexDirection: 'row',
    },
    star: {
        marginRight: 2
    },
    visualInfo: {
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#2DAC0D',
        fontWeight: 'bold'
    },
    button: {
        width: '40%',
        marginBottom: 20,
        marginTop:20
    },
    btnTxt: {
        fontSize: 25
    },
})
