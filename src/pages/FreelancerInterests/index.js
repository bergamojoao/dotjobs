import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Touchable } from 'react-native'
import { Modal, Button, TextInput, IconButton} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import api from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function FreelancerInterests({route, navigation}) {
    const [interests, setInterests] = useState([])
    const [visible, setVisible] = useState(false)
    const [visibleMessage, setVisibleMessage] = useState(false)
    const [interest, setInterest] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const [errorMessage, setErorrMessage] = useState(null)

    async function sendMessage(){
        try {
            await api.post(`/messages`,{
                interest_id:interest,
                user_id: await AsyncStorage.getItem("$user"),
                message
            })
            setMessage("")
            await getMessages()
        } catch(error) {
            setErorrMessage('Não foi possível enviar mensagem')
        }
    }


    async function getInterests() {
            try {
                const {freelancer_id} = route.params
                const response = await api.get(`/interests/byFreelancer/${freelancer_id}`)
                setInterests(response.data)
            } catch(error) {
                setErorrMessage('Não foi possível carregar seus interesses')
            }
    }

    async function getMessages() {
        try {
            const response = await api.get(`/messages/byInterest/${interest}`)
            setMessages(response.data)
        } catch(error) {
            setErorrMessage('Não foi carregar as mensagens')
        }
    }

    useEffect(() => {getInterests()}, [])

    const showModal = (interest_id) => {setInterest(interest_id);setVisible(true)};
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, };

    const showMessageModal = (interest_id) => {setInterest(interest_id);getMessages();setVisibleMessage(true)};
    const hideMessageModal = () => setVisibleMessage(false);

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
                                <View style={{marginLeft:20}}>
                                    <Text>{`Voce se interessou por ${interests.length} serviços.`}</Text>
                                </View>
                            )
                        }
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity style={style.card} onPress={()=>{ if(item.status == 0)showModal(item.id); else showMessageModal(item.id) }}>
                                    <View style={style.info}>
                                        <Image style={style.image} source={{
                                            uri: item.freelancer.user.picture !== null  ?
                                            iitem.freelancer.user.picture  :
                                            'https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/person-people-man-profile-human-512.png'
                                        }} />
                                        <View>
                                            <Text style={{fontSize: 17}}>{item.service.description}</Text>
                                            <Text style={{paddingBottom: 5}}>{item.service.employer.user.name}</Text>
                                            {item.status == 0 && (<Text style={{color:'#666',fontStyle:'italic'}}>Aguardando resposta</Text>)}
                                            {item.status == 1 && (<Text style={{color:'green',fontStyle:'italic'}}>ACEITO</Text>)}
                                            {item.status == 2 && (<Text style={{color:'green',fontStyle:'italic'}}>CONCLUÍDO</Text>)}
                                        </View>
                                    </View>
                                    <View style={style.visualInfo}>
                                        <Text style={style.price}>R$ {item.service.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
            <Modal visible={visibleMessage} onDismiss={hideMessageModal} contentContainerStyle={containerStyle}>
                <Text style={[style.btnTxt,{paddingBottom:20, paddingTop:50}]}>Mensagens</Text>
                <FlatList
                    inverted
                    data={messages}
                    keyExtractor={ data => data.id }
                    renderItem={({item}) =>{
                        return (
                                <View style={{flexDirection:'column', paddingBottom:10}}>
                                    <Text style={{fontWeight:'bold', fontSize:18}}>{item.user.name}: </Text>
                                    <Text style={{fontSize:15}}>{item.message}</Text>
                                </View>
                        )
                    }}
                />
                <View style={{flexDirection:'row', paddingBottom:5,alignItems:'center'}}>
                    <TextInput placeholder="Digite sua mensagem..."  style={{flex:15}} value={message} onChangeText={setMessage}/>
                    <IconButton icon="send" style={{backgroundColor:"#e3b529"}} size={30} onPress={sendMessage}/>
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
        width:'90%',
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
        width: '40%'
    },
    btnTxt: {
        fontSize: 25
    },
})
