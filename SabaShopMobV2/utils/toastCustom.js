import React from 'react';
import Colors from './SabaColors.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export function toastCustom() {
  const config = {
    success: {
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
    successInfo: {
      type: 'success',
      placement: 'top',
      duration: 3400,
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
      textStyle: {
        fontFamily: 'shabnam',
      },
      style: {
        backgroundColor: Colors.sabaIndigo,
      },
    },
    toastInfo: {
      type: 'info',
      placement: 'bottom',
      duration: 1200,
      animationType: 'slide-in',
      textStyle: {
        fontFamily: 'shabnam',
      },
      style: {
        backgroundColor: 'rgba(30,30,30,0.3)',
      },
    },
  };
  return config;
}
