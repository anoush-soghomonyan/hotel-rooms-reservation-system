import React from 'react';
import PropTypes from 'prop-types';

export default class PopupCloser extends React.Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener("keydown", this.escFunction, false);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    escFunction = (event) => {
        if(event.keyCode === 27) {
            this.props.handleClose(event);
        }
    };

    handleClickOutside = (event) => {
        event.stopPropagation();
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.handleClose(event);
        }
    };

    render() {
        const {style, children} =this.props;
        return <div ref={this.setWrapperRef} style={style}>{children}</div>;
    }
}

PopupCloser.propTypes = {
    style: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};