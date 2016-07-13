/**
 * Created by smzdm on 16/7/13.
 */
var HelloWorld = React.createClass({
    render:function(){
        return(
            <p>
                Hello, <input type="text" placeholder="Your name here" />!
                it is {this.props.date.toTimeString()}
            </p>
        );
    }
});
setInterval(function(){
    ReactDOM.render(
        <HelloWorld date={new Date()} />,
        document.getElementById('example')
    );
},500);