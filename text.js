/**
 * Created by liuyongsheng on 16/7/18.
 */
$(function(){
    function aboutNav(){
        var li_str = '<li class="toTop">返回顶部</li>';
        var head_str = '<div class="nav_headimg"><img src="http://eimg.smzdm.com/201607/18/578c91d0bbc1d3851.png" /></div>';
        $('#nav-lift').prepend(head_str).find('ul').append(li_str);
    }
    function registered(){
        $('.banner').find('h2 img').on('click',function(){
            location.href = 'http://www.smzdm.com/form/7025fcf85cfb28bf';
        });
    }
    function toTop(){
        $('.toTop').on('click',function(){
            $('html,body').animate({
                scrollTop:0
            },800);
        });

    }
    function Comments(){
        var comment_str = '<div class="co_img"><img src="http://eimg.smzdm.com/201607/18/578c9a533f4c86217.png"></div>';
        $('#comments').find('.title_line').remove();
        $('#comments').find('h2').append(comment_str);
    }
    function logoClick(){
        $('.hotlist').each(function(index,ele){
            var arr = ['http://cn.pharmacyonline.com.au/','http://cn.amcal.com.au/','http://cn.pharmacydirect.co.nz/','http://cn.kiwidiscovery.co.nz/','http://cn.kiwidiscovery.co.nz/'];
            var srcpng = $(ele).find('h2 img').attr('src');
            var str = '<a href="'+arr[index]+'" target="_blank"><img src="'+srcpng+'" title="" alt="" /></a>';
            $(ele).find('h2 img').remove();
            $(ele).find('h2').append(str);
        });
    }

    registered();
    aboutNav();
    toTop();
    Comments();
    logoClick();
});