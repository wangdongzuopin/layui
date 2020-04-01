
function option6() {
    var optin1 = $('.wd-new-option1').children().text();
    $('.wd-new-work-days').val(optin1)
    $('input[name="check_work_day_num"]').val(optin1)
    hde()
}
// value为2的option
function option7() {
    var optin2 = $('.wd-new-option2').children().text();
    $('.wd-new-work-days').val(optin2)
    $('input[name="check_work_day_num"]').val(optin2)
    hde()
}
// value为3的option
function option8() {
    var optin3 = $('.wd-new-option3').children().text();
    $('.wd-new-work-days').val(optin3)
    $('input[name="check_work_day_num"]').val(optin3)
    hde()
}
// value为4的option
function option9() {
    var optin4 = $('.wd-new-option4').children().text();
    $('.wd-new-work-days').val(optin4)
    $('input[name="check_work_day_num"]').val(optin4)
    hde()
}
// value为5的option
function option0() {
    var optin5 = $('.wd-new-option5').children().text();
    $('.wd-new-work-days').val(optin5)
    $('input[name="check_work_day_num"]').val(optin5)
    hde()
}
function newbutton() {
    var new_input_shuru = $('.wd-new-shuru-input').val();
    if (new_input_shuru != '') {
        if (isNaN(new_input_shuru) == false) {
            $('.wd-new-work-days').val(new_input_shuru)
            hde()
        } else {
            $('.wd-new-work-days').val('0')
            layer.msg('输入有效的报告工时')
        }
       
    } else {
        $('.wd-new-work-days').val('0')
        layer.msg('报告工时不能为空')
    }
   
    $('.wd-new-shuru-input').val('')
}
function hde() {
    $('.wd_new-corre-option').css('display', 'none');
}
function newsgong() {
    $('.wd_new-corre-option').css('display', 'inline');
}
$(function () {
    $(document).bind("click", function (e) {
        if ($(e.target).closest(".wd-new-work-input").length > 0) {
            // $(".wd_new-corre-option").show();
        } else {
            $(".wd_new-corre-option").hide();
        }
    });
    $(".wd_new-corre-option").click(function (event) {
        event.stopPropagation();

    });
});
// 鼠标的干活
function mousedeyong(old_work_day_num) {
    // $('.wd-new-work-input').mouseover(function () {
    $('.wd-new-work-days').css('border-bottom', '1px dashed gray')
    // })
    // $('.wd-new-work-input').mouseleave(function () {
    //     $('.wd-new-work-days').css('border', '0')
    // })
}
// 报告工时自动计算
function timebet1(time1, time2) {
    var time = new Date(time2);
    var day = time.getDay();
    if (day == '0' || day == '6') {
        layer.tips('期间有休息日，请谨慎选择,或者标注原因在附言中', '.wd-new-work-days')
    }
    var timee = new Date(time1);
    var day = timee.getDay();
    if (day == '0' || day == '6') {
        layer.tips('期间有休息日，请谨慎选择,或者标注原因在附言中', '.wd-new-work-days')
    }
    if (time1 > time2) {
        $('.wd-new-work-days').val('0')
    } else {
        let hetadd = getAll(time1, time2)
        addendstarttime(hetadd)
        var days = daybetween(time1, time2);
        if (days > 100) {
            layer.tips('工时太多了，慎重', '.wd-new-work-days')
            $('.wd-new-work-days').val('0')
        }
        else {
            $('.wd-new-work-days').val(days)
        }
    }
}
// 报告工时自动计算
function timebet2(time1, time2) {
    var time = new Date(time2);
    var day = time.getDay();
    if (day == '0' || day == '6') {
        layer.tips('期间有休息日，请谨慎选择,或者标注原因在附言中', '.wd-new-work-days')
    }
    var timee = new Date(time1);
    var day = timee.getDay();
    if (day == '0' || day == '6') {
        layer.tips('期间有休息日，请谨慎选择,或者标注原因在附言中', '.wd-new-work-days')
    }
    if (time1 > time2) {
        $('.wd-new-work-days').val('0')
    } else {
        let hetadd = getAll(time1, time2)
        addendstarttime(hetadd)
        var days = daybetween(time1, time2);
        if (days > 100) {
            // layer.tips('你不觉得工时太大了吗', '.wd-new-work-days')
            $('.wd-new-work-days').val('0')
        }else {
            $('.wd-new-work-days').val(days)
        }
    }
}
//期间有休息日，请谨慎选择
function addendstarttime(hetadd) {
    for (let i = 0; i < hetadd.length; i++) {
        var time = new Date(hetadd[i]);
        var day = time.getDay();
        if (day == '0' || day == '6') {
            layer.tips('期间有休息日，请谨慎选择,或者标注原因在附言中', '.wd-new-work-days')
        }
    }
}
//期间有休息日，请谨慎选择
function addstartendtime(hetadd) {
    for (let i = 0; i < hetadd.length; i++) {
        var time = new Date(hetadd[i]);
        var day = time.getDay();
        if (day == '0' || day == '6') {
            layer.tips('期间有休息日，请谨慎选择,或者标注原因在附言中', '.wd-new-work-days')
        }
    }
}
// 子任务点击，所有即隐藏
function new_task_yulan(k, i, j, subTask) {

}
// 任务的备注
function newtitlenote(task_note, k, i) {
    if (task_note != '') {
        $('.wd-new-task_note' + k + i).show();
    } else {
        $('.wd-new-task_note' + k + i).hide();
    }
}
function erformance_id(sub_performance_id, k, i, j) {
    if (sub_performance_id == "") {
        $('#wd-new-sub-hidden' + i + k + j).val('0');
        $('#wd-new-sub-cbx' + i + k + j).attr('checked', false)
        $('#wd-new-cbx-all' + k + i).attr('checked', false)
        $('#wd-new-cbx-all' + k + i).val('0')
        if($('#wd-new-task-all' + k+ i + ' .wd_new_cbx_all_input').val() == '1'){
            $('#wd-new-cbx-all' + k + i).val('1')
        }else{
            $('#wd-new-cbx-all' + k + i).val('0')
        }
        // 未选中清空文本
        $('#wd-new-sub-task-textarea' + k + i + j).val('');
        
    } else if (sub_performance_id != "") {
        $('#wd-new-sub-cbx' + i + k + j).attr('checked', true)
        $('#wd-new-sub-hidden' + i + k + j).val('1')
        $('#wd-new-cbx-all' + k + i).attr('checked', true)
        $('#wd-new-cbx-all' + k + i).val('1')
        
    }
    
}
// $(function () {
//     //监控checkbox代码
//     $("input[name='Agreements']").on("change", function () {
//         var change = $("input[type='checkbox']").is(':checked'); //checkbox选中判断
//         if (change) {

