import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import api from '../../services/api'

export default function Services() {
    const [services, setServices] = useState([])

    const [errorMessage, setErorrMessage] = useState(null)

    async function getServices() {
            try {
                const response = await api.get('/services')

                setServices(response.data)
            } catch(error) {
                setErorrMessage('Não foi possível encontrar serviços')
            }
    }

    useEffect(() => {getServices()}, [])

    function handleSearch() {

    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View style={style.search}>
                    <Icon color='#797979' name="search" size={30}/>
                    <TextInput style={{fontSize: 17, marginLeft: 10}}  dnChangeText={handleSearch} placeholder='Procurar um novo serviço' placeholderTextColor='#7B7B7B'/>
                </View>
            </View>
            <View>
                <View>
                    {
                        errorMessage && services.length > 0 ?
                        (
                            <FlatList 
                                data={services} 
                                style={{ marginBottom: 100, paddingTop: 10 }}
                                keyExtractor={ data => data.id }
                                ListHeaderComponent={
                                    () => (
                                        <View>
                                            <Text>{`${services.length} resultados encontrados baseados nas suas escolhas`}</Text>
                                        </View>
                                    )
                                }
                                renderItem={({item}) => {
                                    return (
                                        <View style={style.card}>
                                            <View style={style.info}>
                                                <Image style={style.image} source={{
                                                    uri: item.picture !== undefined ?
                                                    item.picture :
                                                    'https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/person-people-man-profile-human-512.png'
                                                }} />
                                                <View>
                                                    <Text style={{fontSize: 17, paddingBottom: 5}}>{item.name}</Text>
                                                    <Text style={{fontWeight: 'bold'}}>{item.service}</Text>
                                                </View>
                                            </View>
                                            <View style={style.visualInfo}>
                                                <View style={style.stars}>
                                                {
                                                    Array.from(Array(5).keys()).map((a, index) => (
                                                        <View key={item.id+'_'+index}>
                                                            {
                                                                index < item.stars ?
                                                                <Icon2 name="ios-star" style={style.star} size={17} color='#F1C644' /> :
                                                                <Icon2 name="ios-star" style={style.star} size={17} color='#D4D4D4' />

                                                            }
                                                        </View>
                                                    ))
                                                }
                                                </View>
                                                <Text style={style.price}>{String(item.price).replace(/\w/g, '$')}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        ) : (
                            <Text>{errorMessage}</Text>
                        )
                    }
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
    }
})
