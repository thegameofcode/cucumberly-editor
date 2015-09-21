import React from 'react';
import BaseComponent from '../BaseComponent';

export default class EditableLabel extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onFocus', 'onBlur', 'onKeyDown');
  }

  componentDidMount() {
    this.setText(this.props.initialText);
    this.checkDefaultText();
  }

  componentWillUpdate(nextProps, nextState) {
    this.setText(nextProps.initialText);
    this.checkDefaultText();
  }

  getElement() {
    return this.refs.label.getDOMNode();
  }

  getText() {
    return this.getElement().textContent;
  }

  setText(text) {
    this.getElement().textContent = text;
    this.previousText = text;
  }

  checkDefaultText() {
    var showDefaultText = this.getText() === '';
    if (showDefaultText) {
      this.setText(this.props.defaultText);
    }

    if (showDefaultText) {
      this.getElement().classList.add('defaultVal');
    } else {
      this.getElement().classList.remove('defaultVal');
    }
  }

  onKeyDown(e) {
    this.cancelled = (e.which === 27);
    if (e.which === 13 || this.cancelled) {
      e.preventDefault();
      this.getElement().blur();
      this.unselectText();
    }
  }

  onBlur() {
    let text = this.getText();

    if (this.cancelled) {
      this.cancelled = false;
      this.setText(this.previousText);

    } else if (this.props.onChange && text !== this.previousText) {
      this.props.onChange(text);
    }

    this.previousText = text;
    this.checkDefaultText();
  }

  onFocus() {
    this.selectText();
  }

  unselectText() {
    window.getSelection().removeAllRanges();
  }

  selectText() {
    let range = document.createRange();
    range.selectNodeContents(this.getElement());

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  render() {
    let Component = this.props.tag;

    return (
        <Component ref='label' contentEditable='true' className='editableLabel' onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.onKeyDown}></Component>
    );
  }
}

EditableLabel.propTypes = {
  tag: React.PropTypes.string,
  onChange: React.PropTypes.func,
  defaultText: React.PropTypes.string,
  initialText: React.PropTypes.string
};

EditableLabel.defaultProps = {
  tag: 'span',
  defaultText: 'Enter text',
  initialText: ''
};
