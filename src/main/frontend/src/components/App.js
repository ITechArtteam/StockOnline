import React from 'react'
import {Link} from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="navbar">
                        <ul className="nav">
                            <li className="active">
                                <Link to="/login">Login</Link>
                            </li>
                            <li><Link to="/test">Test</Link></li>
                            <li><Link to="/test">Test</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="data">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;