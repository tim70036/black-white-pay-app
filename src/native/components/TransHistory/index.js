import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tableHeads = ['時間', '對象', '數量', '備註'];
const tableColWidths = [100, 60, 120, 100];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#537791',
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
});

class TransHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render = () => {
    const { tableData } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              <Row data={tableHeads} widthArr={tableColWidths} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index*10}
                      data={rowData}
                      widthArr={tableColWidths}
                      style={[styles.row, index%2 && { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TransHistory;