//             $("#SureBtn").css("display", "block");
//             $("#SureBtn").click(function () {
//                 var str = $(" input[name='WorkYears']").val();
//                 alert($("input[name='Agreements']").is(':checked'));
//             })
//         } else {
//             $("#SureBtn").css("display", "none");
//             return false;
//         }
//     })
// })

function allchecked(k, i, j) {


    // 实现checkbox全选
    let all_tmp = $('#wd-new-cbx-all' + k + i);
    let son_tmp = $('#wd-new-sub-cbx' + i + k + j);
    all_tmp.click(function () {
        if (this.checked) {
            $(son_tmp).prop('checked', true)
            $('#wd-new-sub-hidden' + i + k + j).val('1')
            $('#wd-new-cbx-all' + k + i).val('1')

        } else {
            $(son_tmp).prop('checked', false)
            $('#wd-new-sub-hidden' + i + k + j).val('0')
            $('#wd-new-cbx-all' + k + i).val('0')
        }
        checkboxne(k, i, j)
    })
    $('#wd-new-sub-cbx' + i + k + j).click(function () {
        $('#wd-new-sub-cbx' + i + k + j).each(function () {
            if (this.checked) {
                $('#wd-new-sub-hidden' + i + k + j).val('1')
                // $('#wd-new-cbx-all' + k + i).val('1')

            } else {
                $('#wd-new-sub-hidden' + i + k + j).val('0')
                // $('#wd-new-cbx-all' + k + i).val('-2')

            }
            checkboxnesub(k, i, j)
        })
    })
    // 预览按钮
    $('.wd-Previews').click(function () {
        $('#wd-new-Backstage' + i).hide();
        $('#wd-new-old-all'+i+k).show();
        // $('#wd-new-cbx-all' + k + i).each(function () {
        if ($('#wd-new-cbx-all' + k + i).is(":checked")) {
            if ($('#wd-new-sub-cbx' + i + k + j).is(":checked")) {
                $('#wd-new-sub-task' + i + k + j).show();
                // if($('#wd_new_div_title'+i).val() == '0'){
                //     $('#wd-new-Backstage' + i).hide();
                // }else{
                //     $('#wd-new-Backstage' + i).show();
                // }
            } else {
                $('#wd-new-sub-task' + i + k + j).hide();
            }
        } else if ($('#wd-new-sub-hidden' + i + k + j).val() == '1') {
            $('#wd-new-task-all' + k + i).show();
            $('#wd-new-sub-task' + i + k + j).show();
            // $('#wd-new-Backstage' + i).show();
        }
        else {
            if ($('#wd-new-sub-cbx' + i + k + j).is(":checked")) {
                $('#wd-new-task-all' + k + i).show();
                $('#wd-new-sub-task' + i + k + j).show();
            } else {
               
                // $('#wd-new-task-all' + k + i).hide();
                $('#wd-new-sub-task' + i + k + j).hide();
                if ($('#wd-new-cbx-all' + k + i).val() == '01') {
                } 
                else if($('#wd-new-cbx-all' + k + i).val() == '1'){
                }
                else if($('#wd-new-cbx-all' + k + i).val() == '0'){
                    $('#wd-new-task-all' + k + i).hide();
                }
                else if($('#wd-new-cbx-all' + k + i).val() == '-2'){
                    $('#wd-new-task-all' + k + i).hide();
                }
                else {
                    // $('#wd-new-task-all' + k + i).hide();
                    //  $('#wd-new-Backstage' + i).show();
                }
            };
        }

    })

    $('.wd-perviews-return').click(function () {
        $('#wd-new-task-all' + k + i).show();
        $('#wd-new-Backstage' + i).show();
        $('#wd-new-sub-task' + i + k + j).show();
        $('#wd-new-old-all'+i+k).hide();
        // $('#wd-new-task-task-show'+k+i).show();
    })
}
function checkboxne(k, i, j) {
    var rrr = new Array();
    let arr = $('#wd-new-div-alll' + i + ' .wd_new_cbx_all_input')
    for (let j = 0; j < arr.length; j++) {
        rrr.push(arr[j].getAttribute('value'));
    }
    let index = rrr.indexOf('-2');
    
    if (index == -1) {
        $('#wd-new-task-all' + k + i).show();
        $('#wd-new-Backstage'+i).show();
    } else {
        $('#wd_new_div_title'+i).val(index)
    }
}
function checkboxnesub(k, i, j) {
    var aaa = new Array();
    let sub_arr = $('#wd-new-task-all' + k + i + ' .wd-new-sub-hidden')
    for (let s = 0; s < sub_arr.length; s++) {
        aaa.push(sub_arr[s].getAttribute('value'));
    }
    let dex = aaa.indexOf('0');
    for (z = 0; z < aaa.length; z++) {
        if (aaa[z] == '1') {
            $('#wd-new-cbx-all' + k + i).val(aaa[z])
        } else {
            $('#wd-new-cbx-all' + k + i).val(dex)
        }
        $('#wd-new-sub-cbx' + i + k + j).click(function () {
            $('#wd-new-sub-cbx' + i + k + j).each(function () {
                if (this.checked) {
                    $('#wd-new-sub-hidden' + i + k + j).val('1')
                    // $('#wd-new-cbx-all' + k + i).val('1')
    
                } else {
                    $('#wd-new-sub-hidden' + i + k + j).val('0')
                    // $('#wd-new-cbx-all' + k + i).val('-2')
    
                }
            })
        })
    }

    if (dex == -1) {
        $('#wd-new-cbx-all' + k + i).prop('checked', true)
    } else {
        $('#wd-new-cbx-all' + k + i).prop('checked', false)
    }
}


