
Date.prototype.format = function () {
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
};


function task_hide() {
    $('.wd-task-state-left').click(function () {
        $('.wd-task-state-bottom').show();
        $('.wd-task-state-left').hide();
        $('.wd-task-three').show();
    })
    $('.wd-task-state-bottom').click(function () {
        $('.wd-task-state-bottom').hide();
        $('.wd-task-state-left').show();
        $('.wd-task-three').hide();
    })
}
$(document).ready(function () {
    task_hide()
})

function addtaskhref(wd_Id,dataa, ctid, allper, adduserMo) {
    let arr = dataa.split('&');
    // console.log(arr)
    for (t = 0; t < arr.length; t++) {
        let obj = arr[t].split('=')
        if (obj[0] == 'tag') {
            let tag = obj[1];
            aaaadddd(wd_Id,tag, ctid, allper, adduserMo)

            // var objdetails = $('#wd-details-five-state' + ctid);
            // if (!$.trim(objdetails.html())) {
            //     $('#wd-details-fivediv' + ctid).hide();
            // } else {
            //     $('#wd-details-fivediv' + ctid).show();
            // }
            return false;
        }
    }
}
function aaaadddd(wd_Id,beacon_tag, beacon_id, allper, adduserMo) {
    // var cid = $('.wd_tcid_task_in').val();
    let beacon_Name = $('#wd_name_task_input'+wd_Id).val();
    let beacon_Expect_end_time = $('#wd_expect_data'+wd_Id).val();
    let beacon_End_time = '0000-00-00%2000%3A00%3A00';
    let beacon_start_time = '0000-00-00%2000%3A00%3A00';
    let beacon_Note = $('#wd_textarea_val'+wd_Id).val();
    let beacon_Head_user_id = $("select[name='head_user_id']").val();
    let beacon_sub = '';
    let beacon_State = '1';


    wd_show_task(wd_Id, beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State,beacon_End_time, beacon_Expect_end_time, beacon_id, allper, alltag, beacon_tag) //添加任务页面
    // 判断任务的状态
    wd_show_tag(beacon_tag, beacon_id)
    wd_show_note(beacon_Note, beacon_id) //任务备注

    wd_show_head_user(beacon_id, beacon_id, allper, beacon_Head_user_id)
    // wd_show_shaiuser(wd_Id,adduserMo)
    // wd_show_info(beacon_id, beacon_Log_comment, beacon_Log_comment_limit, beacon_Log_comment_start, beacon_Log_comment_total, beacon_id)
    stand_task_sub(beacon_sub, beacon_id)
    wd_stand_modisty(wd_Id,beacon_tag, alltag, beacon_id)
    wd_show_user_Mo(adduserMo, beacon_id, beacon_Head_user_id)
    // wd_stand_commit(beacon_id, beacon_id, beacon_Log_comment)

    // 按照添加时间，一旦任务时间超过三天，则必须有警告标志
    // ShowTime(decodeURIComponent(beacon_add_time))
    wd_stand_add_time(beacon_start_time, beacon_id, beacon_Name, beacon_id)
    wd_show_tmp(beacon_id)
    details_lodding_tmp(beacon_id)
    // 按人员区分
    // distinguish(i,allper,beacon_Head_user_id)
    if (beacon_sub != null) {
        wd_show_sub(beacon_sub, beacon_id)
    } else {

    }
    choosetag(alltag, beacon_id)
    // 判断完成则执行，不显示修改删除
    addgongogn(beacon_id, beacon_id, beacon_Expect_end_time)
    // $('#wd_opt_data'+wd_Id).html('')
    $('#wd_task_details_suball_statefive'+beacon_id).hide();
}




function zade(beacon_id) {
    $('#wd-stand-alltask' + beacon_id).css('animation', 'fade 600ms infinite')
    setTimeout(function () {
        $('#wd-stand-alltask' + beacon_id).css('animation', '')



    }, 1000)
    $('.wd_add_task').hide();
    $('#wd-stand-divdiv').hide();
}

