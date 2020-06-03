import React from 'react';
import { View, Platform } from 'react-native';
import Cores from '../constantes/Cores';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from "@expo/vector-icons"

const BotaoCabecalho = (props) => {
  return (
    <HeaderButton 
        {...props}
        IconComponent={Ionicons}
        iconSize ={23}
        color= {Platform.OS === 'android' ? 'black' : Cores.primary}

    />

  );
}

export default BotaoCabecalho;