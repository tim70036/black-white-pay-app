import { StyleSheet } from 'react-native';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from './util';
import Colors from '../constants/colors';

const elementColors = {
  buttonLinearGradient: ['#FDDCA9', '#BB9E6E', '#83693C'],
  placeholderTextColor: '#4C4F58',
};

const formStyle = StyleSheet.create({
  bgImage: {
    // flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: viewportWidthPercent(4),
    marginTop: 60,
  },
  inputContainer: {
    flex: 1,
    padding: viewportWidthPercent(4),
  },
  title: {
    marginVertical: viewportHeightPercent(2),
  },
  titleText: {
    fontSize: 30,
    color: Colors.white,
  },
  inputItem: {
    marginTop: viewportHeightPercent(3),
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 23,
    color: Colors.white,
  },
  icon: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
  },
  inputText: {
    color: Colors.labelWhite,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
    paddingVertical: viewportHeightPercent(1),
  },
  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
  linearGradient: {
    marginTop: viewportHeightPercent(5),
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 36.5,

    shadowColor: '#D3BD99',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.44,
    shadowRadius: 37,
    elevation: 14,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36.5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export { elementColors, formStyle };
