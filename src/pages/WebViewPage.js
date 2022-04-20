import {StyleSheet, View, Alert, LogBox, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import axios from 'axios';

const mark = require('../assets/mark-string');

const WebViewPage = ({navigation}) => {
  const colorHTML = 'black';
  const fontSize = 15;
  const [AturanID, setAturanID] = useState(17579);
  const webviewRef = useRef();
  const [dataSource, setDataSource] = useState('');
  const [idAturan, setIdAturan] = useState(AturanID);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    getData(AturanID);
  }, []);

  const DateHtml = dataSource => {
    const search = `href=\"/ortax/aturan/show/`;
    const replaceWith = `href=\"https://datacenter.ortax.org/ortax/aturan/show/`;
    const replaceAll = dataSource.split(search).join(replaceWith);
    setDataSource(replaceAll);
    setIsLoading(false);
  };

  const getData = ID => {
    setIsLoading(true);
    try {
      const result = axios
        .post(
          'https://betta.ortax.org/api/aturan/show/' + ID,
          {},
          {
            headers: {
              Authorization: 'Bearer vn0w6nTOx3K50MAPLJV3m0SfJVjOgg9wvDXII5cF',
            },
          },
        )
        .then(response => {
          const res = response.data.list;
          // setDataSource(res.isi);
          // setIsLoading(false);
          DateHtml(res.isi);
        });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <WebView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: 'transparent',
            marginBottom: 30,
            flex: 1,
          }}
          ref={webviewRef}
          source={{
            html: `<script>${mark}</script>
           <style>
           div {
             color: ${colorHTML};
             font-family: Montserrat;
             font-size: ${fontSize};
           }
           a {
             color: #F27F3D;
           }
           table {
             color: ${colorHTML};
             font-family: Montserrat;
             font-size: ${fontSize};
           }
           .isiaturan table {
            width: 98% !important;
            }
            .isiaturan table td,th {
                padding: 3px !important;
                table-layout:inherit !important;
                overflow:hidden !important;
                word-wrap:break-word !important;
            }
           </style>
           ${dataSource}`,
          }}
          scalesPageToFit={false}
          textZoom={100}
          originWhitelist={['*']}
          onShouldStartLoadWithRequest={e => {
            if (e.url.slice(0, 4) === 'http') {
              console.log('e', e.url);
              const id = e.url
                .split('https://datacenter.ortax.org/ortax/aturan/show/')
                .join('');
              console.log('id', id);
              // setIdAturan(id);
              if (id !== 'about:blank' || id !== 'about:blank#blocked') {
                getData(id);
                return false;
              } else if (e.url === 'about:blank') {
                null;
                return false;
              } else if (e.url === 'about:blank#blocked') {
                null;
                return false;
              }
              return true;
            }
          }}
        />
      </View>
    );
  }
};

export default WebViewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
