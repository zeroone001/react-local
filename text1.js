/**
 * Created by liuyongsheng on 16/7/18.
 */
$(function(){

    function registered(){
        $('.banner').find('h2 img').on('click',function(){
            location.href = 'http://www.smzdm.com/form/7025fcf85cfb28bf';
        });
    }

    function Comments(){
        var comment_str = '<div class="co_img"><img src="http://eimg.smzdm.com/201607/18/578c9a533f4c86217.png"></div>';
        $('#comments').find('.title_line').remove();
        $('#comments').find('h2').append(comment_str);
    }
    registered();
    Comments();
});