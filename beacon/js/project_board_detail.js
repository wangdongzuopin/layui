// 对任务清单的循环
function beacon(wd_task, allper, adduserMo, alltag, gid) {

    let href = window.location.href;
    let text = href.split('&')[1];

    if (text == undefined) {
        // console.log('目前为未定义')
    } else {
        beacon_task_find(text, allper, adduserMo, alltag)
        // console.log('目前为定义')
    }

    // 筛选任务
    c_sc_task(adduserMo)
    c_sc_tag(alltag)
    for (var i = 0; i < wd_task.length; i++) {
        var wd_Id = wd_task[i].Id;
        var project_task = wd_task[i].Task;

        var wd_name = decodeURIComponent(wd_task[i].Name.replace(/\+/g, '%20'));
        let Serial = wd_task[i].Serial;

        q_addqing(wd_Id, wd_name, Serial, project_task, allper, adduserMo, alltag, gid)
    }
}
// 添加清单
function q_addqing(wd_Id, wd_name, Serial, project_task, allper, adduserMo, alltag, gid) {

    $('.wd-stand-qingdan').append('<div id="stand_wd_qingdan' + wd_Id + '" class="wd_qigndan">' +
        '<div id="stand_wd_qingdan_first' + wd_Id + '" class="stand_wd_qingdan_first">' +
        '<div class="d_p_qingmoyi">' +

        '<div id="d_p_qing_two' + wd_Id + '" style="display:none;" class="d_p_qing_two">' +
        '<div style="margin-left: 10px;"><img onclick="d_p_delect(\'' + wd_Id + '\')" id="" src="/img/box.png" alt="" title="删除任务清单"></div>' +
        '<div style="margin-left:13px;" id="d_p_task_class' + wd_Id + '"><img onclick="d_p_motitask_class(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')" src="/img/pen.png" alt="" title="修改任务清单"></div>' +
        '</div>' +

        '</div>' +
        '<div class="s_stand_qingdan"><input class="stand_qingdan_id" type="hidden" value="' + wd_Id + '">' + '<div id="d_p_name_class' + wd_Id + '">' + wd_name + '</div>' + '</div>' +
        '<input type="hidden" class="d_details_serial" name="serial" value="' + Serial + '">' +
        '<div class="nt_wd_stand_add" id="nt_wd_stand_add' + wd_Id + '"><span  onclick="nt_add_show(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')">' + '在' + '<label id="nt_add_show_classname' + wd_Id + '">' + wd_name + '</label>下添加任务</span></div>' +
        '</div>' +
        '<div id="nt_wd_stand_moqing_li' + wd_Id + '" style="display: block;width: 95%;margin: 0 auto;"></div>' +
        '<div id="nt_wd_stand_add_list' + wd_Id + '" style="display: block;width: 82%;margin: 0 auto;"></div>' +
        '<div class="wd-stand-task" id="wd_stand_task' + wd_Id + '"></div>' +
        '<div style="display: inline-block;width: 100%;" id="wd_complet_stand' + wd_Id + '"></div>' +
        '</div>')
    // 修改清单
    nt_mo_qingtask(wd_Id, wd_name, Serial)
    // 添加任务
    nt_wd_addtask(wd_Id, alltag, wd_name, Serial)
    beacon_fifnsi(gid, allper, adduserMo, alltag, gid, wd_Id)
    if (project_task != null) {
        beacon_task(wd_Id, project_task, allper, adduserMo, alltag)
    } else {
        $('#wd_stand_task' + wd_Id).html('<div id="wd-stand-divdiv' + wd_Id + '" class="wd_stand_divdiv" style="width: 100%;margin: 0 auto;text-align: center;font-size: 12px;">暂时没有更多任务</div>')
    }

    $('#stand_wd_qingdan_first' + wd_Id).mouseover(function () {
        $('#d_p_qing_two' + wd_Id).show();
    })
    $('#stand_wd_qingdan_first' + wd_Id).mouseleave(function () {
        $('#d_p_qing_two' + wd_Id).hide();
    })
    // 筛选任务清单
    add_class_screen(wd_Id,wd_name)

}
// 筛选任务清单
function  add_class_screen(wd_Id,wd_name){
    let add = '<div><input class="s_sc_class_input" id="s_sc_class'+wd_Id+'" type="checkbox" value="'+wd_Id+'">'+
    '<input type="hidden" value="" class="s_sc_class">'+
    '<span class="s_sc_class_span" id="s_sc_class_sp'+wd_Id+'">√</span>'+
    '<label id="s_sr_lbl'+wd_Id+'" for="s_sc_class'+wd_Id+'" value="">'+wd_name+'</li></label>'+
    '</div>'

    $('#c_sc_t_class').append(add)

    $('#s_sr_lbl'+wd_Id).click(function(){
        if($("#s_sc_class"+wd_Id).is(':checked')){
            $('#s_sc_class_sp'+wd_Id).fadeOut()
            $("#s_sc_class"+wd_Id).next('input').val('0')
            $('#s_sr_lbl'+wd_Id).parent().css({
                'color':'rgb(85, 85, 85)'
            })
            $('#c_rc_em'+wd_Id).remove()
            if($('.c_sc_classname').html() == ''){
                $('.c_sc_classname').html('<label for="">任务清单</label>')
            }
        }else{
            $('#s_sc_class_sp'+wd_Id).fadeIn()
            $("#s_sc_class"+wd_Id).next('input').val('1')
            $('#s_sr_lbl'+wd_Id).parent().css({
                'color':'#339966'
            })
            $('.c_sc_classname label').remove()
            $('.c_sc_classname').append('<em id="c_rc_em'+wd_Id+'" value="'+wd_Id+'" style="display:inline-black;">'+wd_name+'</em>')
        }
    })
    $(document).bind("click", function (e) {
        if ($(e.target).closest(".c_sc_class_div").length > 0) {
            // $("#index_1_11").show();
        } else {
            c_sc_class_return()
        }
    })
    $("#c_sc_t_class").click(function (event) {
        event.stopPropagation();
    });
}
//筛选任务
function c_sc_task(adduserMo){
    for(j = 0;j<adduserMo.length;j++){
        let user_id = adduserMo[j].split(',')[0]
        let user_name = adduserMo[j].split(',')[1]
        let add = '<div><input class="s_sc_task_input" id="s_sc_task'+user_id+'" type="checkbox" value="'+user_id+'">'+
    '<input type="hidden" value="" class="s_sc_task">'+
    '<span class="s_sc_task_span" id="s_sc_task_sp'+user_id+'">√</span>'+
    '<label id="s_sr_lbl'+user_id+'" for="s_sc_task'+user_id+'" value="">'+user_name+'</li></label>'+
    '</div>'

    $('#c_sc_t_task').append(add)

    $('#s_sr_lbl'+user_id).click(function(){
        if($("#s_sc_task"+user_id).is(':checked')){
            $('#s_sc_task_sp'+user_id).fadeOut()
            $("#s_sc_task"+user_id).next('input').val('0')
            $('#s_sr_lbl'+user_id).parent().css({
                'color':'rgb(85, 85, 85)'
            })
            $('#c_rc_em'+user_id).remove()
            if($('.c_sc_taskname').html() == ''){
                $('.c_sc_taskname').html('<label for="">任务负责人</label>')
            }
        }else{
            $('#s_sc_task_sp'+user_id).fadeIn()
            $("#s_sc_task"+user_id).next('input').val('1')
            $('#s_sr_lbl'+user_id).parent().css({
                'color':'#339966'
            })
            $('.c_sc_taskname label').remove()
            $('.c_sc_taskname').append('<em id="c_rc_em'+user_id+'" value="'+user_id+'" style="display:inline-black;">'+user_name+'</em>')
        }
    })
        $(document).bind("click", function (e) {
            if ($(e.target).closest(".c_sc_task_div").length > 0) {
                // $("#index_1_11").show();
            } else {
                c_sc_task_return()
            }
        })
        $("#c_sc_t_task").click(function (event) {
            event.stopPropagation();
        });
    }
}
//筛选标签
function c_sc_tag(alltag){
    for(j = 0;j<alltag.length;j++){
        let tag = alltag[j]
        let id ='tag'+ j 
        let add = '<div><input class="s_sc_tag_input" id="s_sc_tag'+id+'" type="checkbox" value="'+tag+'">'+
    '<input type="hidden" value="" class="s_sc_tag">'+
    '<span class="s_sc_tag_span" id="s_sc_tag_sp'+id+'">√</span>'+
    '<label id="s_sr_lbl'+id+'" for="s_sc_tag'+id+'" value="">'+htmlspecialchars(tag)+'</label>'+
    '</div>'

    $('#c_sc_t_tag').append(add)

    $('#s_sr_lbl'+id).click(function(){
        if($("#s_sc_tag"+id).is(':checked')){
            $('#s_sc_tag_sp'+id).fadeOut();
            $("#s_sc_tag"+id).next('input[type="hidden"]').val('0')
            $('#s_sr_lbl'+id).parent().css({
                'color':'rgb(85, 85, 85)'
            })
            $('#c_rc_em'+id).remove()
            if($('.c_sc_tagname').html() == ''){
                $('.c_sc_tagname').html('<label for="">任务标签</label>')
            }
        }else{
            $('#s_sc_tag_sp'+id).fadeIn()
            $("#s_sc_tag"+id).next('input[type="hidden"]').val('1')
            $('#s_sr_lbl'+id).parent().css({
                'color':'#339966'
            })
            $('.c_sc_tagname label').remove()
            $('.c_sc_tagname').append('<em id="c_rc_em'+id+'" value="'+htmlspecialchars(tag)+'" style="display:inline-black;">'+htmlspecialchars(tag)+'</em>')
        }
    })
        $(document).bind("click", function (e) {
            if ($(e.target).closest(".c_sc_tag_div").length > 0) {
                // $("#index_1_11").show();
            } else {
                c_sc_tag_return()
            }
        })
        $("#c_sc_t_tag").click(function (event) {
            event.stopPropagation();
        });
    }
}
// 删除任务清单时删除筛选
function use_class_screen(wd_Id){
   $('#add_class_opt'+wd_Id).remove();
   $('.wd_qigndan').fadeIn()
   $('.wd_qigndan .stand_qingdan_id').parents('.wd_qigndan').attr('class','wd_qigndan')
}
function mo_class_screen(wd_Id,wd_name){
    $('#add_class_opt'+wd_Id).html(wd_name);
 }
