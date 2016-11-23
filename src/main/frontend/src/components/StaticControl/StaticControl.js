import React from 'react'

class StaticControl extends React.Component {

    render() {
        return (
            <div className="form-group">
                <label className="control-label col-sm-4 col-md-4 col-lg-4">{this.props.label}</label>
                <div>
                    <p className="form-control-static">{this.props.value}</p>
                </div>
            </div>
        )
    }
}

StaticControl.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.any
};

StaticControl.defaultProps = {
    value: ""
};
export default StaticControl;
