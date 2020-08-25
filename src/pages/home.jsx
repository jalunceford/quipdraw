import React from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {create: false, join: false};
    }
    renderCreate = () => {
        this.setState({create: true});
    }
    renderJoin = () => {
        this.setState({join: true});
    }
    render () {
        return (
            <div>
                <div className="vert">
                    <div className="center">
                        <h1 className="header1">Quipdraw (Jackbox Games please buy us)</h1>
                    </div>
                    <div className="center">
                        <button onClick={this.renderCreate}>Create Room</button>
                        { this.state.create ? <Redirect to="/create"/> : null }
                        <button onClick={this.renderJoin}>Join Room</button>
                        { this.state.join ? <Redirect to="/join"/> : null }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;