// 修改任务清单
function d_p_motitask_class(wd_Id, wd_name, Serial) {
    $('#nt_taskclass_form' + wd_Id).slideDown()
    $('#d_p_task_class' + wd_Id).html('<img onclick="d_p_motitask_class_return(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')" src="/img/pen.png" alt="" title="修改任务清单">')
    $('#d_p_task_class' + wd_Id + ' img').css({
        'filter': 'brightness(20%)'
    })
    nt_add_slideup(wd_Id, wd_name, Serial)
}
function d_p_motitask_class_return(wd_Id, wd_name, Serial) {
    $('#nt_taskclass_form' + wd_Id).slideUp()
    $('#d_p_task_class' + wd_Id).html('<img onclick="d_p_motitask_class(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')" src="/img/pen.png" alt="" title="修改任务清单">')
    $('#d_p_task_class' + wd_Id + ' img').css({
        'filter': 'brightness(100%)'
    })
}
function d_p_task_class_reset(wd_Id, wd_name, Serial) {
    d_p_motitask_class_return(wd_Id, wd_name, Serial)
}
function nt_mo_qingtask(wd_Id, wd_name, Serial) {
    let add = '<form style="display:none;" id="nt_taskclass_form' + wd_Id + '"  onsubmit="return false" method="post">' +
        '<div class="nt_mo_qingdan">' +
        '<div><input type="hidden" name="id" value="' + wd_Id + '"></div>' +
        '<div><input type="hidden" name="serial" value="' + Serial + '"></div>' +
        '<div class="nt_mo"><input type="text" id="nt_task_class_name' + wd_Id + '" value="' + wd_name + '" style="width: 80%;height: 22px;" placeholder="输入清单名称" name="name"></div>' +
        '<div class="nt_mo_submit">' +
        '<input type="submit" onclick="task_class_save(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')" value="保存清单">' +
        '<input type="reset" onclick="d_p_task_class_reset(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')" value="取消" name="" >' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#nt_wd_stand_moqing_li' + wd_Id).html(add)
}
function nt_wd_addtask(wd_Id, alltag, wd_name, Serial) {
    let add = '<form id="nt_addtask_form' + wd_Id + '" onsubmit="return false" method="post"><div id="wd_add_task' + wd_Id + '" class="wd_add_task">' +
        '<div class="wd_add_task_alls">' +
        '<div class="wd_tcid_task">' +
        '<input type="hidden" name="tcid" value="' + wd_Id + '">' +
        '</div>' +
        '<div class="wd_head_task">' +
        '<span class="wd_opt_data_per" id="opt_wd"><img style="cursor: default;"src="/img/img/u105.png"></span>' +
        '<select class="wd_opt_data" id="wd_opt_data' + wd_Id + '" name="head_user_id">' +
        '<option class="" selected="selected" disabled="true" style="font-size: 15px;">请选择负责人</option>' +
        '</select>' +
        '</div>' +
        '<div class="wd_name_task">' +
        '<span><img src="/img/taskname.png" style="width: 19px;cursor: default;" alt=""></span>' +
        '<input id="wd_name_task_input' + wd_Id + '" class="wd_name_task_input" type="text" name="name"' +
        'style="border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;"' +
        'placeholder="任务名称...  示例：! #自定义标签# #自定义标签# 任务名称" autocomplete="off">' +
        '</div>' +
        '<div class="wd_expect_task">' +
        '<span><img src="/img/rili.png" style="cursor: default;"></span>' +
        '<input class="wd_expect_data" id="wd_expect_data' + wd_Id + '" type="text" name="expect_end_time" id="c1"' +
        'autocomplete="off" placeholder="预计完成时间..." value=""' +
        'style="border: 0;border-bottom: 1px dashed gainsboro;width: 158px;">' +
        '</div>' +
        '<div class="wd_tag_task">' +
        '<span class="task_demo_img">' +
        '<img src="/img/five.png" style="cursor: default;">' +
        '</span>' +

        '<div class="mutiSelect" style="margin-left: 18px;">' +
        '<ul class="wd_stand_add_tasktag" id="wd_stand_add_tasktag' + wd_Id + '">' +
        '</ul>' +
        '</div>' +

        '</div>' +
        '<div class="wd_note_task">' +
        '<span style="position: relative;top: -45px;"><img src="/img/img/u118.png"' +
        'style="cursor: default;"></span>' +
        '<textarea id="wd_textarea_val' + wd_Id + '" type="text" name="note" placeholder="任务描述" autocomplete="off" style="width: 82%;resize: none;margin-left: 10px;font-size: 12px;height: 60px;"></textarea>' +
        '</div>' +
        '<div id="wd_submit_task' + wd_Id + '" onclick="nt_submit_rest(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')" class="wd_submit_task">' +
        '<input class="wd_submit_add" type="submit" onclick="addtask(\'' + wd_Id + '\')" value="创建任务">' +
        '<input type="reset" class="wd_submit_reset" value="取消">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#nt_wd_stand_add_list' + wd_Id).html(add)

    laydate.render({
        elem: '#wd_expect_data' + wd_Id
    });
    nt_wd_stand_add(wd_Id, alltag, adduserMo)

}
function nt_add_show(wd_Id, wd_name, Serial) {
    $('#wd_add_task' + wd_Id).slideDown()
    $('#nt_wd_stand_add' + wd_Id).html('<span  onclick="nt_add_slideup(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')">' + '在' + '<label id="nt_add_show_classname' + wd_Id + '">' + wd_name + '</label>下添加任务</span>').css({
        'color': '#339966'
    })
    d_p_motitask_class_return(wd_Id, wd_name, Serial)
}
function nt_add_slideup(wd_Id, wd_name, Serial) {
    $('#wd_add_task' + wd_Id).slideUp()
    $('#nt_wd_stand_add' + wd_Id).html('<span  onclick="nt_add_show(\'' + wd_Id + "','" + wd_name + "','" + Serial + '\')">' + '在' + '<label id="nt_add_show_classname' + wd_Id + '">' + wd_name + '</label>下添加任务</span>').css({
        'color': 'rgb(85, 85, 85)'
    })
}
function nt_submit_rest(wd_Id, wd_name, Serial) {
    nt_add_slideup(wd_Id, wd_name, Serial)
}
function beacon_task(wd_Id, project_task, allper, adduserMo, alltag) { //任务循环
    sorting(project_task)
    for (var i = 0; i < project_task.length; i++) {
        var beacon_task_list = project_task[i];
        let wd = wd_Id + i;
        beacon_list(wd_Id, beacon_task_list, wd, allper, adduserMo, alltag)

        var objdetails = $('#wd-details-five-state' + wd);
        if (!$.trim(objdetails.html())) {
            $('#wd-details-fivediv' + wd).hide();
        } else {
            $('#wd-details-fivediv' + wd).show();
        }
    }
}

function beacon_list(wd_Id, beacon_task_list, i, allper, adduserMo, alltag) {

    var beacon_id = beacon_task_list.Id; //任务ID
    var beacon_Head_user_id = beacon_task_list.Head_user_id; //用户ID
    var beacon_Name = beacon_task_list.Name.replace(/\+/g, '%20'); //任务名称
    var beacon_Note = decodeURIComponent(beacon_task_list.Note.replace(/\+/g, '%20')); //任务备注
    var beacon_State = beacon_task_list.State.replace(/\+/g, '%20'); //任务状态
    var beacon_add_time = beacon_task_list.Add_time.replace(/\+/g, '%20');
    var beacon_End_time = beacon_task_list.End_time.replace(/\+/g, '%20'); //任务的结束时间
    var beacon_Expect_end_time = beacon_task_list.Expect_end_time.replace(/\+/g, '%20'); // 预计时间
    var beacon_tag = beacon_task_list.Tag.replace(/\+/g, '%20'); //任务标签
    var beacon_sub = beacon_task_list.Sub; //子任务
    var beacon_Log_comment = beacon_task_list.Log_comment;
    var beacon_Log_comment_limit = beacon_task_list.Log_comment_limit;
    var beacon_Log_comment_start = beacon_task_list.Log_comment_start;
    var beacon_Log_comment_total = beacon_task_list.Log_comment_total;
    var beacon_start_time = beacon_task_list.Start_time.replace(/\+/g, '%20');
    // let beacon_Note = beacon_ote.replace(/(\\r\\n)|(\n)/g,'<br>')
    // 显示事件
    wd_show_task(wd_Id, beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, i, allper, alltag, beacon_tag) //添加任务页面
    // 判断任务的状态
    wd_show_tag(beacon_tag, i)
    wd_show_note(beacon_Note, i) //任务备注

    wd_show_head_user(beacon_id, i, allper, beacon_Head_user_id)
    wd_show_shaiuser(wd_Id, adduserMo)
    wd_show_info(beacon_id, beacon_Log_comment, beacon_Log_comment_limit, beacon_Log_comment_start, beacon_Log_comment_total, i)
    stand_task_sub(beacon_sub, i)
    wd_stand_modisty(wd_Id, beacon_tag, alltag, i)
    wd_show_user_Mo(adduserMo, i, beacon_Head_user_id)
    wd_stand_commit(beacon_id, i, beacon_Log_comment)

    // 按照添加时间，一旦任务时间超过三天，则必须有警告标志
    // ShowTime(decodeURIComponent(beacon_add_time))
    wd_stand_add_time(beacon_start_time, i, beacon_Name, beacon_id)

    // 按人员区分
    // distinguish(i,allper,beacon_Head_user_id)
    if (beacon_sub != null) {
        wd_show_sub(beacon_sub, i)
    } else {

    }
    choosetag(alltag, i)
    // 判断完成则执行，不显示修改删除
    addgongogn(i, beacon_id, beacon_Expect_end_time)

}
// 添加公共的
function addgongogn(i, beacon_id, beacon_Expect_end_time) {
    $('.wd-stand-date' + i).append('<input class="wd_stand_exdate" type="hidden" title="' + ShowTime(decodeURIComponent(beacon_Expect_end_time)) + '" value="' + beacon_id + '">')
}

function wd_stand_add_time(beacon_start_time, i, beacon_Name, beacon_id) {
    let time = timeout(decodeURIComponent(beacon_start_time));
    // console.log(time)
    if (time != '0000-00-00') {
        var dd = new Date();
        var y = dd.getFullYear();//获取当前年份的日期
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();//获取当前天数的日期
        let aas = y + "-" + m + "-" + d;
        var days = daybetween(aas, time);
        if (days > '3') {
            let namewidth = $('.wd-stand-task-name' + i).width();
            let namewid = namewidth;
            // $('.wd-stand-task-name'+i).after('<img title="任务已超过三天，尽快处理" style="width: 18px;margin-left: 5px;" src="/img/yanqi.png">')
            $('#wd_stand_wrap' + i).prepend('<div id="wd_stand_yanqi_task' + i + '" style="margin-left: ' + namewid / 4 + 'px;cursor: pointer;" title="此任务已存在超三天" class="wd_stand_yanqi_task">超时</div>')
            $('#wd-stand-sub-add' + i).hide();
            $('#wd-stand-sub-add' + i).after('<div class="wd_stand_gogo" id="wd-stand-gogo' + i + '" style="font-size: 12px;clear: both;padding-top: 10px;width: 48.5%;text-align: center;">已超时，不建议<label class="wd_stand_goon' + i + '" style="cursor: pointer;">添加子任务</label></div>')
            $('.wd_stand_goon' + i).click(function () {
                $('#wd-stand-gogo' + i).hide();
                $('#wd-stand-sub-add' + i).fadeIn();
            })
            cckdetials(i, beacon_id)
            $('#wd-details-sub-add' + i).hide();
            $('#wd-details-sub-add' + i).after('<div class="wd_stand_gogo" id="wd-details-gogo' + i + '" style="font-size: 12px;clear: both;padding-top: 10px;width: 55%;text-align: center;">已超时，不建议<label class="wd_details_goon' + i + '" style="cursor: pointer;">添加子任务</label></div>')
            $('.wd_details_goon' + i).click(function () {
                $('#wd-details-gogo' + i).hide();
                $('#wd-details-sub-add' + i).fadeIn();
            })
        }
    }
}

