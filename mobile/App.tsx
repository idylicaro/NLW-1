import React from 'react';
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native';

import Routes from './src/routes';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

export default function App() {
  // aqui nesse useFonts serve para so renderizar dps de carregar todas as fontes..
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes />
    </>
  );
}

