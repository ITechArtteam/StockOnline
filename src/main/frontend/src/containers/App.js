import React from 'react'
import Navigation from '../components/navigation/Navigation'
import UserInfo from './UserInfo'
import {Link} from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Navigation />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;