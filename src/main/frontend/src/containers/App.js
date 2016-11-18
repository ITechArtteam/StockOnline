import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import UserInfo from './UserInfo'
import {Link} from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <UserInfo />
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <Navigation />
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;