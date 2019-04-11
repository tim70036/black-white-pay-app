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
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tablePaddingHorizontal = viewportWidthPercent(5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: viewportWidthPercent(2),
    // paddingTop: 10,
    backgroundColor: '#191919',
  },
  inputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: tablePaddingHorizontal,
    paddingVertical: 15,
    marginVertical: 20,
    backgroundColor: '#252726',
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
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tablePaddingHorizontal,
    paddingVertical: 10,
    marginVertical: 1,
    backgroundColor: '#191919',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(5),
    paddingVertical: 10,
    marginHorizontal: viewportHeightPercent(3),
    marginTop: viewportHeightPercent(2),
    backgroundColor: '#252726',
  },
  headerTime: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: viewportWidthPercent(5),
    alignItems: 'center',
  },
  headerDownIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeaderText: {
    fontWeight: '200',
    color: '#fff',
    fontSize: 20,
  },
  headerText: {
    fontWeight: '200',
    color: '#fff',
  },
  headerIcon: {
    color: '#fff',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: viewportWidthPercent(25),
    marginHorizontal: viewportHeightPercent(3),
    marginBottom: viewportHeightPercent(1),
    backgroundColor: '#252726',
    paddingHorizontal: tablePaddingHorizontal,
    borderTopWidth: 2,
    borderTopColor: '#2E302F',
  },
  contentLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentMiddle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentText: {
    color: '#fff',
  },
  dollarText: {},
  dollarIcon: {
    fontSize: 25,
    marginBottom: viewportHeightPercent(1),
  },
  icon: {
    fontSize: 25,
    color: '#fff',
    marginBottom: viewportHeightPercent(1),
  },
});


class TransHistory extends Component {
  static propTypes = {
    historyData: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string,
        relatedName: PropTypes.string,
        amount: PropTypes.number,
        comment: PropTypes.string,
      }),
    ),
    onSearchSubmit: PropTypes.func.isRequired,
  };

  static defaultProps ={
    historyData: [],
  }

  state = {
    startTime: '',
    endTime: '',
    activeSections: [],
  };

  _setStartTime = (v) => {
    const startTime = moment(v).startOf('day').utc().format('YYYY/MM/DD HH:mm');
    this.setState({ startTime: startTime });
  };

  _setEndTime = (v) => {
    const endTime = moment(v).endOf('day').utc().format('YYYY/MM/DD HH:mm');
    this.setState({ endTime: endTime });
  };

  _renderHeader = section => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTime}>
        <Text style={styles.headerText}>{section.createtime}</Text>
      </View>
      <View style={styles.headerDownIcon}>
        <Icon type="FontAwesome" name="angle-down" style={styles.headerIcon} />
      </View>
    </View>
  );

  _renderContent = (section) => {
    let iconColor;
    if (section.amount < 0) {
      iconColor = '#BB1A3C';
    } else {
      iconColor = '#fff';
    }
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentLeft}>
          <Icon name="dollar" type="FontAwesome" style={[styles.dollarIcon, { color: iconColor }]} />
          <Text style={[styles.dollarText, { color: iconColor }]}>{section.amount}</Text>
        </View>
        <View style={styles.contentMiddle}>
          <Icon name="md-person" type="Ionicons" style={styles.icon} />
          <Text style={styles.contentText}>{section.relatedName}</Text>
        </View>
        <View style={styles.contentRight}>
          <Icon name="clipboard" type="Entypo" style={styles.icon} />
          <Text style={styles.contentText}>{section.comment}</Text>
        </View>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  _handleHistorySearch = async () => {
    const { onSearchSubmit } = this.props;
    const { startTime, endTime } = this.state;
    if (startTime !== '' && endTime !== '') {
      await onSearchSubmit(startTime, endTime);
    }
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
              maximumDate={new Date()}
              locale={"zh"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"spinner"}
              placeHolderText="點選起始日期"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this._setStartTime}
            />
            <Text>至</Text>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date()}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"spinner"}
              placeHolderText="點選結束日期"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this._setEndTime}
            />
          </View>
          <View>
            <Button info style={styles.button} onPress={() => this._handleHistorySearch()}>
              <Text style={styles.buttonText}>搜尋</Text>
            </Button>
          </View>
        </View>
        <View style={[styles.subHeader, { marginVertical: 2 }]}>
          <View style={styles.headerTime}>
            <Text style={styles.subHeaderText}>交易紀錄列表</Text>
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
