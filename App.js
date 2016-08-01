import React from 'react';
import ReactDOM from 'react-dom';
import babel from 'babel-core';
//console.log(babel);
//import babel from 'babel-core';

//class App extends React.Component {
//
//    constructor(){
//        super(); //这个必须
//        this.state = {
//            val:0
//        };
//        this.update = this.update.bind(this);
//    }
//    update(){
//        this.setState({
//            val: this.state.val+1
//        })
//    }
//    componentWillMount(){
//        this.setState({
//            m:2
//        });
//    }
//    render(){
//        //let aa = this.props.aa;
//        console.log('rendering!!');
//        return(
//            <button onClick={this.update}>{this.state.val * this.state.m}</button>
//        );
//    }
//    componentDidMount(){
//        this.inc = setInterval(this.update,500);
//    }
//    componentWillUnmount(){
//        console.log('bye!!!');
//    }
//}
//
//class Wrapper extends React.Component{
//    constructor(){
//        super();
//
//    }
//    mount(){
//        ReactDOM.render(<App />,document.getElementById('a'));
//    }
//    unmount(){
//        ReactDOM.unmountComponentAtNode(document.getElementById('a'));
//    }
//    render(){
//        return(
//            <div>
//                <button onClick={this.mount.bind(this)}>Mount</button>
//                <button onClick={this.unmount.bind(this)}>UnMount</button>
//                <div id="a"></div>
//            </div>
//        );
//    }
//}


//class Slider extends React.Component {
//    render(){
//        return(
//            <div>
//                <input ref="inp" type="range" min="0" max="255" onChange={this.props.update}/>
//            </div>
//        );
//    }
//}
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
// component lifecycle updating
//class App extends React.Component{
//    constructor(){
//        super();
//        this.update = this.update.bind(this);
//        this.state = {increasing: false};
//    }
//    update(){
//        ReactDOM.render(
//            <App val={this.props.val + 1} />,document.getElementById('app')
//        )
//    }
//    componentWillReceiveProps(nextProps){
//        this.setState({
//            increasing: nextProps.val > this.props.val
//        })
//    }
//    shouldComponentUpdate(nextProps,nextState){
//        return nextProps.val % 5 === 0;
//    }
//    componentDidUpdate(prevProps,prevState){
//        console.log(prevProps);
//    }
//    render(){
//        console.log(this.state.increasing);
//        return(
//            <button onClick={this.update}>{this.props.val}</button>
//        );
//    }
//}

//let Mixin = InnerComponent => class extends React.Component {
//    constructor() {
//        super();
//        this.update = this.update.bind(this);
//        this.state = {val:0};
//    }
//
//    update() {
//        this.setState({
//            val: this.state.val + 1
//        });
//    }
//
//    render() {
//        return (
//            <InnerComponent update={this.update} {...this.state} {...this.props} />
//        );
//    }
//
//    componentWillMount() {
//        console.log('will mount');
//    }
//
//    componentDidMount() {
//        console.log('did mount');
//    }
//};
//
//const Button = (props) => <button onClick={props.update}>{props.txt}-{props.val}</button>;
//
//let ButtonMixed = Mixin(Button);
//
//class App extends React.Component{
//    render(){
//        return(
//            <div>
//                <ButtonMixed txt="Button"/>
//            </div>
//        )
//    }
//}
// composable components
//class App extends React.Component{
//    constructor(){
//        super();
//        this.state = {red:0};
//        this.update = this.update.bind(this);
//    }
//    update(e){
//        this.setState({
//            red:ReactDOM.findDOMNode(this.refs.red.refs.inp).value
//        })
//    }
//    render(){
//        return(
//            <div>
//                <Slider ref="red"
//                        min={0}
//                        max={255}
//                        step={1}
//                        val={+this.state.red}
//                        label="Red"
//                        type="number"
//                        update={this.update} />
//            </div>
//        );
//    }
//}
//
//class Slider extends React.Component{
//
//    render(){
//        let label = this.props.label !== '' ?
//            <label>{this.props.label}-{this.props.val}</label>: '';
//        return(
//            <div>
//                <input ref="inp"
//                        min={this.props.min}
//                       max={this.props.max}
//                       step={this.props.step}
//                       defaultValue={this.props.val}
//                       type={this.props.type}
//                       onChange={this.props.update}  />
//                {label}
//            </div>
//        );
//    }
//}

//Slider.propTypes = {
//    min: React.PropTypes.number,
//    max: React.PropTypes.number,
//    step: React.PropTypes.number,
//    val: React.PropTypes.number,
//    label: React.PropTypes.string,
//    update: React.PropTypes.func.isRequired,
//    type: React.PropTypes.oneOf(['number','range'])
//};
//
//Slider.defaultProps = {
//    min: 0,
//    max: 0,
//    step: 1,
//    val: 0,
//    label: '',
//    type: 'range'
//};

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            input: '/* add your jsx here  */',
            output: '',
            err: ''
        };
        this.update = this.update.bind(this);
    }
    update(e){
        let code = e.target.value;

        try{
            this.setState({
                output: babel.transform(code,{
                    stage: 0,
                    loose: 'all'
                }).code,
                err:''
            })
        }catch(err){
            this.setState({
                err:err.message
            })
        }

    }
    render(){
        return (
            <div>
                <header>{this.state.err}</header>
                <div className="container">
                <textarea
                    onChange={this.update}
                    defaultValue={this.state.input}
                    ></textarea>
                    <pre>{this.state.output}</pre>
                </div>
            </div>
        )
    }
}



export default App