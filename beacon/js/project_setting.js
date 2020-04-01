

$(document).ready(function () {

})
$(document).on('click', '#tag_img', function () {
    $(this).parent().remove();
});

$(document).ready(function () {

    $('.detail_body_member_person').click(function () {
        $('.wd-beacon').hide();
        $('.wd-stand-chengkai').hide();
        $('.dele_task').hide();
        $('.wd_add_task').hide();
        $('.detail_body_info_end').hide();
        $('.detail_member_body').show();
        $('.detail_member').hide();
        $('.detail_setting_body').hide();
        $('.wd_f_task').hide();
        $('.task-pinglun').hide();
        $('.detail_body_info_red').hide();
        $('.detail_body_member_person').css('color', 'black');
        $('.detail_body_member_person').css('fontWeight', 'bold');
        $('.detail_body_member_number').css('color', 'black');
        $('.detail_body_member_number').css('fontWeight', 'bold');
        $('.detail_body_Setting_set').css('color', '#aeaaaa');

        $('.detail_setting_png').css('opacity', '0.5');
        $('.detail_setting_png').css('filter', 'brightness(20%)');
        $('.detail_href').css('color', '#aeaaaa');
    })
})
$(document).ready(function () {
    $('.detail_body_member').click(function () {
        setTimeout(function () {
            $('.detail_member_body').html('')
        })

        setTimeout(function () {
            $('.load-view').remove();
            memberpeo()
        }, 400)
    })
    $('.detail_body_Setting').click(function () {
        setTimeout(function () {
            $('.detail_setting_body').html('')
        })

        setTimeout(function () {
            $('.load-view').remove();
            set()
        }, 200)

    })
})
function bodybox(){
    $('.detail_body_box').hide();
}
function bodybqx(){
    $('.detail_body_box').show();
}
function mmmm(){
    bodybox()
        setTimeout(function () {
            
            $('.detail_member_body').html('')
            loading.showLoading({
                type: 3,
                tip: '正在加载',
            })
            $('.load-view').css('top', '-273px');
        })

        setTimeout(function () {
            
            $('.load-view').remove();
            memberpeo()
            bodybqx()
        }, 200)
       
}
function setssss(){
    bodybox()
        setTimeout(function () {
            $('.detail_setting_body').html('')
            loading.showLoading({
                type: 3,
                tip: '正在加载',
            })
            $('.load-view').css('top', '-273px');
        })

        setTimeout(function () {
            $('.load-view').remove();
            set()
            bodybqx()
        }, 200)
}

$(document).ready(function () {
    $('.detail_body_Setting').click(function () {
        $('.wd-beacon').hide();
        $('.wd-stand-chengkai').hide();
        $('.dele_task').hide();
        $('.detail_body_info_end').hide();
        $('.wd_add_task').hide();
        $('.detail_member').hide();
        $('.detail_member_body').hide();
        $('.wd_f_task').hide();
        $('.detail_body_info_red').hide();
        $('.detail_setting_body').show();
        $('.task-pinglun').hide();
        $('.detail_setting_png').css('opacity', '0.9');
        $('.detail_setting_png').css('filter', 'brightness(20%)');
        $('.detail_body_Setting_set').css('color', 'black');
        $('.detail_body_Setting_set').css('fontWeight', 'bold');
        $('.detail_body_member_person').css('color', '#aeaaaa');
        $('.detail_body_member_number').css('color', '#aeaaaa');
        $('.detail_href').css('color', '#aeaaaa');
        // layer.tips('点击添加自定义标签', '#wd_project_add_ttag');
    })
})
function xiugaimmb() {
    $('.wd_save_click').click(function () {
        setTimeout(function () {
            $('.detail_member_body').html('')
            loading.showLoading({
                type: 1,
                tip: '正在加载',
            })
            $('.load-view').css('top', '-273px');
        })

        setTimeout(function () {
            $('.load-view').remove();
            set()
        }, 200)

    })
}
function chakanrizhi() {
    $('.wd_set_chance').click(function () {
        setTimeout(function () {
            $('.detail_setting_body').html('')
            loading.showLoading({
                type: 1,
                tip: '正在加载',
            })
            $('.load-view').css('top', '-273px');
        })

        setTimeout(function () {
            $('.load-view').remove();
            memberpeo()
        }, 500)

    })
}
function shezhi() {
    $('.wd-beacon').hide();
    $('.wd-stand-chengkai').hide();
    $('.dele_task').hide();
    $('.detail_body_info_end').hide();
    $('.wd_add_task').hide();
    $('.detail_member').hide();
    $('.detail_member_body').hide();
    $('.wd_f_task').hide();
    $('.detail_body_info_red').hide();
    $('.detail_setting_body').show();
    $('.task-pinglun').hide();
    $('.detail_setting_png').css('opacity', '0.9');
    $('.detail_setting_png').css('filter', 'brightness(20%)');
    $('.detail_body_Setting_set').css('color', 'black');
    $('.detail_body_Setting_set').css('fontWeight', 'bold');
    $('.detail_body_member_person').css('color', '#aeaaaa');
    $('.detail_body_member_number').css('color', '#aeaaaa');
    $('.detail_href').css('color', '#aeaaaa');
    layer.tips('点击添加自定义标签', '#wd_project_add_ttag');
}
$(document).ready(function () {

    memberdiv()
    setdiv()
    $('.detail_body_member').click(function () {
        $('.detail_body_info_end').hide();
        $('.detail_member_body').show();
        $('.detail_member').hide();
        $('.detail_setting_body').hide()
        $('.detail_body_member_person').css('color', 'black');
        $('.detail_body_member_person').css('fontWeight', 'bold');
        $('.detail_body_member_number').css('color', 'black');
        $('.detail_body_member_number').css('fontWeight', 'bold');
        $('.detail_body_Setting_set').css('color', '#aeaaaa');
        // $('.detail_href').css('color', '#aeaaaa');
        $('.detail_setting_png').css('opacity', '0.5');
        $('.detail_setting_png').css('filter', 'brightness(20%)');
        mmbnamediv()
    })
    $('.detail_href').click(function () {
        $('.details_tttt').show();
        $('.detail_member').show();
        $('.wd-beacon').show();
        $('.detail_member_body').hide();
        $('.detail_setting_body').hide();
        $('.detail_setting_png').css('opacity', '0.5');
        $('.detail_setting_png').css('filter', 'brightness(20%)');
        $('.detail_body_Setting_set').css('color', '#aeaaaa');
        $('.detail_body_member_person').css('color', '#aeaaaa');
        $('.detail_body_member_number').css('color', '#aeaaaa');
        $('.detail_href').css('color', 'black');
        $('.detail_href').css('fontWeight', 'bold');
        $('#detail_list').show();
        $('.wd-stand-chengkai').show();
        tasknamediv()
    })
    $('.detail_body_Setting').click(function(){
        setnamediv()
    })
    // $('.detail_set_reset').click(function () {
    //     $('.detail_member').show();
    //     $('.wd-beacon').show();
    //     $('.detail_member_body').hide();
    //     $('.detail_setting_body').hide();
    //     $('.detail_setting_png').css('opacity', '0.5');
    //     $('.detail_setting_png').css('filter', 'brightness(20%)');
    //     $('.detail_body_Setting_set').css('color', '#aeaaaa');
    //     $('.detail_body_member_person').css('color', '#aeaaaa');
    //     $('.detail_body_member_number').css('color', '#aeaaaa');
    //     $('.detail_href').css('color', 'black');
    //     $('.detail_href').css('fontWeight', 'bold');
    //     $('#detail_list').show();
    //     $('.wd-stand-chengkai').show();
    // })
})



