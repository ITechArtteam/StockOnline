import React from 'react'
import {Navigation} from './navigation'
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