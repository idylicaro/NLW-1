import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// createStackNavigator a navegação stack é a navegação em pilha onde vc pode voltar para a tela anterior
// bom estudar os tipos de navegação dps ...

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';
import App from '../App';

const AppStack = createStackNavigator();

const Routes = () =>{
    return(
        <NavigationContainer>
            <AppStack.Navigator 
            headerMode="none" 
            screenOptions={{
                cardStyle:{
                    backgroundColor:'#f0f0f5'
                }
            }}
            >
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Points" component={Points}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;