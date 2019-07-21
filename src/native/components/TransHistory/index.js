import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import Accordion from './Accordion';
import DatePicker from './DatePicker';
import Colors from '../../constants/colors';
import NavBar from '../NavBar';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';


const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.cardLightGray,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  bkImg: {
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(10),
    paddingVertical: viewportHeightPercent(2),
    height: viewportHeightPercent(24),
  },
  dateContainer: {
  },
  datePickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: viewportWidthPercent(45),
  },
  datePickerText: {
    color: Colors.labelWhite,
    fontSize: 20,
  },
  middleLine: {
    width: viewportWidthPercent(45),
    height: 1,
    backgroundColor: Colors.labelWhite,
  },
  dot: {
    height: viewportHeightPercent(1),
    width: viewportHeightPercent(1),
    borderRadius: viewportHeightPercent(1) / 2,
    marginRight: viewportHeightPercent(1),
    backgroundColor: Colors.labelWhite,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: viewportWidthPercent(3),
    marginHorizontal: viewportWidthPercent(5),
  },
  colorBar: {
    width: viewportWidthPercent(2),
    height: viewportWidthPercent(6),
    borderRadius: viewportWidthPercent(2) / 2,
    backgroundColor: '#56D62C',
    marginRight: viewportWidthPercent(2),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
    height: viewportHeightPercent(7.4),
    // backgroundColor: Colors.accordianHeaderGray,
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholderGray,
    // marginBottom: viewportWidthPercent(3),
    marginHorizontal: viewportWidthPercent(5),
  },
  headerTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerAmountContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: viewportWidthPercent(2),
  },
  currencyImg: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
    marginRight: viewportWidthPercent(1),
  },
  contentImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: viewportWidthPercent(1),
  },
  subHeaderText: {
    fontWeight: '200',
    color: Colors.labelWhite,
    fontSize: 20,
  },
  scrollViewContainer: {
    flex: 1,
  },
  AccordionContainer: {
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(4),
    marginTop: viewportHeightPercent(3),
    marginBottom: viewportHeightPercent(1),
    marginHorizontal: viewportWidthPercent(5),
  },
  AccordionBottomSpace: {
    height: viewportHeightPercent(10),
  },
  headerText: {
    fontWeight: '200',
    color: Colors.labelWhite,
  },
  headerIcon: {
    fontSize: 15,
    color: Colors.labelWhite,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // height: viewportWidthPercent(25),
    paddingVertical: viewportHeightPercent(2),
    backgroundColor: Colors.accordianContentGray,
    paddingHorizontal: viewportWidthPercent(6),
  },
  contentItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: viewportWidthPercent(1),
  },
  contentText: {
    color: Colors.labelWhite,
  },
  searchImgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: viewportWidthPercent(5),
  },
  searchImg: {
    width: viewportHeightPercent(15),
    height: viewportHeightPercent(15),
    resizeMode: 'contain',
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
    defaultStartTime: PropTypes.string.isRequired,
    defaultEndTime: PropTypes.string.isRequired,
    defaultStartTimeUtc: PropTypes.string.isRequired,
    defaultEndTimeUtc: PropTypes.string.isRequired,
    currencySrc: PropTypes.string,
    storeId: PropTypes.number,
  };

  static defaultProps ={
    historyData: [],
    currencySrc: '',
    storeId: -1,
  }

  constructor(props) {
    super(props);
    this.state = {
      startTimeUtc: props.defaultStartTimeUtc,
      endTimeUtc: props.defaultEndTimeUtc,
      activeSections: [],
      showDataLength: 30,
    };
  }

  _setStartTime = (v) => {
    const startTimeUtc = moment(v).startOf('day').utc().format('YYYY-MM-DD HH:mm');
    this.setState({ startTimeUtc: startTimeUtc });
  };

  _setEndTime = (v) => {
    const endTimeUtc = moment(v).endOf('day').utc().format('YYYY-MM-DD HH:mm');
    this.setState({ endTimeUtc: endTimeUtc });
  };

  _handleDateFormat = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let dayString;
    let monthString;
    if (day < 10) {
      dayString = '0'.concat(day.toString());
    } else {
      dayString = day.toString();
    }

    if (month < 10) {
      monthString = '0'.concat(month.toString());
    } else {
      monthString = month.toString();
    }
    return [
      date.getFullYear(),
      monthString,
      dayString,
    ].join('-');
  }


  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  _showMoreData = () => {
    const { historyData } = this.props;
    const { showDataLength } = this.state;

    if (showDataLength < historyData.length) {
      this.setState({ showDataLength: showDataLength + 10 });
    }
  };

  _handleHistorySearch = async () => {
    const { onSearchSubmit } = this.props;
    const { startTimeUtc, endTimeUtc } = this.state;
    if (startTimeUtc !== '' && endTimeUtc !== '') {
      await onSearchSubmit(startTimeUtc, endTimeUtc);
    }
  };

  _renderHeader = (section) => {
    const { currencySrc, storeId } = this.props;
    let uri;
    if (storeId === -1) {
      uri = (require('../../../img/mainCurrency.png'));
    } else {
      uri = (currencySrc) ? ({ uri: currencySrc }) : (require('../../../img/storeCurrency.png'));
    }
    let amountColor;
    if (section.amount < 0) {
      amountColor = Colors.labelLightRed;
    } else {
      amountColor = Colors.labelWhite;
    }
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTime}>
          <Text style={styles.headerText}>{section.createtime.split(' ')[0]}</Text>
        </View>
        <View style={styles.headerAmountContainer}>
          <View style={styles.headerAmount}>
            <Image source={uri} style={styles.currencyImg} />
            <Text style={[styles.headerText, { color: amountColor }]}>
              {section.amount}
            </Text>
          </View>
          <Icon type="FontAwesome" name="angle-down" style={styles.headerIcon} />
        </View>
      </View>
    );
  }

  _renderContent = section => (
    <View style={styles.contentContainer}>
      <View style={styles.contentItem}>
        <Image source={require('../../../img/transHistory/time.png')} style={styles.contentImg} />
        <Text style={styles.contentText}>{section.createtime.split(' ')[1]}</Text>
      </View>
      <View style={styles.contentItem}>
        <Image source={require('../../../img/transHistory/target.png')} style={styles.contentImg} />
        <Text style={styles.contentText}>{section.relatedName}</Text>
      </View>
      <View style={styles.contentItem}>
        <Image source={require('../../../img/transHistory/comment.png')} style={styles.contentImg} />
        <Text style={styles.contentText}>{section.comment}</Text>
      </View>
    </View>
  );

  render = () => {
    const { activeSections, showDataLength } = this.state;
    const { historyData, defaultStartTime, defaultEndTime } = this.props;
    const showData = historyData.slice(0, showDataLength);

    return (
      <ImageBackground style={styles.layoutContainer} source={require('../../../img/background/background2.png')}>
        <ImageBackground style={styles.bkImg} source={require('../../../img/transHistory/topbk.png')}>
          <NavBar title="轉帳紀錄" back />
          <View style={styles.inputsContainer}>
            <View style={styles.dateContainer}>
              <View style={styles.datePickerContainer}>
                <View style={styles.dot} />
                <DatePicker
                  defaultDate={moment(defaultStartTime).toDate()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date()}
                  locale="zh"
                  formatChosenDate={this._handleDateFormat}
                  timeZoneOffsetInMinutes={undefined}
                  androidMode="spinner"
                  placeHolderText={defaultStartTime}
                  textStyle={styles.datePickerText}
                  placeHolderTextStyle={styles.datePickerText}
                  onDateChange={this._setStartTime}
                />
              </View>
              <View style={styles.middleLine} />
              <View style={styles.datePickerContainer}>
                <View style={styles.dot} />
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date()}
                  locale="zh"
                  formatChosenDate={this._handleDateFormat}
                  timeZoneOffsetInMinutes={undefined}
                  androidMode="spinner"
                  placeHolderText={defaultEndTime}
                  textStyle={styles.datePickerText}
                  placeHolderTextStyle={styles.datePickerText}
                  onDateChange={this._setEndTime}
                />
              </View>
            </View>
            <View style={styles.searchImgContainer}>
              <TouchableOpacity onPress={this._handleHistorySearch}>
                <Image source={require('../../../img/transHistory/search.png')} style={styles.searchImg} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={styles.subHeader}>
            <View style={styles.colorBar} />
            <Text style={styles.subHeaderText}>交易紀錄列表</Text>
          </View>
          <View style={styles.scrollViewContainer}>
            <View style={styles.AccordionContainer}>
              <Accordion
                sections={showData}
                activeSections={activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                onLoad={this._showMoreData}
                underlayColor={Colors.accordianContentGray}
              />
            </View>
            <View style={styles.AccordionBottomSpace} />
          </View>
        </View>
      </ImageBackground>
    );
  };
}

export default TransHistory;
