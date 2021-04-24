import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Touchable } from 'react-native'
import { Modal, Button} from 'react-native-paper'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import api from '../../services/api'

export default function ServiceInterests({route, navigation}) {
    const [interests, setInterests] = useState([])
    const [visible, setVisible] = useState(false)
    const [interest, setInterest] = useState(null)

    const [errorMessage, setErorrMessage] = useState(null)


    async function getServices() {
            try {
                const {service_id} = route.params
                const response = await api.get(`/interests/byService/${service_id}`)
                setInterests(response.data)
            } catch(error) {
                setErorrMessage('Não foi possível encontrar interessados')
            }
    }

    async function acceptFreelancer(){
        try {
            await api.put(`/interests/${interest}`,{
                status:1
            })
            hideModal()
        } catch(error) {
            setErorrMessage('Não foi possível aceitar freelancer')
        }
    }

    useEffect(() => {getServices()}, [])

    const showModal = (interest_id) => {setInterest(interest_id);setVisible(true)};
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, };

    return (
        <View style={style.container}>
            <View>
                <View>
                    <FlatList 
                        data={interests} 
                        style={{ marginBottom: 100, paddingTop: 10 }}
                        keyExtractor={ data => data.id }
                        ListHeaderComponent={
                            () => (
                                <View>
                                    <Text>{`Este serviço possui ${interests.length} freelancers interessados.`}</Text>
                                </View>
                            )
                        }
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity style={style.card} onPress={()=>{item.status == 0 && showModal(item.id) }}>
                                    <View style={style.info}>
                                        <Image style={style.image} source={{
                                            uri: item.freelancer.user.picture !== null  ?
                                            iitem.freelancer.user.picture  :
                                            'https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/person-people-man-profile-human-512.png'
                                        }} />
                                        <View>
                                            <Text style={{fontSize: 17}}>{item.freelancer.user.name}</Text>
                                            <Text style={{paddingBottom: 5}}>{item.freelancer.user.email}</Text>
                                            <Text style={{color:'#666',fontStyle:'italic'}}>{item.freelancer.description}</Text>
                                        </View>
                                    </View>
                                    {item.status > 0 && <View style={style.visualInfo}>
                                        <Icon name="envelope" size={30}/>
                                    </View>}
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={style.btnTxt}>Deseja aceitar este freelancer?</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button mode='contained' style={style.button} onPress={acceptFreelancer}>
                        <Text style={style.btnTxt}>SIM</Text>
                    </Button>
                    <Button mode='contained' style={style.button} onPress={hideModal}>
                        <Text style={style.btnTxt}>NÃO</Text>
                    </Button>
                </View>
            </Modal>
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
