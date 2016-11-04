import React from 'react'
import Navigation from '../components/Navigation'
import {Link} from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <Navigation />
                    </div>
                    <div className="col-lg-8 col-md-8">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;