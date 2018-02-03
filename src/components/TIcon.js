/* @flow */

/*
 * 
 * https://github.com/GeekyAnts/NativeBase/issues/64
 *
 */

import React from "react";
import { ViewPropTypes } from "react-native";
import { StyleProvider, getTheme, Icon } from "native-base";
import PropTypes from "prop-types";

export default class TIcon extends React.Component {
  render() {
    const { family, name, style } = this.props;
    const icon = <Icon name={name} style={style} />;
    if (family) {
      const customTheme = getTheme({ iconFamily: family });
      return <StyleProvider style={customTheme}>{icon}</StyleProvider>;
    } else {
      return icon;
    }
  }
}

TIcon.propTypes = {
  family: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.any
};
