import {
  Dimensions,
  LogBox,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HTML from 'react-native-render-html';
import axios from 'axios';
import TableRenderer, {tableModel} from '@native-html/table-plugin';
import WebView from 'react-native-webview';

const {width} = Dimensions.get('screen');

const HtmlTablePlugin = ({navigation}) => {
  const colorHTML = 'black';
  const fontSize = 14;
  const AturanID = 17579;
  const [dataSource, setDataSource] = useState({});
  const [idAturan, setIdAturan] = useState([AturanID]);
  const [isLoading, setIsLoading] = useState(true);
  const length = idAturan.length - 1;

  useEffect(() => {
    LogBox.ignoreAllLogs();
    getData(idAturan);
  }, []);

  const getData = async ID => {
    try {
      const result = await axios
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
          DateHtml(response.data.list.isi);
          setDataSource(response.data.list);
          console.log('data', response.data.list);
        });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const htmlProps = {
    WebView,
    renderers: {
      table: TableRenderer,
    },
    renderersProps: {
      div: {
        fontSize: fontSize,
        color: colorHTML,
      },
      table: {
        // Put the table config here
        tableStyleSpecs: {
          // my style specs
          trOddBackground: 'white',
          trEvenBackground: 'white',
          fontSizePx: fontSize,
          color: colorHTML,
          rowsBorderWidthPx: 0.5,
          columnsBorderWidthPx: 0.5,
        },
      },
    },
    customHTMLElementModels: {
      table: tableModel,
    },
  };

  const DateHtml = dataSource => {
    const search = `href=\"/ortax/aturan/show/`;
    const replaceWith = `href=\"https://datacenter.ortax.org/ortax/aturan/show/`;
    const replaceAll = dataSource.split(search).join(replaceWith);
    setDataSource(replaceAll);
    setIsLoading(false);
  };

  function onLinkPress(event, href) {
    const IdAturan = href
      .split('about:///xsim/ortax/?mod=aturan&page=show&id=')
      .join('')
      .split('about:///ortax/aturan/show/')
      .join('')
      .split('https://datacenter.ortax.org/ortax/aturan/show/')
      .join('');
    console.log('IdAturan', IdAturan);
    // setIdAturan(IdAturan);
    if (IdAturan !== 'about:blank' || IdAturan !== 'about:blank#blocked') {
      getData(IdAturan);
      setIsLoading(true)
      idAturan.push(IdAturan)
      return false;
    } else if (event.url === 'about:blank') {
      null;
      return false;
    } else if (event.url === 'about:blank#blocked') {
      null;
      return false;
    }
    return true;
  }

  BackHandler.addEventListener('hardwareBackPress', function () {
    if (idAturan[0] == idAturan[length]) {
      navigation.replace('Table Demo');
      // return false;
    }
    idAturan.pop();
    getData(idAturan[length - 1]);
    setIsLoading(true)
    return true;
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" />
      </View>
    );
  } else {
    return (
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <ScrollView
          style={{paddingTop: 10, paddingHorizontal: 20}}
          showsVerticalScrollIndicator={false}>
          <HTML
            {...htmlProps}
            renderersProps={{
              a: {onPress: onLinkPress},
              ...htmlProps.renderersProps,
            }}
            contentWidth={width}
            source={{html: dataSource.isi}}
          />
        </ScrollView>
      </View>
    );
  }
};

export default HtmlTablePlugin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
});