function norepeat(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}
//任务标签
function wd_show_tag(beacon_tag, i) {
    let stand_tag = decodeURIComponent(beacon_tag)
    let tag = stand_tag.split(',');
    var number = '';
    for (t = 0; t < tag.length; t++) {
        if (tag[t] == '<BUG>') {
            number += '<a class="detail_task_tag" style="background-color:#df7d7d;font-size: 12px;" value="' + htmlspecialchars(tag[t]) + '" title="系统标签">' + htmlspecialchars(tag[t]) + '</a>'
        }
        else if (tag[t] == '<延迟>') {
            number += '<a class="detail_task_tag" style="background-color:#B8860B;font-size: 12px;" value="' + htmlspecialchars(tag[t]) + '" title="系统标签">' + htmlspecialchars(tag[t]) + '</a>'
        }
        else {
            number += '<a class="detail_task_tag" style="font-size: 12px;background-color:rgb(135, 138, 236);" value="' + htmlspecialchars(tag[t]) + '" title="自定义标签">' + tag[t] + '</a>'
        }
    }
    if (beacon_tag != '') {
        $('.wd-stand-task-tag' + i).html(number)
        $('#wd_stand_task_tag_tmp' + i).html(number)
    } else {
        $('.wd-stand-task-tag' + i).html('')
        $('#wd_stand_task_tag_tmp' + i).html('')
    }


    if (beacon_tag != '') {

    } else {

    }
}
// 筛选标签
function choosetag(tag, k) {
    // console.log(tag)
    for (i = 0; i < tag.length; i++) {
        $('#wd_details_opt_tag').append('<option class="chossenewtag' + i + '" value="' + htmlspecialchars(tag[i]) + '">' + htmlspecialchars(tag[i]) + '</option>')
    }

}
// 任务备注
function wd_show_note(beacon_Note, i) {
    if (beacon_Note == '') {
        $('#wd-stand-task-note' + i + '').hide();
    } else {
        $('#wd-stand-task-note' + i + '').show();
    }
}
// 任务指派人
function wd_show_head_user(beacon_id, i, allper, beacon_Head_user_id) {
    //数据存储
    let aee = JSON.parse(localStorage.getItem('userLogin'));
    let ugid = aee.ugid;
    let na = decodeURIComponent(aee.name);
    let nname = na.replace(/\+/g, '')
    let result = nname.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
    for (k = 0; k < allper.length; k++) {
        let all = allper[k].split(',');
        let gid = all[0];
        let name = all[1];
        // 指派人
        if (beacon_Head_user_id == gid) {
            $('.wd-stand-assigned' + i).html('<input id="wd-stand-head_id' + i + '" class="wd-stand-head_id" type="hidden" value="' + beacon_Head_user_id + '">' +
                '<input class="wd_sasdasdasd" type="hidden" value="' + name + '">' +
                '<div id="wd_stand_assname' + i + '" class="wd_stand_assname">' + name + '</div>')
        } else {
            // $('#wd-stand-assigned' + i).html(result)
        }
    }
}
function wd_show_shaiuser(wd_Id, adduserMo) {
    for (q = 0; q < adduserMo.length; q++) {
        let all = adduserMo[q].split(',');
        let gid = all[0];
        let name = all[1];
        let infii = '<option class="wd_detials_mmmmb" title="' + name + '" id="wd_detials_mmb" value="' + gid + '">' + name + '</option>'
        $('#wd_details_allper').append(infii)
    }
}
// 添加已完成代码
function beacon_fifnsi(gid, allper, adduserMo, alltag, gid, wd_Id) {
    var counter = -1; /*计数器*/
    var page = 0; /*offset*/
    var limit = 5; /*size*/

    let fin =
        '<div id="wd_stand_finish" style="clear: both;margin-left: 38px;width: 90%;float: left;">' +
        '<div id="wd_beacon_task_finish" style="display:inline;">' +

        '<div class="wd-beacon-img-fini' + wd_Id + '" style="cursor: pointer;display: inline;">' +
        '<div class="wd_beacoon_task_bottom" style="display: inline;">' +
        '<img src="/img/Task/left.png" title="已完成" style="width: 16px;">' +
        '</div>' +
        '<div style="display: inline;font-size: 12px;cursor: pointer;">' +
        '<label style="cursor: pointer;">已完成</label>' +
        '</div>' +
        '</div>' +

        '<div style="display: inline;">' +
        '<div class="wd-beacon-bottom-fini' + wd_Id + '" style="display: none;cursor: pointer;">' +
        '<div class="wd_beacoon_task_bottom" style="display: inline;">' +
        '<img src="/img/Task/bottom.png" title="已完成" style="width: 16px;">' +
        '</div>' +
        '<div style="display: inline;font-size: 12px;cursor: pointer;">' +
        '<label style="cursor: pointer;">已完成</label>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="wd_add_beaocn_task_fini' + wd_Id + '" style="display: none;">' +

        '</div>' +
        '<div class="wd_add_beaocn_wac' + wd_Id + '" style="margin-left: 20px; display: none;font-size: 12px;width: 100%;cursor: pointer;">' +
        '<div id="wd_add_beacon_fini_news' + wd_Id + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>'



    $('#wd_complet_stand' + wd_Id).append(fin)

    $('.wd-beacon-img-fini' + wd_Id).one('click', function () {
        $('.wd_add_beaocn_task_fini' + wd_Id).slideDown();
        $('.wd_add_beaocn_wac' + wd_Id).css('display', 'inline-block');
        $('.wd-beacon-img-fini' + wd_Id).hide();
        $('.wd-beacon-bottom-fini' + wd_Id).css('display', 'inline');
        beacon_stat_three(gid, counter, allper, adduserMo, alltag, gid, page, limit, wd_Id)
    })
    $('.wd-beacon-img-fini' + wd_Id).click(function () {
        $('.wd_add_beaocn_task_fini' + wd_Id).slideDown();
        $('.wd_add_beaocn_wac' + wd_Id).css('display', 'inline-block');
        $('.wd-beacon-img-fini' + wd_Id).hide();
        $('.wd-beacon-bottom-fini' + wd_Id).css('display', 'inline');
    })
    $('.wd-beacon-bottom-fini' + wd_Id).click(function () {
        $('.wd_add_beaocn_task_fini' + wd_Id).slideUp();
        $('.wd_add_beaocn_wac' + wd_Id).hide();
        $('.wd-beacon-img-fini' + wd_Id).show();
        $('.wd-beacon-bottom-fini' + wd_Id).hide()
    })
    // onclick="finimore(\'' + gid +"','"+counter+ "','" + allper + "','" + adduserMo + "','" + alltag + "','" + gid + "','" + page + "','" + limit + '\')"
    $('#wd_add_beacon_fini_news' + wd_Id).click(function () {
        finimore(wd_Id, gid, counter, allper, adduserMo, alltag, gid, page, limit, wd_Id)
    })

}
function finimore(wd_Id, gid, counter, allper, adduserMo, alltag, gid, page, limit, wd_Id) {
    page++;
    let num = page;
    $.ajax({
        url: "/project/complete_task/" + gid,
        type: 'POST',
        data: '&limit=' + limit + '&page=' + page + '&tcid=' + wd_Id,
        beforeSend: function () {
            $('#wd_add_beacon_fini_news' + wd_Id).html('<div><img style="width: 40px;" src="/img/loadinga.gif"></div>')
        },
        success: function (data) {
            // $('#wd_stand_finish').html('')
            let boj = decodeURIComponent(data.data)

            let obj = JSON.parse(boj.replace(/\+/g, '%20'))
            // for (o = 0; o < obj.length; o++) {
            //   console.log(obj[o])
            let tt = obj.Task;
            if (tt != null) {
                for (a = 0; a < tt.length; a++) {
                    let beacon_task_list = tt[a]
                    beacon_list_wancheng(wd_Id, beacon_task_list, allper, adduserMo, alltag)

                }
                if (tt.length >= 20) {
                    $('.wd_add_beaocn_wac' + wd_Id).html('<div id="wd_add_beacon_fini_news' + wd_Id + '">加载更多</div>')
                    $('#wd_add_beacon_fini_news' + wd_Id).click(function () {
                        finimore(wd_Id, gid, counter, allper, adduserMo, alltag, gid, page, limit, wd_Id)
                    })
                } else {
                    $('#wd_add_beacon_fini_news' + wd_Id).html('没有更多').css('pointer-events', 'none')
                }

            } else {
                $('#wd_add_beacon_fini_news' + wd_Id).html('没有更多').css('pointer-events', 'none')
            }
        },
        error: function (xhr, errorMessage, e) {
            alert(e);
        }

    });
}
function wd_show_user_Mo(adduserMo, i, beacon_Head_user_id) {
    for (k = 0; k < adduserMo.length; k++) {
        let all = adduserMo[k].split(',');
        let gid = all[0];
        let name = all[1];
        // 在修改任务中添加人员
        if (gid == beacon_Head_user_id) {
            $('#wd_Modify_data' + i).append('<option selected="selected" value="' + gid + '">' + name + '</option>')
            $('#wd-stand-details-select' + i).append('<option selected="selected" value="' + gid + '">' + name + '</option>')
        } else {
            $('#wd_Modify_data' + i).append('<option value="' + gid + '">' + name + '</option>')
            $('#wd-stand-details-select' + i).append('<option value="' + gid + '">' + name + '</option>')
        }
    }
}
// 项目下任务添加
function wd_show_task(wd_Id, beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, i, allper, alltag, beacon_tag) {
    let task_stand_black = '<div class="wd_stand_alltask" id="wd-stand-alltask' + i + '" style="float: left;width: 103.2%;margin-left: 10px;">' +
        '<input type="hidden" id="wd_stand_task_hidden' + i + '" class="wd_stand_task_hidden" value="' + beacon_Head_user_id + '">' +
        '<input type="hidden" class="wd_stand_task_hidden_expecttime" value="' + decodeURIComponent(beacon_Expect_end_time) + '">' +
        '<div id="wd_stand_task_tag_tmp' + i + '" style="display:none;" class="wd_stand_task_tag_tmp"></div>' +
        '<div id="wd-stand-task-black' + i + '" class="wd-stand-block">' +
        '<div id="wd_stand_textdor' + i + '" style=" display:none;position: relative;top: 20px;width: 95%;margin: 0 auto;"><hr style="background-color: gray;"></div>' +
        '<input type="hidden" value="' + beacon_id + '">' +
        '<div style="float: left;width:100%;">' +
        // <!-- 包裹修改和删除 修缮-->
        '<div class="wd-stand-repair">' +
        // <!-- 删除 -->
        '<div class="wd-stand-none">' +
        '<div class="wd-stand-boxpen" id="wd-stand-task-boxpen' + i + '" style="display: none;margin-left: 0px;">' +

        '</div>' +
        '</div>' +
        // <!-- 任务 /人物-->
        '<div class="wd-stand-gure">' +
        // <!-- 开始 -->
        '<div class="wd-stand-start" style="float: left;">' +

        '<span class="pause" id="pause' + i + '" onclick="pause(\'' + i + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        // <!-- 完成 -->
        '<div class="wd-stand-ok" style="float: left;">' +
        '<span class="zrw" id="zrw' + i + '" onclick="boxover(\'' + i + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        // <!-- 展开 -->
        '<div id="wd-stand-oclo' + i + '">' +
        '<div id="wd-stand-oppen' + i + '" style="float: left;cursor: pointer;" onclick="">' +
        '<div id="wd-stand-ans' + i + '" style="margin-left: 5px;float: left;width: 16px;text-align: center;">' +
        '<img id="wd-stand-an-open' + i + '" src="/img/+.png" alt="">' +
        '</div>' +
        '<div id="wd-stand-sub_stat' + i + '" style="font-size: 13px;margin-left: 10px;margin: 4px;float: left;cursor: pointer;">' +
        '</div>' +
        '</div>' +

        '<div id="wd-stand-cllose' + i + '" style="float: left;display:none;cursor: pointer;">' +
        '<div style="float: left;margin-left: 7px;width: 14px;">' +
        '<img id="wd-stand-an-clsoe' + i + '" src="/img/-.png" alt="">' +
        '</div>' +
        '<div id="wd-stand-sub_statclose' + i + '" style="font-size: 13px;margin-left: 10px;margin: 4px;float: left;cursor: pointer;">' +
        '</div>' +
        '</div>' +
        // <!-- 完成度 -->

        // '<div id="wd-stand-sub_statclose' + i + '" style="font-size: 13px;margin-left: 10px;margin: 4px;float: left;cursor: pointer;">' +

        // '</div>' +
        '</div>' +
        // <!-- 名称 -->
        // <!-- 这是换行 -->
        '<div class="wd-stand-wrap" id="wd_stand_wrap' + i + '" style="float: left;width: 75%;">' +
        '<div id="wd-stand-task-name&' + beacon_id + '" onclick="standnamehash(\'' + i + "','" + beacon_id + '\');return false;" style="font-size: 12px;margin-left: 5px;cursor: pointer;display:none;border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px solid gainsboro;">' +
        parsing(decodeURIComponent(beacon_Name)) +
        '</div>' +
        '<a href="#wd-stand-task-name&' + beacon_id + '" class="wd-stand-task-name' + i + '" style="font-size: 12px;cursor: pointer;border-top: 0;margin-left: 5px;border-left: 0;border-right: 0;border-bottom: 1px solid gainsboro;">' +
        parsing(decodeURIComponent(beacon_Name)) +
        '</a>' +
        // <!-- 标签 -->
        '<div id="wd-stand-task-tag&' + beacon_id + '" class="wd-stand-task-tag' + i + '" style="display:none;margin-left: 5px;" onclick="standtaghash(\'' + i + "','" + beacon_id + '\')">' +
        // 标签
        '</div>' +
        '<a href="#wd-stand-task-tag&' + beacon_id + '" class="wd-stand-task-tag' + i + ' r_rc_tag" style="margin-left: 5px;">' +
        // 标签
        '</a>' +
        // <!-- 备注 -->
        '<div style="margin-left: 5px;padding-right: 5px;">' +
        '<img id="wd-stand-task-note' + i + '" src="/img/Remarks.png" title="' + decodeURIComponent(beacon_Note) + '">' +
        '</div>' +
        // <!-- 日志与评论 -->
        '<div id="wd-stand-div' + i + '" class="wd-stand-info" style="margin-left: 2px;">' +
        '<img src="/img/info.png" id="wd-stand-info' + i + '" title="日志与评论">' +
        '<label id="wd-stand_info_label' + i + '" style="font-size:8px;color: gray;"></label>' +
        '</div>' +
        // <!-- 日期 -->
        '<div id="wd-stand-date&' + beacon_id + '" class="wd-stand-date" onclick="standtimehash(\'' + i + "','" + beacon_id + '\')" style="margin-left: 5px;cursor: pointer;display:none;font-size: 12px;">' +
        '(' + ShowTime(dateyear(decodeURIComponent(beacon_Expect_end_time))) + ')' +
        '</div>' +
        '<a href="#wd-stand-date&' + beacon_id + '" class="wd-stand-date' + i + '" style="margin-left: 5px;cursor: pointer;font-size: 12px;color:rgb(85, 85, 85)">' +
        '(' + ShowTime(dateyear(decodeURIComponent(beacon_Expect_end_time))) + ')' +
        '</a>' +
        // <!-- 指派人 -->
        '<div id="wd-stand-assigned&' + beacon_id + '" onclick="standpeophash(\'' + i + "','" + beacon_id + '\')" style="margin-left: 10px;cursor: pointer;display:none;font-size: 12px;">' +
        '' +
        '</div>' +
        '<a href="#wd-stand-assigned&' + beacon_id + '" class="wd-stand-assigned' + i + '" style="margin-left: 10px;cursor: pointer;font-size: 12px;">' +
        '' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="wd-stand-suball" id="wd-stand-suball' + i + '" style="float: left;width: 79%;display:none;">'+
        '<div id="wd_stand_suballtask' + i + '"></div>'+
        '<div id="wd_stand_addsub_statefour' + i + '"></div>'+
        '<div id="wd_stand_addsub_statefive' + i + '"></div>'+
        '<div id="wd-stand-addsub' + i + '"></div>'+
    
      
        '</div>'
    $('#wd_stand_task' + wd_Id).prepend(task_stand_black)
    sub_change(i, beacon_id) //添加子任务
    stand_modisty(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, i, alltag, beacon_tag)
    wd_sub_detail(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, i) //详情页加评论
    cckdetials(i, beacon_id)
    task_state(i, beacon_State, beacon_id)
    stand_an(i)
    hashh(i, beacon_id, beacon_State, allper, adduserMo, alltag)
    
    
}
// function subaddstand(i){
//     $('#wd-stand-sub-add'+i).show();
// }
function task_appendto(i) {
    let paren = $('#wd-stand-alltask' + i).parents('.wd_qigndan').children('.wd-stand-task')
    $('#wd-stand-alltask' + i).prependTo(paren).css({
        'margin-left': '10px'
    })
    $('#wd-stand-sub-add' + i).show();
    $('#wd-details-sub-add' + i).show();
    $('#wd-stand-divdiv').hide();
    $('#wd-stand-append' + i).show();

    $('#wd-stand-gogo' + i).hide();
    divshanshan(i)

}
function task_returnto(i) {
    // $('#wd-stand-alltask' + i).appendTo('.wd-stand-task')
    $('#wd-stand-divdiv').hide();
    $('#wd-stand-sub-add' + i).hide();
    $('#wd-details-sub-add' + i).hide();
    $('#wd-stand-append' + i).hide();

    $('#wd-stand-gogo' + i).hide();
    divshanshan(i)
    laydate.render({
        elem: '#wd-stand-sub-append' + i
    });
}
function divshanshan(i) {
    $('#wd-stand-alltask' + i).css('animation', 'fade 600ms infinite')
    setTimeout(function () {
        $('#wd-stand-alltask' + i).css('animation', '')
    }, 1000)
}
// HASH
function hashh(i, beacon_id, beacon_State, allper, adduserMo, alltag) {
    window.onhashchange = Hash(i, beacon_id, beacon_State, allper, adduserMo, alltag);
}
function Hash(i, beacon_id, beacon_State, allper, adduserMo, alltag) {
    var hash = window.location.hash;
    switch (hash) {
        case '#wd-stand-task-name&' + beacon_id:
            standnamehash(i, beacon_id)

            break;
        case '#wd-stand-task-tag&' + beacon_id:
            standtaghash(i, beacon_id)
            break;
        case '#wd-stand-date&' + beacon_id:
            standtimehash(i, beacon_id)
            break;
        case '#wd-stand-assigned&' + beacon_id:
            standpeophash(i, beacon_id)
            break;
        default:
    }
}
// 锚点name
function standnamehash(i, beacon_id) {
    clikon_godetials(i)
}
// 锚点tag
function standtaghash(i, beacon_id) {
    clikon_godetials(i)
}
// 锚点time
function standtimehash(i, beacon_id) {
    clikon_godetials(i)
}
// 锚点people
function standpeophash(i, beacon_id) {
    clikon_godetials(i)
}
function task_state(i, beacon_State, beacon_id) {
    let taskstate = beacon_State;
    if (taskstate == 1) {
        $('#pause' + i).html('<img src="/img/blue_begin.png" alt=""  value="1" onclick="Task_Start(\'' + beacon_id + "','" + i + '\')">')
    } else if (taskstate == 2) {
        $('#pause' + i).html('<img src="/img/red_end.png" alt=""  value="0" onclick="Task_Start(\'' + beacon_id + "','" + i + '\')">')
    }

    if (beacon_State == 1) {
        var pau = '<img src="/img/blue_begin.png" title ="暂停中" value="1">'
    } else if (beacon_State == 2) {
        var pau = '<img src="/img/red_end.png" title ="开始中" value="0">'
    } else {
        var pau = '<img src="/img/kb.png" title ="暂停中" value="11">'
    }
    $('#pause' + i).html(pau)
    $('#details_pause' + i).html(pau)
    $('#details_pause' + i + ' img').css('width', '15px');

    if (beacon_State == 3) {
        var zrw = '<img src="/img/checked.png" title ="已完成" value="1">'
        details_use_hide(i)
        allppox(i)
        hhhh(i)
    } else if (beacon_State == 2 || beacon_State == 1) {
        var zrw = '<img src="/img/uncheck.png" title ="未完成" value="0">'
        ssss(i)
    } else {
        var zrw = '<img src="/img/kb.png" title ="暂停中" value="11">'
    }
    $('#zrw' + i).html(zrw)
    $('#details_zrw' + i).html(zrw)
    $('#details_zrw' + i + ' img').css('width', '32px');
}
// 日志与评论

