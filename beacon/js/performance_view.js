function sign(i) {
    i = i.replace(/\+/g, ' ');
    return i;
}
function option1() {
    var optin1 = $('.wd-view-option1').children().text();
    $('.wd_view_correction').text(optin1)
    $('input[name="check_work_day_num"]').val(optin1)
    efficiency()
    total()
    $(".wd_view-corre-option").hide();
}
// value为2的option
function option2() {
    var optin2 = $('.wd-view-option2').children().text();
    $('.wd_view_correction').text(optin2)
    $('input[name="check_work_day_num"]').val(optin2)
    efficiency()
    total()
    $(".wd_view-corre-option").hide();
}
// value为3的option
function option3() {
    var optin3 = $('.wd-view-option3').children().text();
    $('.wd_view_correction').text(optin3)
    $('input[name="check_work_day_num"]').val(optin3)
    efficiency()
    total()
    $(".wd_view-corre-option").hide();
}
// value为4的option
function option4() {
    var optin4 = $('.wd-view-option4').children().text();
    $('.wd_view_correction').text(optin4)
    $('input[name="check_work_day_num"]').val(optin4)
    efficiency()
    total()
    $(".wd_view-corre-option").hide();
}
// value为5的option
function option5() {
    var optin5 = $('.wd-view-option5').children().text();
    $('.wd_view_correction').text(optin5)
    $('input[name="check_work_day_num"]').val(optin5)
    efficiency()
    total()
    $(".wd_view-corre-option").hide();
}

// 自定义校正工时
function button() {
    var view_input_shuru = $('.wd-view-shuru-input').val();
    if (view_input_shuru != '') {
        if (isNaN(view_input_shuru) == false) {
            $('.wd_view_correction').text(view_input_shuru)
            $(".wd_view-corre-option").hide();
        } else {
            $('.wd_view_correction').text('0')
            $('.wd-view-shuru-input').val('')
            layer.msg('输入有效的报告工时')
        }
    } else {
        $('.wd_view_correction').text('0')
         layer.msg('报告工时不能为空')
    }

    efficiency()
    total()
}
// 点击其他隐藏，校正工时

