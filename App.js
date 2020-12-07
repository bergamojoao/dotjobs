import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


const theme = {
  ... DefaultTheme,
  colors:{
    ... DefaultTheme.colors,
    primary:'#e3b529',
    accent:'#525151'
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes/>
    </PaperProvider>
  );
}
