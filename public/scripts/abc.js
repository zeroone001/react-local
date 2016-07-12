/**
 * Created by smzdm on 16/7/12.
 */
/**
 * Created by liuyongsheng@smzdm.com on 2015/12/23.
 * 这是值友良品发布页面相关的JS
 */
$(function () {
    var Release = {
        //入口函数
        init: function () {
            this.initDom();
            this.initEvent();
        },
        //DOM入口
        initDom: function () {
            var that = this;
            that.conMethod = $('#concat-div');
            that.methUl = $('#concat-div ul');
            that.classification = $('.choose-class');
            that.certificate = $('.price-certificate ul');
            that.checkbox = $('.biaoqian li');
            that.maskImg = $('.shot-img ul');
            that.relate = $('.related');
            that.titleOne = $("#title");
            that.mallCname = $("#mall_cname");
            that.fourcheck = $('.four-check .condition');
            that.area = $('.pro-describe textarea');
            that.contact = $('#contact');
            that.place = $('.place');
            that.order_price = $("#order_price"); //入手价格
        },
        //全部事件入口
        initEvent: function () {
            var self = this;
            self.cMethod();//联系方式下拉
            self.concatValidate(); //联系方式相关验证
            self.selectCity();  //所在地
            self.classiFication(); //分类
            self.priceCertificate();
            self.shotImg();
            self.checkBox(); //标签项的点击效果
            self.productDes(1000);  //商品描述，参数是最大的输入长度
            self.bluePrice();   //购买凭证的蓝色字体的鼠标悬浮效果
            self.maskClick();   //焦点图点击事件
            self.textLimit(); //标题的字体限制文案
            self.associatedTags();//关联标签事件
            self.mallAutoComplete();// 商城联想
            self.condition(); // 成色,相关事件
            self.judgMent(); //实时检查输入是否符合要求
            self.btnSave();
            self.popTips();
            self.confirmSubmit();
            self.creditPic();
            self.actualPic();
            self.getId();
            self.getRelatedLink();//获取出售链接的点击事件
        },
        //联系方式下拉
        cMethod: function () {
            var _self = this;
            _self.conMethod.on('click', function (event) {
                if (_self.methUl.css('display') == 'none') {
                    $('.concat-down').css('display', 'none');
                    $('.concat-up').css('display', 'inline-block');
                    _self.methUl.css('display', 'block');
                    _self.methUl.find('li').each(function () {
                        $(this).click(function () {
                            _self.conMethod.find('.concat-text').text($(this).text());
                            // 改变联系方式隐藏菜单，后台增加的代码
                            var contact_type = $(this).attr('contact_type');
                            $('#contact_type').val(contact_type);
                            $('#concat_text').attr('contact_type', contact_type);
                            $('#contact').val('');
                            $("#error_contact").addClass('rel-hide');
                        });
                    });
                } else {
                    $('.concat-up').css('display', 'none');
                    $('.concat-down').css('display', 'inline-block');
                    _self.methUl.css('display', 'none');
                }
                event.stopPropagation();
            });
            $(document).not(_self.conMethod).click(function () {
                $('.concat-up').css('display', 'none');
                $('.concat-down').css('display', 'inline-block');
                _self.methUl.css('display', 'none');
            });
        },
        concatValidate: function () {
            var _self = this;
            _self.contact.keydown(function (event) {
                var contact_type = parseInt($('#concat_text').attr('contact_type'));
                if (contact_type == 0) {
                    event.preventDefault();
                } else if (contact_type === 3) {
                    if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
                        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
                            event.preventDefault();
                    //只能输入11位数字
                    if ($(this).val().length > 11) {
                        $(this).val($(this).val().substring(0, 10));
                    }
                } else if (contact_type === 1) {
                    if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
                        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
                            event.preventDefault();
                    //只能输入12位数字
                    if ($(this).val().length > 12) {
                        $(this).val($(this).val().substring(0, 11));
                    }
                }
            });
            // 联系方式
            var contact_type = $("#contact_type"), error_contact = $("#error_contact");
            _self.contact.blur(function () {
                if ($(this).val()) {
                    if (contact_type.val() == 1) {
                        reg = /[1-9][0-9]{4,}/;
                        if (!reg.test($("#contact").val())) {
                            flag = false;
                            var msg = '请输入正确格式的QQ号';
                            error_contact.removeClass('rel-hide');
                            error_contact.text(msg);
                        } else {
                            error_contact.addClass('rel-hide');
                        }
                    } else if (contact_type.val() == 3) {
                        reg = /0?(13|14|15|17|18)\d{9}/;
                        if (!reg.test($("#contact").val())) {
                            flag = false;
                            error_contact.removeClass('rel-hide');
                            error_contact.text('请输入正确格式的手机号');
                        } else {
                            error_contact.addClass('rel-hide');
                        }
                    } else if (contact_type.val() == 2) {
                        if ($(this).val().length > 16) {
                            $(this).val($(this).val().substring(0, 16));
                        }
                    } else if (contact_type.val() == 4) {
                        var str = $(this).val().replace(/[\u0391-\uFFE5]/gi, 'aa');
                        if (str.length < 5 || str.length > 25) {
                            error_contact.removeClass('rel-hide');
                            error_contact.text('请输入正确格式的旺旺号');
                        } else {
                            error_contact.addClass('rel-hide');
                        }
                    }
                }
            });
        },
        //省份下拉选择
        selectCity: function () {
            var _self = this;
            var city = _self.place.find('.shengfen');
            _self.place.not('.error-link').on('click', function (event) {
                $(this).removeClass('error-border');
                if (city.hasClass('rel-hide')) {
                    city.removeClass('rel-hide');
                    $('.place-down').css('display', 'none');
                    $('.place-up').css('display', 'inline-block');
                    city.find('li').each(function () {
                        var self = this;
                        $(self).on('click', function () {
                            var val = $(this).text();
                            $('.place-text').text(val);
                            // 更变隐藏菜单城市ID
                            var region_id = $(this).attr('region_id');
                            $("#area").val(region_id);
                        });
                    });
                } else {
                    city.addClass('rel-hide');
                    $('.place-down').css('display', 'inline-block');
                    $('.place-up').css('display', 'none');
                }
                event.stopPropagation();
            });
            $(document).not(_self.place).click(function () {
                city.addClass('rel-hide');
                $('.place-down').css('display', 'inline-block');
                $('.place-up').css('display', 'none');
            });
        },
        //分类，下拉事件函数
        classiFication: function () {
            var _self = this;
            var moreDivSelect = $('.moreDivSelect');
            var sub_category = $('.sub_category');

            _self.classification.on('click', function (event) {
                var $self = $(this);

                $(this).removeClass('error-border');
                if (moreDivSelect.hasClass('rel-hide')) {
                    moreDivSelect.removeClass('rel-hide');
                    $self.find('.choose-down').css('display', 'none');
                    $self.find('.choose-up').css('display', 'inline-block');
                    // sub_category.find('li').each(function () {
                    //     var e = this;
                    //     $(e).click(function () {
                    //         var val = $(this).text();
                    //         $self.find('.choose-text').text(val);
                    //         // 更变分类隐藏域
                    //         $("#category").val($(this).attr('sub_category'));
                    //     });
                    // });
                } else {
                    moreDivSelect.addClass('rel-hide');
                    $self.find('.choose-down').css('display', 'inline-block');
                    $self.find('.choose-up').css('display', 'none');

                }
                event.stopPropagation();
            });

            /*---------------- by chenlin@smzdm.com 2016.5.6 -----------------*/
            $('.sub_category').find('li').each(function (index, el) {
                $(el).click(function () {
                    var val = $(this).text();
                    _self.classification.find('.choose-text').text(val);
                    // 更变分类隐藏域
                    $("#category").val($(this).attr('sub_category'));
                });
            });

            $(document).not(_self.classification).click(function () {
                moreDivSelect.addClass('rel-hide');
                $('.choose-down').css('display', 'inline-block');
                $('.choose-up').css('display', 'none');
            });
        },
        //价格凭证
        priceCertificate: function () {
            var _self = this;
            _self.certificate.on('click', 'li i', function () {
                $(this).parents('li').remove();
                // 如果图片数量少于2个 显示上传
                if ($("#credit_ul li").length <= 2) {
                    $(".price-certificate span.upload-img").show();
                }
            });
        },
        //上传实物
        shotImg: function () {
            var _self = this;
            _self.maskImg.on('click', 'li i', function () {
                //判断删除的图片是否是头图，如果是的话，把第一张图片设置为头图
                var if_mask = $(this).siblings('.focus-map').text()
                    , actual_ul = $(this).parents('#actual_ul')
                    , strMask = '<span class="focus-map">头图</span>';
                if (if_mask) {
                    var first_li = actual_ul.find('li').first();
                    //如果删除的图片是第一张，并且是头图，且后面还有图片则把后面第一张图片设置为头图
                    if (first_li.children('.focus-map').text()) {
                        first_li.next().append(strMask);
                        // 隐藏域增加焦点图
                        $("#focus_pic_url").val(first_li.next().find("input[name='actual_pic_url[]']").val());
                        $("#focus_pic_url_w_h").val(first_li.next().find("input[name='actual_pic_w_h[]']").val());
                    } else {
                        first_li.append(strMask);
                        // 隐藏域增加焦点图
                        $("#focus_pic_url").val(first_li.find("input[name='actual_pic_url[]']").val());
                        $("#focus_pic_url_w_h").val(first_li.find("input[name='actual_pic_w_h[]']").val());
                    }
                }
                $(this).parents('li').remove();
                // 如果图片数量少于5个 显示上传
                if ($("#actual_ul li").length <= 5) {
                    $(".shot-img span.upload-img").show();
                }
            });
        },
        //标签对勾点击事件
        checkBox: function () {
            var _tag_box = []; //存放tag_id数组
            var _self = this;
            _self.checkbox.on('click', '.lab_title', function () {
                var tag_id = $(this).parents('li').attr('tag_id');
                if ($(this).hasClass('lab_red')) {
                    $(this).removeClass('lab_red');
                    // 取消tag_id
                    tag_id = '';
                } else {
                    $(this).addClass('lab_red');
                }
                $(this).parent('li').siblings().find('.lab_title').removeClass('lab_red');
                // 把结果放到隐藏域中
                $("#tag_ids").val(tag_id);
            });
        },
        //成色，点击事件
        condition: function () {
            // var _self = this;
            // _self.fourcheck.on('click', 'span', function () {
            //     var that = $(this).parent('li');
            //     if (!that.hasClass('blue'))
            //         that.addClass('blue');
            //     //只能选中一个
            //     that.siblings('.condition').removeClass('blue');
            //     // 获取成色值
            //     $("#quality").val(that.attr('quality'));
            // });

            /*---------- by chenlin@smzdm.com 2016.5.5 ---------*/
            // 下拉菜单通用
            $('.js_dropdown').bind('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this);
                var $list = $self.find('.js_dropdown_list');
                var $arrowDown = $self.find('.choose-down');
                var $arrowUp = $self.find('.choose-up');

                $self.removeClass('error-border');

                if($list.is(':hidden')){
                    $arrowDown.hide();
                    $arrowUp.show(0);
                    $list.show();
                }else{
                    $arrowUp.hide();
                    $arrowDown.show(0);
                    $list.hide();
                }
            });

            $('.js_dropdown_list').on('click', 'li', function(e){
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this);
                var $dropdownWrap = $self.closest('.js_dropdown');
                var $dropdownList = $self.parent();
                var $drapdownText = $dropdownWrap.find('.js_dropdown_text');
                var text = $self.html();
                var val = $self.attr('data-value');

                $dropdownWrap.attr('data-select-value', val);
                $dropdownWrap.find('.choose-up').hide();
                $dropdownWrap.find('.choose-down').show(0);
                $drapdownText.html(text);
                $dropdownList.hide();

                $('#quality').val(Number(val));
            });

            $(document).on('click', function(e){
                var $showedLists = $.grep($('.js_dropdown_list'), function(item){
                    return !$(item).is(':hidden');
                });

                if($showedLists.length === 0) return;

                if($(e.target).hasClass('.js_dropdown_list')){
                    e.preventDefault();
                }else{
                    $.each($showedLists, function(index, el) {
                        $(el).hide();
                    });
                }
            });
        },
        //商品描述字数限制函数
        productDes: function (n) {
            var _self = this;
            _self.area.focus(function () {
                $(this).removeClass('error-border');
                if($(this).val().length <= 33){
                    var value = "转手原因：\n" +
                        "出手价格：\n" +
                        "是否包邮：\n" +
                        "是否接受议价：\n" +
                        "推荐入手人群：";
                    $(this).val(value);
                }
            });
            var num = $('.text-num');
            num.text(_self.area.val().length);

            _self.area.keydown(function () {
                if ($(this).val().length > n) {
                    return false;
                }
            });
            _self.area.keyup(function () {
                var s = $(this).val();
                if (s.length > n) {
                    $(this).val(s.substring(0, n)).addClass('error-border');
                    num.text(n);
                } else {
                    $(this).removeClass('error-border');
                    num.text(s.length);
                }
            });
            //去掉内容左右两侧的空格
            _self.area.blur(function () {
                $(this).val($.trim($(this).val()));
                num.text($(this).val().length);
            });
        },

        //价格凭证的蓝色字体的鼠标悬浮效果
        bluePrice: function () {
            var textblue = $('.img-infor .blue-price'),
                magnify = $('.magnify'), timer;
            textblue.on({
                "mouseenter": function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        var scrollTop = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
                        if (scrollTop < 600) {
                            magnify.css('top', '-420px');
                            magnify.css('display', 'block').animate({
                                top: "-400px",
                                opacity: 1
                            }, 1000);
                        } else {
                            magnify.css('top', '70px');
                            magnify.css('display', 'block').animate({
                                top: "50px",
                                opacity: 1
                            }, 1000);
                        }
                    }, 500);
                },
                "mouseleave": function () {
                    clearTimeout(timer);
                    var scrollTop = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
                    if (scrollTop < 600) {
                        magnify.animate({
                            top: "-420px",
                            opacity: 0
                        }, 500, function () {
                            magnify.css('display', 'none');
                        });
                    } else {
                        magnify.animate({
                            top: "70px",
                            opacity: 0
                        }, 500, function () {
                            magnify.css('display', 'none');
                        });
                    }
                }
            });

        },

        //标题自动联想
        autoComplete: function (abled) {
            var _self = this;
            _self.titleOne.autocomplete({
                disabled: abled,
                source: function (request, response) {
                    $.ajax({
                        url: "/create/wiki_intelligent_completion",
                        type: "post",
                        dataType: "json",
                        data: {
                            searchItem: request.term
                        },
                        success: function (data) {
                            response($.map(data, function (item) {
                                // 获取最小ID
                                var category_id = item.category_4_id > 0 ? item.category_4_id : item.category_3_id > 0 ? item.category_3_id :
                                    item.category_2_id > 0 ? item.category_2_id : item.category_1_id > 0 ? item.category_1_id : '';
                                return {
                                    label: item.name,
                                    value: item.name,
                                    category_id: category_id,
                                    hash_id: item.hashid
                                };
                            }));
                        }
                    });
                },
                minLength: 1, // 输入框字符个等于1时开始查询
                select: function (event, ui) {

                    // 插入百科分类ID
                    $("#category").val(ui.item.category_id);
                    $("#wiki_hash_id").val(ui.item.hash_id);
                    // 插入标签卡
                    $('#related_title a').text(ui.item.value);
                    $('#related_title a').attr('href', 'http://wiki.smzdm.com/p/' + ui.item.hash_id);
                    $('.related').removeClass('rel-hide');

                    // 隐藏分类
                    $("#category_div").hide();

                    //字数限制文字位置
                    $('.limitTwo').removeClass('visibility');
                    $('.limitOne').addClass('rel-hide');
                    _self.titleOne.blur();
                }
            });
        },
        //焦点图点击事件
        maskClick: function () {
            var self = this,
                strMask = '<span class="focus-map">头图</span>';
            self.maskImg.on('click', 'li .mask', function () {
                $(this).parent('li').siblings().children('.focus-map').remove();
                $(this).parent('li').append(strMask);
                // 隐藏域增加焦点图
                $("#focus_pic_url").val($(this).parent('li').find("input[name='actual_pic_url[]']").val());
                $("#focus_pic_url_w_h").val($(this).parent('li').find("input[name='actual_pic_w_h[]']").val());
            });
        },
        //已关联标签的相关事件，关闭事件
        associatedTags: function () {
            var _self = this;
            //标签的关闭事件,叉号的点击事件
            _self.relate.on('click', 'i', function () {
                $('.related').addClass('rel-hide');
                $('#category_div').show();
                // 取消百科ID
                $("#wiki_hash_id").val('');
                // 取消分类ID
                $("#category").val('');
                // 重新智能获取分类
                _self.category2_intelligent_completion();
            });
        },

        //是否已经联想的判断
        textLimit: function () {
            var _self = this, buer;
            _self.titleOne.focus(function () {
                //调用自动联想
                $(this).removeClass('error-border');
                _self.relate.hasClass('rel-hide') ? buer = false : buer = true;
                _self.autoComplete(buer);
            });
        },
        //商城自动联想
        mallAutoComplete: function () {
            var _self = this;
            _self.mallCname.autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: "/create/mall_intelligent_completion",
                        type: "post",
                        dataType: "json",
                        data: {
                            searchItem: request.term
                        },
                        success: function (data) {
                            response($.map(data, function (item) {
                                return {
                                    label: item.name_cn,
                                    value: item.name_cn
                                };
                            }));
                        }
                    });
                },
                minLength: 1, // 输入框字符个等于1时开始查询
                select: function (event, ui) {

                }
            });
            _self.mallCname.blur(function () {
                $("#mall_id").val('');
                var value = $(this).val();
                if (value) {
                    $.ajax({
                        url: "/create/mall_intelligent_completion",
                        type: "post",
                        dataType: "json",
                        data: {
                            searchItem: value
                        },
                        success: function (data) {
                            $("#error_order_price").addClass('rel-hide');
                            //判断data
                            var flag = false;
                            for (var x in data) {
                                if (data[x].name_cn === value) {
                                    var mall_id = data[x].ID;
                                    $("#mall_id").val(mall_id);
                                    flag = true;
                                }
                            }
                            if (!flag) {
                                $("#error_order_price").html('请匹配相应的商城');
                                $("#error_order_price").removeClass('rel-hide');
                            }
                        }
                    });
                }
            });
        },
        //这两个showBg,确实不能这么写,以后优化代码的时候改
        showBg: function () {
            var h = $(window).height(), w = $(window).width();
            $('#fullbg').css({
                height: h,
                width: w,
                display: 'block'
            });
            $('#dialog').show();
        },
        showlittleBg: function () {
            var h = $(window).height(), w = $(window).width();
            $('#fullbg').css({
                height: h,
                width: w,
                display: 'block'
            });
            $('#little_dialog').show();
        },
        closeBg: function () {
            $('#fullbg,#dialog,#little_dialog,#loading_dialog').hide();
        },
        //实时判断将要提交的数据是否符合要求
        judgMent: function () {
            var _self = this;
            var domain1 = /http:\/\/fish.mashort.cn/;
            var domain2 = /http:\/\/2.paipai.com/;
            var domain3 = /http:\/\/m.zhuanzhuan.58.com/;
            var domain4 = /(http|https):\/\/([\w\-_]+\.)?taobao.com/;
            //标题
            _self.titleOne.blur(function () {
                // 根据标题智能分类
                _self.category2_intelligent_completion();
                var tval = $(this).val().length;
                if (tval > 50) $(this).val($(this).val().substring(0, 50));
            });
            // 出售链接
            /*
             var buy_link = $("#buy_link"), error_buy_link = $("#error_buy_link");
             buy_link.focus(function () {
             error_buy_link.addClass('rel-hide');
             });
             buy_link.blur(function () {
             if ($(this).val() !== '') {
             if (!domain1.test(buy_link.val())
             && !domain3.test(buy_link.val())
             && !domain4.test(buy_link.val())
             ) {
             error_buy_link.removeClass('rel-hide').text('暂不支持该链接');
             } else {
             $("#error_buy_link").addClass('rel-hide');
             }
             }
             });
             */
            // 是否是正整数
            var g = /^[1-9]*[1-9][0-9]*$/;
            var error_order_price = $("#error_order_price");
            // 入手价格
            _self.order_price.focus(function () {
                error_order_price.addClass('rel-hide');
            });
            _self.order_price.blur(function () {
                if (g.test($(this).val())) {
                    error_order_price.addClass('rel-hide');
                } else {
                    error_order_price.removeClass('rel-hide').text('请输入大于0的整数价格');
                }
                // 入手价格不得高于出售价格
                if ($(this).val() && $("#second_price").val()) {
                    if (parseInt($(this).val()) < parseInt($("#second_price").val())) {
                        $("#error_second_price").removeClass('rel-hide').text('转让价格不能高于入手价格');
                    } else {
                        $("#error_second_price").addClass('rel-hide');
                    }
                }
                // var order_price = $(this).val();
                // if(order_price){
                //     var m = parseInt(order_price);
                //     if(m == 0){
                //         $("#order_price").val('');
                //     }else if (m == NaN){
                //         $("#order_price").val('');
                //     }else{
                //         $("#order_price").val(m);
                //     }
                // }
            });
            // 出售价格
            var second_price = $("#second_price");
            var error_second_price = $("#error_second_price");
            second_price.focus(function () {
                error_second_price.addClass('rel-hide');
            });
            second_price.blur(function () {
                if (!g.test($(this).val()))
                    error_second_price.removeClass('rel-hide').text('请输入大于0的整数价格');
                // 入手价格不得高于出售价格
                if (parseInt($("#order_price").val()) < parseInt(second_price.val())) {
                    error_second_price.removeClass('rel-hide').text('转让价格不能高于入手价格');
                }
                // var sp_value = $(this).val();
                // if(sp_value){
                //     var s = parseInt(sp_value);
                //     if(s == 0){
                //         $("#second_price").val('');
                //     }else if (s == NaN){
                //         $("#second_price").val('');
                //     }else{
                //         $("#second_price").val(s);
                //     }
                // }

            });
            // 商品描述
            var product_desc = $("#product_desc");
            product_desc.focus(function () {
                $(this).removeClass('error-border');
            });
        },

        //保存草稿
        btnSave: function () {
            $('.btn-submit').on('click', '#save', function () {
                $.ajax({
                    type: "post",
                    url: "/create/save",
                    data: $('form').serialize(),
                    dataType: "json",
                    success: function (data) {
                        $("#show_status").html('');
                        if (data.error_code == 0) { // 更新数据
                            $("#show_status").html('保存成功 <a href="http://zhiyou.smzdm.com/user/2/" title="look">查看 ></a>');
                        } else if (data.error_code == 1) { // 插入数据
                            $("#second_id").val(data.error_data.second_id);
                            $("#show_status").html('保存成功 <a href="http://zhiyou.smzdm.com/user/2/" title="look">查看 ></a>');
                        } else if (data.error_code == 10043) {
                        } else {
                            $("#show_status").html('操作失败,请稍后重试');
                        }
                    },
                    error: function () {
                        $("#show_status").html('网络错误,操作失败,请重试');
                    }
                });
            });
        },
        // 弹窗提示
        popTips: function () {
            var _self = this;
            $('#submits').on('click', function () {
                _self.closeBg();
                if (_self.validate()) {
                    $.ajax({
                        type: "post",
                        url: "/create/check_first_submit",
                        data: 'second_id=' + $('#second_id').val(),
                        dataType: "json",
                        success: function (data) {
                            $("#show_status").html('');
                            if (data.error_code == 0) {
                                _self.showBg();
                                $('.dialog-body span').html('你确定要提交吗？');
                                $('.dialog-body p').html(data.error_msg);
                                $('.dialog-btn').removeClass('rel-hide');
                            } else if (data.error_code == 1) {
                                _self.showBg();
                                $('.dialog-body span').html('你确定要提交吗？');
                                $('.dialog-body p').html(data.error_msg);
                                $('.dialog-btn').removeClass('rel-hide');
                            }
                        },
                        error: function () {
                            $("#show_status").removeClass('rel-hide');
                            $("#show_status").text('网络错误');
                        }
                    });
                }
            });
        },
        // 确认提交
        confirmSubmit: function () {
            var _self = this;
            $("#confirm_submit").on('click', function () {
                _self.closeBg();
                if (_self.validate()) {
                    $.ajax({
                        type: "post",
                        url: "/create/submit",
                        data: $('form').serialize(),
                        dataType: "json",
                        success: function (data) {
                            $("#show_status").html('');
                            if (data.error_code == 0 || data.error_code == 1) {
                                _self.showlittleBg();
                                $('.fail h4').text('提交成功');
                                $('.icon-logintanhao').addClass('rel-hide');
                                $('.icon-loginright').removeClass('rel-hide');
                                $('.fail p').html(data.error_msg);
                                setTimeout(function () {
                                    location.replace('http://zhiyou.smzdm.com/user/2/');
                                }, 5000);
                            } else if (data.error_code == 10043) {
                            } else {
                                _self.showlittleBg();
                                $('.fail h4').text('提交失败');
                                $('.icon-logintanhao').removeClass('rel-hide');
                                $('.icon-loginright').addClass('rel-hide');
                                $('.fail p').html(data.error_msg);
                            }
                        },
                        error: function () {
                            $("#show_status").removeClass('rel-hide');
                            $("#show_status").text('网络错误,操作失败,请重试');
                        }
                    });
                }
            });
        },

        // 跳转到验证错误的地方
        scrolltoAim: function(dom){
            $('html,body').animate({
                scrollTop:$(dom).offset().top
            },800);
        },

        // 前端验证
        validate: function () {
            var _self = this;
            $(".error-text").addClass('rel-hide');
            var validateArr = []; //将报错的DOM ID或者class放在数组中
            var flag = true;
            var msg = '';
            var domain1 = /http:\/\/fish.mashort.cn/;
            var domain2 = /http:\/\/2.paipai.com/;
            var domain3 = /http:\/\/m.zhuanzhuan.58.com/;
            var domain4 = /(http|https):\/\/([\w\-_]+\.)?taobao.com/;
            var reg = '';
            // 标题框titleOne
            if (!_self.titleOne.val()) {
                _self.titleOne.addClass('error-border');
                flag = false;
                validateArr.push('.rel-crumbs');
            }
            // 分类
            if (!$("#category").val()) {
                flag = false;
                $('.choose-class').addClass('error-border');
                validateArr.push('.rel-crumbs');
            }

            /*------------ by chenlin@smzdm.com 2016.5.5 ----------*/
            // 成色
            if (!$("#quality").val()) {
                flag = false;
                $('.js_quality').addClass('error-border');
                validateArr.push('.rel-crumbs');
            }

            // 所在地
            if (!$("#area").val()) {
                flag = false;
                $('.place').addClass('error-border');
                validateArr.push('.rel-crumbs');
            }
            //出售链接＋联系方式
            if ($("#buy_link").val() == '' && ($.inArray($("#contact_type").val(), [1, 2, 3, 4]) && $("#contact").val() == '')) { // 输入链接或者联系方式
                flag = false;
                msg = '请提交出售链接或填写联系方式';
                $("#error_buy_link").removeClass('rel-hide');
                $("#error_buy_link").text(msg);
                $("#error_contact").removeClass('rel-hide');
                $("#error_contact").text(msg);
                validateArr.push('.js_quality');
            }

            if ($("#buy_link").val() != '') { // 出售链接
                if (_self.isUrl($("#buy_link").val())) {
                    if (!domain1.test($("#buy_link").val())
                        && !domain3.test($("#buy_link").val())
                        && !domain4.test($("#buy_link").val())
                    ) {
                        flag = false;
                        $("#error_buy_link").removeClass('rel-hide');
                        msg = '暂不支持该链接';
                        $("#error_buy_link").text(msg);
                        validateArr.push('.form-h2');
                    }
                } else {
                    flag = false;
                    $("#error_buy_link").removeClass('rel-hide');
                    msg = '暂不支持该链接';
                    $("#error_buy_link").text(msg);
                    validateArr.push('.form-h2');
                }
            }

            if ($("#contact_type").val() == 1) { // 联系方式
                reg = /[1-9][0-9]{4,}/;
                if (!reg.test($("#contact").val())) {
                    flag = false;
                    msg = '请输入正确格式的联系方式';
                    $("#error_contact").removeClass('rel-hide');
                    $("#error_contact").text(msg);
                    validateArr.push('.form-h2');
                }
            }  else if ($("#contact_type").val() == 3) {
                reg = /0?(13|14|15|17|18)\d{9}/;
                if (!reg.test($("#contact").val())) {
                    flag = false;
                    msg = '请输入正确格式的联系方式';
                    $("#error_contact").removeClass('rel-hide');
                    $("#error_contact").text(msg);
                    validateArr.push('.form-h2');
                }
            }
            // 商城
            if (!$("#mall_cname").val()) {
                flag = false;
                msg = '请输入正确商城';
                $("#error_order_price").removeClass('rel-hide');
                $("#error_order_price").text(msg);
                validateArr.push('.choose-place');
            } else {
                var value = $("#mall_cname").val();
                $.ajax({
                    url: "/create/mall_intelligent_completion",
                    type: "post",
                    dataType: "json",
                    async: false,
                    data: {
                        searchItem: value
                    },
                    success: function (data) {
                        $("#error_order_price").addClass('rel-hide');
                        //判断data
                        var mall_flag = false;
                        for (var x in data) {
                            if (data[x].name_cn === value) {
                                var mall_id = data[x].ID;
                                $("#mall_id").val(mall_id);
                                mall_flag = true;
                            }
                        }
                        if (!mall_flag) {
                            flag = false;
                            $("#error_order_price").removeClass('rel-hide');
                            $("#error_order_price").text('请匹配相应的商城');
                        }
                    }
                });

            }

            // 是否是正整数
            var g = /^[1-9]*[1-9][0-9]*$/;

            if (!g.test($("#order_price").val())) { // 入手价格
                flag = false;
                msg = '请输入大于0的整数价格';
                $("#error_order_price").removeClass('rel-hide');
                $("#error_order_price").text(msg);
                validateArr.push('.choose-place');
            }

            if (!g.test($("#second_price").val())) { // 转让价格
                flag = false;
                msg = '请输入大于0的整数价格';
                $("#error_second_price").removeClass('rel-hide');
                $("#error_second_price").text(msg);
                validateArr.push('.choose-place');
            }

            if (parseInt($("#order_price").val()) < parseInt($("#second_price").val())) { // 入手价格不得高于出售价格
                flag = false;
                msg = '转让价格不能高于入手价格';
                $("#error_second_price").removeClass('rel-hide');
                $("#error_second_price").text(msg);
                validateArr.push('.choose-place');
            }

            if ($("input[name='credit_pic_url[]']").length == 0) { // 购买凭证
                flag = false;
                msg = '请上传至少1张价格凭证';
                $("#error_credit_upload").removeClass('rel-hide');
                $("#error_credit_upload").text(msg);
                validateArr.push('.concat-method');
            }
            // 商品描述
            if (!$("#product_desc").val()) {
                flag = false;
                _self.area.addClass('error-border');
                validateArr.push('.concat-method');
            }

            if ($("input[name='actual_pic_url[]']").length == 0) { //实拍图片
                flag = false;
                msg = '请上传至少1张实拍图片';
                $("#error_actual_upload").removeClass('rel-hide');
                $("#error_actual_upload").text(msg);
                validateArr.push('.concat-method');
            }
            if(validateArr.length !== 0){
                _self.scrolltoAim(validateArr[0]);
            }
            return flag;
        },
        // 凭证上传
        creditPic: function () {
            $('#credit_pic').fileupload({
                url: '/create/upload_credit_pic',
                dataType: 'json',
                singleFileUploads: false,
                done: function (e, result) {
                    $(".l_gif").remove();
                    if (result.result.error_code == 0) {
                        $("#error_credit_upload").addClass('rel-hide');
                        var need_pic_num = parseInt($("#credit_ul li").length);
                        var re = result.result.data;
                        for (var x in re) {
                            if (need_pic_num >= 2) {
                                break;
                            } else {
                                need_pic_num++;
                                var html = '' +
                                    '<li><span></span><img src="' + re[x].show_url + '" title="" /><i>x</i>' +
                                    '<input type="hidden" name="credit_pic_url[]" value="' + re[x].url + '">' +
                                    '<input type="hidden" name="credit_pic_w_h[]" value="' + re[x].width + ',' + re[x].height + '">' +
                                    '</li>';
                                $("#credit_ul").append(html);
                            }
                        }
                        // 超过2张 隐藏上传
                        if ($("#credit_ul li").length >= 2) {
                            $(".price-certificate span.upload-img").hide();
                        }
                    } else if (result.result.error_code == -1) {
                        $("#error_credit_upload").removeClass('rel-hide');
                        $("#error_credit_upload").text(result.result.msg);
                    }

                },
                progressall: function (e,data) {
                    // 这里添加效果
                    if($('.l_gif').length == 0) {
                        var str = '<li class="l_gif"><span></span><img src="http://2.smzdm.com/resources/img/loading_circle.gif" title="loading" />' +
                            '</li>';
                        $("#credit_ul").append(str);
                    }
                }
            });
            $(".price-certificate").on('click', 'span.upload-img', function () {
                $("#credit_pic").click();
            });
        },
        // 实物图上传
        actualPic: function () {
            $('#actual_pic').fileupload({
                url: '/create/upload_actual_pic',
                dataType: 'json',
                singleFileUploads: false,
                done: function (e, result) {
                    $(".load_gif").remove();
                    if (result.result.error_code == 0) {
                        $("#error_actual_upload").addClass('rel-hide');
                        // 判断之前已经有的张数
                        var need_pic_num = parseInt($("#actual_ul li").length);
                        var re = result.result.data;
                        for (var x in re) {
                            if (need_pic_num >= 5) {
                                break;
                            } else {
                                need_pic_num++;
                                var html = '' +
                                    '<li><span class="mask">设为头图</span><span class="middle"></span><img src="' + re[x].show_url + '" title="" /><i>x</i>' +
                                    '<input type="hidden" name="actual_pic_url[]" value="' + re[x].url + '">' +
                                    '<input type="hidden" name="actual_pic_w_h[]" value="' + re[x].width + ',' + re[x].height + '">' +
                                    '</li>';
                                $("#actual_ul").append(html);
                            }
                        }
                        // 上传完以后在判断 超过5张 隐藏上传
                        if ($("#actual_ul li").length >= 5) {
                            $(".shot-img span.upload-img").hide();
                        }
                        // 设置头图
                        if ($("#actual_ul li").length >= 1) {
                            // 是否含有头图
                            if ($("#actual_ul li .focus-map").length <= 0) {
                                // 设置头图
                                $("#actual_ul li").eq(0).prepend("<span class='focus-map'>头图</span>");
                                // 设置焦点图
                                $("#focus_pic_url").val($("#actual_ul li").eq(0).find("input[name='actual_pic_url[]']").val());
                                $("#focus_pic_url_w_h").val($("#actual_ul li").eq(0).find("input[name='actual_pic_w_h[]']").val());
                            }
                        }
                    } else if (result.result.error_code == -1) {
                        $("#error_actual_upload").removeClass('rel-hide');
                        $("#error_actual_upload").text(result.result.msg);
                    }

                },
                progressall: function (e,data) {
                    //这里添加效果,这个函数每次上传不管几张图片只执行一次
                    if($('.load_gif').length == 0) {
                        var strHtml = '<li class="load_gif"><span class="middle"></span><img src="http://2.smzdm.com/resources/img/loading_circle.gif" title="loading" />' +
                            '</li>';
                        $("#actual_ul").append(strHtml);
                    }
                }
            });

            $(".shot-img").on('click', 'span.upload-img', function () {
                $("#actual_pic").click();
            });
        },
        // 动态获取ID
        getId: function () {
            $.ajax({
                type: "post",
                url: "/create/get_second_data",
                data: 'second_id=' + $('#second_id').val(),
                dataType: "json",
                success: function (data) {
                    if (data.error_code == 0) {

                        var second_data = data.error_data;
                        $('#title').val(second_data.title); // 标题
                        if (second_data.wiki_product_hash_id) {
                            $("#related").removeClass('rel-hide'); // 如果有wikiID则说明有关联,去掉隐藏
                            $("#category_div").hide(); //隐藏分类
                            $("#related_title a").attr('href', 'http://wiki.smzdm.com/p/' + second_data.wiki_product_hash_id); // 添加a标签链接
                            $("#related_title a").text(second_data.wiki_product_title); // 关联标题
                        } else {
                            if (typeof (second_data.last_category) != 'undefined') {
                                $("#choose_category").html(second_data.last_category.title); // 不存在wiki的话 则把title 显示上
                            }
                        }
                        // 成色
                        // $("#condition li").each(function () {
                        //     if ($(this).attr('quality') == second_data.quality) {
                        //         $(this).addClass('blue');
                        //     } else {
                        //         $(this).removeClass('blue');
                        //     }
                        // });
                        $('.js_quality .js_dropdown_list')
                            .find('li[data-value=' + second_data.quality + ']').trigger('click');

                        if (second_data.region != 'undefined') { // 二手地区
                            $("#choose_place").html(second_data.region.region_name);
                        }
                        $("#buy_link").val(second_data.buy_link); // 二手链接

                        // 二手连接存在则不显示联系方式的红点
                        if (second_data.buy_link != '') {
                            $('.concat-method').parent().find('.label').find('i').remove();
                        }

                        // 联系方式
                        var contact = '';
                        if (second_data.contact_type == 1) {
                            contact = 'QQ号';
                        } else if (second_data.contact_type == 2) {
                            contact = '微信号';
                        } else if (second_data.contact_type == 3) {
                            contact = '手机号';
                        } else if (second_data.contact_type == 4) {
                            contact = '旺旺';
                        } else {
                            contact = '请选择联系方式';
                        }
                        $("#concat_text").text(contact);
                        if (second_data.contact_type == 1 || second_data.contact_type == 2 || second_data.contact_type == 3 || second_data.contact_type == 4) {
                            $("#concat_text").attr('contact_type', second_data.contact_type);
                        }
                        // 联系方式值
                        $("#contact").val(second_data.contact);
                        // 入手价格
                        $("#order_price").val(second_data.order_price);
                        // 商城
                        $("#mall_cname").val(second_data.mall_cname);
                        $("#mall_id").val(second_data.mall_id);
                        // 二手价格
                        $("#second_price").val(second_data.second_price);
                        // 购买凭证：
                        var html = '';
                        if (typeof (second_data.attach_type_1) != 'undefined') {
                            for (var x in second_data.attach_type_1) {
                                html += '<li><span></span><img src="' + second_data.attach_type_1[x].show_url + '" title="" /><i>x</i>';
                                html += '<input type="hidden" name="credit_pic_url[]" value="' + second_data.attach_type_1[x].pic_url + '">';
                                html += '<input type="hidden" name="credit_pic_w_h[]" value="' + second_data.attach_type_1[x].width + ',' + second_data.attach_type_1[x].height + '">';
                                html += '</li>';
                            }
                            if (second_data.attach_type_1.length >= 2) {
                                $("#credit_ul_upload").hide();
                            }
                        }
                        $("#credit_ul").append(html);
                        // 商品描述
                        var product_desc = second_data.product_desc;
                        $("#product_desc").val(product_desc);
                        $('.text-num').text(product_desc.length);
                        // 实拍图片
                        html = '';
                        if (typeof (second_data.attach_type_2) != 'undefined') {
                            for (x in second_data.attach_type_2) {
                                html += '<li>';
                                if (second_data.attach_type_2[x].pic_url == second_data.focus_pic_url) {
                                    html += '<span class="focus-map">头图</span>';
                                }
                                html += '<span class="mask">设为头图</span><span class="middle"></span><img src="' + second_data.attach_type_2[x].show_url + '" title="" /><i>x</i>';
                                html += '<input type="hidden" name="actual_pic_url[]" value="' + second_data.attach_type_2[x].pic_url + '">';
                                html += '<input type="hidden" name="actual_pic_w_h[]" value="' + second_data.attach_type_2[x].width + ',' + second_data.attach_type_2[x].height + '">';
                                html += '</li>';
                            }
                            if (second_data.attach_type_2.length >= 5) {
                                $("#actual_ul_upload").hide();
                            }
                        }
                        $("#actual_ul").append(html);
                        // 标签打钩
                        for (x in second_data.tag) {
                            $('.biaoqian li').each(function () {
                                if ($(this).attr('tag_id') == second_data.tag[x]) {
                                    $(this).find('.lab_title').addClass('lab_red');
                                }
                            });
                        }
                        // 草稿状态显示保存按钮
                        if (second_data.status == 2) {
                            $("#submits").after('<input class="white-btn" type="button" value="保存" id="save"/>');
                        }
                        // 隐藏域的东西
                        $("#wiki_hash_id").val(second_data.wiki_product_hash_id);
                        $("#focus_pic_url").val(second_data.focus_pic_url);
                        $("#focus_pic_url_w_h").val(second_data.focus_pic_url_w_h);
                        $("#contact_type").val(second_data.contact_type);
                        $("#area").val(second_data.area);
                        if (typeof (second_data.last_category) != 'undefined') {
                            $("#category").val(second_data.last_category.category_id);
                        }
                        $("#tag_ids").val(second_data.tag_ids);
                        $("#quality").val(second_data.quality);
                    } else if (data.error_code == 99) {
                        $("#submits").after('<input class="white-btn" type="button" value="保存" id="save"/>');
                    }
                },
                error: function (data) {

                }
            });
        },
        keyPress: function () {
            if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
                if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
                    event.returnValue = false;
        },

        getRelatedLink: function(){
            var _self = this;
            var related_link = $('#related_link');
            // 购买链接
            $('form').on('click', '#related_link' ,function(){
                $("#error_buy_link").addClass('rel-hide');
                $.ajax({
                    type: "post",
                    url: "/create/get_product_info",
                    data: {"buy_link": $('#buy_link').val()},
                    dataType: "json",
                    beforeSend: function () {
                        // console.log('start loading....')
                        related_link.text('获取中...');
                        if($('.load_gif').length == 0) {
                            var str_Html = '<li class="load_gif"><span class="middle"></span><img src="http://2.smzdm.com/resources/img/loading_circle.gif" title="loading" />' +
                                '</li>';
                            $("#actual_ul").append(str_Html);
                        }
                    },
                    success: function (data) {
                        if (data.error_code == 0) {
                            var second_data = data.error_data;
                            $('#title').val(second_data.title);
                            $('.pro-describe textarea').val(second_data.product_desc);
                            if (second_data.order_price != 0) {
                                $('#order_price').val(second_data.order_price);
                            }
                            if (second_data.second_price != 0) {
                                $('#second_price').val(second_data.second_price);
                            }
                            if (second_data.region != '') {
                                $('.choose-place .place-text').text(second_data.region);
                            }
                            if (second_data.last_category.title != '') {
                                $("#choose_category").html(second_data.last_category.title);
                            }

                            if (second_data.buy_link != '') {
                                $("#buy_link").val(second_data.buy_link);
                            }

                            // 关联了百科
                            if ($("#wiki_hash_id").val() != '') {
                                // 关联百科框消失
                                $("#related").addClass('rel-hide');
                                // 分类框展示
                                $("#category_div").show();
                            }
                            related_link.text('获取');
                            /* ------------------ 隐藏数据 ------------------- */
                            // 关联百科设置为空
                            $("#wiki_hash_id").val('');
                            // 地区ID
                            if (second_data.area) {
                                $("#area").val(second_data.area);
                            }
                            // 底层分类ID
                            if (second_data.last_category.category_id != 0) {
                                $("#category").val(second_data.last_category.category_id);
                            }

                            // 记录调用接口时的标题名
                            $("#origin_use_title").val($('#title').val());
                            // 记录下接口返回的分类
                            $("#origin_use_category").val(second_data.last_category.category_id);

                            var pic_id = second_data.pic_id;
                            $.ajax({
                                type: "post",
                                url: "/create/upload_img",
                                data: {"pic_id": pic_id},
                                dataType: "json",
                                success: function (data2) {
                                    var img_second_data = data2.error_data;
                                    if (img_second_data.attach_type_2 != '') {
                                        // 实拍图片
                                        var html = '';
                                        $("#actual_ul").html(''); // 初始化
                                        $(".shot-img span.upload-img").show();
                                        for (var x in img_second_data.attach_type_2) {
                                            html += '<li>';
                                            html += '<span class="mask">设为头图</span><span class="middle"></span><img src="' + img_second_data.attach_type_2[x].show_url + '" title="" /><i>x</i>';
                                            html += '<input type="hidden" name="actual_pic_url[]" value="' + img_second_data.attach_type_2[x].pic_url + '">';
                                            html += '<input type="hidden" name="actual_pic_w_h[]" value="' + img_second_data.attach_type_2[x].width + ',' + img_second_data.attach_type_2[x].height + '">';
                                            html += '</li>';
                                        }
                                        $("#actual_ul").append(html);

                                        // 上传完以后在判断 超过5张 隐藏上传
                                        if ($("#actual_ul li").length >= 5) {
                                            $(".shot-img span.upload-img").hide();
                                        }
                                        // 设置头图
                                        if ($("#actual_ul li").length >= 1) {
                                            // 是否含有头图
                                            if ($("#actual_ul li .focus-map").length <= 0) {
                                                // 设置头图
                                                $("#actual_ul li").eq(0).prepend("<span class='focus-map'>头图</span>");
                                                // 设置焦点图
                                                $("#focus_pic_url").val($("#actual_ul li").eq(0).find("input[name='actual_pic_url[]']").val());
                                                $("#focus_pic_url_w_h").val($("#actual_ul li").eq(0).find("input[name='actual_pic_w_h[]']").val());
                                            }
                                        }
                                    }

                                }
                            });

                        } else {
                            // 未登录
                            $("#error_buy_link").removeClass('rel-hide');
                            $("#error_buy_link").text(data.error_msg);
                        }
                    },

                    error: function(){
                        related_link.text('获取');
                    }
                });
            })
        },
        category2_intelligent_completion : function () {
            // 如果关联了百科则不用智能获取分类
            if (!$("#wiki_hash_id").val()) {
                // 根据标题智能获取分类
                $.ajax({
                    type: "post",
                    url: "/create/category2_intelligent_completion",
                    data: {"title": $('#title').val()},
                    dataType: "json",
                    success: function (second_data) {
                        if (second_data.last_category.title != '') {
                            $("#choose_category").html(second_data.last_category.title);
                        }
                        // 底层分类ID
                        if (second_data.last_category.category_id != 'undefined') {
                            $("#category").val(second_data.last_category.category_id);
                            // 记录下接口返回的分类
                            $("#origin_use_category").val(second_data.last_category.category_id);
                        }
                        // 记录调用接口时的标题名
                        $("#origin_use_title").val($('#title').val());
                    }
                });
            }
        },
        isUrl: function (s) {
            s = $.trim(s);
            var strRegex = '^((https|http)?://)'
                + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                + '|' // 允许IP和DOMAIN（域名）
                + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
                + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                + '[a-z]{2,6})' // first level domain- .com or .museum
                + '(:[0-9]{1,4})?' // 端口- :80
                + '((\/\?)|' // a slash isn't required if there is no file name
                + '(\/[0-9a-zA-Z_!~\'\.;\?:@&=\+\$,%#-\/^\*\|]*)?)$';
            var re = new RegExp(strRegex);
            // console.log(re.test(s));
            return re.test(s);
        }

    };
    window.Release = Release;
    Release.init();

    /*------------ by caoxudong@smzdm.com 2016.5.31 ----------*/
    // 移动出售链接到首行之后的逻辑
    /**
     * @logic_1: 默认进入页面时,联系方式和出售链接为空,联系方式旁边有小红点必填标志
     * @logic_2: 当填写完毕出售链接之后,联系方式的必填标志消失
     * @logic_3: 当点击提交按钮时,检测到出售链接和联系方式均未填写,则显示提示文字
     */
        //@logic_1/logic_2
    $('#buy_link').blur(function(){
        // 若不为空则去掉星号
        if($.trim($(this).val()) !== ''){
            $('.concat-method').parent().find('.label').find('i').remove();
        }else{
            // 若为空则加上星号(如果星号不存在的话)
            if($('.concat-method').parent().find('.label').find('i').length == 0){
                $('.concat-method').parent().find('.label').prepend('<i>*</i>')
            }
        }
    });


});