function dianjicor() {
    $(".wd_view-corre-option").toggle();
}
function dianjispan() {
    $(".wd_view-corre-option").toggle();
}
function dianjiinput() {
    $(".wd_view-corre-option").toggle();
}
function dinajispant() {
    $(".wd_view-corre-option").toggle();
}
// 这是审核通过的按钮
function confirm(k, i, j) {
    $('#wd-view-sub-ok' + k + i + j).prop('checked', true)
    $('#wd-view-sub-bad' + k + i + j).prop('checked', false)
    var through = $('#wd-view-sub-through' + k + i + j);
    var unthrough = $('#wd-view-sub-unthrough' + k + i + j);
    // 点击通过按钮，显示通过
    through.fadeIn();
    unthrough.hide();
    through.attr('value', '1');
    through.val('1');
    efficiency()
    notthrough()
    total()
}
// 这是未审核通过的按钮
function unconfirm(k, i, j) {
    $('#wd-view-sub-ok' + k + i + j).prop('checked', false)
    $('#wd-view-sub-bad' + k + i + j).prop('checked', true)
    var through = $('#wd-view-sub-through' + k + i + j);
    var unthrough = $('#wd-view-sub-unthrough' + k + i + j);
    // 点击通过按钮，显示通过
    through.hide();
    unthrough.fadeIn();
    through.attr('value', '0');
    through.val('0');
    efficiency()
    notthrough()
    total()
}
// 创新审核通过按钮
function update() {
    var texrt = $('.wd-view-innovate-performance-up');
    var untexrt = $('.wd-view-innovate-performance-un');
    texrt.prop('checked', true);
    untexrt.prop('checked', false);
    var update_performance = $('.wd-view-update-through');
    var unupdate_performance = $('.wd-view-update-unthrough');
    update_performance.fadeIn();
    texrt.attr('value', '1');
    texrt.val('1');
    unupdate_performance.hide();
    shaer_inn()
    //审评结果输出
    if ($('.wd-view-innovate-performance-up:checked')) {
        //检查项通过输出
        $('.td-innovate').html('<label style="color:#3399FF;">【通过】</label>')
    }
    else {
        $('.td-innovate').html('【无】')
    }

}
// 创新审核未通过按钮
function unupdate() {
    var texrt = $('.wd-view-innovate-performance-up');
    var untexrt = $('.wd-view-innovate-performance-un');
    texrt.prop('checked', false);
    untexrt.prop('checked', true);
    var update_performance = $('.wd-view-update-through');
    var unupdate_performance = $('.wd-view-update-unthrough');
    unupdate_performance.fadeIn();
    texrt.attr('value', '0');
    texrt.val('0');
    untexrt.attr('value', '0');
    untexrt.val('0');
    update_performance.hide();
    shaer_inn()
    //审评结果输出
    if ($('.wd-view-innovate-performance-un:checked')) {
        $('.td-innovate').html('<label style="color:red;">【未通过】</label>')
    } else {
        $('.td-innovate').html('【无】')
    }

}
// 分享审核通过按钮
function nshare() {
    var share = $('.wd-view-share-performance-up');
    var unshare = $('.wd-view-share-performance-un');
    share.prop('checked', true);
    unshare.prop('checked', false);
    var share_performance = $('.wd-view-share-through');
    var unshare_performance = $('.wd-view-share-unthrough');
    share_performance.fadeIn();
    share.attr('value', '1');
    share.val('1');
    unshare.attr('value', '0');
    unshare.val('0');
    unshare_performance.hide();
    shaer_inn()
    //审评结果输出
    if ($('.wd-view-share-performance-up:checked')) {
        $('.td-share').html('<label style="color:#3399FF;">【通过】</label>')
    } else {
        $('.td-share').html('【无】')
    }

}
// 分享审核未通过按钮
function unshare() {
    var share = $('.wd-view-share-performance-up');
    var unshare = $('.wd-view-share-performance-un');
    share.prop('checked', false);
    unshare.prop('checked', true);
    var share_performance = $('.wd-view-share-through');
    var unshare_performance = $('.wd-view-share-unthrough');
    unshare_performance.fadeIn();
    share.attr('value', '0');
    share.val('0');
    unshare.attr('value', '0');
    unshare.val('0');
    share_performance.hide();
    shaer_inn()
    //审评结果输出
    if ($('.wd-view-share-performance-un:checked')) {
        $('.td-share').html('<label style="color:red;">【未通过】</label>')
    } else {
        $('.td-share').html('<label>【无】</label>')
    }

}
// 创新与分享如果有一个value=1则加一份
function shaer_inn() {
    var innovate = $('.wd-view-innovate-performance-up').val();
    var share = $('.wd-view-share-performance-up').val();
    var inn = Number(innovate)
    var ier = inn + Number(share)
    if (ier == 0) {
        // 分数
        $('.share-score').html('0')
    } else {
        // 分数
        $('.share-score').html('1')
    }
    total()
}
// 未通过项
function notthrough() {
    var notth = [];
    $(".wd-view-sub-through").each(function () {
        if ($(this).val() != '') {
            notth.push($(this).val())
        }
    });
    // if (notth.length == Checkitem.length) {
    // 循环遍历一下
    let obj = [];
    for (i = 0; i < notth.length; i++) {
        if (notth[i] == '0') {
            obj.push(notth[i])
            //  $('.wd-view-truth').html('0')
        }
    }
    $('.wd-view-nothrough').html(obj.length)
    if (obj.length != '0') {
        $('.wd_view_correction').html('0')
        
        // $('.wd_view-corre').css('pointer-events', 'none')
    } else {
        $('.wd_view-corre').css('pointer-events', 'auto')
    }
    //  判断如果有0存在，未通过，则真实度分数为0

    if (obj.length == '') {
        $('.wd-view-truth').html('1')
        $('.wd-view-Newtask').html('0')
    } else {
        $('.wd-view-truth').html('0')
        $('.wd-view-bug').html('0')
        $('.wd-view-Newtask').html('0')
    }
    efficiency();
    bug()
    // }

}
// bug任务检查项
function bug() {
    var debug = [];
    var deyanchi = [];
    $('.wd-view-bugger').each(function () {
        var bugger = $(this).text();
        if (bugger == '<BUG>') {
            debug.push(bugger)
            
        }
    })
    $('.wd-view-bugger').each(function () {
        var bugger = $(this).text();
        if (bugger == '<延迟>') {
            deyanchi.push(bugger)
            
        }
    })
    $('.wd-view-evaluation-bug').html(debug.length)
    $('.wd-view-evaluation-delay').html(deyanchi.length)
    if (debug.length == 0) {
        $('.wd-view-Newtask').html('1')
        if($('.wd-view-truth').text() == '0'){
            $('.wd-view-Newtask').html('0')
        }else{
            
        }
        // $('.wd-view-bug').html('1')
    } else {
        $('.wd-view-Newtask').html('0')

        // $('.wd-view-bug').html('0') 
    }

    if (deyanchi.length == 0) {
        // $('.wd_view_correction').text('1')
        $('.wd_view-corre').css('pointer-events','')
    } else {
        $('.wd_view_correction').text('1')
        $('.wd-view-corrinput').val('1')
        $('.wd_view-corre').css('pointer-events','none')
    }
    // total()
}
// 工作效率
function efficiency() {
    var eff = $('.Report_time').text();
    var efficiency = eff.replace(/\天/g, '')
    var corr = $('.wd_view_correction').text();
    if (efficiency == corr) {
        $('.wd-view-sub-through').each(function () {
            if ($(this).val() == '0') {
                $('.wd-view-bug').html('0')
            } else {
                $('.wd-view-bug').html('1')
            }
        })
    } else if ($('.wd-view-truth').text() == '0') {
        $('.wd-view-bug').html('0')
    }
    else {
        $('.wd-view-bug').html('0')
    }
    // notthrough（）
}
//总计
function total() {
    var truth = $('.wd-view-truth').text();
    var bug = $('.wd-view-bug').text();
    var Newtask = $('.wd-view-Newtask').text();
    var score = $('.share-score').text();
    var total = Number(truth) + Number(bug) + Number(Newtask) + Number(score) + 1;

    $('.wd-view-total').html(total)
}
// 提交审核接口
function finish_performance() {
    var data = [];//定义数组
    var ok_task_sub = [];
    var bad_task_sub = [];
    var tmp = $('#wd-view-performant').serialize();
    var view_arr = tmp.split('&');
    for (i = 0; i < view_arr.length; i++) {
        var view_arr_arr = view_arr[i].split('=');
        if (view_arr_arr[0] == 'ok_task_sub') {
            ok_task_sub.push(view_arr_arr[1]);
        } else if (view_arr_arr[0] == 'bad_task_sub') {
            bad_task_sub.push(view_arr_arr[1])
        } else {
            data.push(view_arr[i]);
        }
    }
    // 判断ok如果为空
    if (ok_task_sub == '') {
        data.push("ok_task_sub:");
    } else {
        data.push("ok_task_sub=" + ok_task_sub.join(","));
    }
    // 判断bad如果为空
    if (bad_task_sub == '') {
        data.push("bad_task_sub:");
    } else {
        data.push("bad_task_sub=" + bad_task_sub.join(","));
    }
    data = data.join('&');
    $.ajax({
        url: "/performance/check/",
        async: false,
        type: "POST",
        data: data,
        success: function (data, result, testStatus) {
            if (data.state == 0) {
                layer.msg(data.msg);

            } else if (data.state == 1) {
                layer.msg(data.msg);
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

function wd_neww_share(share) {
    var share = share_content;
    if (decodeURIComponent(share_content).length > 59) {
        var share_tmp = JSON.parse(share)
        sharestate(share_content, share_tmp)
    } else {
        shareelse()
    }
}


// 当状态为2待确认时的任务
function ugidone(k, i, j, sub_Id) {
    // 在任务里添加可以点击的项
    $('#wd-view-sub-task' + k + i + j).after(
        //考核确认
        '<div id="wd-view-sub-rights' + k + i + j + '" class="wd-view-sub-rights">' +
        //考核确认通过
        '<div class="wd-view-sub-confirm">' +
        '<input name="ok_task_sub"  id="wd-view-sub-ok' + k + i + j + '" type="checkbox" value="' + sub_Id + '">' +
        '<img onclick="confirm(\'' + k + "','" + i + "','" + j + '\')" class="wd-view-sub-confirm-img' + k + i + j + '" src="/img/u1309.png"></div>' +
        //考核确认不通过
        '<div class="wd-view-sub-deny">' +
        '<input name="bad_task_sub"  id="wd-view-sub-bad' + k + i + j + '" type="checkbox" value="' + sub_Id + '">' +
        '<img onclick="unconfirm(\'' + k + "','" + i + "','" + j + '\')" class="wd-view-sub-unconfirm-img' + k + i + j + '" src="/img/u1310.png"></div>' +
        '</div>' +
        '<div id="wd-view-sub-audit' + k + i + j + '" class="wd-view-sub-audit">' +
        '<div class="wd-view-sub-through" id="wd-view-sub-through' + k + i + j + '">通过</div>' +
        '<div id="wd-view-sub-unthrough' + k + i + j + '">未通过</div>' +
        '</div>'
    )
}
// 当审核者进去时待确认
function ugidtwo(Checkitem, work_day_num, performance_id, checker_name, review_time, confirm_time, check_work_day_num) {
    $('.wd-view-update-text').after(
        // <!-- 审核创新 -->
        '<div class="wd-view-update-performance">' +
        // <!-- 两张图片按钮 -->
        '<div>' +
        '<input name="innovate" value="0" class="wd-view-innovate-performance-up" id="" type="checkbox" style="display:none">' +
        '<img onclick="update()" class="wd-view-update-img" src="/img/u1309.png">' +
        '</div>' +
        '<div>' +
        '<input name="innovate" class="wd-view-innovate-performance-un"  id="" type="checkbox" style="display:none">' +
        '<img onclick="unupdate()" class="wd-view-update-img" src="/img/u1310.png">' +
        '</div>' +
        // <!-- 通过与未通过 -->
        '<div style="width: 50px;">' +
        '<div class="wd-view-update-through">通过</div>' +
        '<div class="wd-view-update-unthrough">未通过</div>' +
        '</div>' +
        '</div>')

    $('.wd-view-share-text').after(
        // 分享添加
        '<div class="wd-view-share-performance">' +
        // <!-- 两张图片按钮 -->
        '<div>' +
        '<input name="share" value="0" class="wd-view-share-performance-up" id="" type="checkbox" style="display:none">' +
        '<img onclick="nshare()" class="wd-view-share-img" src="/img/u1309.png">' +
        '</div>' +
        '<div>' +
        '<input name="share" class="wd-view-share-performance-un"  id="" type="checkbox" style="display:none">' +
        '<img onclick="unshare()" class="wd-view-share-img" src="/img/u1310.png">' +
        '</div>' +
        // <!-- 通过与未通过 -->
        '<div style="width: 50px;">' +
        '<div class="wd-view-share-through">通过</div>' +
        '<div class="wd-view-share-unthrough">未通过</div>' +
        '</div>' +
        '</div>'
    )
    // <!-- 审评结果 -->
    $('.wd-view-postscript').parent().after(
        '<div>' +
        // <!-- 报告人附言 -->
        '<div class="wd-view-evaluation">' +
        '<div>• 审评结果</div>' +
        '</div>' +
        // <!-- 表格填写 -->
        '<table border="1" class="wd-view-evaluation-table">' +
        // <!-- 第一个tr是看 -->
        '<tr class="wd-view-evaluation-title">' +
        '<td colspan="6">任务检查项</td>' +
        '<td>创新检查项</td>' +
        '<td>分享检查项</td>' +
        '</tr>' +
        '<tr class="wd-view-evaluation-font">' +
        '<td>检查项<p style="color: #3399FF;"><label>' + Checkitem.length + '</label>项</p>' +
        '</td>' +
        '<td>未通过项<p style="color: red;"><label class="wd-view-nothrough">0</label>项</p>' +
        '</td>' +
        '<td>BUG任务<p style="color: red;"><label class="wd-view-evaluation-bug">0</label>个</p>' +
        '</td>' +
        '<td>延期任务<p style="color: #9933CC;"><label class="wd-view-evaluation-delay"></label>个</p>' +
        '</td>' +
        '<td class="wd-view-work_day">报告工时<p class="Report_time"  style="color: #3399FF;">' +
        '<input type="hidden" name="work_day_num" value="' + work_day_num + '">天</p>' +
        '</td>' +
        '<td class="wd_view-corre"   style="cursor: pointer;">' +
        '<label style="color: red;text-decoration: underline;" onclick="dianjicor()"  style="cursor: pointer;">校正工时</label><p style="color: red;">' +
        '<span class="wd_view_correction" onclick="dianjispan()"  style="text-decoration: underline;">' +
        check_work_day_num + '</span>' +
        '<input class="wd-view-corrinput" type="hidden" onclick="dianjiinput()" name="check_work_day_num" value="' + check_work_day_num + '">' +
        '<span onclick="dinajispant()" style="text-decoration: underline;">天</span></p>' +
        '<div class="wd_view-corre-option">' +
        '<option class="wd-view-option1" onclick="option1()"><label  style="cursor: pointer;">1</label>天</option>' +
        '<option class="wd-view-option2" onclick="option2()"><label  style="cursor: pointer;">2</label>天</option>' +
        '<option class="wd-view-option3" onclick="option3()"><label  style="cursor: pointer;">3</label>天</option>' +
        '<option class="wd-view-option4" onclick="option4()"><label  style="cursor: pointer;">4</label>天</option>' +
        '<option class="wd-view-option5" onclick="option5()"><label  style="cursor: pointer;">5</label>天</option>' +
        '<input class="wd-view-shuru-input" maxlength="2" type="text" placeholder="天数">' +
        '<button class="wd-view-shuru-queding" onclick="button()">确定</button>' +
        '<div>' +
        '</td>' +
        '<td class="td-innovate">【无】</td>' +
        '<td class="td-share">【无】</td>' +
        '</tr>' +
        '</table>' +
        '</div>'
    )
    // 报告工时添加天数
    $('.Report_time').prepend(work_day_num)
    // <!-- 绩效评分 -->
    $('.wd-view-evaluation').parent().after(
        '<div>' +
        // <!-- 报告人附言 -->
        '<div class="wd-view-score">' +
        '<div>• 绩效评分</div>' +
        '</div>' +
        '<table class="wd-view-score-table" border="1">' +
        '<tr>' +
        '<td>态度(1分)</td>' +
        '<td>真实度(1分)</td>' +
        '<td>工作效率(1分)</td>' +
        '<td>都为新任务(1分)</td>' +
        '<td>创新与分享(1分)</td>' +
        '<td>总计(5分)' +
        '<label class="wd-view-doubt" style="font-weight: 700;position: relative;left: 17px;cursor: pointer;color: red;">?</label>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>1</td>' +	//注意你的态度
        '<td class="wd-view-truth"></td>' + //真实度
        '<td class="wd-view-bug"></td>' +	//工作效率，和bug挂钩
        '<td class="wd-view-Newtask"></td>' + //都为新任务
        '<td class="share-score">0</td>' + //创新与分享
        '<td class="wd-view-total"></td>' + //合计总分
        '</tr>' +
        '</table>' +
        '</div>'
    )
    doubt()
    $('.wd-view-score').parent().after(
        // <!-- 考核人附言 -->
        '<div>' +
        '<div class="wd-view-peformance-talk">' +
        '<div>• 考核人附言</div>' +
        '</div>' +
        '<div class="wd-view-peformance-text">' +
        '<textarea style="border: 0;" name="checker_postscript" placeholder="意见、建议等"></textarea>' +
        '</div>' +
        '</div>'
    )
    $('.wd-view-peformance-text').parent().after(
        // <!-- 完成审核 -->
        '<div>' +
        '<div>' +
        '<div class="wd-view-finish-Beat">' +
        '<span style="margin-right: 51px;" class="wd-view-finish-Beat-up">' + '审核日期：' + time(review_time) + '</span>' +
        '<div class="">' +
        '<div class="wd-view-checker">' + '<label>' + decodeURIComponent(checker_name) + '<p>审核</p>' + '</label>' + '</div>' +
        '<div>' +
        '</div>' +
        '<div class="wd-view-finish-performance">' +
        '<label style="font-size: 14px;" onclick="dengdai()">待确认中<label class="auto" onclick="autoPlay">...</label></label>' +
        '</div>' +
        '</div>' +
        '</div>'
    )
}
// 当报告人进去时待确认的状态
function ugidthree(Checkitem, work_day_num, performance_id, checker_name, review_time, confirm_time, reporter_name) {
    $('.wd-view-update-text').after(
        // <!-- 审核创新 -->
        '<div class="wd-view-update-performance">' +
        // <!-- 两张图片按钮 -->
        '<div>' +
        '<input name="innovate" value="0" class="wd-view-innovate-performance-up" id="" type="checkbox" style="display:none">' +
        '<img onclick="update()" class="wd-view-update-img" src="/img/u1309.png">' +
        '</div>' +
        '<div>' +
        '<input name="innovate" class="wd-view-innovate-performance-un"  id="" type="checkbox" style="display:none">' +
        '<img onclick="unupdate()" class="wd-view-update-img" src="/img/u1310.png">' +
        '</div>' +
        // <!-- 通过与未通过 -->
        '<div style="width: 50px;">' +
        '<div class="wd-view-update-through">通过</div>' +
        '<div class="wd-view-update-unthrough">未通过</div>' +
        '</div>' +
        '</div>')

    $('.wd-view-share-text').after(
        // 分享添加
        '<div class="wd-view-share-performance">' +
        // <!-- 两张图片按钮 -->
        '<div>' +
        '<input name="share" value="0" class="wd-view-share-performance-up" id="" type="checkbox" style="display:none">' +
        '<img onclick="nshare()" class="wd-view-share-img" src="/img/u1309.png">' +
        '</div>' +
        '<div>' +
        '<input name="share" class="wd-view-share-performance-un"  id="" type="checkbox" style="display:none">' +
        '<img onclick="unshare()" class="wd-view-share-img" src="/img/u1310.png">' +
        '</div>' +
        // <!-- 通过与未通过 -->
        '<div style="width: 50px;">' +
        '<div class="wd-view-share-through">通过</div>' +
        '<div class="wd-view-share-unthrough">未通过</div>' +
        '</div>' +
        '</div>'
    )
    // <!-- 审评结果 -->
    $('.wd-view-postscript').parent().after(
        '<div>' +
        // <!-- 报告人附言 -->
        '<div class="wd-view-evaluation">' +
        '<div>• 审评结果</div>' +
        '</div>' +
        // <!-- 表格填写 -->
        '<table border="1" class="wd-view-evaluation-table">' +
        // <!-- 第一个tr是看 -->
        '<tr class="wd-view-evaluation-title">' +
        '<td colspan="6">任务检查项</td>' +
        '<td>创新检查项</td>' +
        '<td>分享检查项</td>' +
        '</tr>' +
        '<tr class="wd-view-evaluation-font">' +
        '<td>检查项<p style="color: #3399FF;"><label>' + Checkitem.length + '</label>项</p>' +
        '</td>' +
        '<td>未通过项<p style="color: red;"><label class="wd-view-nothrough">0</label>项</p>' +
        '</td>' +
        '<td>BUG任务<p style="color: red;"><label class="wd-view-evaluation-bug">0</label>个</p>' +
        '</td>' +
        '<td>延期任务<p style="color: #9933CC;"><label class="wd-view-evaluation-delay"></label>个</p>' +
        '</td>' +
        '<td class="wd-view-work_day">报告工时<p class="Report_time"  style="color: #3399FF;">' +
        '<input type="hidden" name="work_day_num" value="' + work_day_num + '">天</p>' +
        '</td>' +
        '<td class="wd_view-corre" style="cursor: pointer;">' +
        '<label style="color: red;text-decoration: underline;" onclick="dianjicor()"  style="cursor: pointer;">校正工时</label><p style="color: red;">' +
        '<span class="wd_view_correction"  onclick="dianjispan()"  style="text-decoration: underline;">' +
        check_work_day_num + '</span>' +
        '<input class="wd-view-corrinput" type="hidden" onclick="dianjiinput()" name="check_work_day_num" value="' + check_work_day_num + '">' +
        '<span onclick="dinajispant()" style="text-decoration: underline;">天</span></p>' +
        '<div class="wd_view-corre-option">' +
        '<option class="wd-view-option1" onclick="option1()"><label  style="cursor: pointer;">1</label>天</option>' +
        '<option class="wd-view-option2" onclick="option2()"><label  style="cursor: pointer;">2</label>天</option>' +
        '<option class="wd-view-option3" onclick="option3()"><label  style="cursor: pointer;">3</label>天</option>' +
        '<option class="wd-view-option4" onclick="option4()"><label  style="cursor: pointer;">4</label>天</option>' +
        '<option class="wd-view-option5" onclick="option5()"><label  style="cursor: pointer;">5</label>天</option>' +
        '<input class="wd-view-shuru-input" maxlength="2" type="text" placeholder="天数">' +
        '<button class="wd-view-shuru-queding" onclick="button()">确定</button>' +
        '<div>' +
        '</td>' +
        '<td class="td-innovate">【无】</td>' +
        '<td class="td-share">【无】</td>' +
        '</tr>' +
        '</table>' +
        '</div>'
    )
    // 报告工时添加天数
    $('.Report_time').prepend(work_day_num)
    // <!-- 绩效评分 -->
    $('.wd-view-evaluation').parent().after(
        '<div>' +
        // <!-- 报告人附言 -->
        '<div class="wd-view-score">' +
        '<div>• 绩效评分</div>' +
        '</div>' +
        '<table class="wd-view-score-table" border="1">' +
        '<tr>' +
        '<td>态度(1分)</td>' +
        '<td>真实度(1分)</td>' +
        '<td>工作效率(1分)</td>' +
        '<td>都为新任务(1分)</td>' +
        '<td>创新与分享(1分)</td>' +
        '<td>总计(5分)' +
        '<label class="wd-view-doubt" style="font-weight: 700;position: relative;left: 17px;cursor: pointer;color: red;">?</label>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>1</td>' +	//注意你的态度
        '<td class="wd-view-truth"></td>' + //真实度
        '<td class="wd-view-bug"></td>' +	//工作效率，和bug挂钩
        '<td class="wd-view-Newtask"></td>' + //都为新任务
        '<td class="share-score">0</td>' + //创新与分享
        '<td class="wd-view-total"></td>' + //合计总分
        '</tr>' +
        '</table>' +
        '</div>'
    )
    doubt()
    $('.wd-view-score').parent().after(
        // <!-- 考核人附言 -->
        '<div>' +
        '<div class="wd-view-peformance-talk">' +
        '<div>• 考核人附言</div>' +
        '</div>' +
        '<div class="wd-view-peformance-text">' +
        '<textarea style="border: 0;" name="checker_postscript" placeholder="意见、建议等"></textarea>' +
        '</div>' +
        '</div>'
    )
    $('.wd-view-peformance-text').parent().after(
        // <!-- 完成审核 -->
        // '<div class="wd-view-finish-confirm">' +
        // '<span style="margin-right: 51px;" class="wd-view-finish-confirm-up">' + '审核日期：' + time(confirm_time) + '</span>' +
        // '<div class="wd-view-confirm">' + '<label>' + decodeURIComponent(checker_name) + '<p>审核</p>' + '</label>' + '</div>' +
        // '<div>' +
        // '</div>' +

        '<div>' +
        '<div>' +
        '<div class="wd-view-finish-Beat">' +
        '<span style="margin-right: 73px;" class="wd-view-finish-Beat-up">' + '审核日期：' + time(review_time) + '</span>' +
        '<div class="wd-view-checker">' + '<label>' + decodeURIComponent(checker_name) + '<p>审核</p>' + '</label>' + '</div>' +
        '<div>' +
        '</div>' +
        '</div>' +
        '<div class="wd-view-finish-performance">' +
        '<input type="submit" style="padding: 5px 15px 5px 15px;" value="确认" onclick="ok(\'' + performance_id + '\')">' +
        '</div>' +
        '</div>'
    )
}
// 当游客进入
function ugidfour(Checkitem, work_day_num, performance_id, checker_name, review_time) {

    $('textarea[class="wd-view-postscript-textarea"]').hide()//报告人附言
    $('.wd-view-postscript').hide()
    // 工时
    $('.wd-view-update-text').after(
        // <!-- 审核创新 -->
        '<div class="wd-view-update-performance">' +
        // <!-- 两张图片按钮 -->
        '<div>' +
        '<input name="innovate" value="0" class="wd-view-innovate-performance-up" id="" type="checkbox" style="display:none">' +
        '<img onclick="update()" class="wd-view-update-img" src="/img/u1309.png">' +
        '</div>' +
        '<div>' +
        '<input name="innovate" class="wd-view-innovate-performance-un"  id="" type="checkbox" style="display:none">' +
        '<img onclick="unupdate()" class="wd-view-update-img" src="/img/u1310.png">' +
        '</div>' +
        // <!-- 通过与未通过 -->
        '<div style="width: 50px;">' +
        '<div class="wd-view-update-through">通过</div>' +
        '<div class="wd-view-update-unthrough">未通过</div>' +
        '</div>' +
        '</div>')

    $('.wd-view-share-text').after(
        // 分享添加
        '<div class="wd-view-share-performance">' +
        // <!-- 两张图片按钮 -->
        '<div>' +
        '<input name="share" value="0" class="wd-view-share-performance-up" id="" type="checkbox" style="display:none">' +
        '<img onclick="nshare()" class="wd-view-share-img" src="/img/u1309.png">' +
        '</div>' +
        '<div>' +
        '<input name="share" class="wd-view-share-performance-un"  id="" type="checkbox" style="display:none">' +
        '<img onclick="unshare()" class="wd-view-share-img" src="/img/u1310.png">' +
        '</div>' +
        // <!-- 通过与未通过 -->
        '<div style="width: 50px;">' +
        '<div class="wd-view-share-through">通过</div>' +
        '<div class="wd-view-share-unthrough">未通过</div>' +
        '</div>' +
        '</div>'
    )
    // <!-- 审评结果 -->
    $('.wd-view-postscript').parent().after(
        '<div>' +
        // <!-- 报告人附言 -->
        '<div class="wd-view-evaluation">' +
        '<div>• 审评结果</div>' +
        '</div>' +
        // <!-- 表格填写 -->
        '<table border="1" class="wd-view-evaluation-table">' +
        // <!-- 第一个tr是看 -->
        '<tr class="wd-view-evaluation-title">' +
        '<td colspan="6">任务检查项</td>' +
        '<td>创新检查项</td>' +
        '<td>分享检查项</td>' +
        '</tr>' +
        '<tr class="wd-view-evaluation-font">' +
        '<td>检查项<p style="color: #3399FF;"><label>' + Checkitem.length + '</label>项</p>' +
        '</td>' +
        '<td>未通过项<p style="color: red;"><label class="wd-view-nothrough">0</label>项</p>' +
        '</td>' +
        '<td>BUG任务<p style="color: red;"><label class="wd-view-evaluation-bug">0</label>个</p>' +
        '</td>' +
        '<td>延期任务<p style="color: #9933CC;"><label class="wd-view-evaluation-delay"></label>个</p>' +
        '</td>' +
        '<td class="wd-view-work_day">报告工时<p class="Report_time"  style="color: #3399FF;">' +
        '<input type="hidden" name="work_day_num" value="' + work_day_num + '">天</p>' +
        '</td>' +
        '<td class="wd_view-corre"  style="cursor: pointer;">' +
        '<label style="color: red;text-decoration: underline;" onclick="dianjicor()"  style="cursor: pointer;">校正工时</label><p style="color: red;">' +
        '<span class="wd_view_correction"  onclick="dianjispan()"  style="text-decoration: underline;">' +
        check_work_day_num + '</span>' +
        '<input class="wd-view-corrinput" type="hidden" onclick="dianjiinput()" name="check_work_day_num" value="' + check_work_day_num + '">' +
        '<span onclick="dinajispant()" style="text-decoration: underline;">天</span></p>' +
        '<div class="wd_view-corre-option">' +
        '<option class="wd-view-option1" onclick="option1()"><label  style="cursor: pointer;">1</label>天</option>' +
        '<option class="wd-view-option2" onclick="option2()"><label  style="cursor: pointer;">2</label>天</option>' +
        '<option class="wd-view-option3" onclick="option3()"><label  style="cursor: pointer;">3</label>天</option>' +
        '<option class="wd-view-option4" onclick="option4()"><label  style="cursor: pointer;">4</label>天</option>' +
        '<option class="wd-view-option5" onclick="option5()"><label  style="cursor: pointer;">5</label>天</option>' +
        '<input class="wd-view-shuru-input" maxlength="2" type="text" placeholder="天数">' +
        '<button class="wd-view-shuru-queding" onclick="button()">确定</button>' +
        '<div>' +
        '</td>' +
        '<td class="td-innovate">【无】</td>' +
        '<td class="td-share">【无】</td>' +
        '</tr>' +
        '</table>' +
        '</div>'
    )
    // 报告工时添加天数
    $('.Report_time').prepend(work_day_num)
    // <!-- 绩效评分 -->
    $('.wd-view-evaluation').parent().after(
        '<div>' +
        // <!-- 报告人附言 -->
        '<div class="wd-view-score">' +
        '<div>• 绩效评分</div>' +
        '</div>' +
        '<table class="wd-view-score-table" border="1">' +
        '<tr>' +
        '<td>态度(1分)</td>' +
        '<td>真实度(1分)</td>' +
        '<td>工作效率(1分)</td>' +
        '<td>都为新任务(1分)</td>' +
        '<td>创新与分享(1分)</td>' +
        '<td>总计(5分)' +
        '<label class="wd-view-doubt" style="font-weight: 700;position: relative;left: 17px;cursor: pointer;color: red;">?</label>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>1</td>' +	//注意你的态度
        '<td class="wd-view-truth"></td>' + //真实度
        '<td class="wd-view-bug"></td>' +	//工作效率，和bug挂钩
        '<td class="wd-view-Newtask"></td>' + //都为新任务
        '<td class="share-score">0</td>' + //创新与分享
        '<td class="wd-view-total"></td>' + //合计总分
        '</tr>' +
        '</table>' +
        '</div>'
    )
    doubt()
    $('.wd-view-score').parent().after(
        // <!-- 考核人附言 -->
        '<div>' +
        // '<div class="wd-view-peformance-talk">' +
        // '<div>• 考核人附言</div>' +
        // '</div>' +
        '<div class="wd-view-peformance-text">' +
        '<textarea style="border: 0;" name="checker_postscript" style="cursor: default;"readonly="readonly"></textarea>' +
        '</div>' +
        '</div>'
    )
    $('.wd-view-peformance-text').parent().after(
        // <!-- 完成审核 -->
        '<div>' +
        '<div>' +
        '<div class="wd-view-finish-Beat">' +
        '<span style="margin-right: 51px;" class="wd-view-finish-Beat-up">' + '审核日期：' + time(review_time) + '</span>' +
        '<div class="">' +
        '<div class="wd-view-checker">' + '<label>' + decodeURIComponent(checker_name) + '<p>审核</p>' + '</label>' + '</div>' +
        '<div>' +
        '</div>' +
        '<div class="wd-view-finish-performance">' +
        '<label style="font-size: 14px;" onclick="dengdai()"><label class="auto" onclick="autoPlay"></label></label>' +
        '</div>' +
        '</div>' +
        '</div>'
    )
}
function ugidfive(Checkitem, work_day_num, performance_id, checker_name, review_time) {

    $('textarea[class="wd-view-postscript-textarea"]').hide()//报告人附言
    $('.wd-view-postscript').hide()
    // 工时
}
function taskok(k, i, j, ugid, checker_id, state, sub_Check_result, reporter_id) {
    if (state == '2') {
        if (ugid == checker_id) { //审核人
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        } else if (ugid == reporter_id) {
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        } else if (checker_id != ugid || checker_id != reporter_id) {
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        }
    }
    if (state == '3') {
        if (ugid == checker_id) { //审核人
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        } else if (ugid == reporter_id) {
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        } else if (checker_id != ugid || checker_id != reporter_id) {
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        }
    }
    // 状态为4
    if (state == '4') {
        if (ugid == checker_id) { //审核人
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        } else if (ugid == reporter_id) {
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        } else if (checker_id != ugid || checker_id != reporter_id) {
            if (sub_Check_result == '1') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-through' + k + i + j).show();
            } else if (sub_Check_result == '0') {
                $('.wd-view-sub-rights').hide();
                $('#wd-view-sub-unthrough' + k + i + j).show();
            }
        }
    }
}
function result(innovate, share, state, ugid, checker_id, share_content, innovate_content) { //审核人
    if (innovate == '1') {
        $('.wd-view-update-img').css('display', 'none')
        $('.wd-view-update-through').show();
        $('.wd-view-update-through').css('bottom', '-26px')
        $('.wd-view-update-unthrough').css('bottom', '-26px')
        $('.wd-view-update-unthrough').css('right', '365px')
        $('.wd-view-update-unthrough').css('right', '365px')
        $('.td-innovate').html('<label style="color:#3399FF;">【通过】</label>')
    } else if (innovate == '0') {
        if (decodeURIComponent(innovate_content).length > 17) {
            $('.wd-view-update-img').css('display', 'none')
            $('.wd-view-update-unthrough').show();
            $('.wd-view-update-through').css('bottom', '-26px')
            $('.wd-view-update-unthrough').css('bottom', '-26px')
            $('.wd-view-update-unthrough').css('right', '365px')
            $('.wd-view-update-unthrough').css('right', '365px')
            $('.td-innovate').html('<label style="color:red;">【未通过】</label>')
        } else {
            $('.wd-view-update-img').css('display', 'none')
            $('.wd-view-update-unthrough').show();
            $('.wd-view-update-through').css('bottom', '-26px')
            $('.wd-view-update-unthrough').css('bottom', '-26px')
            $('.wd-view-update-unthrough').css('right', '365px')
            $('.wd-view-update-unthrough').css('right', '365px')
            $('.td-innovate').html('<label style="color:black;">【无】</label>')
        }
    }
    if (share == '1') {
        $('.wd-view-share-img').css('display', 'none')
        $('.wd-view-share-through').show();
        $('.wd-view-share-through').css('bottom', '-26px')
        $('.wd-view-share-unthrough').css('bottom', '-26px')
        $('.wd-view-share-unthrough').css('right', '365px')
        $('.wd-view-share-unthrough').css('right', '365px')
        $('.td-share').html('<label style="color:#3399FF;">【通过】</label>')
    } else if (share == '0') {
     
        if (decodeURIComponent(share_content).length > 2) {
            $('.wd-view-share-img').css('display', 'none')
            $('.wd-view-share-unthrough').show();
            $('.wd-view-share-unthrough').css('bottom', '-26px')
            $('.wd-view-share-unthrough').css('right', '365px')
            $('.wd-view-share-unthrough').css('right', '365px')
            $('.td-share').html('<label style="color:red;">【未通过】</label>')
        } else {
            $('.wd-view-share-img').css('display', 'none')
            $('.wd-view-share-unthrough').show();
            $('.wd-view-share-unthrough').css('bottom', '-26px')
            $('.wd-view-share-unthrough').css('right', '365px')
            $('.wd-view-share-unthrough').css('right', '365px')
            $('.td-share').html('<label style="color:black;">【无】</label>')
        }
    }
    // $('.wd-view-update-performance').hide();
}

// 工时
function work_days(work_day_num) {
    $('.wd-view-work-days').val(work_day_num)
}
// 报告人附言
function postscript(reporter_postscript) {
    var reporter = decodeURIComponent(decodeURIComponent(reporter_postscript));
    $('.wd-view-postscript-textarea').html(reporter)
}
// 附言
function reporter_talk(reporter) {
    if (reporter != '') {
        $('.wd-view-postscript-textarea').val(reporter)
    } else {
        $('.wd-view-postscript-textarea').val('空空如也！~')
        $('.wd-view-postscript-textarea').css('height', '60px')
        $('.wd-view-postscript-textarea').css('color', 'rgb(153, 153, 153)')
        $('.wd-view-postscript-textarea').css('border', '0px none')
        $('.wd-view-postscript-textarea').css('width', '695px')
    }
}
function dengdai() {
    layer.msg('别着急');
}
function ok(performance_id) {
    $.get('/performance/confirm/' + performance_id, function (data, status) {

        layer.msg(data.msg);
        setTimeout(function () {
            location.reload()
        }, 1000)
    })
}
function refuse(performance_id) {
    layer.confirm('真的确定要打退吗？\n\n请确认！', {
        btn: ['我确定', '放弃'] //按钮
    }, function () {
        $.ajax({
            url: '/performance/refuse/' + performance_id,
            async: false,
            type: "GET",
            success: function (data, result, msg, testStatus, state) {
                if (data.state == 0) {
                    layer.msg(data.msg)
                } else if (data.state == 1) {
                    layer.msg(data.msg)
                    window.location = "/performance";
                }
            },
            error: function (xhr, errorMessage, e) {
                alert("系统异常");
            }
        })
    }, function () {
    });
}
function doubt(){
    $('.wd-view-doubt').mouseover(function(){
        $('#newww').fadeIn();
    })
    $('.wd-view-doubt').mouseout(function(){
        $('#newww').fadeOut();
    })
}