import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FirstAccess from './pages/FirstAccess';
import Home from './pages/Home';
import Services from './pages/Services';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Services" component={Services}/>
                <AppStack.Screen name="SignUp" component={SignUp}/>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="FirstAccess" component={FirstAccess}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}