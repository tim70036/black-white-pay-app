import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import PropTypes from 'prop-types';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tableHeads = ['時間', '對象', '數量', '備註'];
const tableColWidths = [120, 120, 150, 120];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: viewportWidthPercent(2),
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
  },
  headerBorder: {
    borderColor: '#C1C0B9',
    borderWidth: 1.8,
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
  },
  rowBorder: {
    borderColor: '#C1C0B9',
  },
});

class TransHistory extends Component {
  static propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  };

  static defaultProps ={
    tableData: [],
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  _renderRow = () => {
    const { tableData } = this.props;

    const rows = tableData.map((rowData, index) => (
      <Row
        key={index*10}
        data={rowData}
        widthArr={tableColWidths}
        style={[styles.row, index % 2 && { backgroundColor: '#f2f2f2' }]}
        textStyle={styles.text}
      />
    ));

    return rows;
  }

  render = () => (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={styles.headerBorder}>
            <Row
              data={tableHeads}
              widthArr={tableColWidths}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={styles.rowBorder}>
              {this._renderRow()}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default TransHistory;