function wd_show_tmp(beacon_id) {

    let page = -1;

    $(document).bind("click", function (e) {
        if ($(e.target).closest('#wd-stand-info' + beacon_id).length > 0) {

            $('#wd_stand_remark' + beacon_id).css('display', 'inline');
            // gundongtiao(beacon_id,beacon_id,pagg)
        } else {
            $('#wd_stand_remark' + beacon_id).hide();
        }
        $('#wd_stand_remark' + beacon_id).click(function (event) {
            event.stopPropagation();
        });
    })
    // flag = true;

    let info = '<div id="wd_stand_remark' + beacon_id + '" class="wd_stand_task_info" style="display: none; cursor: default;" ><div >' +  //显示的是日志和评论
        // '<div style="width: 100%;height: 24px;border-radius: 1px;text-align: center;"></div>' +
        '<div class="web_remark' + beacon_id + '" style="width: 100%;display: block;height: 101%;float: left;overflow: auto;">' +
        '<div id="web_info_info' + beacon_id + '">' +

        '</div>' +

        '<div id="wd_info' + beacon_id + '" style="text-align: center;width: 100%;display: block;float: left;font-size: 12px;">' +
        '<a href="javascript:void(0)" class="loadingmore' + beacon_id + '" onclick="loading_info(\'' + beacon_id + "','" + page + '\')" style="clear: both;" id="web_loading">' +
        '</a>' +

        '</div>' +
        '</div>' +

        // '<div class="web' + beacon_id + '" style="width: 100%;display: block;height: 8%;clear: both;">'+
        // '<a class="loadingmore' + beacon_id + '" style="clear: both;" id="web_loading" onclick="loading_web(\'' + beacon_id + "','" + beacon_id + '\')">
        //<span class="web_jiazai' + beacon_id + '">加载更多</span></a>' +
        // '</div>' +
        '</div>' +
        '</div>'
    $('#wd-stand-div' + beacon_id).append(info)

    loading_info(beacon_id, page)
}
// 临时评论接口
function loading_info(beacon_id, page) {
    page++;
    let num = page;
    $.ajax({
        url: "/task/log_comment/" + beacon_id + "/" + page + "/" + 50,
        async: false,
        type: "GET",
        beforeSend: function () {
            $('#wd_info' + beacon_id).html('<div><img style="width: 40px;" src="/img/loadinga.gif"></div>')
        },
        success: function (data) {
            let ping_tmp = data.data;
            let ping_str = JSON.parse(decodeURIComponent(ping_tmp))
            let ping_obj = ping_str.LogComment;

            if (ping_obj.length < 50) {
                $('#wd_info' + beacon_id).html('没有更多了')
            } else {
                $('#wd_info' + beacon_id).html('没有更多了')
            }

            if (ping_obj != '') {

                for (i = 0; i < ping_obj.length; i++) {
                    let number_id = decodeURIComponent(ping_obj[i].Id);
                    let gid = decodeURIComponent(ping_obj[i].OperatorId)
                    let name = decodeURIComponent(ping_obj[i].OperatorName)
                    let times = decodeURIComponent(ping_obj[i].AddTime)
                    let content = decodeURIComponent(ping_obj[i].Content);
                    let type = decodeURIComponent(ping_obj[i].Type);
                    let Name = decodeURIComponent(ping_obj[i].Name.replace(/\+/g, '%20'))
                    if (type == 'comment') {
                        $('#web_info_info' + beacon_id).append('<div class="mark_talk_div' + i + '"><div class="ping_div_web" id="' + beacon_id + '">' +
                            '<input type="hidden" value="' + decodeURIComponent(gid) + '">' +
                            ' ' + '<a style="font-size: 12px;color: gray;margin-left: 1px;">' + updatetime(times) + ' ' + '</a>' +
                            '<a class="pinglun_time">' + decodeURIComponent(name) + ' ' +
                            '<span class="pinglun_date' + beacon_id + '">' + '发表评论' + '</span>' + '</a>' +
                            //修改删除等...........
                            '<p class="ping_ctn' + beacon_id + '" id="ping_content" style="margin-left: 86px;font-size: 14px;">' + ' ' +
                            decodeURIComponent(content) + '</p>' +
                            '<form id="edit_form' + beacon_id + '"class="" onsubmit="return false" method="post">' +
                            '<div id="ping_edit" class="ping_edit' + beacon_id + '"><input id="ping_hidden' + beacon_id + '" type="hidden" name="id" value="' +
                            decodeURIComponent(number_id) + '" />' +
                            '</div>' +
                            '</form>' +
                            '</div>' +
                            '</div>')
                    } else if (type == 'log') {
                        let msglog = JSON.parse(decodeURIComponent(content).replace(/\+/g, '%20'));
                        // console.log(cff)
                        $('#web_info_info' + beacon_id).append('<div style="float: left;width: 100%;margin-top: 5px;">' +
                            '<div style="width: 20%;height: auto;display: block;float: left;color: gray;font-size:12px;">' +
                            '<input type="hidden" value="' + decodeURIComponent(gid) + '">' + updatetime(decodeURIComponent(times)) +

                            '</div>' +
                            '<div style="width: 80%;height: auto;display: block;float: left;color: gray;font-size:12px;">' +
                            '<div>' + decodeURIComponent(name) + '</div>' +
                            '<div>' + ' ' + '将' + ' ' + '<span id="wd-detials-log-equal' + i + beacon_id + '" style="color:black;font-weight: bold;">' + decodeURIComponent(Name) + '</span>' + decodeURIComponent(htmlspecialchars(msglog.msg)) + '</div>' +
                            '<div>' +
                            '</div>')
                        equal(beacon_id, number_id, i, beacon_id)
                    }

                }
                $('#wd_info' + beacon_id).html('没有更多了')
            } else {
                // return false;
                $('#wd_info' + beacon_id).html('没有更多了')
                $('#wd_info' + beacon_id).css('pointer-events', 'none')
                // return false;
            }

        },
        error: function (xhr, errorMessage, e) {
            // alert("系统异常");
        }
    })
}




// 修改的=========================================================
function tmpmotask(datam, i, allper, adduserMo) {
    let arr = datam.split('&');
    // console.log(arr)
    for (t = 0; t < arr.length; t++) {
        let obj = arr[t].split('=')
        if (obj[0] == 'tag') {
            let tag = obj[1];
            mobynewmo(tag, i, allper, adduserMo)
            return false;
        }
    }
}
function mobynewmo(beacon_tag, i, allper, adduserMo) {
    var beacon_Name = $('#wd_Modify_name' + i).val();
    var beacon_Expect_end_time = $('#wd-stand-excpect' + i).val();
    var beacon_Note = $("#Modify_wd_note_task_note" + i).val();
    var beacon_Head_user_id = $("#wd_Modify_data" + i).val();
    var beacon_id = $('#stand_modis_id' + i).val();

    // 赋值
    $('.wd-stand-task-name' + i).html(parsing(beacon_Name))
    $('.wd-stand-date' + i).html(ShowTime(beacon_Expect_end_time))
    $('#wd-stand-task-note' + i).attr('title', beacon_Note)
    $('#wd_stand_task_hidden'+i).val(beacon_Head_user_id)


    fuzhidetails(i, beacon_Name, beacon_Expect_end_time, beacon_Note)
    wd_show_tag(beacon_tag, i)
    wd_show_note(beacon_Note, i) //任务备注

    $('#wd-stand-Modifu' + i).hide();
    zade(i)
    $('.wd_detials_mmmmb').remove()

    $('#Modify_listContent' + i).html('')
    $('#wd-stand-detail-Tag' + i).html('')
    wd_stand_modisty(beacon_tag, alltag, i)
    wd_show_head_user(beacon_id, i, allper, beacon_Head_user_id)
    $('#wd_Modify_data' + i).html('')
    $('#wd-stand-details-select' + i).html('')
    wd_show_user_Mo(adduserMo, i, beacon_Head_user_id)
    choosetag(alltag, i)
}