function taskcorlr(){
    memberdiv()
    setdiv()
    $(".detail_href").hover(function(){
        $(".detail_href").css("color","black");
        },function(){
        $(".detail_href").css("color","black");
      });
}
function usercorlr(){
    setdiv()
    taskdiv()

    $(".detail_body_member").hover(function(){
        $(".detail_body_member span div").css("color","black");
        },function(){
        $(".detail_body_member span div").css("color","black");
      });
}
function setcorlr(){
    taskdiv()
    memberdiv()

    
    $(".detail_body_Setting").hover(function(){
        $(".detail_body_Setting span div").css("color","black");
        $('.detail_setting_png').css('filter','brightness(20%)')
        $('.detail_setting_png').css('opacity','1')
        },function(){
        $(".detail_body_Setting span div").css("color","black");
        $('.detail_setting_png').css('filter','brightness(20%)')
        $('.detail_setting_png').css('opacity','1')
      });
}
function taskdiv(){
    $(".detail_href").hover(function(){
        $(".detail_href").css("color","#339966");
        },function(){
        $(".detail_href").css("color","#aeaaaa");
      });
}
function memberdiv(){
    $(".detail_body_member").hover(function(){
        $(".detail_body_member span div").css("color","#339966");
        },function(){
        $(".detail_body_member span div").css("color","#aeaaaa");
      });
}
function setdiv(){
    $(".detail_body_Setting").hover(function(){
        $(".detail_body_Setting span div").css("color","#339966");
        $('.detail_setting_png').css('filter','brightness(100%)')
        $('.detail_setting_png').css('opacity','1')
        },function(){
        $(".detail_body_Setting span div").css("color","#aeaaaa");
        $('.detail_setting_png').css('filter','brightness(20%)')
        $('.detail_setting_png').css('opacity','0.5')
      });
      
}
function returnff(){

    $('.detail_href').css('color', 'black');
    $('.detail_href').css('fontWeight', 'bold');
    $('.details_tttt').show();
    $('.detail_member').show();
    $('.wd-beacon').show();
    $('.detail_member_body').hide();
    $('.detail_setting_body').hide();
    $('.detail_setting_png').css('opacity', '0.5');
    $('.detail_setting_png').css('filter', 'brightness(20%)');
    $('.detail_body_Setting_set').css('color', '#aeaaaa');
    $('.detail_body_member_person').css('color', '#aeaaaa');
    $('.detail_body_member_number').css('color', '#aeaaaa');
   
    $('#detail_list').show();
    $('.wd-stand-chengkai').show();
}
function tasknamediv(){
    $(".detail_href").hover(function(){
        $(".detail_href").css("color","black");
        },function(){
        $(".detail_href").css("color","black");
      });
    memberdiv()
    setdiv()
    $('.detail_href').css('color', 'black');
    $('.detail_href').css('font-weight', 'bold')
}
function mmbnamediv(){
    setdiv()
    taskdiv()
    $(".detail_body_member").hover(function(){
        $(".detail_body_member span div").css("color","black");
        },function(){
        $(".detail_body_member span div").css("color","black");
      });
}
function setnamediv(){
    taskdiv()
    memberdiv()

    $(".detail_body_Setting").hover(function(){
        $(".detail_body_Setting span div").css("color","black");
        $('.detail_setting_png').css('filter','brightness(20%)')
        $('.detail_setting_png').css('opacity','1')
        },function(){
        $(".detail_body_Setting span div").css("color","black");
        $('.detail_setting_png').css('filter','brightness(20%)')
        $('.detail_setting_png').css('opacity','1')
      });
}