function wd_show_info(beacon_id, beacon_Log_comment, beacon_Log_comment_limit, beacon_Log_comment_start, beacon_Log_comment_total, i) {

    let page = 0;
    $(document).bind("click", function (e) {
        if ($(e.target).closest('#wd-stand-info' + i).length > 0) {

            $('#wd_stand_remark' + i).css('display', 'inline');
            // gundongtiao(i,beacon_id,pagg)
        } else {
            $('#wd_stand_remark' + i).hide();
        }
        $('#wd_stand_remark' + i).click(function (event) {
            event.stopPropagation();
        });
    })

    let info = '<div id="wd_stand_remark' + i + '" class="wd_stand_task_info" style="display: none; cursor: default;" ><div >' +  //显示的是日志和评论
        // '<div style="width: 100%;height: 24px;border-radius: 1px;text-align: center;"></div>' +
        '<div id="web_remark' + i + '" style="width: 100%;display: block;height: 98%;float: left;overflow: auto;">' +
        '<div id="web_info_info' + i + '">' +
        '</div>' +
        '<div id="wd_info' + i + '" style="text-align: center;width: 100%;display: block;float: left;font-size: 12px;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    $('#wd-stand-div' + i).append(info)
    pic_remark(beacon_id, i, beacon_Log_comment, page)

    if (beacon_Log_comment.length < 50) {
        $('#wd_info' + i).html('没有更多了').css('pointer-events', 'none')
    }
    else {
        $('#wd_info' + i).html('<a href="javascript:void(0)" class="loadingmore' + i + '" onclick="loading_web(\'' + i + "','" + beacon_id + "','" + page + '\')" style="clear: both;" id="web_loading">' +
            '加载更多' + '</a>').css('pointer-events', '')
    }

    let flag = true;
    $('#web_remark' + i).scroll(function () {
        let sum = this.scrollHeight - 40;
        if (sum <= $(this).scrollTop() + $(this).height()) {
            if (flag) {
                flag = false;
                page++

                loading_web(i, beacon_id, page, function (err, data) {
                    let teammember = decodeURIComponent(data.data)
                    let temp = JSON.parse(teammember)
                    if (temp.LogComment.length >= 50) {
                        flag = true;
                    } else {
                        $('#wd_info' + i).html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                    }
                })
            }
        }
    });

}
// 修改任务
function stand_modisty(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, i, alltag, beacon_tag) {
    let wd_modi_task = '<form id="Modity' + i + '" onsubmit="return false" method="post">' +
        '<input id="stand_modis_id' + i + '" type="hidden" name="id" value="' + beacon_id + '">' +
        '<div id="wd-stand-Modifu' + i + '" class="wd-stand-Modify" style="display:none">' +
        '<div class="wd_Modify_add_task">' +
        '<div class="wd_Modify_head_task">' +
        '<span class="wd_Modify_user_img"><img src="/img/img/u105.png" style="width: 15px;cursor: default;"></span>' +
        '<select id="wd_Modify_data' + i + '" class="wd_opt_data" name="head_user_id" style="margin-left: 14px;border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;">' +
        // '<option class="" selected="selected" disabled="true" style="font-size: 15px;">选择负责人</option>' +
        '</select>' +
        '</div>' +
        '<div class="wd_Modify_name_task">' +
        '<label for="wd_Modify_name' + i + '"><img src="/img/taskname.png" style="width: 19px;" alt=""></label>' +
        '<input id="wd_Modify_name' + i + '" style="border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;" class="wd_Modify_name_task_input" type="text" name="name" placeholder="任务名称...  示例：! #自定义标签# #自定义标签# 任务名称" value="' + decodeURIComponent(beacon_Name) + '" autocomplete="off">' +
        '</div>' +
        '<div class="wd_Modify_expect_task">' +
        '<span><label for="wd-stand-excpect' + i + '"><img src="/img/rili.png" style="width: 15px;"></label></span>' +
        '<input class="wd_expect_data" type="text" name="expect_end_time" style="width: 29.5%;border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;" id="wd-stand-excpect' + i + '" autocomplete="off" placeholder="预计完成时间..." value="' + dateyear(decodeURIComponent(beacon_Expect_end_time)) + '">' +
        '</div>' +
        '<div class="wd_Modify_tag_task">' +
        '<span class="wd_task_Modify_img">' +
        '<img src="/img/five.png" style="width: 15px;cursor: default;">' +
        '</span>' +
        '<div class="Modify_mutiSelect">' +
        // < !-- < span > 列表</span > -->
        // '<div class="Modify_list">' +
        // '<input class="content" disabled="disabled" placeholder="请选择系统标签" autocomplete="off" />' +
        // '</div>' +
        '<ul class="Modify_listContent" id="Modify_listContent' + i + '" style="margin-left: 43px;margin-top: -20px;">' +
        '</ul>' +
        '</div>' +

        '</div>' +
        '<div class="Modify_wd_note_task">' +
        '<span><label for="Modify_wd_note_task_note' + i + '"><img src="/img/img/u118.png" style="margin-top: -100px;width:15px;"></label></span>' +
        '<textarea id="Modify_wd_note_task_note' + i + '" maxlength="100" type="text" name="note" value="" placeholder="任务描述" style="height: 60px;margin-left: 15px;width: 60%;font-size: 12px;resize: none;" autocomplete="off";>' +
        decodeURIComponent(beacon_Note) + '</textarea>' +
        '</div>' +
        '<div class="Modify_wd_submit_task" style="width: 90%;margin: 0 auto;">' +
        '<input class="wd_submit_add" type="submit" onclick="taskMotify(\'' + i + '\')" value="保存">' +
        '<input type="reset" id="wd_stand_motify' + i + '" class="wd_submit_reset" value="取消">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#wd-stand-suball' + i).after(wd_modi_task)
    laydate.render({
        elem: '#wd-stand-excpect' + i
    });
    showhide(i, beacon_id)
    stand_mo_clsoe(i, beacon_id, beacon_tag)
}
// 添加任务
function nt_wd_stand_add(wd_Id, alltag, adduserMo) {
    for (q = 0; q < adduserMo.length; q++) {
        let all = adduserMo[q].split(',');
        let gid = all[0];
        let name = all[1];
        $('#wd_opt_data' + wd_Id).append('<option name="head_user_id"  value=' + gid + '>' + name + '</option>');
    }
    let stand_tag = decodeURIComponent(alltag)
    let tag = stand_tag.split(',');
    for (m = 0; m < alltag.length; m++) {
        if (alltag[m] != '') {
            if (alltag[m] == '<BUG>') {
                $('#wd_stand_add_tasktag' + wd_Id).append('<li><input type="checkbox" class="street" id="street' + wd_Id + m + '" name="tag" value="' + alltag[m] + '" />' +
                    '<label for="street' + wd_Id + m + '" class="task-add-tag"  style="background-color:#df7d7d;cursor: pointer;color: white;">' + htmlspecialchars(alltag[m]) + '</label>' +
                    '</li>')
            }
            else if (alltag[m] == '<延迟>') {
                $('#wd_stand_add_tasktag' + wd_Id).append('<li><input type="checkbox"  class="street" id="street' + wd_Id + m +
                    '" name="tag" value="' + alltag[m] + '" />' +
                    '<label for="street' + wd_Id + m + '"  id="strre' + i + '" class="task-add-tag"  style="background-color:#B8860B;cursor: pointer;color: white;">' + htmlspecialchars(alltag[m]) + '</label>' +
                    '</li>')
            }
            else {
                $('#wd_stand_add_tasktag' + wd_Id).append('<li><input type="checkbox" class="street" id="street' + wd_Id + m +
                    '" name="tag" value="' + alltag[m] + '" />' +
                    '<label for="street' + wd_Id + m + '"  id="strre' + i + '"  class="task-add-tag" style="background-color:rgb(135, 138, 236);color: white; ">' + htmlspecialchars(alltag[m]) + '</label>' +
                    '</li>')
            }
        }
    }
}
// 修改任务的标签对比下勾号
function wd_stand_modisty(wd_Id, beacon_tag, alltag, i) {
    let stand_tag = decodeURIComponent(beacon_tag)
    let tag = stand_tag.split(',');
    for (m = 0; m < alltag.length; m++) {
        var checked = "";
        for (t = 0; t < tag.length; t++) {
            if (tag[t] == alltag[m]) {
                checked = 'checked="checked"';
                break;
            } else {

            }
        }
        let stand_ttag = alltag[m];
        if (stand_ttag != '') {
            if (stand_ttag == '<BUG>') {
                $('#Modify_listContent' + i).append('<li class="taskmo_tag' + i + m + '">' + '<input type="checkbox" class="street' + m + '" ' + checked + ' id="wd-mo-street' + i + m +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="wd-mo-street' + i + m + '" class="task-add-tag"  style="background-color:#df7d7d;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')

            } else if (stand_ttag == '<延迟>') {
                $('#Modify_listContent' + i).append('<li class="taskmo_tag' + i + m + '">' + '<input type="checkbox" class="street' + m + '"  ' + checked + ' id="wd-mo-street' + i + m + '"  name="tag" value="' + stand_ttag + '" />' +
                    '<label class="task-add-tag" for="wd-mo-street' + i + m + '"  style="background-color:#B8860B;cursor: pointer;color: white;">' +
                    htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')

            }
            else {
                $('#Modify_listContent' + i).append('<li class="taskmo_tag' + i + m + '">' + '<input type="checkbox" class="street' + m + '"   ' + checked + ' id="wd-mo-street' + i + m + '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="wd-mo-street' + i + m + '" class="task-add-tag"  style="background-color:rgb(135, 138, 236);cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')

            }

            if (stand_ttag == '<BUG>') {
                $('#wd-stand-detail-Tag' + i).append('<li class="taskdetail_tag' + i + m + '">' + '<input type="checkbox" class="street' + m + '"  ' + checked + ' id="wd-mo-details-street' + i + m + '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="wd-mo-details-street' + i + m + '" class="task-add-tag"  style="background-color:#df7d7d;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else if (stand_ttag == '<延迟>') {
                $('#wd-stand-detail-Tag' + i).append('<li class="taskdetail_tag' + i + m + '">' + '<input type="checkbox" class="street' + m + '"  ' + checked + ' id="wd-mo-details-street' + i + m + '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="wd-mo-details-street' + i + m + '" class="task-add-tag"  style="background-color:#B8860B;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else {
                $('#wd-stand-detail-Tag' + i).append('<li class="taskdetail_tag' + i + m + '">' + '<input type="checkbox" class="street' + m + '"   ' + checked + ' id="wd-mo-details-street' + i + m + '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="wd-mo-details-street' + i + m + '" style="background-color:rgb(135, 138, 236);cursor: pointer;color: white;" class="task-add-tag">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
        }
        else {
            $('#Modify_listContent' + i).append('');
        }
    }
}
// 修改任务点击按钮
function stand_mo_clsoe(i, beacon_id, beacon_tag) {

    $('#wd_stand_motify' + i).on('click', function () {
        $('#wd-stand-Modifu' + i).slideUp();
    })
    $('#wd-stand-pen' + i).on('click', function () {
        $('#wd-stand-Modifu' + i).slideToggle();
        $('.wd-stand-suball').hide();
        $('#wd-stand-oppen' + i).show()
        $('#wd-stand-cllose' + i).hide();

        // stand_mo_clsoe(i,beacon_id,beacon_tag)
    })
}
function dateyear(add_time) {
    let cont = add_time.replace(/\+/g, ' ');
    // 按照空格分割
    let Mand = cont.split(' ');
    // 按：分割取出小时和分钟
    let Mandhms = Mand[1].split(':');
    let Mandhm = Mandhms[0] + ':' + Mandhms[1]

    // 按照-分割取出月份和日
    // let Mandymd = Mand[0].split('-');
    // let Mandym = Mandymd[1] + '-' + Mandymd[2]
    // 判断传递过来的值是否等于今天
    let showtime = checktimes(Mand[0], Mandhm)
    // if(Mand[0] == GetDateStr(0)){
    //     var showtime = "今天 " + Mandhm;
    // }else if(Mand[0] == GetDateStr(-1)){
    //     var showtime = "昨天 " + Mandhm;
    // }else if(Mand[0] == GetDateStr(-2)){
    //     var showtime = "前天 " + Mandhm;
    // }else{
    //     var showtime = Mandym +' '+ Mandhm;
    // }

    return showtime;
}
// 子任务的完成状态
function stand_task_sub(beacon_sub, i) {
    $('#wd-stand-sub_stat' + i).html(task_sub(beacon_sub))
    $('#wd-stand-sub_statclose' + i).html(task_sub(beacon_sub))

    $('#wd-details-sub-fins-close' + i).html(task_sub(beacon_sub))
    $('#wd-details-sub-fins-open' + i).html(task_sub(beacon_sub))
}
// 任务的鼠标事件
function showhide(i, beacon_id) {
    $('#wd-stand-task-black' + i).mouseover(function () {
        $('#wd-stand-task-boxpen' + i).show();
    })
    $('#wd-stand-task-black' + i).mouseleave(function () {
        $('#wd-stand-task-boxpen' + i).hide();
    })
    let penbox =
        '<div id="wd-stand-dete' + i + '">' +
        '<img src="/img/box.png" onclick="wd_stand_delect(\'' + beacon_id + "','" + i + '\')" style="margin-left: 10px;" alt="" title="删除">' +
        '</div>' +
        // <!-- 修改 -->
        '<div id="wd-stand-pete' + i + '">' +
        '<img id="wd-stand-pen' + i + '"  src="/img/pen.png" alt="" title="修改">' +
        '</div>'
    $('#wd-stand-task-boxpen' + i).html(penbox)
}
// 子任务的展开与关闭
function stand_an(i) {

    $('#wd-stand-oppen' + i).on('click', function () {
        $('#wd-stand-suball' + i).slideDown();
        $('#wd-stand-oppen' + i).hide();
        $('#wd-stand-cllose' + i).show();
        // 点击判断如果有审核的任务，则显示图片
        $('.wd-stand-Modify').hide();

        var obj = $('#wd-stand-five-state' + i);
        if (!$.trim(obj.html())) {
            $('#wd-stand-fivediv' + i).hide();

            $('#wd-details-fivediv' + i).hide();
        } else {
            $('#wd-stand-fivediv' + i).show();

            $('#wd-details-fivediv' + i).show();
        }
    })
    $('#wd-stand-cllose' + i).on('click', function () {
        $('#wd-stand-suball' + i).slideUp();
        $('#wd-stand-oppen' + i).show();
        $('#wd-stand-cllose' + i).hide();
    })
}
function five_div_subtask_state_detials(i) {
    var objdetails = $('#wd-details-five-state' + i);
    if (!$.trim(objdetails.html())) {
        $('#wd-details-fivediv' + i).hide();
    } else {
        $('#wd-details-fivediv' + i).show();
    }
}
// 修改任务隐藏的函数
// 子任务隐藏的函数
// // 子任务点击添加
function wd_show_sub(beacon_sub, i) {
    sub_sorting(beacon_sub)
    for (s = 0; s < beacon_sub.length; s++) {

        let sub = beacon_sub[s];
        //  console.log(sub)
        var sub_id = sub.Id; //子任务的iD
        var sub_Expect_end_time = sub.Expect_end_time.replace(/\+/g, '%20'); //子任务预计结束时间
        var sub_End_time = sub.End_time.replace(/\+/g, '%20'); //子任务的结束时间
        var sub_Content = sub.Content.replace(/\+/g, '%20'); //子任务的内容
        var sub_Check_result = sub.Check_result.replace(/\+/g, '%20'); //子任务检查结果
        var sub_Performance_id = sub.Performance_id.replace(/\+/g, '%20'); //子任务的审核id
        var sub_State = sub.State; //任务的状态
        wd_show_view(sub_id, sub_Expect_end_time, sub_End_time, sub_Content, sub_Check_result, sub_Performance_id, sub_State, s, i)
        wd_stand_detail_sub(sub_id, sub_Expect_end_time, sub_End_time, sub_Content, sub_Check_result, sub_Performance_id, sub_State, s, i)
        wd_if_subpause(sub_State, s, i, sub_Performance_id, sub_Check_result)
        five_div_subtask_state_detials(i)
    }
}
function task_sub(Task_sub) {
    if (Task_sub != null) {
        var totalsub = new Array();
        // 检查项状态，定义“-1”为不可用，“0”为冻结状态，“1”为正常(未开始或暂停)，“2”为开始状态，“3”为已完成，默认为”1“。
        // let totalsub = Task_sub.length;
        let subok = 0;
        for (let k = 0; k < Task_sub.length; k++) {
            if (Task_sub != null) {
                let sub_State = Task_sub[k].State;
                // -1 为删除状态。不统计已删除的
                if (sub_State != '-1') {
                    totalsub.push(sub_State);
                    if (sub_State == '3' || sub_State == '4' || sub_State == '5') {
                        subok += 1
                    }
                }
            }
        }
        var subtask = subok + '/' + totalsub.length

    } else {
        var subtask = '0/0'
    }
    return subtask;
}
// 项目下子任务添加
function wd_show_view(sub_id, sub_Expect_end_time, sub_End_time, sub_Content, sub_Check_result, sub_Performance_id, sub_State, s, i) {
    let sub =
        '<form id="wd-stand-sub-Modifty' + i + s + '" onsubmit="return false" method="post" style="float:left;">' +
        '<div id="wd-stand-sub' + i + s + '" class="wd-stand-sub">' +
        '<div id="wd-stand-list' + i + s + '" class="wd-stand-list">' +
        '<input type="hidden"  name="id" value="' + sub_id + '">' +
        // <!-- 子任务界面 -->
        '<div id="wd-stand-sub-ppbb' + i + s + '" style="display:none;float: left;">' +
        '<div id="wd-stand-sub-pbdiv' + i + s + '" style="float: left;position: absolute;margin-left: -30px;">' +
        '<div id="wd-stand-sub-hhhh' + i + s + '" class="wd-stand-sub-hhhh' + i + '">' +
        '<div style="display: inline;float: left;">' +
        '<img src="/img/box.png" alt="" onclick="wd_stnad_sub_delect(\'' + sub_id + "','" + i + "','" + s + '\')">' +
        '</div>' +
        '<div id="wd-stand-pen-div' + i + s + '" style="display: inline;margin-left: 10px;">' +
        '<img id="wd-stand-pen' + i + s + '"  onclick="wd_stand_ppp(\'' + i + "','" + s + '\')" src="/img/pen.png" alt="">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        // <!-- 暂停 -->
        '<div class="wd-stand-sub-line" style="display: inline;margin-left: 15px;">' +
        '<div style="display: inline;float: left;margin-left: 15px;">' +
        '<span id="zipause' + i + s + '" class="zirenwu" onclick="zipause(\'' + s + "','" + i + "','" + sub_id + '\');"></span>' +
        '</div>' +
        '<div class="wd-stand-sub-checkbox" style="display: inline;margin-left: 8px;float: left;">' +
        '<span class="complete" id="cboxid' + i + s + '" onclick="zirenwu(\'' + i + "','" + s + "','" + sub_id + '\')">' +

        '</span>' +
        '</div>' +
        // <!-- 子任务名字 -->
        '<div class="wd-stand-sub-warp" style="cursor: default;">' +
        '<div id="wd-stand-sub-Content' + i + s + '" style="margin-left: 6px;">' +
        '<span id="wd-Content-sub_span' + i + s + '" style="font-size: 12px;">' + decodeURIComponent(sub_Content) + '</span>' +
        '<input id="wd-stand-sub-Content-input' + i + s + '" type="text" style="display:none;border:0;border-bottom: 1px dashed;"  name="content" value="">' +
        '</div>' +
        '<div id="wd-stand-sub-Expect' + i + s + '" style="margin-left: 5px;font-size: 12px;line-height: 1.7;">' +
        '<span id="wd-Expect-sub_span' + i + s + '">' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '</span>' +
        '<input id="wd-stand-sub-Expect-input' + i + s + '" name="expect_end_time" type="text" style="width: 73px;display:none;border:0;border-bottom: 1px dashed;" value="">' +
        '</div>' +
        '<div id="wd-stand-sub-add' + i + s + '" style="display:none;" onclick="wd_sub_task_Modifty(' + i + ',' + s + ')">' +
        '<label style="font-size: 13px;margin-left: 10px;cursor: pointer;">保存</label>' +
        '</div>' +

        '<div id="wd-stand-sub-chexiao' + i + s + '" style="display:none;">' +
        '<label style="font-size: 13px;margin-left: 10px;cursor: pointer;">撤销</label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#wd_stand_suballtask' + i).prepend(sub)
    laytime(i, s)
    sub_taskMotify(i, s)
    sub_onmouse(i, s)
}
// 子任务完成
function task_sub_appendto(i, s) {
    // $('#wd-stand-sub-Modifty' + i + s).appendTo('#wd-stand-addsub' + i)
    sub_divshanshan(i, s)
}
// 子任务重新打开
function task_sub_prependTo(i, s) {
    // $('#wd-stand-sub-Modifty' + i + s).prependTo('#wd-stand-addsub' + i)
    sub_divshanshan(i, s)
}
function sub_divshanshan(i, s) {
    $('#wd-stand-sub-Modifty' + i + s).css('animation', 'fade 600ms infinite')
    setTimeout(function () {
        $('#wd-stand-sub-Modifty' + i + s).css('animation', '')
    }, 1000)
}
function sub_onmouse(i, s) {
    $('#wd-stand-sub' + i + s).mouseover(function () {
        $('#wd-stand-sub-ppbb' + i + s).show();
    })
    $('#wd-stand-sub' + i + s).mouseleave(function () {
        $('#wd-stand-sub-ppbb' + i + s).hide();
    })
}
function pointer_none(i, s) {
    $('#wd-stand-sub' + i + s).css('pointer-events', 'none');
    $('#wd-details-sub-edit' + i + s).css('pointer-events', 'none');
}
function jinzhi(i, s) {
    $('#wd-stand-dete' + i).hide();
    $('#wd-stand-pete' + i).hide();

    $('#wd-stand-task-boxpen' + i).html('<div id="wd-stand-task-suo' + i + '" style="margin-left: 10px;"><img style="width: 15px;" src="/img/Task/suo.png"title="任务中有已保存的审核表，禁止修改"></div>')
    details_use_hide(i)


}
// 子任务状态判断
function wd_if_subpause(sub_State, s, i, sub_Performance_id, sub_Check_result) {
    if (sub_State == 1) {
        var pau = '<img src="/img/blue_begin.png" title ="暂停中" value="1">'
    } else if (sub_State == 2) {
        var pau = '<img src="/img/red_end.png" title ="开始中" value="0">'
    } else {
        var pau = '<img src="/img/kb.png" title ="暂停中" value="11">'
    }
    $('#zipause' + i + s).html(pau)
    $('#details_zipause' + i + s).html(pau)
    if (sub_State == 1) {
        var subbox = '<img style="width: 17px;" src="/img/uncheck.png" title="未完成" value="0">'
    }
    if (sub_State == 2) {
        var subbox = '<img style="width: 17px;"  src="/img/uncheck.png" title="未完成" value="0">'
    }
    if (sub_State == 3) {
        if (sub_Performance_id != 0) {
            var subbox = '<img style="width: 18px;"  src="/img/saveing.png" title="已保存未提交" value="3">'
            pointer_none(i, s)
            jinzhi(i, s)
            $('#wd-details-sub-edit'+i+s).appendTo('#wd_task_details_suball_statefour'+i)
            $('#wd-stand-sub-Modifty'+i+s).appendTo('#wd_stand_addsub_statefour'+i)
        } else {
            var subbox = '<img style="width: 17px;"  src="/img/checked.png" title="已完成" value="1">'
        }
        allsubppox(i, s)
        sub_hhhh(i, s)
        details_hhhh(i, s)
    }
    if (sub_State == 4) {
        var subbox = '<img style="width: 21px;margin-left: -4px;position: relative;left: 3px;"  src="/img/assess.png" title="考核中" value="4">'
        jinzhi(i, s)
        allsubppox(i, s)
        sub_hhhh(i, s)
        details_hhhh(i, s)
        pointer_none(i, s)
        details_use_hide(i)
        
        $('#wd-details-sub-edit'+i+s).appendTo('#wd_task_details_suball_statefour'+i)
        $('#wd-stand-sub-Modifty'+i+s).appendTo('#wd_stand_addsub_statefive'+i)
    }
    if (sub_State == 5) {
        if (sub_Check_result == 0) {
            var subbox = '<img style="width: 18px;" src="/img/Task/nothroug.png" title="考核完成，未通过" value="5">'
        } else {
            var subbox = '<img style="width: 18px;" src="/img/GIS-TL.png" style="width: 15px;margin-left: 1px;" alt="考核完成" value="5">'
        }
        pointer_none(i, s)
        allsubppox(i, s)

        $('#wd-stand-sub-Modifty' + i + s).appendTo('#wd-stand-five-state' + i)

        $('#wd-details-sub-edit' + i + s).appendTo('#wd-details-five-state' + i)
    }
    if (sub_State == -1) {
        $('#wd-details-sub-edit' + i + s).remove()
        $('#wd-stand-sub-Modifty' + i + s).remove()
    }
    $('#cboxid' + i + s).html(subbox)
    $('#details_cboxid' + i + s).html(subbox)

}
// 要改变的加号以及添加子任务
function sub_change(i, beacon_id) {
    let wd_app_sub_add =
        '<form id="wd-stand-sub-add' + i + '" onsubmit="return false" method="post" style="float:left;">' +
        '<input class="wd-add_children_id' + i + '" type="hidden" value="' + beacon_id + '" name="tkid">' +
        '<div id="wd-stand-append' + i + '" class="wd-stand-append">' +
        '<div style="float: left;">' +
        '<input id="wd-stand-sub-content' + i + '" style="border: 0;border-bottom: 1px dashed;"  name="content" type="text" placeholder="子任务内容">' +
        '</div>' +
        '<div style="float: left;margin-left: 5px;">' +
        '<input id="wd-stand-sub-append' + i + '" placeholder="预计完成时间" name="expect_end_time" class="wd-stand-sub-append" style="width:73px;border: 0;border-bottom: 1px dashed;" type="text">' +
        '</div>' +
        '<div style="margin-left: 10px;float: left;font-size: 13px;cursor: pointer;margin-top: 8px;"onclick="wd_sub_task_add(\'' + i + "','" + beacon_id + '\')">' +
        '添加' +
        '</div>' +
        '<div id="wd-stand-sub-no' + i + '" style="margin-left: 10px;float: left;font-size: 13px;cursor: pointer;margin-top: 8px;">' +
        '清空' +
        '</div>' +
        '</div>' +
        '</form>'


    $('#wd-stand-addsub' + i).append(wd_app_sub_add)
    let state_five =
        '<div>' +
        '<div id="wd-stand-fivediv' + i + '" style="clear: both;margin-left: 81px;">' +
        '<div id="wd-stand-fiveddiv' + i + '" onclick="wd_five_stand_open(\'' + i + '\')">' +
        '<img src="/img/Task/left.png" style="width: 16px;">' +
        '<label style="font-size: 12px;cursor: pointer;">已审核的子任务</label>' +
        '</div>' +
        '</div>' +
        '<div id="wd-stand-five-state' + i + '" style="display:none;float: left;">' +
        '</div>' +
        '</div>'
    $('#wd_stand_addsub_statefive' + i).append(state_five)
    laydate.render({
        elem: '#wd-stand-sub-append' + i
    });

    $('#wd-stand-sub-no' + i).on('click', function () {
        $('#wd-stand-sub-content' + i).val('')
        $('#wd-stand-sub-append' + i).val('')
    })
}
function wd_five_stand_open(i) {
    $('#wd-stand-fivediv' + i).html('<div onclick="wd_five_stand_clsoe(\'' + i + '\')"><img src="/img/Task/bottom.png" style="width: 16px;" >' +
        '<label style="font-size: 12px;cursor: pointer;">已审核的子任务</label>' +
        '</div>')
    $('#wd-stand-five-state' + i).slideDown();

    $('#wd-details-fivediv' + i).html('<div onclick="wd_five_stand_clsoe(\'' + i + '\')"><img src="/img/Task/bottom.png" style="width: 16px;" >' +
        '<label style="font-size: 12px;cursor: pointer;">已审核的子任务</label>' +
        '</div>')
    $('#wd-details-five-state' + i).slideDown()
}
function wd_five_stand_clsoe(i) {
    $('#wd-stand-fivediv' + i).html('<div onclick="wd_five_stand_open(\'' + i + '\')" ><img src="/img/Task/left.png" style="width: 16px;" ><label style="font-size: 12px;cursor: pointer;">已审核的子任务</label></div>')
    $('#wd-stand-five-state' + i).slideUp();

    $('#wd-details-fivediv' + i).html('<div onclick="wd_five_stand_open(\'' + i + '\')" ><img src="/img/Task/left.png" style="width: 16px;" ><label style="font-size: 12px;cursor: pointer;">已审核的子任务</label></div>')
    $('#wd-details-five-state' + i).slideUp();
}
// 修改子任务
function sub_taskMotify(i, s) {
    $('#wd-stand-sub-chexiao' + i + s).click(function () {
        $('#wd-stand-sub-Content-input' + i + s).hide();
        $('#wd-stand-sub-Expect-input' + i + s).hide();
        $('#wd-Content-sub_span' + i + s).fadeIn();
        $('#wd-Expect-sub_span' + i + s).fadeIn();

        $('#wd-stand-sub-add' + i + s).hide();
        $('#wd-stand-sub-chexiao' + i + s).hide();
        $('#wd-stand-pen-div' + i + s).html('<img id="wd-stand-pen' + i + s + '"  onclick="wd_stand_ppp(\'' + i + "','" + s + '\')" src="/img/pen.png" alt="">')
    })
}
function wd_stand_ppp(i, s) {
    let sub_content_span = $('#wd-Content-sub_span' + i + s).text()
    let Expect = $('#wd-Expect-sub_span' + i + s).text()
    $('#wd-stand-sub-Content-input' + i + s).fadeIn();
    $('#wd-stand-sub-Expect-input' + i + s).fadeIn();
    $('#wd-stand-sub-Content-input' + i + s).val(sub_content_span)
    $('#wd-stand-sub-Expect-input' + i + s).val(Expect)
    $('#wd-Content-sub_span' + i + s).hide();
    $('#wd-Expect-sub_span' + i + s).hide();
    $('#wd-stand-sub-add' + i + s).fadeIn();
    $('#wd-stand-sub-chexiao' + i + s).fadeIn();

    $('#wd-stand-pen-div' + i + s).html('<img id="wd-stand-pen' + i + s + '"  onclick="wd_stand_ddd(\'' + i + "','" + s + '\')" src="/img/pen.png" alt="">')
}
function wd_stand_ddd(i, s) {
    $('#wd-stand-sub-Content-input' + i + s).hide();
    $('#wd-stand-sub-Expect-input' + i + s).hide();
    $('#wd-Content-sub_span' + i + s).fadeIn();
    $('#wd-Expect-sub_span' + i + s).fadeIn();

    $('#wd-stand-sub-add' + i + s).hide();
    $('#wd-stand-sub-chexiao' + i + s).hide();
    $('#wd-stand-pen-div' + i + s).html('<img id="wd-stand-pen' + i + s + '"  onclick="wd_stand_ppp(\'' + i + "','" + s + '\')" src="/img/pen.png" alt="">')
}
function laytime(i, s) {
    laydate.render({
        elem: '#wd-stand-sub-Expect-input' + i + s
    });
    laydate.render({
        elem: '#wd-details-sub-time-input' + i + s
    });
}
// 排序
function sorting(task) {
    for (var s = 0; s < task.length; s++) {
        for (y = s + 1; y < task.length; y++) {
            if (task[s].Expect_end_time < task[y].Expect_end_time) {
                let temp = task[s];
                task[s] = task[y];
                task[y] = temp;
            }
        }
    }
}
function sub_sorting(task) {
    for (var s = 0; s < task.length; s++) {
        for (y = s + 1; y < task.length; y++) {
            if (task[s].Add_time < task[y].Add_time) {
                let temp = task[s];
                task[s] = task[y];
                task[y] = temp;
            }
        }
    }
    for (var s = 0; s < task.length; s++) {
        for (y = s + 1; y < task.length; y++) {
            if (task[s].State < task[y].State) {
                let temp = task[s];
                task[s] = task[y];
                task[y] = temp;
            }
        }
    }

}

// 点击评论页面
function wd_sub_detail(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, i) {
    let detail =
        '<form id="wd-stand-details-form' + i + '" onsubmit="return false" method="post"style="clear: both;">' +
        '<input type="hidden" name="id" value="' + beacon_id + '"/>' +
        '<div id="wd-stand-details' + i + '" value="" class="wd-stand-details" style="display:none;">' +
        '<div class="wd-stand-details-div">' +
        '<div class="wd-stand-detals-view">' +
        '<div class="wd-stand-details-body" style="width: 100%;margin-top: 10px;">' +
        '<div class="wd-stand-detail-tasklist" style="float: left;margin-left: 29px;min-height: 12px;"></div>' +
        '<div style="float: right;">' +
        '<img id="wd-stand-details-close' + i + '" title="关闭" src="/img/u226.png" alt="" style="margin-right: 17px;" onclick="wd_stand_details_clsoe(\'' + i + '\')">' +
        '</div>' +
        '</div>' +
        '<div id="wd-stand-details-div-big' + i + '" style="width: 83%;min-height:400px;clear: both;margin-left: 30px;float: left;">' +
        '<div id="wd_details_ccbx_div' + i + '" style="float: left;">' +
        '<span class="details_zrw" id="details_zrw' + i + '" onclick="details_boxover(\'' + i + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div id="wd_details_task_pause' + i + '" style="float: left;margin-left: 12px;line-height: 2;">' +
        // '<img style="width: 15px;height: 15px;" src="/img/blue_begin.png" alt="">' +
        '<span class="pause" style="width: 15px;" id="details_pause' + i + '" onclick="details_pause(\'' + i + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div style="float: left;margin-left: 7px;line-height: 2.2;width: 70%;">' +
        '<div>' +
        '<div><input id="wd_task_detail_name' + i + '" name="name" type="text" value="' + decodeURIComponent(beacon_Name) + '" style="width:60%;border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;"></div>' +
        '</div>' +
        '</div>' +
        '<div style="clear: both;">' +
        '<div class="" style="margin-left: 20px;margin-top: 10px;float: left;padding-bottom: 40px;">' +
        '<div style="display: inline;">' +
        '<label for="wd-stand-details-select' + i + '">' +
        '<img src="/img/img/u105.png" alt="" style="width: 15px;">' +
        '</label>' +
        '</div>' +
        '<div style="display: inline;margin-left: 20px;">' +
        '<select id="wd-stand-details-select' + i + '" name="head_user_id" style="cursor: pointer;width: 38%;-webkit-appearance: none;border-top: 0;margin-left: 10px;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;position: relative;top: 2px;font-size: 13px;">' +
        '</select>' +
        '</div>' +
        // <!-- 时间 -->
        '<div style="margin-top: 18px;">' +
        '<div style="display: inline;">' +
        '<label for="wd-task-detail-Expect' + i + '">' +
        '<img src="/img/rili.png" alt=""  style="width: 15px;">' +
        '</label>' +
        '</div>' +
        '<div style="display: inline;">' +
        '<input id="wd-task-detail-Expect' + i + '" placeholder="预计完成时间..."  name="expect_end_time" type="text" style="border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;margin-left: 30px;" value="' + dateyear(decodeURIComponent(beacon_Expect_end_time)) + '">' +
        '</div>' +
        '</div>' +
        // <!-- 标签 -->
        '<div style="margin-top: 18px;">' +
        '<div style="display: inline;">' +
        '<img src="/img/five.png" alt="" style="float: left;width: 15px;">' +
        '<ul id="wd-stand-detail-Tag' + i + '"style="display: inline;float: left;margin-left: 25px;"></ul>' +
        '</div>' +
        // '<div style="display: inline;margin-left: 20px;">' +

        // '</div>' +
        '</div>' +
        // <!-- 备注 -->
        '<div style="margin-top: 18px;clear: both;">' +
        '<div style="display: inline;">' +
        '<label for="wd-details-note-textarea' + i + '">' +
        '<img src="/img/img/u118.png" style="position: relative;top: 13px;width: 15px;">' +
        '</label>' +
        '</div>' +
        '<div style="margin-left: 39px;width: 150%;height: 60px;">' +
        '<textarea id="wd-details-note-textarea' + i + '" name="note" placeholder="任务描述" style="font-size: 12px;height: 100%;width: 315px;resize:none;border: 1px solid gainsboro;">' + decodeURIComponent(beacon_Note) + '</textarea>' +
        '</div>' +
        '</div>' +
        // <!-- 子任务 -->
        '<div id="wd-task-detail-sublist' + i + '">' +
        '<div id="wd-task-details-subopen' + i + '" style="float: left;cursor: pointer;display:none;">' +
        '<div style="display: inline;">' +
        '<img src="/img/+.png" alt="" style="width: 12px;height: 12px;">' +
        '</div>' +
        '<div style="display: inline;font-size:13px;margin-left: 3px;line-height: 2;">' +
        '子任务' +
        '</div>' + '(' +
        '<div id="wd-details-sub-fins-open' + i + '" style="display: inline;font-size: 13px;">' +
        '</div>' + ')' +
        '</div>' +

        '<div id="wd-task-details-subclose' + i + '" style="cursor: pointer;width: 30%;">' +
        '<div style="display: inline;">' +
        '<img src="/img/-.png" alt="" style="width: 12px;height: 12px;">' +
        '</div>' +
        '<div style="display: inline;font-size:13px;margin-left: 3px;line-height: 2;">' +
        '子任务' +
        '</div>' + '(' +
        '<div id="wd-details-sub-fins-close' + i + '" style="display: inline;font-size: 13px;">' +

        '</div>' + ')' +
        '</div>' +

        '<div id="wd-task-details-suball' + i + '"style="clear: both;display: inline-block;width: 100%;">' +

        '<div id="wd_task_details_suball_task' + i + '" style="clear: both;">' +
        '</div>'+
        '<div id="wd_task_details_suball_statefour' + i + '" style="clear: both;">' +
        '</div>' +

        '<div id="wd_task_details_suball_statefive' + i + '" style="clear: both;">' +
        '</div>' +

        '<div id="wd_task_details_suball_Add' + i + '" style="clear: both;">' +
        '</div>' +
        '</div>' +


        '</div>' +
        '</div>' +
        '</div>' +
        // <!-- 横线 -->
        '<div id="wd-stand-details-comments' + i + '" style="text-align: left;">' +
        '<hr>' +
        '</div>' +
        '<div id="wd-details-commits' + i + '" style="clear: both;float: left;" class="wd-details-commits">' +

        '</div>' +  //评论
        '<div id="wd-details-jiazai' + i + '" style="clear: both;float: left;width: 100%;">' +

        '</div>' +

        '</div>' +
        '<div id="wd-stnad-details_use' + i + '" style="width: 12%;min-height:4px;float: right;margin-top: 10px;cursor: pointer;">' +
        '<div id="wd_stand_detail_save' + i + '" style="color: #169BD5;font-size: 12px;" onclick="wd_stand_detail_save(\'' + i + '\')">' +
        '保存' +
        '</div>' +
        '<hr id="wd-stand-detials-savehr' + i + '" style="margin-top: 5px;">' +
        '<div id="wd_stand_detail_dele' + i + '" style="color: red;font-size: 12px;cursor: pointer;margin-top: 15px;" onclick="wd_stand_detail_delect(\'' + beacon_id + "','" + i + '\')">' +
        '删除' +
        '</div>' +
        '<hr id="wd_stand_detail_delehr' + i + '" style="margin-top: 5px;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div>'+
        '<div class="wd_stnad_details_top" id="wd_stnad_details_top' + i + '"><div style="font-size: 25px;font-weight: bold;">↑</div><div>回到顶部</div></div>' +
        '</div>'+
        
        '</div>' +
        '</div>' +
        '</form>'
    $('.wd-body-stand-details').append(detail)
    detail_lay(i)
    wd_details_sub_add(i, beacon_id)

    wd_guheight(i)

}
function details_use_hide(i) {
    $('#wd_stand_detail_save' + i).hide();
    $('#wd-stand-detials-savehr' + i).hide()

    $('#wd_stand_detail_dele' + i).hide();
    $('#wd_stand_detail_delehr' + i).hide()
}
function details_use_show(i) {
    $('#wd_stand_detail_save' + i).show();
    $('#wd-stand-detials-savehr' + i).show()

    $('#wd_stand_detail_dele' + i).show();
    $('#wd_stand_detail_delehr' + i).show()
}
// 子任务完成
function task_details_sub_appendto(i, s) {
    // $('#wd-details-sub-edit' + i + s).appendTo('#wd-task-details-suball' + i)
    // $('#wd-details-sub-edit-tmp' + i + s).appendTo('#wd-task-details-suball' + i)
    // $('#wd-details-sub-add' + i).appendTo('#wd-task-details-suball' + i)


    // $('#wd_details_five_yy' + i).appendTo('#wd-task-details-suball' + i)

    subdetails_divshanshan(i, s)
}
// 子任务重新打开
function task_details_sub_prependTo(i, s) {
    $('#wd-details-sub-edit' + i + s).prependTo('#wd-task-details-suball' + i)
    subdetails_divshanshan(i, s)
}
function subdetails_divshanshan(i, s) {
    $('#wd-details-sub-edit' + i + s).css('animation', 'fade 600ms infinite')
    setTimeout(function () {
        $('#wd-details-sub-edit' + i + s).css('animation', '')
    }, 1000)

    $('#wd-details-sub-edit-tmp' + i + s).css('animation', 'fade 600ms infinite')
    setTimeout(function () {
        $('#wd-details-sub-edit-tmp' + i + s).css('animation', '')
    }, 1000)
}
// 详细界面下添加子任务
function wd_details_sub_add(i, beacon_id) {
    let subadd =
        '<form id="wd-details-sub-add' + i + '" onsubmit="return false" method="post" style="float:left;clear: both;">' +
        '<input class="wd-add_children_id' + i + '" type="hidden" value="' + beacon_id + '" name="tkid">' +
        '<div id="wd-details-append' + i + '" class="wd-details-append" style="float: left;margin-left: 55px;margin-top: 10px;">' +
        '<div style="float: left;">' +
        '<input id="wd-details-sub-content' + i + '" placeholder="子任务内容" style="height: 12px;border:0;border-bottom: 1px dashed;"  name="content" type="text">' +
        '</div>' +
        '<div style="float: left;margin-left: 8px;">' +
        '<input id="wd-details-sub-append' + i + '" placeholder="预计完成时间" name="expect_end_time" class="wd-details-sub-append" style="width:73px;height:12px;border:0;border-bottom: 1px dashed;" type="text">' +
        '</div>' +
        '<div style="margin-left: 10px;float: left;font-size: 12px;cursor: pointer;margin-top: 8px;"onclick="wd_details_sub_task_add(\'' + i + "','" + beacon_id + '\')">' +
        '添加' +
        '</div>' +
        '<div id="wd-details-sub-no' + i + '" style="margin-left: 10px;float: left;font-size: 12px;cursor: pointer;margin-top: 8px;">' +
        '清空' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#wd_task_details_suball_Add' + i).append(subadd)
    let state_five =
        '<div id="wd_details_five_yy' + i + '" style="clear: both;">' +
        '<div id="wd-details-fivediv' + i + '" style="clear: both;">' +
        '<div id="wd-details-fiveddiv' + i + '" onclick="wd_five_stand_open(\'' + i + '\')">' +
        '<img src="/img/Task/left.png" style="width: 16px;">' +
        '<label style="font-size: 12px;cursor: pointer;">已审核的子任务</label>' +
        '</div>' +
        '</div>' +
        '<div id="wd-details-five-state' + i + '" style="display:none;float: left;width: 100%;">' +
        '</div>' +
        '</div>'
    $('#wd_task_details_suball_statefive' + i).append(state_five)
    detail_lay(i)
}
function detail_lay(i) {
    laydate.render({
        elem: '#wd-task-detail-Expect' + i
    });
    laydate.render({
        elem: '#wd-details-sub-append' + i
    });
    $('#wd-task-details-subopen' + i).click(function () {
        $('#wd-task-details-suball' + i).slideDown();
        $('#wd-task-details-subopen' + i).hide();
        $('#wd-task-details-subclose' + i).show();
    })
    $('#wd-task-details-subclose' + i).click(function () {
        $('#wd-task-details-suball' + i).slideUp();
        $('#wd-task-details-subopen' + i).show();
        $('#wd-task-details-subclose' + i).hide();
    })
}
function wd_stand_detail_sub(sub_id, sub_Expect_end_time, sub_End_time, sub_Content, sub_Check_result, sub_Performance_id, sub_State, s, i) {
    let sub_detail =
        // <!-- 子任务的列表 -->
        '<form id="wd-details-sub-edit' + i + s + '" onsubmit="return false" method="post" style="margin-left: 3px;float: left;clear: both;width: 102%;">' +
        '<div id="sub_details_all' + i + s + '" style="margin-top: 5px;">' +

        '<div>'+
        '<div id="wd-details-sub-ppbb' + i + s + '" style="display:none;">' +
        '<div id="wd-details-sub-pbdiv' + i + s + '">' +
        '<div id="wd-details-sub-hhhh' + i + s + '" class="wd-details-sub-hhhh' + i + '" style="float: left;margin-left: -45px;padding-right: 12px;">' +
        '<div style="display:inline;">' +
        '<img src="/img/box.png" onclick="wd_stnad_sub_delect(\'' + sub_id + "','" + i + "','" + s + '\')">' +
        '</div>' +
        '<div id="wd-details-sub-pen' + i + s + '"style="display:inline;margin-left: 10px;">' +
        '<img src="/img/pen.png"  onclick="details_sub_pen(\'' + i + "','" + s + '\')" >' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+

        '<div style="display:inline;margin-left: 2px;float: left;">' +
        '<span id="details_zipause' + i + s + '" class="zirenwu" onclick="details_zipause(\'' + i + "','" + s + "','" + sub_id + '\');"></span>' +
        '</div>' +
        '<input type="hidden" name="id" value="' + sub_id + '" />' +
        '<div style="display: inline;margin-left: 10px;float: left;">' +
        '<span class="complete" id="details_cboxid' + i + s + '" onclick="details_zirenwu(\'' + i + "','" + s + "','" + sub_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div style="float: left;width: 69.8%;">' +

        '<div style="display:inline;margin-left:8px;font-size: 13px;">' +
        '<span id="wd-detiails-sub-content-span' + i + s + '" style="font-size: 12px;cursor: default;">' + decodeURIComponent(sub_Content) + '</span>' +
        '<input id="wd-details-sub-contentnoew' + i + s + '" name="content" style="display:none;border: 0;border-bottom: 1px dashed;" type="text" value=""/>' +
        '</div>' +
        '<div style="display: inline;margin-left:8px;font-size: 12px;">' +
        '<span id="wd-detiails-sub-time-span' + i + s + '" style="cursor: default;">' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '</span>' +
        '<input id="wd-details-sub-time-input' + i + s + '" name="expect_end_time"  style="display:none;width: 70px;border: 0;border-bottom: 1px dashed;" type="text" value=""/>' +

        '</div>' +
        '</div>' +
        '<div style="float: left;width: 18%;">' +
        '<div style="display:inline;float: left;" onclick="wd_details_sub_task_Modifty(\'' + i + "','" + s + '\')">' +
        '<label id="wd-details-stand-sub-add' + i + s + '" style="font-size: 13px;cursor: pointer;display:none;">保存</label>' +
        '</div>' +

        '<div style="display:inline;float: left;">' +
        '<label id="wd-details-stand-sub-chexiao' + i + s + '" style="font-size: 13px;margin-left: 10px;cursor: pointer;display:none;">撤销</label>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#wd_task_details_suball_task' + i).append(sub_detail)
    // 详细页面下的子任务撤销
    $('#wd-details-stand-sub-chexiao' + i + s).click(function () {
        $('#wd-details-sub-contentnoew' + i + s).hide();
        $('#wd-details-sub-time-input' + i + s).hide();
        $('#wd-detiails-sub-content-span' + i + s).fadeIn();
        $('#wd-detiails-sub-time-span' + i + s).fadeIn();

        $('#wd-details-stand-sub-add' + i + s).hide();
        $('#wd-details-stand-sub-chexiao' + i + s).hide();
        $('#wd-details-sub-pen' + i + s).html('<img src="/img/pen.png"  onclick="details_sub_pen(\'' + i + "','" + s + '\')" >')
    })
    $('#wd-details-sub-edit' + i + s).mouseover(function () {
        $('#wd-details-sub-ppbb' + i + s).show();
    })
    $('#wd-details-sub-edit' + i + s).mouseleave(function () {
        $('#wd-details-sub-ppbb' + i + s).hide();
    })
}
function details_sub_pen(i, s) {
    let sub_content_span = $('#wd-detiails-sub-content-span' + i + s).text()
    let Expect = $('#wd-detiails-sub-time-span' + i + s).text()
    $('#wd-details-sub-contentnoew' + i + s).fadeIn();
    $('#wd-details-sub-time-input' + i + s).fadeIn();
    $('#wd-details-sub-contentnoew' + i + s).val(sub_content_span)
    $('#wd-details-sub-time-input' + i + s).val(Expect)

    $('#wd-detiails-sub-content-span' + i + s).hide();
    $('#wd-detiails-sub-time-span' + i + s).hide();

    $('#wd-details-stand-sub-add' + i + s).fadeIn();
    $('#wd-details-stand-sub-chexiao' + i + s).fadeIn();
    $('#wd-details-sub-pen' + i + s).html('<img src="/img/pen.png"  onclick="details_sub_den(\'' + i + "','" + s + '\')" >')
    laytime(i, s)
}
function details_sub_den(i, s) {
    $('#wd-details-sub-contentnoew' + i + s).hide();
    $('#wd-details-sub-time-input' + i + s).hide();
    $('#wd-detiails-sub-content-span' + i + s).fadeIn();
    $('#wd-detiails-sub-time-span' + i + s).fadeIn();
    $('#wd-details-stand-sub-add' + i + s).hide();
    $('#wd-details-stand-sub-chexiao' + i + s).hide();
    $('#wd-details-sub-pen' + i + s).html('<img src="/img/pen.png"  onclick="details_sub_pen(\'' + i + "','" + s + '\')" >')
}
// 点击进入详情页公共
function clikon_godetials(i) {
    $('#wd-stand-details' + i).fadeIn();
    $('.detail_member').hide();
    $('.wd-stand-qingdan').hide();
    $('.wd-stand-hidden').hide();
    $('.details_tttt').hide();
    $('#wd_stand_finish').hide();
    $('.wd_add_task').hide();
    $('body').css('overflow','hidden')
    wd_guheight(i)
}
// 点击进入详情页面
function cckdetials(i, beacon_id) {
    $('.wd-stand-task-name' + i).click(function () {
        clikon_godetials(i)
    })
    $('#wd_stand_yanqi_task' + i).click(function () {
        clikon_godetials(i)
    })
    $('.wd-stand-date' + i).click(function () {
        clikon_godetials(i)
    })
    $('.wd-stand-task-tag' + i).click(function () {
        clikon_godetials(i)
    })
    $('.wd-stand-assigned' + i).click(function () {
        clikon_godetials(i)
    })
}

function wd_stand_commit(beacon_id, i, beacon_Log_comment) {
    let page = 0;
    wd_details_send(i, beacon_id)
    details_stand_commits(beacon_id, i, beacon_Log_comment)
    if (beacon_Log_comment.length < 50) {
        // console.log(ping_tmp.length)
        $('#wd-details-new-loading' + i).html('<div class="wd_details_loding" id="wd-details_lodding' + i + '" style="font-size: 13px;">' +
            '到底了' + '</div>').css('pointer-events', 'none')
    } else {
        $('#wd-details-new-loading' + i).html('<div class="wd_details_loding" id="wd-details_lodding' + i + '" style="font-size: 13px;" onclick="details_lodding(\'' + i + "','" + beacon_id + "','" + page + '\')">加载更多</div>').css('pointer-events', '')
    }

    let dflag = true;
    $('#wd-stand-details' + i).scroll(function () {
        let sum = this.scrollHeight - 40;
        if (sum <= $(this).scrollTop() + $(this).height()) {

            if (dflag) {
                dflag = false;
                page++
                details_lodding(i, beacon_id, page, function (err, data) {
                    let teammember = decodeURIComponent(data.data)
                    let temp = JSON.parse(teammember)
                    if (temp.LogComment.length >= 50) {
                        dflag = true;
                    } else {
                        $('#wd-details-new-loading' + i).html('到底了').css({
                            'pointer-events': 'none'
                        })
                    }
                })
            }
        }
    });
    $('#wd_stnad_details_top' + i).click(function () {
        $('#wd-stand-details' + i).animate({ scrollTop: "0px" }, 350);
        $('#wd_stnad_details_top' + i).fadeOut()
    })
    $('#wd-stand-details' + i).scroll(function () {
        let numhei = this.scrollHeight - 1000;
        if ($(this).scrollTop() < 50) {
            $('#wd_stnad_details_top' + i).hide();
        } else {
                $('#wd_stnad_details_top' + i).show();
            }

        

    })
}
function hhhh(i) {
    $('#wd-stand-dete' + i).hide();
    $('#wd-stand-pete' + i).hide();
    $('#wd-stand-task-suo' + i).hide();
}
function details_hhhh(i, s) {
    $('#wd-details-sub-pbdiv' + i + s).hide();
    $('#wd-details-sub-ppbb' + i + s).hide();
}
function ssss(i) {
    $('#wd-stand-dete' + i).show();
    $('#wd-stand-pete' + i).show();
    $('#wd-stand-task-suo' + i).show();
}
function details_ssss(i, s) {
    $('#wd-details-sub-pbdiv' + i + s).show();
}
function sub_ssss(i, s) {
    $('#wd-stand-sub-pbdiv' + i + s).show();
}
function sub_hhhh(i, s) {
    $('#wd-stand-sub-pbdiv' + i + s).hide();
}
function tmp_ssss(i, dataid) {
    $('#wd-stand-sub-pbdiv-tmp' + i + dataid).show();
}
function tmp_hhhh(i, dataid) {
    $('#wd-stand-sub-pbdiv-tmp' + i + dataid).hide();
}
function bianhuastand(i) {
    let numval = $('#wd-stand-sub_stat' + i).text()
    let numa = numval.split('/')
    let fractional = (fs(i)) + '/' + (fallsub(i))
    $('#wd-stand-sub_stat' + i).html(fractional)
    $('#wd-stand-sub_statclose' + i).html(fractional)
    $('#wd-details-sub-fins-open' + i).html(fractional)
    $('#wd-details-sub-fins-close' + i).html(fractional)

}
// 显示完成任务/总任务
function fs(i) {
    var rrr = new Array();
    // $('#zipause'+k+i).html('<img src="/img/blue_begin.png" value="1">');
    let arr = $('#wd-stand-suball' + i + ' .complete img');
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].getAttribute('value') >= 1) {
            rrr.push(arr[j].getAttribute('value'));
        }
    }
    let len = rrr.length;
    return len
}

function fallsub(i) {
    var rrr = new Array();
    let arr = $('#wd-stand-suball' + i + ' .complete img');
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].getAttribute('value') != 'null') {
            let gaib = arr[j].getAttribute('value');
            if (gaib != null) {
                rrr.push(arr[j].getAttribute('value'));
            }
        }
    }
    let len = rrr.length;
    return len
}
// 显示详细页面下完成任务/总任务
function detailsfs(i) {

    var rrr = new Array();
    // $('#zipause'+k+i).html('<img src="/img/blue_begin.png" value="1">');
    let arr = $('#wd-task-detail-sublist' + i + ' .complete img');
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].getAttribute('value') >= 1) {
            rrr.push(arr[j].getAttribute('value'));
        }
    }

    let len = rrr.length;

    return len
}

