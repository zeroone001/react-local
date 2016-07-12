/**
 * Created by liuyongsheng on 16/7/12.
 */
var CommentBox = React.createClass({
    //在组件的生命周期中只执行一次，用于设置组件的初始化state
    getInitialState: function () {
        return {data: []}
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    //组件渲染的时候被React自动调用
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit:function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit()} />
            </div>
        );
    }
});
var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author:author,text:text});
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit} >
                <input type="text" placeholder="name" ref="author"/>
                <input type="text" placeholder="say" ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});
var CommentList = React.createClass({
    render:function(){
        return(
            <div className></div>
        );
    }
});

ReactDOM.render(
        <CommentBox url="/api/comments" pollInterval={2000} />,
        document.getElementById('content')
);




