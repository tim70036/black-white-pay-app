import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Icon, DatePicker, Button } from 'native-base';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tablePaddingHorizontal = viewportWidthPercent(2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: viewportWidthPercent(2),
    paddingTop: 10,
  },
  inputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: tablePaddingHorizontal,
    paddingVertical: 15,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportWidthPercent(30),
    height: 30,
  },
  buttonText: {
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tablePaddingHorizontal,
    paddingVertical: 10,
    marginVertical: 1,
    backgroundColor: '#fff',
  },
  headerTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '200',
  },
  headerIcon: {
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: viewportWidthPercent(25),
    backgroundColor: '#fff',
    paddingHorizontal: tablePaddingHorizontal,
  },
  contentLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentRight: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: viewportWidthPercent(2),
  },
});


class TransHistory extends Component {
  static propTypes = {
    historyData: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string,
        relatedName: PropTypes.string,
        amount: PropTypes.string,
        comment: PropTypes.string,
      }),
    ),
  };

  static defaultProps ={
    historyData: [],
  }

  state = {
    activeSections: [],
  };

  _renderHeader = section => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTime}>
        <Text style={styles.headerText}>{section.time}</Text>
      </View>
      <View style={styles.headerAmount}>
        <Text style={styles.headerText}>{section.amount}</Text>
        <Icon type="FontAwesome" name="angle-down" style={styles.headerIcon} />
      </View>
    </View>
  );

  _renderContent = section => (
    <View style={styles.contentContainer}>
      <View style={styles.contentLeft}>
        <Text>對象:</Text>
        <Text>備註:</Text>
      </View>
      <View style={styles.contentRight}>
        <Text>{section.relatedName}</Text>
        <Text>{section.comment}</Text>
      </View>
    </View>
  );

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render = () => {
    const { activeSections } = this.state;
    const { historyData } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.dateContainer}>
            <Text>搜尋記錄從</Text>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"zh"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"spinner"}
              placeHolderText="點選起始日期"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
            />
            <Text>至</Text>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"spinner"}
              placeHolderText="點選結束日期"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
            />
          </View>
          <View>
            <Button info style={styles.button}>
              <Text style={styles.buttonText}>搜尋</Text>
            </Button>
          </View>
        </View>
        <View style={[styles.headerContainer, { marginVertical: 2, backgroundColor: '#cce6ff' }]}>
          <View style={styles.headerTime}>
            <Text style={styles.headerText}>交易時間</Text>
          </View>
          <View style={styles.headerAmount}>
            <Text style={styles.headerText}>轉帳數量</Text>
          </View>
        </View>
        <Accordion
          sections={historyData}
          activeSections={activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </ScrollView>
    );
  };
}

export default TransHistory;
