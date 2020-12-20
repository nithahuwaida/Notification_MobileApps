import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SendNotification = () => {
    const send = () => {
        //use the IPv4 Address your laptop
        fetch('http://192.168.43.51:5123/api/notification/sendToAll',{
            method : 'POST'
        }).then((response)=>{
            console.log('success')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <TouchableOpacity
                onPress={()=> send()}
                style={{
                    backgroundColor:'green',
                    padding: 10,
                    alignItems : 'center',
                    justifyContent : 'center',
                    borderRadius : 10,
                }}
            >
                <Text style={{color:'#fff', fontWeight:'700'}}>
                    Send Notification
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SendNotification;