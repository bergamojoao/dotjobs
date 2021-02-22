import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FirstAccess from './pages/FirstAccess';
import Home from './pages/Home';
import CreateService from './pages/CreateService';
import UpdateServiceLocalization from './pages/UpdateServiceLocalization';


const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="SignUp" component={SignUp}/>
                <AppStack.Screen name="FirstAccess" component={FirstAccess}/>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="CreateService" component={CreateService}/>
                <AppStack.Screen name="UpdateServiceLocalization" component={UpdateServiceLocalization}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}