function tmpmodedetailstask(datam, i, allper) {
    let arr = datam.split('&');
    // console.log(arr)
    for (t = 0; t < arr.length; t++) {
        let obj = arr[t].split('=')
        if (obj[0] == 'tag') {
            let tag = obj[1];
            mobydetails(tag, i, allper)
            return false;
        }
    }
}
function mobydetails(beacon_tag, i, allper) {
    var beacon_Name = $('#wd_task_detail_name' + i).val();
    var beacon_Expect_end_time = $('#wd-task-detail-Expect' + i).val();
    var beacon_Head_user_id = $("#wd-stand-details-select" + i).val();
    var beacon_Note = $("#wd-details-note-textarea" + i).val();
    var beacon_id = $('#stand_modis_id' + i).val();


    // 赋值
    $('.wd-stand-task-name' + i).html(parsing(beacon_Name))
    $('.wd-stand-date' + i).html(beacon_Expect_end_time)
    $('#wd-stand-task-note' + i).attr('title', beacon_Note)


    fuzhidetails(i, beacon_Name, beacon_Expect_end_time, beacon_Note)
    wd_show_tag(beacon_tag, i)
    wd_show_note(beacon_Note, i) //任务备注

    $('#wd-stand-Modifu' + i).hide();
    zade(i)
    $('#Modify_listContent' + i).html('')
    $('#wd-stand-detail-Tag' + i).html('')
    wd_stand_modisty(beacon_tag, alltag, i)
    wd_show_head_user(i, i, allper, beacon_Head_user_id)
    $('#wd_Modify_data' + i).html('')
    $('#wd-stand-details-select' + i).html('')
    wd_show_user_Mo(adduserMo, i, beacon_Head_user_id)

    duibihewduser(beacon_Head_user_id, beacon_id, i)

}
function fuzhidetails(i, beacon_Name, beacon_Expect_end_time, beacon_Note) {
    $('#wd_task_detail_name' + i).val(beacon_Name)
    $('#wd-task-detail-Expect' + i).val(beacon_Expect_end_time)
    $('#wd-details-note-textarea' + i).val(beacon_Note)
}
// 详细页面===========================================================
function wd_sub_detail_tmp(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_Expect_end_time, allper, beacon_tag) {
    let detail =
        '<form id="wd-stand-details-form' + beacon_id + '" onsubmit="return false" method="post"style="clear: both;">' +
        '<input type="hidden" name="id" value="' + beacon_id + '"/>' +
        '<div id="wd-stand-details' + beacon_id + '" value="" class="wd-stand-details" style="display:none;">' +
        '<div class="wd-stand-details-div">' +
        '<div class="wd-stand-detals-view">' +
        '<div class="wd-stand-details-body" style="width: 100%;margin-top: 10px;">' +
        '<div class="wd-stand-detail-tasklist" style="float: left;margin-left: 29px;min-height: 12px;"></div>' +
        '<div style="float: right;">' +
        '<img id="wd-stand-details-close' + beacon_id + '" title="关闭" src="/img/u226.png" alt="" style="margin-right: 17px;" onclick="wd_stand_details_clsoe(\'' + beacon_id + '\')">' +
        '</div>' +
        '</div>' +
        '<div id="wd-stand-details-div-big' + beacon_id + '" style="width: 83%;min-height:400px;clear: both;margin-left: 30px;float: left;">' +
        '<div id="wd_details_ccbx_div' + beacon_id + '" style="float: left;">' +
        '<span class="details_zrw" id="details_zrw' + beacon_id + '" onclick="details_boxover(\'' + beacon_id + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div id="wd_details_task_pause' + beacon_id + '" style="float: left;margin-left: 12px;line-height: 2;">' +
        // '<img style="width: 15px;height: 15px;" src="/img/blue_begin.png" alt="">' +
        '<span class="pause" id="details_pause' + beacon_id + '" onclick="details_pause(\'' + beacon_id + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div style="float: left;margin-left: 7px;line-height: 2.2;width: 70%;">' +
        '<div>' +
        '<div><input id="wd_task_detail_name' + beacon_id + '" name="name" type="text" value="' + decodeURIComponent(beacon_Name) + '" style="width:60%;border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;"></div>' +
        '</div>' +
        '</div>' +
        '<div style="clear: both;">' +
        '<div class="" style="margin-left: 20px;margin-top: 10px;float: left;padding-bottom: 40px;">' +
        '<div style="display: inline;">' +
        '<label for="wd-stand-details-select' + beacon_id + '">' +
        '<img src="/img/img/u105.png" alt="" style="width: 15px;">' +
        '</label>' +
        '</div>' +
        '<div style="display: inline;margin-left: 20px;">' +
        '<select id="wd-stand-details-select' + beacon_id + '" name="head_user_id" style="cursor: pointer;width: 38%;-webkit-appearance: none;border-top: 0;margin-left: 10px;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;position: relative;top: 2px;font-size: 13px;">' +
        '</select>' +
        '</div>' +
        // <!-- 时间 -->
        '<div style="margin-top: 18px;">' +
        '<div style="display: inline;">' +
        '<label for="wd-task-detail-Expect' + beacon_id + '">' +
        '<img src="/img/rili.png" alt=""  style="width: 15px;">' +
        '</label>' +
        '</div>' +
        '<div style="display: inline;">' +
        '<input id="wd-task-detail-Expect' + beacon_id + '" placeholder="预计完成时间..."  name="expect_end_time" type="text" style="border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px dashed gainsboro;margin-left: 30px;" value="' + dateyear(beacon_Expect_end_time) + '">' +
        '</div>' +
        '</div>' +
        // <!-- 标签 -->
        '<div style="margin-top: 18px;">' +
        '<div style="display: inline;">' +
        '<img src="/img/five.png" alt="" style="float: left;width: 15px;">' +
        '<ul id="wd-stand-detail-Tag' + beacon_id + '"style="display: inline;float: left;margin-left: 25px;"></ul>' +
        '</div>' +
        // '<div style="display: inline;margin-left: 20px;">' +

        // '</div>' +
        '</div>' +
        // <!-- 备注 -->
        '<div style="margin-top: 18px;clear: both;">' +
        '<div style="display: inline;">' +
        '<label for="wd-details-note-textarea' + beacon_id + '">' +
        '<img src="/img/img/u118.png" style="position: relative;top: 13px;width: 15px;">' +
        '</label>' +
        '</div>' +
        '<div style="margin-left: 39px;width: 150%;height: 60px;">' +
        '<textarea id="wd-details-note-textarea' + beacon_id + '" name="note" placeholder="在此填写任务备注" style="font-size: 12px;height: 100%;width: 315px;resize:none;border: 1px solid gainsboro;">' + decodeURIComponent(beacon_Note) + '</textarea>' +
        '</div>' +
        '</div>' +
        // <!-- 子任务 -->
        '<div id="wd-task-detail-sublist' + beacon_id + '">' +
        '<div id="wd-task-details-subopen' + beacon_id + '" style="float: left;cursor: pointer;display:none;">' +
        '<div style="display: inline;">' +
        '<img src="/img/+.png" alt="" style="width: 12px;height: 12px;">' +
        '</div>' +
        '<div style="display: inline;font-size:13px;margin-left: 3px;line-height: 2;">' +
        '子任务' +
        '</div>' + '(' +
        '<div id="wd-details-sub-fins-open' + beacon_id + '" style="display: inline;font-size: 13px;">' +
        '</div>' + ')' +
        '</div>' +

        '<div id="wd-task-details-subclose' + beacon_id + '" style="cursor: pointer;width: 30%;">' +
        '<div style="display: inline;">' +
        '<img src="/img/-.png" alt="" style="width: 12px;height: 12px;">' +
        '</div>' +
        '<div style="display: inline;font-size:13px;margin-left: 3px;line-height: 2;">' +
        '子任务' +
        '</div>' + '(' +
        '<div id="wd-details-sub-fins-close' + beacon_id + '" style="display: inline;font-size: 13px;">' +

        '</div>' + ')' +
        '</div>' +

        '<div id="wd-task-details-suball' + beacon_id + '" style="clear: both;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        // <!-- 横线 -->
        '<div id="wd-stand-details-comments' + beacon_id + '" style="text-align: left;">' +
        '<hr>' +
        '</div>' +
        '<div id="wd-details-commits' + beacon_id + '" style="clear: both;float: left;" class="wd-details-commits">' +

        '</div>' +  //评论
        '<div id="wd-details-jiazai' + beacon_id + '" style="clear: both;float: left;width: 100%;">' +

        '</div>' +

        '</div>' +
        '<div id="wd-stnad-details_use' + beacon_id + '" style="width: 12%;min-height:4px;float: right;margin-top: 10px;cursor: pointer;">' +
        '<div id="wd_stand_detail_save' + beacon_id + '" style="color: #169BD5;font-size: 12px;" onclick="wd_stand_detail_save(\'' + beacon_id + '\')">' +
        '保存' +
        '</div>' +
        '<hr id="wd-stand-detials-savehr' + beacon_id + '" style="margin-top: 5px;">' +
        '<div id="wd_stand_detail_dele' + beacon_id + '"  style="color: red;font-size: 12px;cursor: pointer;margin-top: 15px;" onclick="wd_stand_detail_delect(\'' + beacon_id + "','" + beacon_id + '\')">' +
        '删除' +
        '</div>' +
        '<hr id="wd_stand_detail_delehr' + beacon_id + '" style="margin-top: 5px;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('.wd-body-stand-details').append(detail)

    let beacon_State = '1';
    task_state(beacon_id, beacon_State, beacon_id)

    wd_show_tag(beacon_tag, beacon_id)
    wd_show_head_user(beacon_id, beacon_id, allper, beacon_Head_user_id)

    detail_lay(beacon_id)
    wd_details_sub_add(beacon_id, beacon_id)

    wd_details_send(beacon_id, beacon_id)


}
function details_lodding_tmp(beacon_id) {
    wd_details_send(beacon_id, beacon_id)
    let page = 0;
    $.ajax({
        url: "/task/log_comment/" + beacon_id + "/" + 0 + "/" + 50,
        async: false,
        type: "GET",
        beforeSend: function () {

            $('#wd-details-new-loading' + beacon_id).html('<div style="cursor:default;"><img src="/img/loadinga.gif"></div>').css('cursor', 'default')
        },
        success: function (data) {
            let ping_obj = decodeURIComponent(data.data);
            let ping_str = JSON.parse(ping_obj.replace(/\+/g, '%20'));
            let ping_tmp = ping_str.LogComment;
            if (ping_tmp.length < 50) {
                $('#wd-details-new-loading' + beacon_id).html('没有更多了')
            }
            if (ping_tmp != '') {

                for (k = 0; k < ping_tmp.length; k++) {
                    let number_id = ping_tmp[k].Id;
                    let gid = ping_tmp[k].OperatorId
                    let name = decodeURIComponent(ping_tmp[k].OperatorName.replace(/\+/g, '%20'))
                    let times = decodeURIComponent(ping_tmp[k].AddTime.replace(/\+/g, '%20'));
                    let content = decodeURIComponent(ping_tmp[k].Content.replace(/\+/g, '%20'));
                    let type = ping_tmp[k].Type;
                    let Name = decodeURIComponent(ping_tmp[k].Name.replace(/\+/g, '%20'));
                    if (type == 'log') {

                        let msglog = JSON.parse(decodeURIComponent(content).replace(/\+/g, '%20'));

                        let loog =
                            '<div id="wd-stand-commmit_list' + beacon_id + k + '">' +
                            '<div class="ping_talk_div"><div class="ping_div" id="ping_div">' +
                            '<input type="hidden" value="' + decodeURIComponent(gid) + '">' + '<a style="font-size: 13px;">' + updatetime(decodeURIComponent(times)) + ' ' + '</a>' +
                            '<span class="pinglun_date" style="font-size: 13px;float: left;width: 11%;white-space: nowrap;display: block;text-overflow: ellipsis;overflow: hidden;">' + decodeURIComponent(name) + '</span>' + ' ' + '<span style="font-size:13px;">将</span>' + ' ' +
                            '<span id="wd-details-log-name' + beacon_id + k + '" style="color: black;font-size: 13px;font-weight: bold;">' + decodeURIComponent(Name) + '</span>' +
                            //修改删除等...........
                            '<a class="ping_xiugai" id="ping_xiugai"><div><img id="ping_pen" class="ping_pen"src="/img/pen.png">' +
                            '<img class="ping_box"src="/img/box.png">' + '</div></a>' +
                            //修改删除等...........
                            '<span class="ping_ctn" id="ping_content">' + ' ' + htmlspecialchars(msglog.msg) + '</span>' +
                            '<form id="edit_form"class="" onsubmit="return false" method="post">' +
                            '<div id="ping_edit" class="ping_edit"><input id="ping_hidden" type="hidden" name="id" value="' +
                            decodeURIComponent(number_id) + '" /><textarea name="content"  class="ping_text">' + htmlspecialchars(msglog.msg) +
                            '</textarea>' +
                            '<p><input type="submit" value="保存" /><input class="ping_reset" type="reset" value="取消"  /></p>' +
                            '</div>' +
                            '</form>' +
                            '</div>' +
                            '</div>' +
                            '</div>'

                        $('#wd-details-commits' + beacon_id).append(loog)
                        equal(beacon_id, number_id, beacon_id, k)
                    } else if (type == 'comment') {
                        $('#wd-details-commits' + beacon_id).append('<div class="ping_talk_div' + beacon_id + k + '"><div class="ping_div" id="ping_div' + k + '">' +
                            '<input type="hidden" value="' + decodeURIComponent(gid) + '">' + '<a style="font-size: 13px;color:black;">' + updatetime(decodeURIComponent(times)) + ' ' + '</a>' +
                            '<a class="pinglun_time" style="margin-left: 0px;color: rgb(85, 85, 85);font-size: 13px;">' + decodeURIComponent(name) +
                            '<span style="margin-left: 8px;color: black;font-weight: bold;">评论：</span>' +
                            //修改删除等...........
                            '<a class="ping_xiugai' + beacon_id + k + '" id="ping_xiugai"><div><img id="ping_pen' + beacon_id + k + '" class="ping_pen"src="/img/pen.png">' +
                            '<img class="ping_box" onclick="comment_delect(\'' + beacon_id + "','" + k + "','" + number_id + '\')" src="/img/box.png">' + '</div></a>' +
                            //修改删除等...........
                            '<p class="ping_ctn" id="ping_content' + beacon_id + k + '" style="width: 73%; margin: 0px auto; display: block;">' + ' ' + decodeURIComponent(content) + '</p>' +
                            '<form id="edit_form' + beacon_id + k + '"class="" onsubmit="return false" method="post">' +
                            '<div id="ping_edit' + beacon_id + k + '" class="ping_edit"><input id="ping_hidden' + k + '" type="hidden" name="id" value="' +
                            decodeURIComponent(number_id) + '" /><textarea name="content" id="wd-stand-ping-textarea' + beacon_id + k + '" class="ping_text"></textarea>' +
                            '<p><input type="submit" value="保存" onclick="comment_edit(\'' + k + "','" + beacon_id + "','" + beacon_id + '\')" />' +
                            '<input id="ping_reset' + beacon_id + k + '" class="ping_reset" type="submit" value="取消"  /></p>' +
                            '</div>' +
                            '</form>' +
                            '</div>' +
                            '</div>')
                        wd_details_comment_show(beacon_id, k)
                    }
                }
                // flag = true;
                // $('#wd-details-new-loading' + beacon_id).html('<div class="wd_details_loding" id="wd-details_lodding' + beacon_id + '" style="font-size: 13px;" onclick="details_lodding(\'' + beacon_id + "','" + beacon_id +"','"+page+'\')">'+
                // '加载更多'+'</div>')
            } else {
                $('#wd-details-new-loading' + beacon_id).html('<div style="cursor:default;">没有更多了</div>').css('cursor', 'default')
                // flag = false;
            }

        },
        complete: function () {
            // $('#wd-details_lodding'+beacon_id).html('<div>加载更多</div>')
            // $('#wd-details_lodding' + beacon_id).css('pointer-events','none')

        },
        error: function (xhr, errorMessage, e) {
            layer.msg(e);
        }
    })
}
// 筛选
function wd_sortReverse(iid) {
    var stateObj = { foo: 'bar' };
    history.pushState(stateObj, null, iid);
    var domList = $('.wd-stand-task .wd_stand_alltask').get();

    domList.sort(function (a, b) {
        var elOne = $(a).find('.wd_stand_task_hidden_expecttime').val();
        var elTwo = $(b).find('.wd_stand_task_hidden_expecttime').val();

        if (elOne > elTwo) return -1;
        if (elOne < elTwo) return 1;
        return 0;
    });
    $('.wd-stand-task').append(domList)
    $('#wd_sorttimeupdate').html('<img src="/img/img/Positivesort.png"  title="任务的预计完成时间从大到小排序" onclick="wd_sortPostitive(\'' + iid + '\')" style="width: 14px;" alt="">')
    $('.wd_stand_nofen').click(function () {
        $('#wd_sorttimeupdate').html('<img src="/img/img/Reversesort.png"  title="任务的预计完成时间从小到大排序" onclick="wd_sortReverse(\'' + iid + '\')" style="width: 14px;" alt="">')
    })
}
function wd_sortPostitive(iid) {
    var stateObj = { foo: 'bar' };
    history.pushState(stateObj, null, iid);
    selereset()
    menandno()
    var domList = $('.wd-stand-task .wd_stand_alltask').get();

    domList.sort(function (a, b) {
        var elOne = $(a).find('.wd_stand_task_hidden_expecttime').val();
        var elTwo = $(b).find('.wd_stand_task_hidden_expecttime').val();

        if (elOne < elTwo) return -1;
        if (elOne > elTwo) return 1;
        return 0;
    });
    $('.wd-stand-task').append(domList)
    $('#wd_sorttimeupdate').html('<img src="/img/img/Reversesort.png"  title="任务的预计完成时间从小到大排序" onclick="wd_sortReverse(\'' + iid + '\')" style="width: 14px;" alt="">')
}



