import {Dimensions, LogBox, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HTML from 'react-native-render-html';
import axios from 'axios';

const {width} = Dimensions.get('screen');

const HtmlWithoutHeuristicPage = ({navigation}) => {
  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    LogBox.ignoreAllLogs();
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios
        .post(
          'https://betta.ortax.org/api/aturan/show/17579',
          {},
          {
            headers: {
              Authorization: 'Bearer vn0w6nTOx3K50MAPLJV3m0SfJVjOgg9wvDXII5cF',
            },
          },
        )
        .then(response => {
          setDataSource(response.data.list);
          console.log('data', response.data.list);
        });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const idsStyles = {
    isiaturan: {
      color: 'black',
      fontFamily: 'Montserrat-Italic',
      fontSize: 14,
      width: '98%',
      padding: 3,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{paddingTop: 10, paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <HTML
          idsStyles={idsStyles}
          contentWidth={width}
          source={{
            html: dataSource.isi,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HtmlWithoutHeuristicPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
});
