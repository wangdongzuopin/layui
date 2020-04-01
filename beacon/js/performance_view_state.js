// 报告人附言
function reporterstate(reporter) {
    if (reporter.length > 0) {
        $('textarea[class="wd-view-postscript-textarea"]').val(reporter) //报告人附言
        // $('.wd-view-postscript-textarea').css('left', '57px');
    } else {
        // $('.wd-view-update-performance').hide();
        $('.wd-view-postscript-textarea').val('空空如也！~'); //如果没有，显示内容暂无
        $('.wd-view-postscript-textarea').css('color', '#999999');
        $('.wd-view-postscript-textarea').css('height', '60px');
        // $('.wd-view-postscript-textarea').css('left', '57px');
    }
}
// 任务的备注
function viewtitlenote(task_note,k,i){
    if(task_note != ''){
        $('.wd-view-task_note'+k+i).show();
    }else{
        $('.wd-view-task_note'+k+i).hide();
    }
}
// 分享
function sharestate(share_content, share_tmp) {
    if (decodeURIComponent(share_content).length > 59) {
        //分享的类型转换
        $('input[class="wd-view-share-zhuti"]').val(decodeURIComponent(share_tmp.subject)) //分享主题时间
        $('input[class="wd-view-share-renshu"]').val(decodeURIComponent(share_tmp.participation) + '人') //实际参加人数
        $('input[class="wd-view-share-shijian"]').val(decodeURIComponent(share_tmp.date)) //实际参加时间
        $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').val(sign(decodeURIComponent(share_tmp.check_note))) //分享的内容概要
    } else {
        shareelse()
    }
}
// 分享否则
function shareelse() {
    $('.wd-view-share-performance').hide();
    $('input[class="wd-view-share-zhuti"]').hide() //分享主题时间
    $('input[class="wd-view-share-renshu"]').hide() //实际参加人数
    $('input[class="wd-view-share-shijian"]').hide() //实际参加时间
    // $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').hide();
    // $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').after('<img src="/img/wd_tree.png">')
    $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').val('空空如也！~') //分享的内容概要
    $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').css('color', '#999999');
    $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').css('height', '60px');
    $('.wd-view-share-text textarea[class="wd-view-share-textarea"]').after('<input type="hidden" value="0" name="share">')
}
// 创新
function inn_tmpstate(inn_tmp) {
    if (inn_tmp.check_note == '') {
        $('.wd-view-update-performance').hide();
        $('.wd-view-update-textarea').val('空空如也！~'); //如果没有，显示内容暂无
        $('.wd-view-update-textarea').css('color', '#999999');
        $('.wd-view-update-textarea').css('height', '60px');
        $('.wd-view-update-textarea').after('<input type="hidden" value="0" name="innovate">')
    }
}
// 分数指定
function scorestate(score_1, score_2, score_3, score_4, score_5) {
    $('.wd-view-truth').html(score_2)
    $('.wd-view-bug').html(score_3)
    $('.wd-view-Newtask').html(score_4)
    $('.share-score').html(score_5)
    // 总计
    let scoreall = Number(score_1) + Number(score_2) + Number(score_3) + Number(score_4) + Number(score_5)
    $('.wd-view-total').html(scoreall)
}
function evaluastate(nnresult) {
    var innovate = nnresult.innovate;
    var share = nnresult.share;
    var check_num = nnresult.check_num;
    var bad_task_sub = nnresult.bad_task_sub;
    var bug_task = nnresult.bug_task;
    var delay_task = nnresult.delay_task;
    $('.wd-view-Checkitem').html(check_num) //检查项个数
    $('.wd-view-evaluation-bug').html(bug_task) //BUG任务
    $('.wd-view-nothrough').html(bad_task_sub)
    $('.wd-view-evaluation-delay').html(delay_task)
}
// 审核人附言
function checkertalk(checker_postscript) {
    if (checker_postscript != '') {
        $('textarea[name="checker_postscript"]').val(decodeURIComponent(checker_postscript))
        $('textarea[name="checker_postscript"]').attr('readonly', 'readonly')//禁止输入，只读
        $('textarea').css('cursor', 'default')
    }
    else {
        $('textarea[name="checker_postscript"]').val('')
        $('textarea[name="checker_postscript"]').removeAttr('placeholder')
        $('textarea[name="checker_postscript"]').attr('readonly', 'readonly')//禁止输入，只读
        $('textarea').css('cursor', 'default')
    }
}

