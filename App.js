import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {

    constructor(){
        super(); //这个必须
        this.state = {
            red: 0,
            green: 0,
            blue: 0
        };
        this.update = this.update.bind(this)
    }
    update(e){
        this.setState({
            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
            green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
            blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
        })
    }
    render(){
        //let aa = this.props.aa;
        return(
            <div>
                <Slider ref="red" update={this.update} />
                {this.state.red}
                <br />
                <Slider ref="blue" update={this.update} />
                {this.state.blue}
                <br />
                <Slider ref="green" update={this.update} />
                {this.state.green}
            </div>
        );
    }
}

class Slider extends React.Component {
    render(){
        return(
            <div>
                <input ref="inp" type="range" min="0" max="255" onChange={this.props.update}/>
            </div>
        );
    }
}
//const Widget = (props) => {
//    return (
//        <div>
//            <input type="text" onChange={props.update}/>
//            <h1>{props.txt}</h1>
//        </div>
//    );
//};
//App.propTypes = {
//    aa: React.PropTypes.string
//};
//App.defaultProps = {
//    aa: 'this is a props ~~'
//};
//const App = () => <h1>hello lalala</h1>;

export default App