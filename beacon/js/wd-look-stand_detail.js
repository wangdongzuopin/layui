// 已完成
function kanban_even_task_complet(id, kanadduser, kanallper, kanalltag, e_ggid, page, limit) {
    $.ajax({
        url: "/project/complete_task/" + e_ggid,
        type: 'POST',
        data: '&limit=' + limit + '&page=' + page + '&tcid=' + id,
        beforeSend: function () {
            $('#wd_kanban_loadding'+id).html('<div><img style="width: 40px;" src="/img/loadinga.gif"></div>').css('pointer-events', 'none')
        },
        success: function (data, result, testStatus) {

            if (data.state == 0) {
                layer.msg(data.msg)
            } else if (data.state == 1) {
                // $('#wd_stand_finish').html('')
                let boj = decodeURIComponent(data.data)
                let wd_qing = JSON.parse(boj.replace(/\+/g, '%20'))
                let name = wd_qing.Name;
                let state = wd_qing.State;
                let task = wd_qing.Task;
                if(task != null){
                    if(task.length >= 20){
                        $('#wd_kanban_loadding'+id).html('<div>加载更多</div>').css('pointer-events', '')
                    }else{
                        $('#wd_kanban_loadding'+id).html('<div>没有更多</div>').css('pointer-events', 'none')
                    }
                    kanban_task(id, name, state, task, kanadduser, kanallper, kanalltag)
                }else{
                    $('#wd_kanban_loadding'+id).html('<div>没有更多</div>').css('pointer-events', 'none')
                }
     
            }
        },
        error: function (xhr, errorMessage, e) {
            alert(e);
        }

    })
}