// 已完成任务的添加
function beacon_stat_three(gid, counter, allper, adduserMo, alltag, gid, page, limit, wd_Id) {
    // counter++;
    $.ajax({
        url: "/project/complete_task/" + gid,
        type: 'POST',
        data: '&limit=' + limit + '&page=' + page + '&tcid=' + wd_Id,
        beforeSend: function () {
            $('#wd_add_beacon_fini_news'+wd_Id).html('<div><img style="width: 40px;" src="/img/loadinga.gif"></div>')
        },
        success: function (data) {
            // $('#wd_stand_finish').html('')
            let boj = decodeURIComponent(data.data)
            let obj = JSON.parse(boj.replace(/\+/g, '%20'))
                let tt = obj.Task;
                if (tt != null) {
                    for (a = 0; a < tt.length; a++) {
                        // console.log(tt[a])
                        let beacon_task_list = tt[a]
                        if (tt.length >= 5) {
                            $('#wd_add_beacon_fini_news'+wd_Id).html('加载更多').css('pointer-events', '');
                            beacon_list_wancheng(wd_Id,beacon_task_list, allper, adduserMo, alltag)
                        } else {
                            beacon_list_wancheng(wd_Id,beacon_task_list, allper, adduserMo, alltag)
                            $('#wd_add_beacon_fini_news'+wd_Id).html('没有更多').css('pointer-events', 'none')
                        }
                    }
                } else {
                    $('.wd_add_beaocn_task_fini'+wd_Id).append('<div>' +
                        '<div style="cursor: default;color: gray;font-size: 11px;margin-top: 5px;width: 100%;">暂时没有内容</div></div>')
                    $('#wd_add_beacon_fini_news'+wd_Id).hide();
                }
        },
        error: function (xhr, errorMessage, e) {
            alert(e);
        }

    });
}

