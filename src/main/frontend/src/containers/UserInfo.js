import React from 'react'
import { connect } from 'react-redux'

class UserInfo extends React.Component {
    render() {
        return (
            <div className="user-info">
                <p>Login: {this.props.username} Roles: {this.props.roles}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        roles: state.auth.roles.join(', ')
    }
}
export default connect(mapStateToProps)(UserInfo)
