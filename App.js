/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import firebase from 'react-native-firebase';

const App = () => {
  useEffect(()=>{
    getToken();
    createChannel();
    notificationListener();
  },[])

  // * get token from server
    const getToken = async()=>{
      const firebaseToken = await firebase.messaging().getToken();
      console.log(firebaseToken)
    }

  // * create channel
    const createChannel = () =>{
      const channel = new firebase.notifications.Android.Channel(
        'channelId',
        'channelName',
        firebase.notifications.Android.Importance.Max
      ).setDescription('Decription');

      firebase.notifications().android.createChannel(channel)
    }
  
  // * Foreground Notification
    const notificationListener = () =>{
      firebase.notifications().onNotification((notification)=>{
        if(Platform.OS === 'android'){
          const localNotification = new firebase.notifications.Notification({
            sound : 'default',
            show_in_foreground : true,
          })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId')
          .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase.notifications().displayNotification(localNotification)
          .catch((err)=>console.log(err))
        }
      })
    }

  return (
    <View>
      <Text>Application TEST</Text>
    </View>
  );
};

export default App;
