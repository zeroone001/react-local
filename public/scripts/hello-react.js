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

ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.getElementById('example')
);