//考核预览功能如下
function previews() {
    $('.wd-new-Preview').prepend('<button class="wd-Previews" value="" onclick="print()">提交审核</button>')//新加按钮
    $('input:checkbox').css('display', 'none');//选中框消失
    $('textarea').attr('readonly', 'readonly');//禁止输入，只读
    $('textarea').css('border', '0');//边框消失
    $('input').attr('readonly', 'readonly');//禁止输入，只读
    $('input').css('pointer-events', 'none');//事件结束
    $('input').css('border', '0');//边框消失
    $('select').css('pointer-events', 'none');//事件结束
    $('select').css('border', '0');//事件结束
    $('textarea').css('cursor', 'default ');//选中框鼠标样式
    $('.wd-new-Preview input').hide();//按钮隐藏
    $('.wd-perviews-return').show();
    $('.wd-new-per').hide();//视觉效果
    $('.wd-new-per').fadeIn(500);
}
function retrun_previews() {
    $("input[name='task_sub_id']:not(:checked)").each(function () {
        //如何未选中，则点击显示
        $(this).parent().parent().show();
        $('.wd-view-sub-task').remove();
    });
    $('input:checkbox').show()//选中框消失
    $('input:checkbox').css('cursor', 'default ');//选中框鼠标样式
    $('textarea').removeAttr('readonly', 'readonly');//禁止输入，只读
    $('textarea').css('border', '1px solid gainsboro');//边框消失
    $('textarea').css('cursor', 'auto');//选中框鼠标样式
    $('input').removeAttr('readonly', 'readonly');//禁止输入，只读

    $('input').css('border', '1px solid gainsboro');//边框消失
    $('input:text').css('cursor', 'text');//鼠标样式禁止
    $('input:submit').css('cursor', 'pointer');//鼠标样式禁止
    $('input').css('pointer-events', 'auto');//事件结束
    $('select').removeAttr('disabled', 'disabled');//禁止输入，只读
    $('select').css('cursor', 'pointer');//鼠标样式禁止
    $('select').css('pointer-events', 'auto');//事件结束
    $('select').css('border-bottom', '1px dashed');//事件结束
    $('.wd-new-Preview input').show();//按钮隐藏
    $('button').hide();//取消按钮隐藏
    $('.wd-new-per').hide();//视觉效果
    $('.wd-new-per').fadeIn(500);
}
// 提交考核
function print() {
    var task_sub = [];
    //获取当前checkbox的value和内容
    $(document).ready(function () {
        $("input[name='task_sub_id']:checked").each(function () {
            let text = $(this).parent('div').siblings('div').children('textarea').val();

            let subid = $(this).val();
            let sub = '{"task_sub_id":"' + subid + '","check_note":"' + encodeURI(text) + '"}';
            task_sub.push(sub);
        })
    })
    var work_day_num = $('input[name="work_day_num"]').val(); //考核工时
    var check_start_date = $("input[name='check_start_date']").val();//考核周期开始日期。
    var check_end_date = $("input[name='check_end_date']").val();//考核周期结束日期。
    var checker_id = $("select[name='checker_id']").val();//审核者ID。
    var task_sub_id = $("input[name='task_sub_id']").val();  //子任务ID。
    var update_check_note = $(".wd-new-update-text textarea[name='check_note']").val(); //考核备注。
    var share_check_note = $(".wd-new-share-text textarea[name='check_note']").val(); //考核备注。
    var subject = $("input[name='subject']").val();//主题。
    var participation = $("input[name='participation']").val();  //实际参与人数。
    var date = $("input[name='date']").val();//分享日期。
    var reporter_postscript = $("textarea[name='reporter_postscript']").val(); //报告人附言。

    //拼接分享
    var share = '{"subject":"' + encodeURI(subject) + '","participation":"' + participation + '","date":"' + date + '","check_note":"' + encodeURI(share_check_note) + '"}';
    //拼接字符串
    if (share.length > 59) {
        var object = '{"check_start_date":"' + check_start_date + '","check_end_date":"' + check_end_date + '","work_day_num":"' + work_day_num + '","checker_id":"' + checker_id
            + '","task_sub":[' + task_sub + '],"innovate_check":{"check_note":"' + encodeURI(update_check_note) + '"},"share_check":' + share + ',"reporter_postscript":"' +
            encodeURI(reporter_postscript) + '"}'
    } else {
        var object = '{"check_start_date":"' + check_start_date + '","check_end_date":"' + check_end_date + '","work_day_num":"' + work_day_num + '","checker_id":"' + checker_id
            + '","task_sub":[' + task_sub + '],"innovate_check":{"check_note":"' + encodeURI(update_check_note) + '"},"reporter_postscript":"' +
            encodeURI(reporter_postscript) + '"}'
    }
    let obj = encodeURIComponent(object);
    $.ajax({
        url: "/performance/submit",
        type: "POST",
        data: obj,
        success: function (result, testStatus, data) {
            if (result.state == 0) {
                layer.msg(result.msg);
            } else if (result.state == 1) {
                layer.msg(result.msg);
                setTimeout(function () {
                    window.location.reload();
                }, 1000)

            }
        },
        error: function (xhr, errorMessage, e) {
            alert("系统异常");
        }
    })
}
// 保存功能
function save() {
    var task_sub = [];
    //获取当前checkbox的value和内容
    $(document).ready(function () {
        $("input[name='task_sub_id']:checked").each(function () {
            let text = $(this).parent('div').siblings('div').children('textarea').val();

            let subid = $(this).val();
            let sub = '{"task_sub_id":"' + subid + '","check_note":"' + encodeURI(text) + '"}';
            task_sub.push(sub);
        })
    })
    var work_day_num = $('input[name="work_day_num"]').val(); //考核工时
    var check_start_date = $("input[name='check_start_date']").val();//考核周期开始日期。
    var check_end_date = $("input[name='check_end_date']").val();//考核周期结束日期。
    var checker_id = $("select[name='checker_id']").val();//审核者ID。
    var task_sub_id = $("input[name='task_sub_id']").val();  //子任务ID。
    var update_check_note = $(".wd-new-update-text textarea[name='check_note']").val(); //考核备注。
    var share_check_note = $(".wd-new-share-text textarea[name='check_note']").val(); //考核备注。
    var subject = $("input[name='subject']").val();//主题。
    var participation = $("input[name='participation']").val();  //实际参与人数。
    var date = $("input[name='date']").val();//分享日期。
    var reporter_postscript = $("textarea[name='reporter_postscript']").val(); //报告人附言。
    //拼接字符串
    //拼接分享
    var share = '{"subject":"' + encodeURI(subject) + '","participation":"' + participation + '","date":"' + date + '","check_note":"' + encodeURI(share_check_note) + '"}';
    //拼接字符串
    if (share.length > 59) {
        var object = '{"check_start_date":"' + check_start_date + '","check_end_date":"' + check_end_date + '","work_day_num":"' + work_day_num + '","checker_id":"' + checker_id
            + '","task_sub":[' + task_sub + '],"innovate_check":{"check_note":"' + encodeURI(update_check_note) + '"},"share_check":' + share + ',"reporter_postscript":"' +
            encodeURI(reporter_postscript) + '"}'
    } else {
        var object = '{"check_start_date":"' + check_start_date + '","check_end_date":"' + check_end_date + '","work_day_num":"' + work_day_num + '","checker_id":"' + checker_id
            + '","task_sub":[' + task_sub + '],"innovate_check":{"check_note":"' + encodeURI(update_check_note) + '"},"reporter_postscript":"' +
            encodeURI(reporter_postscript) + '"}'
    }
    let obj = encodeURIComponent(object);
    $.ajax({
        url: "/performance/save",
        type: "POST",
        data: obj,
        success: function (result, testStatus, data) {

            if (result.state == 0) {
                layer.msg(result.msg);
            } else if (result.state == 1) {
                layer.msg(result.msg);
                setTimeout(function () {
                    window.location.reload();
                }, 1000)
            }
        },
        error: function (xhr, errorMessage, e) {
            alert("系统异常");
        }
    })
}


