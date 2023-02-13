import React from 'react';
// @ts-ignore
import type {PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  View, Text,
} from 'react-native';
import { useFonts } from 'expo-font';
import SVGatorComponent from '../initialLogo';

export function TodoElem({navigation}){

  return (
    <View style={{backgroundColor:'white', width: '100%',
      height: 60, padding:5,  alignItems: 'flex-start', justifyContent: 'center', marginTop: '5%',
      borderWidth: 3, borderColor:'#7E7E7E', borderRadius: 12, alignSelf:'center'}}>
      <Text style={{fontSize: 20, fontWeight:'bold', alignSelf:'flex-end'}}>Task Name</Text>
    </View>
  );
}