// 已完成任务的添加

function beacon_list_wancheng(wd_Id,beacon_task_list, allper, adduserMo, alltag) {


    var beacon_id = beacon_task_list.Id; //任务ID
    var beacon_Head_user_id = beacon_task_list.Head_user_id; //用户ID
    var beacon_Name = beacon_task_list.Name.replace(/\+/g, '%20'); //任务名称
    var beacon_Note = decodeURIComponent(beacon_task_list.Note.replace(/\+/g, '%20')); //任务备注
    var beacon_State = beacon_task_list.State.replace(/\+/g, '%20'); //任务状态
    var beacon_End_time = beacon_task_list.End_time.replace(/\+/g, '%20'); //任务的结束时间
    var beacon_Expect_end_time = beacon_task_list.Expect_end_time.replace(/\+/g, '%20'); // 预计时间
    var beacon_tag = beacon_task_list.Tag.replace(/\+/g, '%20'); //任务标签
    var beacon_sub = beacon_task_list.Sub; //子任务
    var beacon_Log_comment = beacon_task_list.Log_comment;
    var beacon_Log_comment_limit = beacon_task_list.Log_comment_limit;
    var beacon_Log_comment_start = beacon_task_list.Log_comment_start;
    var beacon_Log_comment_total = beacon_task_list.Log_comment_total;

    wd_show_taskwanc(wd_Id,beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, beacon_id, allper, alltag, beacon_tag) //添加任务页面
    // 判断任务的状态
    wd_show_tag(beacon_tag, beacon_id)
    wd_show_note(beacon_Note, beacon_id) //任务备注

    wd_show_head_user(beacon_id, beacon_id, allper, beacon_Head_user_id)
    wd_show_info(beacon_id, beacon_Log_comment, beacon_Log_comment_limit, beacon_Log_comment_start, beacon_Log_comment_total, beacon_id)

    wd_stand_modisty(beacon_tag, alltag, beacon_id)
    wd_show_user_Mo(adduserMo, beacon_id, beacon_Head_user_id)

    wd_stand_commit(beacon_id, beacon_id, beacon_Log_comment)
    stand_task_sub(beacon_sub, beacon_id)
    if (beacon_sub != null) {
        wd_show_sub(beacon_sub, beacon_id)
    } else {

    }
    addgongogn(beacon_id, beacon_id, beacon_Expect_end_time)
}
function wd_show_taskwanc(wd_Id,beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, beacon_id, allper, alltag, beacon_tag) {
    let task_stand_black = '<div class="wd_stand_alltask"  id="wd-stand-alltask' + beacon_id + '" style="float: left;width: 103.2%;margin-left: -26px;">' +
        '<input type="hidden" id="wd_stand_task_hidden' + beacon_id + '" class="wd_stand_task_hidden" value="' + beacon_Head_user_id + '">' +
        '<div id="wd-stand-task-black' + beacon_id + '" class="wd-stand-block">' +
        '<div id="wd_stand_textdor' + beacon_id + '" style=" display:none;position: relative;top: 20px;width: 95%;margin: 0 auto;"><hr style="background-color: gray;"></div>' +
        '<input type="hidden" value="' + beacon_id + '">' +
        '<div style="float: left;width:100%;">' +
        // <!-- 包裹修改和删除 修缮-->
        '<div class="wd-stand-repair">' +
        // <!-- 删除 -->
        '<div class="wd-stand-none">' +
        '<div class="wd-stand-boxpen" id="wd-stand-task-boxpen' + beacon_id + '" style="display: none;margin-left: 0px;">' +

        '</div>' +
        '</div>' +
        // <!-- 任务 /人物-->
        '<div class="wd-stand-gure">' +
        // <!-- 开始 -->
        '<div class="wd-stand-start" style="float: left;">' +

        '<span class="pause" id="pause' + beacon_id + '" onclick="pause(\'' + beacon_id + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        // <!-- 完成 -->
        '<div class="wd-stand-ok" style="float: left;">' +
        '<span class="zrw" id="zrw' + beacon_id + '" onclick="boxover(\'' + beacon_id + "','" + beacon_id + '\')">' +

        '</span>' +
        '</div>' +
        // <!-- 展开 -->
        '<div id="wd-stand-oclo' + beacon_id + '">' +
        '<div id="wd-stand-oppen' + beacon_id + '" style="float: left;cursor: pointer;" onclick="">' +
        '<div id="wd-stand-ans' + beacon_id + '" style="margin-left: 5px;float: left;width: 16px;text-align: center;">' +
        '<img id="wd-stand-an-open' + beacon_id + '" src="/img/+.png" alt="">' +
        '</div>' +
        '<div id="wd-stand-sub_stat' + beacon_id + '" style="font-size: 13px;margin-left: 10px;margin: 4px;float: left;cursor: pointer;">' +
        '</div>' +
        '</div>' +

        '<div id="wd-stand-cllose' + beacon_id + '" style="float: left;display:none;cursor: pointer;">' +
        '<div style="float: left;margin-left: 7px;width: 14px;">' +
        '<img id="wd-stand-an-clsoe' + beacon_id + '" src="/img/-.png" alt="">' +
        '</div>' +
        '<div id="wd-stand-sub_statclose' + beacon_id + '" style="font-size: 13px;margin-left: 10px;margin: 4px;float: left;cursor: pointer;">' +
        '</div>' +
        '</div>' +
        // <!-- 完成度 -->

        // '<div id="wd-stand-sub_statclose' + beacon_id + '" style="font-size: 13px;margin-left: 10px;margin: 4px;float: left;cursor: pointer;">' +

        // '</div>' +
        '</div>' +
        // <!-- 名称 -->
        // <!-- 这是换行 -->
        '<div class="wd-stand-wrap" style="float: left;width: 75%;">' +
        '<div id="wd-stand-task-name&' + beacon_id + '" onclick="standnamehash(\'' + beacon_id + "','" + beacon_id + '\');return false;" style="font-size: 12px;margin-left: 5px;cursor: pointer;display:none;border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px solid gainsboro;">' +
        parsing(decodeURIComponent(beacon_Name)) +
        '</div>' +
        '<a href="#wd-stand-task-name&' + beacon_id + '" class="wd-stand-task-name' + beacon_id + '" style="font-size: 12px;cursor: pointer;border-top: 0;margin-left: 5px;border-left: 0;border-right: 0;border-bottom: 1px solid gainsboro;">' +
        parsing(decodeURIComponent(beacon_Name)) +
        '</a>' +
        // <!-- 标签 -->
        '<div id="wd-stand-task-tag&' + beacon_id + '" class="wd-stand-task-tag' + beacon_id + '" style="display:none;margin-left: 5px;" onclick="standtaghash(\'' + beacon_id + "','" + beacon_id + '\')">' +
        // 标签
        '</div>' +
        '<a href="#wd-stand-task-tag&' + beacon_id + '" class="wd-stand-task-tag' + beacon_id + '" style=";margin-left: 5px;">' +
        // 标签
        '</a>' +
        // <!-- 备注 -->
        '<div style="margin-left: 5px;">' +
        '<img id="wd-stand-task-note' + beacon_id + '" src="/img/Remarks.png" title="' + decodeURIComponent(beacon_Note) + '">' +
        '</div>' +
        // <!-- 日志与评论 -->
        '<div id="wd-stand-div' + beacon_id + '" class="wd-stand-info" style="margin-left: 5px;">' +
        '<img src="/img/info.png" id="wd-stand-info' + beacon_id + '" title="日志与评论">' +
        '<label id="wd-stand_info_label' + beacon_id + '" style="font-size:8px;color: gray;"></label>' +
        '</div>' +
        // <!-- 日期 -->
        '<div id="wd-stand-date&' + beacon_id + '" class="wd-stand-date" onclick="standtimehash(\'' + beacon_id + "','" + beacon_id + '\')" style="margin-left: 5px;cursor: pointer;display:none;font-size: 12px;">' +
        '(' + ShowTime(dateyear(decodeURIComponent(beacon_Expect_end_time))) + ')' +
        '</div>' +
        '<a href="#wd-stand-date&' + beacon_id + '" class="wd-stand-date' + beacon_id + '" style="margin-left: 5px;cursor: pointer;font-size: 12px;color:rgb(85, 85, 85)">' +
        '(' + ShowTime(dateyear(decodeURIComponent(beacon_Expect_end_time))) + ')' +
        '</a>' +
        // <!-- 指派人 -->
        '<div id="wd-stand-assigned&' + beacon_id + '" onclick="standpeophash(\'' + beacon_id + "','" + beacon_id + '\')" style="margin-left: 10px;cursor: pointer;display:none;font-size: 12px;">' +
        '' +
        '</div>' +
        '<a href="#wd-stand-assigned&' + beacon_id + '" class="wd-stand-assigned' + beacon_id + '" style="margin-left: 10px;cursor: pointer;font-size: 12px;">' +
        '' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="wd-stand-suball" id="wd-stand-suball' + beacon_id + '" style="float: left;width: 79%;display:none;">'+
        '<div id="wd_stand_suballtask' + beacon_id + '"></div>'+
        '<div id="wd_stand_addsub_statefour' + beacon_id + '"></div>'+
        '<div id="wd_stand_addsub_statefive' + beacon_id + '"></div>'+
        '<div id="wd-stand-addsub' + beacon_id + '"></div>'+
    
      
        '</div>'
    $('.wd_add_beaocn_task_fini'+wd_Id).append(task_stand_black)
    sub_change(beacon_id, beacon_id) //添加子任务
    stand_modisty(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, beacon_id, alltag, beacon_tag)
    wd_sub_detail(beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, beacon_id) //详情页加评论
    cckdetials(beacon_id, beacon_id)
    task_state(beacon_id, beacon_State, beacon_id)
    stand_an(beacon_id)
    hashh(beacon_id, beacon_id, beacon_State, allper, adduserMo, alltag)
    five_div_subtask_state_detials(beacon_id)
    if (beacon_State == '3') {
        $('#wd-stand-sub-add' + beacon_id).hide();
        $('#wd-details-sub-add' + beacon_id).hide();
    }
}
function getAll(begin, end) {
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
    var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
    for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push((new Date(parseInt(k))).format());
    }
    return arr;
}
//localStorage删除指定键对应的值
function deleteItem() {
    localStorage.removeItem('beacon_id');
}
function beacon_task_find(gid, allper, adduserMo, alltag) {
    $.ajax({
        url: "/task/detail/" + gid,
        type: 'GET',
        success: function (data) {
            let boj = decodeURIComponent(data.data)
           
            let beacon_task_list = JSON.parse(boj.replace(/\+/g, '%20'))
            let wd_Id = beacon_task_list.Task_class_id;
            var beacon_id = beacon_task_list.Task_id; //任务ID
            var beacon_Head_user_id = beacon_task_list.Task_head_user_id; //用户ID
            var beacon_Name = beacon_task_list.Task_name.replace(/\+/g, '%20'); //任务名称
            var beacon_Note = decodeURIComponent(beacon_task_list.Task_note.replace(/\+/g, '%20')); //任务备注
            var beacon_State = beacon_task_list.Task_state.replace(/\+/g, '%20'); //任务状态
            var beacon_End_time = beacon_task_list.Task_end_time.replace(/\+/g, '%20'); //任务的结束时间
            var beacon_Expect_end_time = beacon_task_list.Task_expect_end_time.replace(/\+/g, '%20'); // 预计时间
            var beacon_tag = beacon_task_list.Task_tag.replace(/\+/g, '%20'); //任务标签
            var beacon_sub = beacon_task_list.Task_sub; //子任务
            var beacon_Log_comment = beacon_task_list.Task_log_comment;
            var beacon_Log_comment_limit = beacon_task_list.Task_log_comment_limit;
            var beacon_Log_comment_start = beacon_task_list.Task_log_comment_start;
            var beacon_Log_comment_total = beacon_task_list.Task_log_comment_total;

            wd_show_taskwanc(wd_Id,beacon_id, beacon_Head_user_id, beacon_Name, beacon_Note, beacon_State, beacon_End_time, beacon_Expect_end_time, beacon_id, allper, alltag, beacon_tag) //添加任务页面
            // 判断任务的状态
            wd_show_tag(beacon_tag, beacon_id)
            wd_show_note(beacon_Note, beacon_id) //任务备注

            wd_show_head_user(beacon_id, beacon_id, allper, beacon_Head_user_id)
            // wd_show_shaiuser(adduserMo)
            wd_show_info(beacon_id, beacon_Log_comment, beacon_Log_comment_limit, beacon_Log_comment_start, beacon_Log_comment_total, beacon_id)

            wd_stand_modisty(beacon_tag, alltag, beacon_id)
            wd_show_user_Mo(adduserMo, beacon_id, beacon_Head_user_id)

            wd_stand_commit(beacon_id, beacon_id, beacon_Log_comment)
            details_stand_task_sub(beacon_sub, beacon_id)
            if (beacon_sub != null) {
                wd_show_fini_sub(beacon_sub, beacon_id)
            } else {

            }
            $('#wd_beacon_task_finish').hide();
            if (beacon_State != '3') {
                $('#wd-stand-details-form' + gid).remove();
                $('#wd-stand-alltask' + gid).remove();
            }
            else {
                $('#wd-stand-alltask' + gid).remove();
                //  $('#wd-stand-details-form'+gid).remove();
                // $('#wd-stand-alltask'+gid).remove();

                $('#wd-stand-details-close' + gid).click(function () {
                    $('#wd-stand-details-form' + gid).remove();
                })
            }


        },
        error: function (xhr, errorMessage, e) {
            alert(e);
        }
    });
}
function details_stand_task_sub(beacon_sub, i) {
    $('#wd-stand-sub_stat' + i).html(detials_task_sub(beacon_sub))
    $('#wd-stand-sub_statclose' + i).html(detials_task_sub(beacon_sub))

    $('#wd-details-sub-fins-close' + i).html(detials_task_sub(beacon_sub))
    $('#wd-details-sub-fins-open' + i).html(detials_task_sub(beacon_sub))
}
function detials_task_sub(Task_sub) {
    if (Task_sub != null) {
        var totalsub = new Array();
        // 检查项状态，定义“-1”为不可用，“0”为冻结状态，“1”为正常(未开始或暂停)，“2”为开始状态，“3”为已完成，默认为”1“。
        // let totalsub = Task_sub.length;
        let subok = 0;
        for (let k = 0; k < Task_sub.length; k++) {
            if (Task_sub != null) {
                let sub_State = Task_sub[k].Sub_state;
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
function wd_show_fini_sub(beacon_sub, beacon_id) {
    sub_sorting(beacon_sub)
    for (s = 0; s < beacon_sub.length; s++) {
        
        let sub = beacon_sub[s];
        var sub_id = sub.Id; //子任务的iD
        var sub_Expect_end_time = sub.Sub_expect_end_time.replace(/\+/g, '%20'); //子任务预计结束时间
        var sub_End_time = sub.Sub_end_time.replace(/\+/g, '%20'); //子任务的结束时间
        var sub_Content = sub.Sub_content.replace(/\+/g, '%20'); //子任务的内容
        var sub_Check_result = sub.Sub_check_result.replace(/\+/g, '%20'); //子任务检查结果
        var sub_Performance_id = sub.Sub_performance_id.replace(/\+/g, '%20'); //子任务的审核id
        var sub_State = sub.Sub_state; //任务的状态
        wd_show_view(sub_id, sub_Expect_end_time, sub_End_time, sub_Content, sub_Check_result, sub_Performance_id, sub_State, s, beacon_id)
        wd_stand_detail_sub(sub_id, sub_Expect_end_time, sub_End_time, sub_Content, sub_Check_result, sub_Performance_id, sub_State, s, beacon_id)
        wd_if_subpause(sub_State, s, beacon_id, sub_Performance_id, sub_Check_result)
        five_div_subtask_state_detials(beacon_id)
    }
}