//单独任务查询
function kanban_jump_detials(gid, kanallper, kanadduser, kanalltag,e_ggid){
    $.ajax({
        url: "/task/detail/" + gid,
        type: 'GET',
        success: function (data) {
            let boj = decodeURIComponent(data.data)
            let beacon_task_list = JSON.parse(boj.replace(/\+/g, '%20'))
         
            let id = beacon_task_list.Task_class_id;
            // let task_id = beacon_task_list.Task_id ; //任务ID
            let task_id = beacon_task_list.Task_id; //任务ID
            // let t_id = beacon_task_list.Task_id 
            let Head_user_id = beacon_task_list.Task_head_user_id; //用户ID
            let task_name = decodeURIComponent(beacon_task_list.Task_name.replace(/\+/g, '%20')); //任务名称
            let Note = decodeURIComponent(beacon_task_list.Task_note.replace(/\+/g, '%20')); //任务备注
            let State = beacon_task_list.Task_state.replace(/\+/g, '%20'); //任务状态
            let beacon_End_time = beacon_task_list.Task_end_time.replace(/\+/g, '%20'); //任务的结束时间
            let Expect_end_time = beacon_task_list.Task_expect_end_time.replace(/\+/g, '%20'); // 预计时间
            let task_tag = beacon_task_list.Task_tag.replace(/\+/g, '%20'); //任务标签
            let Sub = beacon_task_list.Task_sub; //子任务
            let Log_comment = beacon_task_list.Task_log_comment;
            let beacon_Log_comment_limit = beacon_task_list.Task_log_comment_limit;
            let beacon_Log_comment_start = beacon_task_list.Task_log_comment_start;
            let beacon_Log_comment_total = beacon_task_list.Task_log_comment_total;
            // task_show(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag)
                // kanban_task_sub_show(Sub, task_id)
                // jump_addsub_open(Sub, task_id)
                // // 任务暂停等
                // kanbantaskstate(task_id, State)
                // kanban_task_mo(task_id)

                // 已审核的子任务
      

            if(State != 3){
                // task_show(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag)
            }else{
             
                details_kanban_taskdetails(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag,name)
                kanban_task_note(Note, task_id)
                kanban_show_tag(task_tag, task_id)
                kanbantaskstate(task_id, State)
                // headuserid(task_id, kanadduser, kanallper, Head_user_id)
                motasknow(id, task_id, kanadduser, kanallper, Head_user_id, task_name, Note, task_tag, kanalltag, Expect_end_time, State)
                kanban_task_mo(task_id)
               
              
                kanban_task_sub_show(Sub, task_id)
                
             
                task_hash(task_id)
                dand_hash(task_id)
                jump_addsub_open(Sub, task_id)
                kanban_task_sub_rev(task_id)
                jump_kanban_task_sub_num(Sub, task_id)
                task_Log_comment(task_id, Log_comment)
                $('#dpost_k_d_div'+task_id).show();
            }

            $('#k_d_view_close'+task_id).click(function(){
                $('#dpost_k_d_div'+task_id).remove();
            })
        },
        error: function (xhr, errorMessage, e) {
            alert(e);
        }
    });
}
function jump_addsub_open(Sub, task_id) {
    if (Sub != null) {
        for (su in Sub) {
            let sub = Sub[su];
            var sub_id = sub.Sub_id; //子任务的iD
            var sub_Expect_end_time = sub.Sub_expect_end_time.replace(/\+/g, '%20'); //子任务预计结束时间
            var sub_End_time = sub.Sub_end_time.replace(/\+/g, '%20'); //子任务的结束时间
            var sub_Content = sub.Sub_content.replace(/\+/g, '%20'); //子任务的内容
            var sub_Check_result = sub.Sub_check_result.replace(/\+/g, '%20'); //子任务检查结果
            var sub_Performance_id = sub.Sub_performance_id.replace(/\+/g, '%20'); //子任务的审核id
            var sub_State = sub.Sub_state; //任务的状态

            addsub_open_pubilc(sub_id, sub_Content, sub_Expect_end_time, sub_State, task_id)  //公共子任务的添加
            sub_state_s(task_id, sub_id, sub_State, sub_Performance_id, sub_Check_result)
        }
    }
}
//子任务统计
function jump_kanban_task_sub_num(Sub, task_id){
    $('#wd_kanban_taskshow' + task_id).html(detials_task_sub(Sub))
    $('#wd_kanban_taskhide' + task_id).html(detials_task_sub(Sub))

    $('#d_the_details_sub_num' + task_id).html(detials_task_sub(Sub))
    $('#d_the_details_sub_nub' + task_id).html(detials_task_sub(Sub))
}
function details_kanban_taskdetails(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag,name){
    let all = '<div style="display: none;" id="dpost_k_d_div' + task_id + '" class="k_d_alldiv">'
    $('.k_d_all_wd').append(all)

    let add = '<form id="d_tasksub_mo' + task_id + '" style="display:none;margin-top: 5px;"onsubmit="return false" method="post" >' +
        '<input type="hidden" value="' + task_id + '" name="id">' +
        '<div id="k_d_taskall' + task_id + '" class="k_d_taskall">' +
        '<div class="k_d_colse">' +
        '<div style="width: 64%;float: left;font-weight: bold;text-decoration: none;color: black;line-height: 16px;margin-top: 10px;">' +
        // decodeURIComponent(name) +
        '</div>' +
        '<div style="float: right;margin-top: 10px;">' +
        '<img id="k_d_view_close' + task_id + '" onclick="k_d_view_close(\'' + task_id + '\')" title="关闭" src="/img/u226.png" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="k_d_task">' +
        '<div class="k_d_alltask">' +
        '<div>' +
        '<span class="d_zrw" id="d_zrw' + task_id + '" onclick="d_boxover(\'' + task_id + "','" + task_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div style="margin-left: 5px;">' +
        '<span class="d_pause" id="d_pause' + task_id + '" onclick="d_pause(\'' + task_id + "','" + task_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div class="k_d_task_name">' +
        '<input name="name" id="the_details_taskname' + task_id + '" type="text" value="' + task_name + '">' +
        '</div>' +
        '<div class="k_d_task_user" style="display: block;margin-top: 12px;">' +
        '<div>' +
        '<img src="/img/img/u105.png" alt="" style="width: 15px;">' +
        '</div>' +
        '<div style="width: 42%;">' +
        '<select name="head_user_id" id="the_details_taskuser' + task_id + '" id=""></select>' +
        '</div>' +
        '</div>' +
        '<div class="k_d_task_time" style="display: block;width: 88%;margin: 0 auto;margin-top: 12px;">' +
        '<div>' +
        '<img src="/img/rili.png" alt="" style="width: 15px;">' +
        '</div>' +
        '<div style="margin-left: 12px;">' +
        '<input name="expect_end_time" id="the_details_taskdate' + task_id + '" value="' + dateyear(decodeURIComponent(Expect_end_time)) + '" type="text">' +
        '</div>' +
        '</div>' +
        '<div class="k_d_task_tag" style="display: block;width: 88%;margin: 0 auto;margin-top: 12px;">' +
        '<div style="float: left;">' +
        '<img src="/img/five.png" alt="" style="width: 15px;">' +
        '</div>' +
        '<div style="margin-left: 10px;">' +
        '<ul style="line-height: 22px;" id="the_details_tasktag' + task_id + '"></ul>' +
        '</div>' +
        '</div>' +
        '<div class="k_d_task_note" style="display: block;width: 88%;margin: 0 auto;margin-top: 5px;margin-top: 12px;">' +
        '<div style="position: relative;bottom: 32px;">' +
        '<img src="/img/img/u118.png" style="width: 15px;">' +
        '</div>' +
        '<div style="margin-left: 10px;">' +
        '<textarea id="the_details_tasknote' + task_id + '" name="note" placeholder="任务描述">' + Note + '</textarea>' +
        '</div>' +
        '</div>' +
        '</form>' +

        '<div style="display: block;font-size: 13px;margin: 0 auto;width: 88%;margin-top: 12px;">' +

        '<div class="d_the_details_sub_hide" id="d_the_details_sub_hide' + task_id + '" style="cursor: pointer;">' +
        '<div style="position: relative;top: -2px;"><img src="/img/-.png" alt="" style="width: 12px;height: 12px;"></div>' +
        '<div style="margin-left: 5px;">子任务</div>' +
        '(' +
        '<div style="margin-left: 3px;" id="d_the_details_sub_num' + task_id + '"></div>' +
        ')' +
        '</div>' +

        '<div style="display:none;cursor: pointer;" id="d_the_details_sub_show' + task_id + '">' +
        '<div style="position: relative;top: -2px;"><img src="/img/+.png" alt="" style="width: 12px;height: 12px;"></div>' +
        '<div style="margin-left: 5px;">子任务</div>' +
        '('+
        '<div style="margin-left: 3px;" id="d_the_details_sub_nub' + task_id + '"></div>' +
        ')'+
        '</div>' +

        '</div>' +
        '<div id="the_details_sub' + task_id + '" style="width: 69%;line-height: 1;padding-bottom: 20px;margin-top: 0px;">' +
        '<div id="the_details_d_sub' + task_id + '" style="width: 86%;margin: 0;"></div>' +
        '<div id="d_wd_kanban_subperformance' + task_id + '" style="width: 86%;margin: 0;float: left;"></div>' +   //状态为保存未修改div
        '<div id="d_kw_wd_kanban_subperformance' + task_id + '" style="width: 100%;float: left;margin: 0;">' +
        '<div class="d_kanban_rev" style="display:block;margin: 0 auto;"><div id="d_k_rev_open' + task_id + '" style="display: inline-block;"><img src="/img/Task/left.png" style="width: 16px;">已审核的子任务</div></div>' +
        '<div class="d_kanban_rev" style="display:block;margin: 0 auto;"><div id="d_k_rev_close' + task_id + '" style="display:none;"><img src="/img/Task/bottom.png" style="width: 16px;">已审核的子任务</div></div>' +
        '<div style="display:none;width: 100%;margin: 0px;" id="d_wd_kanban_rev_sub' + task_id + '"></div>' +
        '</div>' +  //状态为考核完成的div
        '<div id="the_details_add_sub' + task_id + '" style="display: block;line-height: 1;width: 100%;margin: 0;">' +
        '<form id="d_k_sub_add_form' + task_id + '" onsubmit="return false" method="post" style="clear: both;">' +
        '<div class="wd_addsubtask">' +
        '<input type="hidden" value="' + task_id + '" name="tkid">' +
        '<div style="display: inline;"><input name="content" id="d_wd_kanban_subtask_content' + task_id + '"  placeholder="子任务内容" type="text" /></div>' +
        '<div style="display: inline;margin-left:5px;"><input  name="expect_end_time" placeholder="预计完成时间" id="d_wd_kanban_subtask_date' + task_id + '" type="text" /></div>' +
        '<div style="margin-top:5px;">' +
        '<div  style="display: inline;"><input type="submit" onclick="d_k_subadd(\'' + id + "','" + task_id + '\')" value="创建子任务"/></div>' +
        '<div  style="display: none;"><input type="reset" value="重置" /></div>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>' +

        '</div>' +

        '</div>' +
        //详情页面下评论
        '<div>' +
        '<div><hr></div>' +
        '</div style="width: 100%;margin: 0 auto;margin-top: 5px;">' +
        '<form id="p_d_form' + task_id + '" onsubmit="return false" method="post" style="clear: both;">' +
        '<input type="hidden" name="tkid" value="' + task_id + '">' +
        '<input type="hidden" name="quote_id" value="1">' +
        '<input type="button" class="ping_aite_remove" id="ping_aite_remove' + task_id + '" value="移除" title="移除引用" style="display:none;line-height: 1;background: none;margin-top: 5px; float: left; width: 40px; padding: 0px; height: 17px; color: black; font-size: 11px;">' +
        '<div class="wd_ping_aite " style="line-height: 1.3;" id="d_wd_ping_aite' + task_id + '"></div>' +
        '<div style="margin-top: 5px;"><textarea placeholder="在此填写评论" id="p_d_textare' + task_id + '" name="content" style="width: 70%;font-size: 12px;line-height: 1;height: 67px;resize: none;"></textarea></div>' +
        '<div class="kanban_p_send">' +
        '<input type="submit" onclick="p_d_sendtalk(\'' + task_id + '\')" value="发表评论">' +
        '</div>' +
        '</form>' +
        // 日志评论放入
        '<div id="p_d_logandcomment' + task_id + '"></div>' +
        '<div id="p_d_loadding' + task_id + '" style="clear: both;width: 17%;margin: 0 auto;text-align: center;"></div>' +
        '</div>' +

        '<div id="k_d_mo' + task_id + '" class="k_d_mo">' +
        '<div style="color: #169BD5;font-size: 12px;">' +
        '<div style="height: 20px;" onclick="wd_kanban_d_motask(\'' + task_id + '\')">保存</div>' +
        '<hr>' +
        '</div>' +
        '<div style="color: red;font-size: 12px;cursor: pointer;margin-top: 14px;">' +
        '<div style="height: 20px;" onclick="taskdelect(\'' + id + "','" + task_id + '\')">删除</div>' +
        '<hr>' +
        '</div>' +
        '</div>' +
        '</div>'

    $('#dpost_k_d_div' + task_id).append(add)

    laydate.render({
        elem: '#the_details_taskdate' + task_id
    });
    laydate.render({
        elem: '#d_wd_kanban_subtask_date' + task_id
    });
    // $('#wd_kanban_tasknum' + task_id).click(function (e) {
    //     if (e.target == e.currentTarget) {
    //         $('#k_d_div'+task_id).show();
    //         $('#kanban_wd').hide();
    //         $('#d_tasksub_mo' + task_id).fadeIn();
    //         $('.k_d_all_wd').show();
    //     }
    // })
}