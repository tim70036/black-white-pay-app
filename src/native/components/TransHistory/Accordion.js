import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, FlatList } from 'react-native';
import Collapsible from './Collapsible';
import { ViewPropTypes } from './config';

const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(ViewPropTypes);

export default class Accordion extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    renderHeader: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    renderSectionTitle: PropTypes.func,
    activeSections: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    duration: PropTypes.number,
    easing: PropTypes.string,
    underlayColor: PropTypes.string,
    touchableComponent: PropTypes.func,
    touchableProps: PropTypes.object,
    disabled: PropTypes.bool,
    expandFromBottom: PropTypes.bool,
    expandMultiple: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
    sectionContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    underlayColor: 'black',
    disabled: false,
    expandFromBottom: false,
    expandMultiple: false,
    touchableComponent: TouchableHighlight,
    renderSectionTitle: () => null,
    onAnimationEnd: () => null,
    sectionContainerStyle: {},
  };

  _toggleSection(section) {
    if (!this.props.disabled) {
      const { activeSections, expandMultiple, onChange } = this.props;

      let updatedSections = [];

      if (activeSections.includes(section)) {
        updatedSections = activeSections.filter(a => a !== section);
      } else if (expandMultiple) {
        updatedSections = [...activeSections, section];
      } else {
        updatedSections = [section];
      }

      onChange && onChange(updatedSections);
    }
  }

  render() {
    const viewProps = {};
    const collapsibleProps = {};

    Object.keys(this.props).forEach((key) => {
      if (COLLAPSIBLE_PROPS.includes(key)) {
        collapsibleProps[key] = this.props[key];
      } else if (VIEW_PROPS.includes(key)) {
        viewProps[key] = this.props[key];
      }
    });

    const {
      activeSections,
      containerStyle,
      sectionContainerStyle,
	    expandFromBottom,
      onLoad,
      sections,
      underlayColor,
      touchableProps,
      touchableComponent: Touchable,
      onAnimationEnd,
      renderContent,
      renderHeader,
      renderSectionTitle,
    } = this.props;

    const renderCollapsible = (section, key) => (
      <Collapsible
        collapsed={!activeSections.includes(key)}
        {...collapsibleProps}
        onAnimationEnd={() => onAnimationEnd(section, key)}
      >
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapsible>
    );

    return (
      <View style={containerStyle} {...viewProps}>
        <FlatList
          data={sections}
          renderItem={({ item, index }) => (
            <View key={index} style={sectionContainerStyle}>
              {renderSectionTitle(item, index, activeSections.includes(index))}

              {expandFromBottom && renderCollapsible(item, index)}

              <Touchable
                onPress={() => this._toggleSection(index)}
                underlayColor={underlayColor}
                {...touchableProps}
              >
                {renderHeader(
                  item,
                  index,
                  activeSections.includes(index),
                  // sections
                )}
              </Touchable>

              {!expandFromBottom && renderCollapsible(item, index)}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onLoad}
          onEndThreshold={0}
        />
      </View>
    );
  }
}
