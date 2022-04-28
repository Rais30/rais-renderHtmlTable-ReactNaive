import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler,Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HtmlWithHeuristicPage from './pages/HtmlWithHeuristicPage';
import WebViewPage from './pages/WebViewPage';
import HtmlWithoutHeuristicPage from './pages/HtmlWithoutHeuristicPage';
import HtmlTablePlugin from './pages/HtmlTablePlugin';
// import demo from './pages/demo';


function HomeScreen({navigation}) {
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginBottom: 40, fontSize: 25}}>
        Opsi tampilan table Peraturan
      </Text>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 50,
          marginBottom: 20,
          backgroundColor: '#1B4C8C',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Html With Heuristic')}>
        <Text style={{color: 'white'}}>Html With Heuristic</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 50,
          marginBottom: 20,
          backgroundColor: '#1B4C8C',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Html Table Plugin')}>
        <Text style={{color: 'white'}}>Html Table Plugin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 50,
          marginBottom: 20,
          backgroundColor: '#1B4C8C',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Webview', {idPeraturan: 17579})}>
        <Text style={{color: 'white'}}>Webview</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 50,
          marginBottom: 20,
          backgroundColor: '#1B4C8C',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('demo', {idPeraturan: 17579})}>
        <Text style={{color: 'white'}}>demo</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Table Demo" component={HomeScreen} />
        <Stack.Screen
          name="Html With Heuristic"
          component={HtmlWithHeuristicPage}
        />
        <Stack.Screen
          name="Html Without Heuristic"
          component={HtmlWithoutHeuristicPage}
        />
        <Stack.Screen name="Webview" component={WebViewPage} />
        <Stack.Screen name="Html Table Plugin" component={HtmlTablePlugin} />
        {/* <Stack.Screen name="demo" component={demo} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