// 事件不允许
function eventpaff() {
    $('.wd_view-corre').css('pointer-events', 'none')
    $('td').css('cursor', 'default')
}
function eventpaffg(confirm_time,reporter_name) {
    $('.wd_view-corre').css('pointer-events', 'none')
    $('td').css('cursor', 'default')
    $('.wd-view-finish-performance').hide()
    $('.wd-view-peformance-text').parent().after(
        // <!-- 完成审核 -->
        '<div class="wd-view-finish-confirm">' +
        '<span style="margin-right: 51px;" class="wd-view-finish-confirm-up">' + '确认日期：' + time(confirm_time) + '</span>' +
        '<div class="wd-view-confirm">' + '<label>' + decodeURIComponent(reporter_name) + '<p>确认</p>' + '</label>' + '</div>' +
        '<div>' +
        '</div>' +

        '<div>' +
        '<div>' +
        '<div class="wd-view-finish-Beat">' +
        // '<span style="margin-right: 73px;" class="wd-view-finish-Beat-up">' + '审核日期：' + time(review_time) + '</span>' +
        // '<div class="wd-view-checker">' + '<label>' + decodeURIComponent(checker_name) + '<p>审核</p>' + '</label>' + '</div>' +
        '<div>' +
        '</div>' +
        '</div>' +
        '<div class="wd-view-finish-performance">' +
        // '<input type="submit" style="padding: 5px 15px 5px 15px;" value="确认" onclick="ok(\'' + performance_id + '\')">' +
        '</div>' +
        '</div>'
    )
}

// 对审核日期进行处理
function time(review_time) {
    let review = decodeURIComponent(review_time).split(' ');
    let tmptime = review[0].split('-');
    let arr_time = tmptime[0] + '年' + tmptime[1] + '月' + tmptime[2] + '日';
    return arr_time;
}
// 对确认日期进行处理
function confirtime(confirm_time) {
    let review = decodeURIComponent(confirm_time).split(' ');
    let tmptime = review[0].split('-');
    let arr_time = tmptime[0] + '年' + tmptime[1] + '月' + tmptime[2] + '日';
    return arr_time;
}
function contime(confirm_time) {
    if (decodeURIComponent(confirm_time) == '0000-00-00 00:00:00') {
        $('.wd-view-confirm').hide();
        $('.wd-view-finish-confirm-up').hide();
    } else {
        $('.wd-view-confirm').show();
        $('.wd-view-finish-confirm-up').show();
        $('.wd-view-finish-performance').hide();
    }
}
function taskstate(task_state, k, i) {
    if (task_state == 1) {
        $('#wd-view-cbx-all' + k + i).before('<div class="wd-new-state-img"><img style="width: 17px;height: 16px;" title="注意:此任务目前为暂停状态" src="/img/jinggao.png" ></div>')
    } else if (task_state == 2) {
        $('#wd-view-cbx-all' + k + i).before('<div style="width:31px;display: block;height: 20px;" class="wd-new-state-img"></div>')
    } else if (task_state == 3) {
        $('#wd-view-cbx-all' + k + i).before('<div style="width:31px;display: block;height: 20px;" class="wd-new-state-img"></div>')
    } else if (task_state == 4) {
        $('#wd-view-cbx-all' + k + i).before('<div style="width:31px;display: block;height: 20px;" class="wd-new-state-img"></div>')
    } else if (task_state == 5) {
        $('#wd-view-cbx-all' + k + i).before('<div style="width:31px;display: block;height: 20px;" class="wd-new-state-img"></div>')
    }
    // 根据任务的状态进行判断
    if (task_state == 1) {
        $('#wd-new-cbx-all' + k + i).before('<div class="wd-new-state-img"><img style="width: 17px;height: 16px;" title="注意:此任务目前为暂停状态" src="/img/jinggao.png" ></div>')
    } else if (task_state == 2) {
        $('#wd-new-cbx-all' + k + i).before('<div class="wd-new-state-img-start"></div>')
    } else if (task_state == 3) {
        $('#wd-new-cbx-all' + k + i).before('<div class="wd-new-state-img-start"></div>')
    } else if (task_state == 4) {
        $('#wd-new-cbx-all' + k + i).before('<div class="wd-new-state-img-start"></div>')
    } else if (task_state == 5) {
        $('#wd-new-cbx-all' + k + i).before('<div class="wd-new-state-img-start"></div>')
    }
}