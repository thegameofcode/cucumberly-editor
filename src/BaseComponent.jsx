import React, { Component } from 'react';

export default class BaseComponent extends Component {
  bindMethods(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}
