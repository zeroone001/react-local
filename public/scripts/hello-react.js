/**
 * Created by smzdm on 16/7/13.
// */
//var HelloWorld = React.createClass({
//    render:function(){
//        return(
//            <p>
//                Hello, <input type="text" placeholder="Your name here" />!
//                it is {this.props.date.toString()}
//            </p>
//        );
//    }
//});
//setInterval(function(){
//    ReactDOM.render(
//        <HelloWorld date={new Date()} />,
//        document.getElementById('example')
//    );
//},500);
    //组件类的第一个字母必须大写，组件类只能包含一个顶层标签
    //this.props.children代表组件的所有的子节点
    //组件并不是真实的DOM节点，而是存储在内存中的一种虚拟的DOM结构，只有插入文档之后才是真实的DOM，所有的DOM的变动，都要先在虚拟DOM上发生，然后再将实际发生变动的部分，反应在真实的DOM之上
    //有时需要从组件获取真实的DOM节点，那么就需要refs属性
    // 支持的events
    //onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate
    //onKeyDown onKeyUp onKeyPress onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
//onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
//onMouseMove onMouseOut onMouseOver onMouseUp

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
     //在组件移除或者销毁之前调用
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

var MyTitle = React.createClass({
    getDefaultProps:function(){
        return{
            title: 'hello world'
        }
    },
    //用来验证组件的实例的属性是否符合要求，下面这个就是要求必须是字符串
    propTypes:{
        title:React.PropTypes.string.isRequired
    },
    render:function(){

    }
});

var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // 引用 mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // 调用 mixin 的方法
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
        return (
            <p>
                React has been running for {this.state.seconds} seconds
            </p>
        );
    }
});
var InputTest = React.createClass({
    //在挂件插入DOM之前调用
    componentWillMount:function(){
        alert(1);
    },
    //在挂件插入DOM之后调用
    componentDidMount:function(){
        alert(2);
    },
    getInitialState:function(){
        return{value: 'hello lys!!'};
    },
    handleChange:function(event){
        this.setState({
            value:event.target.value
        });
    },
    render:function(){
        var value = this.state.value;
        return(
            <div>
                <input type="text" value={value} onChange={this.handleChange} />
                <span>
                    {this.state.value}
                </span>
            </div>
        );
    }

});
var App = React.createClass({
    getInitialState:function(){
        return{userInput:''};
    },
    handleChange:function(e){
        this.setState({
            userInput: e.target.value
        });
    },
    clearAndFocusInput: function(){
        this.setState({userInput:''},function(){
            //this.refs.theInput.getDOMNode()直接获取组件的DOM节点
            this.refs.theInput.getDOMNode().focus();
        })
    },
    render:function(){
        return(
            <div>
                <div onClick={this.clearAndFocusInput}>
                    click me!
                </div>
                <input ref="theInput" value={this.state.userInput} onChange={this.handleChange} />
            </div>
        );
    }
});
var UserGist = React.createClass({
    getInitialState:function(){
        return{
            username:'',
            lastGistUrl:''
        }
    },
    componentDidMount:function(){
        $.get(this.props.source,function(result){
            var lastGist = result[0];
            if(this.isMounted()){
                this.setState({
                    username:lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }
        }.bind(this));
    },
    render:function(){
        return(
            <div>
                {this.state.username}
                <a href={this.state.lastGistUrl} >here</a>
            </div>
        );
    }
});

//搭建评论应用
var Checkbox = React.createClass({
    getDefaultProps() {
        return {
            defaultChecked: false,
            onChange(){}
        };
    },

    getInitialState() {
        var state = {};
        var props = this.props;
        if('checked' in props){
            state.checked = props.checked;
        } else {
            state.checked = props.defaultChecked;
        }
        return state;
    },

    componentWillReceiveProps(newProps){
        // 组件重新渲染了，属性可能有改变，同步属性到状态
        if('checked' in newProps){
            this.setState({
                checked: newProps.checked
            });
        }
    },

    onClick() {
        var nextChecked = !this.state.checked;
        if(!('checked' in this.props)){
            // 非受限
            this.setState({
                checked: nextChecked
            });
        }
        // 回调函数通知外部
        this.props.onChange(nextChecked);
    },

    render() {
        var state = this.state;
        var style = {border:'1px solid red',display:'inline-block',width:100,height:100};
        if(state.checked){
            style.backgroundColor='red';
        }
        return <span style={style} onClick={this.onClick}></span>;
    }
});



var Test = React.createClass({
    getInitialState(){
        return {
            checked: false
        };
    },
    onChange(){
        this.setState({
            checked: !this.state.checked
        });
    },
    render(){
        return <div>
            <p>受限： <Checkbox checked={this.state.checked} /></p>
            <p>不受限： <Checkbox defaultChecked={true} onChange={this.onChange}/></p>
        </div>;
    }
});

ReactDOM.render(
    <CheckBox />,
    document.getElementById('example')
);


