import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';

const demo = ({route, navigation}) => {
  const {idPeraturan} = route.params;
  const [isArray, setArray] = useState([idPeraturan]);
  const [isLoading, setLoading] = useState(false);
  const DateArray = isArray.join();
  const stiArray = isArray.toString();
  const len = isArray.length - 1;

  const addArray = Array => {
    setLoading(true);

    isArray.push(Array + 3);

    console.log('data array ' + len);
    console.log('data array sesuai index ' + isArray[len]);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const DelArray = Array => {
    setLoading(true);

    isArray.pop();
    const len = isArray.length - 1;
    console.log('data array ' + len);
    console.log('data array sesuai index ' + isArray[len]);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect((id = idPeraturan) => {
    console.log('ini id params ' + id);
  }, []);

  BackHandler.addEventListener('hardwareBackPress', function () {
    if (isArray[0] == isArray[len]) {
      navigation.replace('Table Demo');
      return true;
    }
    console.log('ini ' + isArray[len]);
    return true;
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" />
      </View>
    );
  } else {
    console.log('ini date array ' + DateArray);
    return (
      <View style={styles.container}>
        <Text style={styles.tex}>{stiArray}</Text>
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => {
            addArray(idPeraturan, isLoading);
          }}>
          <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttom} onPress={() => DelArray()}>
          <Text style={{color: '#fff'}}>Dellet</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'center',
    //   alignItems:'center'
  },
  buttom: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 20,
    backgroundColor: '#1B4C8C',
    borderRadius: 10,
  },
  tex: {marginBottom: 40, fontSize: 25, alignSelf: 'center'},
});
