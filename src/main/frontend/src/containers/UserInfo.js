import React from 'react'
import { connect } from 'react-redux'

class UserInfo extends React.Component {
    render() {
        return (
            <div className="user-info">
                <h2>{this.props.username}</h2>
                <h2>{this.props.role}</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        role: state.auth.role
    }
};

export default connect(mapStateToProps)(UserInfo)
