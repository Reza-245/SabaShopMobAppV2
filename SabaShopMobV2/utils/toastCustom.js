import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from './SabaColors.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export function toastCustom() {
  const config = {
    success: {
      type: 'success',
      placement: 'top',
      duration: 1400,
      animationType: 'zoom-in',
      // icon: <Feather name="check-circle" size={23} color="#2eff00" />,
      textStyle: {
        fontFamily: 'shabnam',
        color: '#2eff00',
      },

      style: {
        backgroundColor: Colors.sabaBlack,
        borderWidth: 1,
        borderColor: '#2eff00',
      },
    },
    successInfo: {
      type: 'success',
      placement: 'top',
      duration: 1400,
      animationType: 'zoom-in',

      textStyle: {
        fontFamily: 'shabnam',
        color: '#2eff00',
      },
      style: {
        backgroundColor: Colors.sabaBlack,
        borderWidth: 1,
        borderColor: '#2eff00',
      },
    },
    warning: {
      type: 'warning',
      placement: 'top',
      duration: 1400,
      animationType: 'slide-in',
      icon: <AntDesign name="warning" size={26} color="#ff9e00" />,
      textStyle: {
        fontFamily: 'shabnam',
        color: '#ff9e00',
      },
      style: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff9e00',
      },
    },
    danger: {
      type: 'danger',
      placement: 'top',
      duration: 1400,
      animationType: 'slide-in',
      icon: <MaterialIcons name="dangerous" size={26} color="red" />,
      textStyle: {
        fontFamily: 'shabnam',
        color: 'red',
      },
      style: {
        backgroundColor: Colors.sabaBlack,
        borderWidth: 1,
        borderColor: 'red',
      },
    },
    info: {
      type: 'normal',
      placement: 'top',
      duration: 1400,
      animationType: 'slide-in',
      icon: <FontAwesome5 name="info-circle" size={26} color="#fff" />,
      textStyle: {
        fontFamily: 'shabnam',
      },
      style: {
        backgroundColor: Colors.sabaIndigo,
      },
    },
    info: {
      type: 'normal',
      placement: 'top',
      duration: 1400,
      animationType: 'slide-in',
      textStyle: {
        fontFamily: 'shabnam',
      },
      style: {
        backgroundColor: Colors.sabaIndigo,
      },
    },
    loading: {
      type: 'normal',
      placement: 'top',
      animationType: 'zoom-in',
      icon: <ActivityIndicator size={35} color="#fff" />,
      textStyle: {
        fontFamily: 'shabnam',
      },
      style: {
        backgroundColor: Colors.sabaIndigo,
      },
    },
    custom: {
      type: 'custom',
      placement: 'top',
      duration: 1400,
      animationType: 'slide-in',
      icon: <ActivityIndicator size={35} color="#fff" />,
      textStyle: {
        fontFamily: 'shabnam',
      },
      style: {
        backgroundColor: Colors.sabaIndigo,
      },
    },
  };
  return config;
}
