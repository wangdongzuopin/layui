function taskqingdan(wd_task, kanadduser, kanallper, kanalltag,e_ggid) {
    let href = window.location.href;
    let text = href.split('&')[1];
    if (text == undefined) {
        // console.log('目前为未定义')
    } else {
        let tmp = href.split(':')
        if(tmp[0] == 'http'){
        }else if(tmp[0] == 'https'){
            kanban_jump_detials(text, kanallper, kanadduser, kanalltag,e_ggid)
        }
    }
    addtaskaddqing()
    for (i = 0; i < wd_task.length; i++) {
        let id = wd_task[i].Id;
        let name = wd_task[i].Name.replace(/\+/g, '%20');
        let state = wd_task[i].State;
        let task = wd_task[i].Task;
        let serial = wd_task[i].Serial;
        if (task == null) {
            task = [];
            addtaskqingdan(id, name, state, task, kanadduser, kanallper, kanalltag, serial,e_ggid)
            // kanban_task(id,name,state,task)
        } else {
            addtaskqingdan(id, name, state, task, kanadduser, kanallper, kanalltag, serial,e_ggid)
        }
        tasklen(id, name, state, task)
    }
}
function tasklen(id, name, state, task) {
    if (task == null) {
        $('.wd_kanban_task_number' + id).html('0')
    } else {
        $('.wd_kanban_task_number' + id).html(task.length)
    }
}
function addtaskqingdan(id, name, state, task, kanadduser, kanallper, kanalltag, serial,e_ggid) {
    let qingdan = '<div class="wd_kanban_taskqingdan" ondrop="drop(event)" ondragover="allowDrop(event)" id="wd_kanban_taskqingdan' + id + '">' +
        '<div class="wd_kanban_Checklist" id="wd_kanban_Checklist' + id + '">' +
        '<input id="wd_kanban_serial' + id + '" class="wd_kanban_serial" type="hidden" value="' + serial + '">' +
        '<div class="wd_kanban_Checklist_number">' +
        '<div class="wd_kanban_task_number' + id + '"></div>' +
        '</div>' +
        '<div class="wd_kanban_Checklist_name" title="' + decodeURIComponent(name) + '">' +
        decodeURIComponent(name) +
        '</div>' +
        '<input type="hidden" value="' + id + '" title="任务清单id">' +
        '<div class="wd_kanban_Checklist_add">' +
        '<div id="wd_kanban_addtask' + id + '"  style="float: left;">' +
        '<img style="width: 13px;" onclick="wd_qing_k_addtask(\''+id+'\')" src="/img/kanban/u13.png" alt="">' +
        '</div>' +
        '<div id="wd_operat' + id + '"  style="float: left;margin-left: 15px;cursor: pointer;">' +
        '<img src="/img/kanban/....png" alt="">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="wd_kanban_dantask' + id + '" class="wd_kanban_dantask">' +
        '<div id="wd_kanban_addtaskbtm'+id+'"></div>'+   //在上面添加任务
        '<div class="wd_kanban_task_drop" id="wd_kanban_task'+id+'"></div>'+ //里面添加任务
        '<div id="wd_kanban_t_addtask'+id+'" class="wd_kanban_t_addtask"><div style="width:100%;display: flex;justify-content: center;" onclick="top_wd_qing_k_addtask(\''+id+'\')"><img style="width: 12px;" src="/img/kanban/u13.png" alt=""><span style="margin-left: 7px;">添加任务<span></div></div>'+
        '<div id="wd_kanban_addtasktop'+id+'"></div>'+ //在下面添加任务

        '<div class="open_the_even"><div id="ev_open_task'+id+'" ><img src="/img/Task/left.png" title="" style="width: 16px;"><span>展开已完成任务</span></div></div>'+
        '<div class="open_the_even" style="display:none;"><div id="ev_close_task'+id+'"><img src="/img/Task/bottom.png" title="" style="width: 16px;"><span>收起已完成任务</span></div></div>'+
        '<div id="wd_kanban_even_div'+id+'" style="display:none;">'+
        '<div id="wd_kanban_complete'+id+'" ></div>'+ //已完成的任务
        '<div class="wd_kanban_loadding" id="wd_kanban_loadding'+id+'"></div>'+
        '</div>'+
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    $('#add_qingdan').before(qingdan)
    qingdan_mo(id, name, state, task) // 修改清单按钮
    kanban_task(id, name, state, task, kanadduser, kanallper, kanalltag)
    addtasknow(id)
    addtask_user(id, kanadduser, kanallper)
    addtask_tag(id, kanalltag)
    tasklen(id, name, state, task)
    var counter = -1; /*计数器*/
    var page = 0; /*offset*/
    var limit = 20; /*size*/
    $('#ev_open_task'+id).one('click',function(){
        $('#ev_close_task'+id).parent().show();
        $('#ev_open_task'+id).parent().hide();
        $('#wd_kanban_even_div'+id).slideDown()
        kanban_even_task_complet(id, kanadduser, kanallper, kanalltag,e_ggid,page,limit)
    })
    $('#ev_open_task'+id).click(function(){
        $('#ev_close_task'+id).parent().show();
        $('#ev_open_task'+id).parent().hide();
        $('#wd_kanban_even_div'+id).slideDown()
    })
    $('#ev_close_task'+id).click(function(){
        $('#ev_open_task'+id).parent().show();
        $('#ev_close_task'+id).parent().hide();
        $('#wd_kanban_even_div'+id).slideUp()
    })
    $('#wd_kanban_loadding'+id).click(function () {
        page++
        kanban_even_task_complet(id, kanadduser, kanallper, kanalltag,e_ggid,page,limit)
    })
  
}
function dragStart(event) {
    event.dataTransfer.setData("li", event.target.id);
    let rmp = $('.task_form_qingdan').find(event.target)
    // rmp.css({
    //     'border':'1.5px dotted #339966'
    // })
}
function dragEnd(event) {
    if(event.target.id.indexOf('wd_kanban_taskandmo') > -1){
        let rmp = $('.task_form_qingdan').find(event.target)
        rmp.appendTo(rmp.parents('.wd_kanban_dantask').find('.wd_kanban_task_drop'))
    }else{
        return false;
    }
    
}
function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("li");
    if(data != ''){
        event.target.appendChild(document.getElementById(data));
    }
    
}
function addtask_user(id, kanadduser, kanallper) {
    for (h = 0; h < kanadduser.length; h++) {
        let all = kanadduser[h].split(',');
        let gid = all[0];
        let name = all[1];
        if (kanadduser.length != 0) {
            let aee = JSON.parse(localStorage.getItem('userLogin'));
            let ugid = aee.ugid;
            if (ugid == gid) {
                $('#wd_knaban_addtask_user' + id).append('<option  selected="selected" value="' + gid + '">' + name + '</option>')
            } else {
                $('#wd_knaban_addtask_user' + id).append('<option  value="' + gid + '">' + name + '</option>')
            }

        }

    }
}
function tagquchong(ar) {
    for (var i = 0; i < ar.length - 1; i++) {
        for (var j = i + 1; j < ar.length; j++) {
            if (ar[i] == ar[j]) {
                ar.splice(j, 1);
                j--;
            }
        }
    }
    return ar;
}
function addtask_tag(id, kanalltag) {
    tagquchong(kanalltag)
    for (t = 0; t < kanalltag.length; t++) {
        let stand_ttag = decodeURI(kanalltag[t].replace(/\+/g, '%20'));
        if (stand_ttag != '') {
            if (stand_ttag == '<BUG>') {
                $('#wd_kanban_add_tag' + id).append('<li class="taskadd_tag' + t + '">' + '<input  type="checkbox" class="street" id="street' + id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="street' + id + t + '" class="task-add-tag"  style="background-color:#df7d7d;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else if (stand_ttag == '<延迟>') {
                $('#wd_kanban_add_tag' + id).append('<li class="taskadd_tag' + t + '">' + '<input  type="checkbox"  class="street" id="street' + id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="street' + id + t + '"  id="strre' + t + '" class="task-add-tag"  style="background-color:#B8860B;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else {
                $('#wd_kanban_add_tag' + id).append('<li class="taskadd_tag' + t + '">' + '<input  type="checkbox" class="street" id="street' + id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="street' + id + t + '"  id="strre' + t + '"  class="task-add-tag" style="background-color:rgb(135, 138, 236);color: white; ">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
        }
        else {
            $('.taskadd_tag' + i).remove();
        }
    }
}
// 添加任务的添加任务的添加任务的添加任务的添加任务的
function addtasknow(id) {
    let add = '<form id="wd_addkanban' + id + '" style="display:none;" onsubmit="return false" method="post"><div class="wd_kanban_addtask"><div class="wd_kanban_just">' +
        '<div class="addtask_input" style="margin-top: 20px;">' +
        '<input type="hidden" value="' + id + '" name="tcid">' +
        '<div ><img src="/img/taskname.png" style="width: 19px;cursor: default;" alt=""></div>' +
        '<div style="margin-left: 15px;"><input id="wd_kanban_addtask_name' + id + '" autocomplete="off" name="name" type="text" placeholder="! #自定义标签# #自定义标签# 任务名称"></div>' +
        '</div>' +

        '<div style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/img/u105.png"></div>' +
        '<div style="margin-left: 15px;"><select id="wd_knaban_addtask_user' + id + '" name="head_user_id" style=""></select></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/rili.png"></div>' +
        '<div style="margin-left: 15px;"><input id="wd_kanban_addtime' + id + '" autocomplete="off" name="expect_end_time" placeholder="预计完成时间..." type="text"></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/five.png"></div>' +
        '<div id="wd_kanban_add_tag' + id + '" class="wd_kanban_add_tag" style="margin-left: 15px;"></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/img/u118.png"></div>' +
        '<div style="margin-left: 15px;"><textarea id="wd_kanban_addtask_note' + id + '" autocomplete="off" name="note" placeholder="填写任务描述,限制在100个字符" style="width: 210px;"></textarea></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px;justify-content: center; ">' +
        '<div><input class="" type="submit" onclick="wd_kanban_add(\'' + id + '\')" value="创建任务"></div>' +
        '<div id="wd_add_quxiao' + id + '" style="margin-left: 15px;"><input style="background: none;color: black;" class="" type="submit" value="取消"></div>' +
        '</div>' +

        '</div></div></form>'
    $('#wd_kanban_addtaskbtm' + id).append(add)
    wd_kan_addtaskslide(id)
}
function motasknow(id, task_id, kanadduser, kanallper, Head_user_id, task_name, Note, task_tag, kanalltag, Expect_end_time, State) {
    let add = '<form class="mo_wd_task_mo" id="wd_task_mo' + task_id + '" style="display:none;" onsubmit="return false" method="post"><div class="wd_kanban_motask"><div class="wd_kanban_just">' +
        '<div class="task_mo_kanbanall" style="margin-top: 20px;">' +
        '<input type="hidden" value="' + task_id + '" name="id">' +
        '<div style="display: inline-block;"><img src="/img/taskname.png" style="width: 19px;cursor: default;" alt=""></div>' +
        '<div class="wd_kanban_motask_name" style="margin-left: 15px;"><input id="thekanban_moname' + task_id + '" value="' + decodeURIComponent(task_name) + '" name="name" type="text" placeholder="! #自定义标签# #自定义标签# 任务名称"></div>' +
        '</div>' +

        '<div style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/img/u105.png"></div>' +
        '<div class="wd_kanban_motask_user" style="margin-left: 15px;"><select id="wd_knaban_mo_user' + task_id + '" name="head_user_id" style=""></select></div>' +
        '</div>' +

        '<div class="wd_kanban_motask_date" style="display: flex;margin-top: 12px; ">' +
        '<div style="line-height: 2;"><img style="cursor: default;" src="/img/rili.png"></div>' +
        '<div style="margin-left: 15px;"><input id="wd_kanban_motime' + task_id + '" value="' + dateyear(decodeURIComponent(Expect_end_time)) + '" name="expect_end_time" placeholder="预计完成时间..." type="text"></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/five.png"></div>' +
        '<div id="wd_knaban_mo_tag' + task_id + '" class="wd_kanban_add_tag" style="margin-left: 15px;"></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px; ">' +
        '<div><img style="cursor: default;" src="/img/img/u118.png"></div>' +
        '<div style="margin-left: 15px;"><textarea id="thekanban_monote' + task_id + '" name="note" placeholder="填写任务描述,限制在100个字符" style="width: 200px;">' + decodeURIComponent(Note) + '</textarea></div>' +
        '</div>' +

        '<div class="addtask_time" style="display: flex;margin-top: 12px;justify-content: center; ">' +
        '<div><input class="" type="submit" onclick="wd_knaban_motask(\'' + task_id +"','"+id+ '\')" value="保存"></div>' +
        '<div id="wd_mo_quxiao' + task_id + '" style="margin-left: 15px;"><input style="background: none;color: black;" class="" type="submit" value="取消"></div>' +
        '</div>' +

        '</div></div></form>'
    $('#wd_kanban_taskandmo' + task_id).append(add)

    laydate.render({
        elem: '#wd_kanban_motime' + task_id
    });
    $('#wd_kanban_task_mo' + task_id).click(function () {
        $('#wd_task_mo' + task_id).slideToggle();

        $('#wd_kanban_opensub' + task_id).show();
        $('#wd_kanban_closesub' + task_id).hide();
        $('#wd_kanban_suball' + task_id).slideUp();
    })
    $('#wd_mo_quxiao' + task_id).click(function () {
        $('#wd_task_mo' + task_id).slideUp();
    })

    taskmo_tag(task_id, kanallper, task_tag, kanalltag)
    motask_user(task_id, kanadduser, kanallper, Head_user_id)
}
function motask_user(task_id, kanadduser, kanallper, Head_user_id) {
    for (h = 0; h < kanadduser.length; h++) {
        let all = kanadduser[h].split(',');
        let gid = all[0];
        let name = all[1];
        if (kanadduser.length != 0) {
            let aee = JSON.parse(localStorage.getItem('userLogin'));
            let ugid = aee.ugid;
            if (gid == Head_user_id) {
                $('#wd_knaban_mo_user' + task_id).append('<option  selected="selected" value="' + gid + '">' + name + '</option>')
                $('#the_details_taskuser' + task_id).append('<option  selected="selected" value="' + gid + '">' + name + '</option>')

            } else {
                $('#wd_knaban_mo_user' + task_id).append('<option  value="' + gid + '">' + name + '</option>')
                $('#the_details_taskuser' + task_id).append('<option  value="' + gid + '">' + name + '</option>')
            }

        }

    }
}
function taskmo_tag(task_id, kanallper, task_tag, kanalltag) {
    tagquchong(kanalltag)
    let stand_tag = decodeURIComponent(task_tag)
    let tag = stand_tag.split(',');
    for (t = 0; t < kanalltag.length; t++) {
        var checked = "";
        for (m = 0; m < tag.length; m++) {
            if (tag[m] == kanalltag[t]) {
                checked = 'checked="checked"';
                break;
            }
        }
        let stand_ttag = decodeURI(kanalltag[t].replace(/\+/g, '%20'));
        if (stand_ttag != '') {
            if (stand_ttag == '<BUG>') {
                $('#wd_knaban_mo_tag' + task_id).append('<li class="taskadd_tag' + t + '">' + '<input ' + checked + '   type="checkbox" class="street" id="street' + task_id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="street' + task_id + t + '" class="task-add-tag"  style="background-color:#df7d7d;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else if (stand_ttag == '<延迟>') {
                $('#wd_knaban_mo_tag' + task_id).append('<li class="taskadd_tag' + t + '">' + '<input ' + checked + '   type="checkbox"  class="street" id="street' + task_id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="street' + task_id + t + '"  id="strre' + t + '" class="task-add-tag"  style="background-color:#B8860B;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else {
                $('#wd_knaban_mo_tag' + task_id).append('<li class="taskadd_tag' + t + '">' + '<input ' + checked + '   type="checkbox" class="street" id="street' + task_id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="street' + task_id + t + '"  id="strre' + t + '"  class="task-add-tag" style="background-color:rgb(135, 138, 236);color: white; ">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            if (stand_ttag == '<BUG>') {
                $('#the_details_tasktag' + task_id).append('<li class="taskadd_tag' + t + '">' + '<input ' + checked + '   type="checkbox" class="street" id="details_street' + task_id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="details_street' + task_id + t + '" class="task-add-tag"  style="background-color:#df7d7d;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else if (stand_ttag == '<延迟>') {
                $('#the_details_tasktag' + task_id).append('<li class="taskadd_tag' + t + '">' + '<input ' + checked + '   type="checkbox"  class="street" id="details_street' + task_id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="details_street' + task_id + t + '"  id="strre' + t + '" class="task-add-tag"  style="background-color:#B8860B;cursor: pointer;color: white;">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
            else {
                $('#the_details_tasktag' + task_id).append('<li class="taskadd_tag' + t + '">' + '<input ' + checked + '   type="checkbox" class="street" id="details_street' + task_id + t +
                    '" name="tag" value="' + stand_ttag + '" />' +
                    '<label for="details_street' + task_id + t + '"  id="strre' + t + '"  class="task-add-tag" style="background-color:rgb(135, 138, 236);color: white; ">' + htmlspecialchars(stand_ttag) + '</label>' +
                    '</li>')
            }
        }
        else {
            $('.taskadd_tag' + i).remove();
        }
    }
}
function wd_kan_addtaskslide(id) {
    // $('#wd_kanban_addtask'+id).mouseover(function(){
    //     $('#wd_addkanban'+id).appendTo($('#wd_kanban_addtaskbtm'+id))
    // })
    $('#wd_add_quxiao' + id).click(function () {
        wd_qing_k_addtask_return(id)
    })
    // $('#wd_kanban_t_addtask'+id).mouseover(function(){
    //     $('#wd_addkanban'+id).appendTo($('#wd_kanban_addtasktop'+id))
    // })
    laydate.render({
        elem: '#wd_kanban_addtime' + id
    });
}
// 添加任务
function wd_qing_k_addtask(id){
    $('#wd_addkanban'+id).appendTo($('#wd_kanban_addtaskbtm'+id)).hide().slideDown();
    $('#wd_kanban_addtask'+id).html('<img style="width: 13px;" onclick="wd_qing_k_addtask_return(\''+id+'\')" src="/img/kanban/u13.png" alt="">')
}
function wd_qing_k_addtask_return(id){
    $('#wd_addkanban' + id).slideUp();
    $('#wd_kanban_addtask'+id).html('<img style="width: 13px;" onclick="wd_qing_k_addtask(\''+id+'\')" src="/img/kanban/u13.png" alt="">')
}
// 在底下添加任务
function top_wd_qing_k_addtask(id){
    $('#wd_addkanban' + id).appendTo($('#wd_kanban_addtasktop'+id)).hide().slideDown()
    $('#wd_kanban_t_addtask'+id).html('<div style="width:100%;display: flex;justify-content: center;" onclick="top_wd_qing_k_addtask_return(\''+id+'\')"><img style="width: 12px;" src="/img/kanban/u13.png" alt=""><span style="margin-left: 7px;">添加任务<span></div>').css('background-color','rgba(255, 255, 255, 0.815)')
}
function top_wd_qing_k_addtask_return(id){
    $('#wd_addkanban' + id).slideUp();
    $('#wd_kanban_t_addtask'+id).html('<div style="width:100%;display: flex;justify-content: center;" onclick="top_wd_qing_k_addtask(\''+id+'\')"><img style="width: 12px;" src="/img/kanban/u13.png" alt=""><span style="margin-left: 7px;">添加任务<span></div>').css('background-color','white')
}
function addtaskaddqing() {
    let add = ' <form id="add_qingdan" onsubmit="return false" method="post">' +
        '<div class="wd_kanban_add_qingdan">' +
        '<div class="kanban_add_qingdan" onclick="kanbanaddqingdan()">' +
        '<div style="display: inline;position: relative;top: 25%;">' +
        '<img src="/img/kanban/u13.png" alt="">' +
        '</div>' +
        '<div style="display: inline;position: relative;top: 25%;margin-left: 5px;">' +
        '添加新清单' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('.task_form_qingdan').append(add)
}
// 修改清单按钮
function qingdan_mo(id, name, state, task) {

    let oper = '<div class="wd_kanban_operating" style="display:none;" id="wd_kanban_operating' + id + '">' +
        '<div class="wd_kanban_oper_bj" >' + '<div id="wd_kanban_oper_bj' + id + '">编辑</div>' + '</div>' +
        '<div class="wd_kanban_oper_sc" >' + '<div onclick="kanban_qingdan_delete(\'' + id + '\')">删除</div>' + '</div>' +
        '<div class="wd_kanban_oper_gd" >' + '<div onclick="kanban_qingdan_guidang(\'' + id + '\')">归档</div>' + '</div>' +
        '</div>'

    $('#wd_operat' + id).after(oper)
    wd_mo_qingdan_operating(id)


    $('#wd_kanban_oper_bj' + id).click(function () {
        kanban_edit(id, state, name, task)
    })
}

function wd_mo_qingdan_operating(id) {
    // $('#wd_operat' + id).bind('click', function () {
    //     $('#wd_kanban_operating' + id).toggle();
    // })
    $(document).bind("click", function (e) {
        if ($(e.target).closest('#wd_operat' + id).length > 0) {
            $('#wd_kanban_operating' + id).show();
        } else {
            $('#wd_kanban_operating' + id).hide();
        }
    })
    $('#wd_kanban_operating' + id).click(function (event) {
        event.stopPropagation();
    });
}
function kanban_edit(id, state, name, task) {

    let edit = '<form id="kanban_edit_class" onsubmit="return false" method="post">' + '<div style="display: block;width: 100%;height: 96%;clear: both;">' +
        '<div style="width: 90%;height: 35%;margin: 16px;">' +
        '<input type="hidden" name="id" value="' + id + '"/>' +
        '<input id="wd_kanban_qing_name' + id + '" value="' + decodeURIComponent(name) + '" type="text" name="name" placeholder="输入清单名称" value="" style="width: 222px;height: 20px;color: rgba(0,0,0,.87);border: 1px solid #e3e3e3;">' +
        '<div class="kanban_edit_class">' +
        '<div style="margin-top: 10px;display: inline;"><input type="submit" onclick="edit_qingdan(\'' + id + "','" + state + "','" + task + '\')" value="保存"></div>' +
        '<div id="wd_kamban_editquxiao' + id + '" style="margin-top: 10px;display: inline;"><input type="submit" value="取消"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    $('#wd_kanban_Checklist' + id).html(edit)
    $('#wd_kanban_qing_name' + id).focus();
    $('#wd_kanban_Checklist' + id).css({
        'width': '98%',
        'height': '100px',
        'margin': ' 0 auto'
    })
    $('#wd_kamban_editquxiao' + id).click(function () {
        edit_quxiao(id, state, name, task)
    })
}
function edit_quxiao(id, state, name, task) {

    let pubg = '<div class="wd_kanban_Checklist_number">' +
        '<div class="wd_kanban_task_number' + id + '"></div>' +
        '</div>' +
        '<div id="wd_kanban_Checklist_name' + id + '" class="wd_kanban_Checklist_name" title="' + decodeURIComponent(name) + '">' +
        decodeURIComponent(name) +
        '</div>' +
        '<input type="hidden" value="' + id + '" title="任务清单id">' +
        '<div class="wd_kanban_Checklist_add">' +
        '<div id="wd_knaban_addtask' + id + '" style="float: left;">' +
        '<img style="width: 13px;" src="/img/kanban/u13.png" alt="">' +
        '</div>' +
        '<div id="wd_operat' + id + '"  style="float: left;margin-left: 15px;cursor: pointer;">' +
        '<img src="/img/kanban/....png" alt="">' +
        '</div>' +
        '</div>'
    $('#wd_kanban_Checklist' + id).html(pubg)
    tasklen(id, name, state, task)
    qingdan_mo(id, name, state, task)
    $('#wd_kanban_Checklist' + id).css({
        'width': '98%',
        'height': '30px',
        'margin': ' 0 auto',
        'margin-top': '10px'
    })

    wd_kan_addtaskslide(id)
}

function kanban_task(id, name, state, task, kanadduser, kanallper, kanalltag) {
    if (task != null) {
        for (k = 0; k < task.length; k++) {
            let add_time = task[k].Add_time;
            let End_time = task[k].End_time;
            let Expect_end_time = task[k].Expect_end_time;
            let Head_user_id = task[k].Head_user_id;
            let task_id = task[k].Id;
            let Log_comment = task[k].Log_comment;
            let task_name = decodeURIComponent(task[k].Name.replace(/\+/g, '%20'));
            let Note = decodeURIComponent(task[k].Note.replace(/\+/g, '%20'));
            let Start_time = task[k].Start_time;
            let State = task[k].State;
            let Sub = task[k].Sub;
            let task_tag = task[k].Tag;
            task_show(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag)

                kanban_task_sub_show(Sub, task_id)
                kanban_task_sub_num(Sub, task_id)
                addsub_open(Sub, task_id)
                // 任务暂停等
                kanbantaskstate(task_id, State)
                kanban_task_mo(task_id)

                // 已审核的子任务
                kanban_task_sub_rev(task_id)
            // kanban_taskdetails(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag,name)
            headuserid(task_id, kanadduser, kanallper, Head_user_id)
            motasknow(id, task_id, kanadduser, kanallper, Head_user_id, task_name, Note, task_tag, kanalltag, Expect_end_time, State)
            task_Log_comment(task_id, Log_comment)
        }
    } else {
        $('#wd_kanban_dantask' + id).html('')
    }
}
function headuserid(task_id, kanadduser, kanallper, Head_user_id) {
    for (h = 0; h < kanallper.length; h++) {
        let all = kanallper[h].split(',');
        let gid = all[0];
        let name = all[1];
        // 指派人
        if (Head_user_id == gid) {
            $('#wd_kanban_username' + task_id).html(name)
        } else {
            // $('#wd-stand-assigned' + i).html(name)
        }
    }
}
function task_show(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag) {
    let task = '<li ondragstart="dragStart(event)" ondragend="dragEnd(event)" draggable="true" class="wd_kanban_taskandmo" id="wd_kanban_taskandmo' + task_id + '">' + '<div id="wd-kanban-alltask' + task_id + '" class="wd_knaban_task">' +
        '<div style="width: 100%;">' +
        '<div style="width: 100%;min-height: 26px;">' +
        '<div id="wd_kanban_task_worp' + task_id + '" style="float: left;width: 94%;margin-left: 5px;min-height: 60px;">' +
        //任务修改和删除
        '<div id="wd_kanban_modity' + task_id + '" class="wd_kanban_modity">' +
        '<div id="wd_kanban_mo_style_mo' + task_id + '" style="display:none;" class="wd_kanban_task_mo">' +

        '<div style="display: inline-block;margin-left: -10px;" onclick="taskdelect(\'' + id + "','" + task_id + '\')"><img src="/img/box.png"style="margin-left: 10px;" alt="" title="删除"></div>' +
        '<div id="wd_kanban_task_mo' + task_id + '" style="display: inline-block;margin-left: 11px;"><img src="/img/pen.png" alt="" title="修改"></div>' +
        '</div>' +
        '</div>' +

        '<div style="float: left;">' +
        '<span class="pause" id="pause' + task_id + '" onclick="pause(\'' + task_id + "','" + task_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div style="float: left;margin-left: 5px;">' +
        '<span class="zrw" id="zrw' + task_id + '" onclick="boxover(\'' + task_id + "','" + task_id + '\')">' +
        '</span>' +
        '</div>' +
        // '<!-- 任务 -->'+
        '<div id="wd_kanban_opensub' + task_id + '" style="float: left;margin-left: 5px;cursor: pointer;">' +
        '<div style="float: left;">' +
        '<img src="/img/+.png" alt="">' +
        '</div>' +
        '<div id="wd_kanban_taskshow' + task_id + '" style="float: left;margin-left: 5px;font-size: 12px;line-height: 2;">' +
        '</div>' +
        '</div>' +

        '<div id="wd_kanban_closesub' + task_id + '" style="float: left;margin-left: 5px;display:none;cursor: pointer;">' +
        '<div style="float: left;">' +
        '<img src="/img/-.png" alt="">' +
        '</div>' +
        '<div id="wd_kanban_taskhide' + task_id + '" style="float: left;margin-left: 5px;font-size: 12px;line-height: 2;">' +
        '</div>' +
        '</div>' +

        '<div style="float: right;font-size: 12px;margin-top: 5px;color: #999999;">' +
        '<div id="wd_kanban_username' + task_id + '" class="wd_kanban_username" style="float: left;margin-right: 5px;">' +

        '</div>' +
        '<div id="wd_knaban_userdate' + task_id + '" class="wd_kanban_userdate" style="float: left;">' +
        dateyear(decodeURIComponent(Expect_end_time)) +
        '</div>' +
        '</div>' +
        '<div id="wd_kanban_tasknum' + task_id + '" style="clear: both;font-size: 12px;width: 98%;margin: 0 auto;padding-top: 3px;margin-left: 16px;cursor: pointer;">' +
        '<div id="wd_knaban_tasknow_name&' + task_id + '" onclick="hash_d(\'' + task_id + '\')" style="display: none;word-wrap: break-word;">' +
        decodeURIComponent(parsing(task_name)) +
        '</div>' +
        '<a class="wd_knaban_tasknow_name' + task_id + '" href="#wd_knaban_tasknow_name&' + task_id + '" style="display: inline;word-wrap: break-word;">' +
        decodeURIComponent(parsing(task_name))+
        '</a>' +

        '<div style="display: inline;margin-left: 5px;">' +
        '<img title="' + decodeURIComponent(Note) + '" id="wd_kanban_note' + task_id + '" src="/img/Remarks.png" alt="">' +
        '</div>' +
        '<div  id="wd_kanban_tasknow_info' + task_id + '" style="display: inline;margin-left: 5px;">' +
        '<img src="/img/info.png" alt="">' +
        '</div>' +
        '<div class="wd_knaban_taskinfo" style="display:none;" id="wd_kanban_taskinfo' + task_id + '"></div>' +

        '<div class="wd_knaban_tag' + task_id + '" id="wd_knaban_tag&' + task_id + '"  onclick="hash_d(\'' + task_id + '\')" style="clear: both;width: 100%;margin-top: 3px;padding-bottom: 9px;display:none;">' +
        // '<我是标签>' +
        '</div>' +
        '<a class="wd_knaban_tag' + task_id + '" href="#wd_knaban_tag&' + task_id + '" style="clear: both;width: 100%;margin-top: 3px;padding-bottom: 9px;display:inline;">' +
        // '<我是标签>' +
        '</a>' +

        '</div>' +
        '</div>' +

        '<div id="wd_kanban_suball' + task_id + '" style="clear: both;display:none;">' +
        '<div class="wd_kanban_subnum" style="width: 100%;float: left;" id="wd_kanban_subnum' + task_id + '"></div>' +
        '<div id="wd_kanban_subperformance' + task_id + '" style="width: 100%;float: left;"></div>' +    //状态为保存未修改的div
        '<div id="kw_wd_kanban_subperformance' + task_id + '" style="width: 100%;float: left;">' +
        '<div class="kanban_rev"><div id="k_rev_open' + task_id + '" style="display: inline-block;"><img src="/img/Task/left.png" style="width: 16px;">已审核的子任务</div></div>' +
        '<div class="kanban_rev" ><div id="k_rev_close' + task_id + '" style="display:none;"><img src="/img/Task/bottom.png" style="width: 16px;">已审核的子任务</div></div>' +
        '<div style="display:none" id="wd_kanban_rev_sub' + task_id + '"></div>' +
        '</div>' +  //状态为考核完成的div
        //添加子任务
        '<form id="k_sub_add_form' + task_id + '" onsubmit="return false" method="post" style="clear: both;">' +
        '<div class="wd_addsubtask" style="margin: 0;">' +
        '<input type="hidden" value="' + task_id + '" name="tkid">' +
        '<div style="display: inline;"><input name="content" id="wd_kanban_subtask_content' + task_id + '"  placeholder="子任务内容" type="text" /></div>' +
        '<div style="display: inline;margin-left:5px;"><input  name="expect_end_time" placeholder="预计完成时间" id="wd_kanban_subtask_date' + task_id + '" type="text" /></div>' +
        '<div style="margin-top:5px;">' +
        '<div  style="display: inline;"><input type="submit" onclick="k_subadd(\'' + id + "','" + task_id + '\')" value="创建子任务"/></div>' +
        '<div  style="display: none;"><input type="reset" value="重置" /></div>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</li>'


    if(State == 3){
        $('#wd_kanban_complete'+id).append(task)
    }else{
        $('#wd_kanban_task' + id).append(task)
    }
  
    hide_infoshow(task_id)
    kanban_task_note(Note, task_id)
    kanban_show_tag(task_tag, task_id)
    $('.parsing-label').css('font-size', '12px')
    kanban_taskdetails(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag, name)


    task_hash(task_id)
    dand_hash(task_id)
    laydate.render({
        elem: '#wd_kanban_subtask_date' + task_id
    });

    // 统计任务个数
    kan_t_num(id)
    // $('.wd_kanban_taskqingdan').dad();
}
// 已审核的子任务
function kanban_task_sub_rev(task_id) {
    $('#k_rev_open' + task_id).click(function () {
        $('#k_rev_open' + task_id).hide();
        $('#k_rev_close' + task_id).show().css({
            'display': 'inline'
        });
        $('#wd_kanban_rev_sub' + task_id).slideDown();
    })
    $('#k_rev_close' + task_id).click(function () {
        $('#k_rev_open' + task_id).show().css({
            'display': 'inline'
        });
        $('#k_rev_close' + task_id).hide();
        $('#wd_kanban_rev_sub' + task_id).slideUp();
    })

    $('#d_k_rev_open' + task_id).click(function () {
        $('#d_k_rev_open' + task_id).hide();
        $('#d_k_rev_close' + task_id).show()
        $('#d_wd_kanban_rev_sub' + task_id).fadeIn();
    })
    $('#d_k_rev_close' + task_id).click(function () {
        $('#d_k_rev_open' + task_id).show()
        $('#d_k_rev_close' + task_id).hide();
        $('#d_wd_kanban_rev_sub' + task_id).fadeOut();
    })

    let subdiv_rev = $('#wd_kanban_rev_sub' + task_id).html();
    if (subdiv_rev == '') {
        $('#kw_wd_kanban_subperformance' + task_id).hide();
    }
    let d_subdiv_rev = $('#d_wd_kanban_rev_sub' + task_id).html();
    if (d_subdiv_rev == '') {
        $('#d_kw_wd_kanban_subperformance' + task_id).hide();
    }


}

function homeview(task_id) {
    $('#kanban_wd').fadeIn();
    $('#d_tasksub_mo' + task_id).hide();
}
// 任务详情页面
function kanban_taskdetails(id, Expect_end_time, Head_user_id, task_id, task_name, Note, State, Sub, task_tag, name) {
    let all = '<div style="display: none;" id="k_d_div' + task_id + '" class="k_d_alldiv">'
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

    $('#k_d_div' + task_id).append(add)

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
function task_hash(task_id) {
    window.onhashchange = kanban_Hash(task_id);
}
function kanban_Hash(task_id) {
    var hash = window.location.hash;
    switch (hash) {
        case '#wd_knaban_tasknow_name&' + task_id:
            hash_d(task_id)
            break;
        case '#wd_knaban_tag&' + task_id:
            hash_d(task_id)
            break;
        default:
    }
}
function dand_hash(task_id) {
    $('.wd_knaban_tasknow_name' + task_id).click(function () {
        $('#k_d_div' + task_id).show();
        $('#kanban_wd').hide();
        $('#d_tasksub_mo' + task_id).fadeIn();
        $('.k_d_all_wd').show();
    })
    $('.wd_knaban_tag' + task_id).click(function () {
        $('#k_d_div' + task_id).show();
        $('#kanban_wd').hide();
        $('#d_tasksub_mo' + task_id).fadeIn();
        $('.k_d_all_wd').show();
    })
}
function hash_d(task_id) {
    $('#k_d_div' + task_id).show();
    $('#kanban_wd').hide();
    $('#d_tasksub_mo' + task_id).fadeIn();
    $('.k_d_all_wd').show();
}
// 统计任务个数
function kan_t_num(id) {
    let t_num = $('#wd_kanban_taskqingdan' + id + ' .wd_kanban_taskandmo').length;
    $('.wd_kanban_task_number' + id).html(t_num)
}
function hide_infoshow(task_id) {
    $(document).bind("click", function (e) {
        if ($(e.target).closest("#wd_kanban_tasknow_info" + task_id).length > 0) {

            let offec = $('#wd_kanban_tasknow_info' + task_id)
            let offectop = offec.position().top
            let offecleft = offec.position().left
            $('#wd_kanban_taskinfo' + task_id).css({
                'position': 'absolute',
                'left': offecleft,
                'top': offectop
            })
            $('#wd_kanban_taskinfo' + task_id).show()
        } else {
            $('#wd_kanban_taskinfo' + task_id).hide()
        }
    })
    $('#wd_kanban_taskinfo' + task_id).click(function (event) {
        event.stopPropagation();
        event.stopPropagation();//阻止事件冒泡即可 
    });
}
function task_Log_comment(task_id, Log_comment) {
    let page = 0;
    let num = page;
    let add = '<div class="the_look" id="the_look' + task_id + '"><div class="thelog_div" id="thelog_div' + task_id + '"></div>' +
        '<div class="thelog_submit" id="thelog_submit' + task_id + '"  alt="加载更多">' +
        '<div id="the_new_alt' + task_id + '" onclick="t_loadmaore(\'' + task_id + "','" + page + '\')"></div>' +
        '</div></div>'
    $('#wd_kanban_taskinfo' + task_id).html(add)
    let d_add = '<div class="the_look" id="the_look' + task_id + '"><div class="thelog_div" id="k_thelog_div' + task_id + '"></div>' +
        '<div class="thelog_submit" id="d_thelog_submit' + task_id + '"  alt="加载更多">' +
        '<div id="d_the_new_alt' + task_id + '" onclick="t_loadmaore(\'' + task_id + "','" + page + '\')"></div>' +
        '</div></div>'
    $('#p_d_loadding' + task_id).html(d_add)
    if (Log_comment.length >= 50) {
        $('#the_new_alt' + task_id).html('加载更多')
        $('#d_the_new_alt' + task_id).html('加载更多')
    } else {
        $('#the_new_alt' + task_id).parent().html('到底了').css({
            'pointer-events': 'none',
            'cursor': 'default'
        })
        $('#d_the_new_alt' + task_id).parent().html('到底了').css({
            'pointer-events': 'none',
            'cursor': 'default'
        })
    }
    let flag = true;
    $('#wd_kanban_taskinfo' + task_id).scroll(function () {
        let sum = this.scrollHeight - 40;
        if (sum <= $(this).scrollTop() + $(this).height()) {
            if (flag) {
                flag = false;
                page++
                t_loadmaore(task_id, page, function (err, data) {
                    let teammember = decodeURIComponent(data.data)
                    let temp = JSON.parse(teammember)
                    if (temp.LogComment.length >= 50) {
                        flag = true;
                    } else {
                        $('#the_new_alt' + task_id).parent().html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                        $('#d_the_new_alt' + task_id).parent().html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                    }
                })
            }
        }
    });
    let dflag = true;
    $('#k_d_div' + task_id).scroll(function () {
        let sum = this.scrollHeight - 40;
        if (sum <= $(this).scrollTop() + $(this).height()) {

            if (dflag) {
                dflag = false;
                page++
                t_loadmaore(task_id, page, function (err, data) {
                    let teammember = decodeURIComponent(data.data)
                    let temp = JSON.parse(teammember)
                    if (temp.LogComment.length >= 50) {
                        dflag = true;
                    } else {
                        $('#the_new_alt' + task_id).parent().html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                        $('#d_the_new_alt' + task_id).parent().html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                    }
                })
            }
        }
    });
    // 临时跳转接口
    $('#dpost_k_d_div' + task_id).scroll(function () {
        let sum = this.scrollHeight - 40;
        if (sum <= $(this).scrollTop() + $(this).height()) {

            if (dflag) {
                dflag = false;
                page++
                t_loadmaore(task_id, page, function (err, data) {
                    let teammember = decodeURIComponent(data.data)
                    let temp = JSON.parse(teammember)
                    if (temp.LogComment.length >= 50) {
                        dflag = true;
                    } else {
                        $('#the_new_alt' + task_id).parent().html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                        $('#d_the_new_alt' + task_id).parent().html('到底了').css({
                            'pointer-events': 'none',
                            'cursor': 'default'
                        })
                    }
                })
            }
        }
    });
    for (l in Log_comment) {

        let thelog = Log_comment[l]

        let AddTime = decodeURIComponent(thelog.AddTime)
        let Content = decodeURIComponent(thelog.Content.replace(/\+/g, '%20'))
        let Id = thelog.Id
        let Name = decodeURIComponent(thelog.Name.replace(/\+/g, '%20'))
        let OperatorId = thelog.OperatorId
        let OperatorName = decodeURIComponent(thelog.OperatorName)
        let Type = thelog.Type

        the_logandtalk(task_id, AddTime, Content, Id, Name, OperatorName, OperatorId, Type)
    }
}
function the_logandtalk(task_id, AddTime, Content, Id, Name, OperatorName, OperatorId, Type) {
    if (Type == 'log') {
        let c_content = JSON.parse(Content.replace(/\+/g, '%20'))
        let cm_content = c_content.msg;
        d_new_log(task_id, AddTime, Content, Id, Name, OperatorName, OperatorId, Type, cm_content)

        if (task_id == Id) {
            $('#wd_c_name' + Id).remove();
        }
    }
    else if (Type == 'comment') {
        d_new_comment(task_id, AddTime, Content, Id, OperatorName, OperatorId)
    }
}
function d_new_comment(task_id, AddTime, Content, Id, OperatorName, OperatorId) {

    let add = '<div class="tl_comment" id="tl_log' + Id + '">' +
        '<div class="tl_div_timename"><div id="d_tl_time_now' + Id + '" style="float: left;">' + '</div>' + '<div class="tl_div_Opername" style="margin-left:7px;">' + OperatorName + '</div></div>' +
        '<div style="width: 64%;float: left;">' + '<span>发表评论</span>' +
        ' ' + '<div style="margin-left: -14px;" id="tl_content' + Id + '">' + Content + '</div>' + '</div>' +
        '</div>'
    $('#thelog_div' + task_id).append(add)

    let d_add = '<form id="p_d_mo_form' + Id + '" onsubmit="return false" method="post" style="float: left;width: 100%;">' +
        '<input type="hidden" name="id" value="' + Id + '">' +
        '<div class="tl_comment" id="d_tl_log' + Id + '">' +
        '<div class="d_tl_div_timename" style="width: 28.5%;"><div id="d_tl_addtime' + Id + '" style="float: left;width: 46%;">' + '</div>' + '<div id="d_tl_div_opername' + Id + '" class="tl_div_Opername" style="margin-left:7px;">' + OperatorName + '</div></div>' +
        '<div style="width: 64%;float: left;">' + '<span>发表评论</span>' +
        // 修改删除引用
        '<div class="p_d_pera" id="p_d_prea' + Id + '" style="float: right;width: 50%;display:none;">' +
        '<div><img src="/img/Task/toptoptop.png" onclick="d_p_toptop(\'' + Id + "','" + task_id + '\')" title="引用" style="width: 12px;height: 12px;opacity: 0.7;"></div>' +
        '<div id="p_d_pen_div' + Id + '" style="margin-left: 25px;"><img id="p_d_pen' + Id + '" onclick="p_d_pen(\'' + Id + "','" + task_id + '\')"  src="/img/pen.png"></div>' +
        '<div style="margin-left: 25px;" onclick="p_d_delect(\'' + Id + '\')"><img src="/img/box.png"></div>' +
        '</div>' +
        '<a class="edit_div_input' + Id + '"></a>' +
        '<div class="ping_aitteme" id="d_p_aite_content' + Id + '" style="border-radius: 5px;width: 100%;margin: 0 auto;padding-top: 5px;padding-bottom: 5px;"></div>' +
        '<div id="d_tl_content' + Id + '" style="white-space: pre-line;line-height: 1.5;">' + Content + '</div>' + '</div>' +
        '</div>' +
        '</form>'
    $('#p_d_logandcomment' + task_id).append(d_add)
    $('#d_tl_log' + Id).fadeOut().fadeIn()

    if (AddTime == '刚刚') {
        $('#d_tl_time_now' + Id).html('刚刚')
        $('#d_tl_addtime' + Id).html('刚刚')
    } else {
        $('#d_tl_time_now' + Id).html(updatetime(AddTime))
        $('#d_tl_addtime' + Id).html(updatetime(AddTime))
    }
    // 评论操作的隐藏显示
    $('#d_tl_log' + Id).mouseover(function () {
        $('#p_d_prea' + Id).show();
    })
    $('#d_tl_log' + Id).mouseleave(function () {
        $('#p_d_prea' + Id).hide();
    })


    str = '';
    html = '';
    let ccontent = decodeURIComponent(Content).split('=$>')
    ccontent.reverse() //倒序
    for (p in ccontent) {
        let wid = p / 100;
        let tt = 90 - wid + '%'
        if (ccontent[p] != '') {
            if (ccontent[p].indexOf('@') > -1) {
                // let conts = '<div style="display: block;margin: 0 auto;color: #999;" class="wd_content_aitee'+p+k+'">'+ccontent[p]+'</div>'
                html += '<div style="color:#999999;line-height: 1.5;font-size:11px;margin: 0 auto;margin-bottom: 7px;width: ' + tt + ';margin-top: 5px;border: 1px solid;display: block;white-space: pre-line;" class="wd_content_aitee' + Id + '">' + ccontent[p].replace(',', '')

                str += '</div>'


            } else {
                $('#tl_content' + Id).after(ccontent[p])
                $('#d_tl_content' + Id).html(ccontent[p])
            }
        }
    }
    html += str
    $('#tl_content' + Id).html(html);
    $('.wd_content_aitee' + Id).each(function () {
        $(this).children('div').prependTo($(this))
    })
    $('#d_p_aite_content' + Id).html(html)
    $('.wd_content_aitee' + Id).each(function () {
        $(this).children('div').prependTo($(this))
    })
}
function d_p_toptop(id, task_id) {

    $('#ping_aite_remove' + task_id).show();
    $('#ping_aite_remove' + task_id).click(function () {
        $('#d_wd_ping_aite' + task_id).html('');
        $('#ping_aite_remove' + task_id).hide()
    })
    $('#d_wd_ping_aite' + task_id).html('')
    let tmp_content = $('#d_tl_content' + id).text();
    let tmp_name = $('#d_tl_div_opername' + id).text();
    let deaitetails = $('.wd_content_aitee' + id).text();

    let aite = '@' + tmp_name + '：' + tmp_content
    let tmp_aite_new = $('#d_p_aite_content' + id).text();
    if (tmp_aite_new != '') {
        let textaite = '<textarea id="pinglun_aite_cot' + i + '" class="pinglun_aite_cot"  readonly="readonly" style="resize: none;" name="content">' + aite + '</textarea>'

        // $('.wd_ping_aite').html(textaite)

        let ksksij = deaitetails.split('@')
        norepeat(ksksij)
        ksksij.reverse() //倒序
        for (q = 0; q < ksksij.length; q++) {
            if (ksksij[q] != '') {
                if (ksksij[q].indexOf('@') == -1) {
                    $('#d_wd_ping_aite' + task_id).prepend('<textarea class="pinglun_aite_auto" id="pinglun_aite_auto' + i + '" readonly="readonly" style="resize: none;" name="content">' + '@' + ksksij[q] + '</textarea>')
                } else {
                    $('#d_wd_ping_aite' + task_id).prepend('<textarea  class="pinglun_aite_auto" id="pinglun_aite_auto' + i + '" readonly="readonly" style="resize: none;" name="content">' + ksksij[q] + '</textarea>')
                }
            }
        }
        // 如果内容的长度超过30个字符，则each添加css属性
        $(textaite).appendTo($('#d_wd_ping_aite' + task_id))
    } else {
        let textaite = '<textarea id="pinglun_aite_cot' + id + '" class="pinglun_aite_cot"  readonly="readonly" style="resize: none;" name="content">' + aite + '</textarea>'
        $('#d_wd_ping_aite' + task_id).html(textaite)
    }
}
function d_p_mo_pen_floor(id, task_id) {
    let moinput = $('#d_p_aite_content' + id).text();
    let moin = moinput.split('@');
    norepeat(moin)
    for (h = 0; h < moin.length; h++) {
        if (moin[h] != '') {
            $('.edit_div_input' + id).append('<input type="hidden" value="@' + moin[h] + '=$>' + '" name="content" class="wd-stand-ping-iinpu' + id + '">')
        }
    }
}
function p_d_pen(id, task_id) {
    d_p_mo_pen_floor(id, task_id)
    $('#d_wd_ping_aite' + task_id).html('')
    $('#ping_aite_remove' + task_id).hide()
    let content = $('#d_tl_content' + id).text();
    $('#d_tl_content' + id).html('<textarea name="content" id="p_d_mo_content' + id + '" class="p_d_mo_content">' + content + '</textarea>' +
        '<div class="p_d_mo_input"><input onclick="p_d_save(\'' + id + "','" + task_id + '\')" type="submit" value="保存" />' +
        '<input type="submit" value="取消" onclick="p_d_pen_return(\'' + id + "','" + task_id + '\')" /></div>').fadeOut().fadeIn()

    $('#p_d_pen_div' + id).html('<img id="p_d_pen' + id + '" onclick="p_d_pen_return(\'' + id + "','" + task_id + '\')"  src="/img/pen.png">')
    $('#p_d_pen' + id).css('filter', 'brightness(1%)')
}
function p_d_pen_return(id, task_id) {
    let cc_tent = $('#p_d_mo_content' + id).val();
    $('#d_tl_content' + id).html(decodeURIComponent(cc_tent)).fadeOut().fadeIn()
    $('#p_d_pen_div' + id).html('<img id="p_d_pen' + id + '" onclick="p_d_pen(\'' + id + "','" + task_id + '\')"  src="/img/pen.png">')
    $('#p_d_pen' + id).css('filter', 'brightness(100%)')
}
function d_new_log(task_id, AddTime, Content, Id, Name, OperatorName, OperatorId, Type, cm_content) {
    let add = '<div class="tl_log" id="tl_log' + Id + '">' +
        '<div class="tl_div_timename"><div>' + updatetime(AddTime) + '</div>' + '<div class="tl_div_Opername" style="margin-left:7px;">' + OperatorName + '</div></div>' +
        '<div style="width: 64%;float: left;">将' + '<span id="wd_c_name' + Id + '">' + Name + '</span>' +
        ' ' + cm_content + '</div>' +
        '</div>'
    let d_add = '<div class="d_tl_log" id="tl_log' + Id + '">' +
        '<div class="d_tl_div_timename"><div style="width: 50%;float: left;">' + updatetime(AddTime) + '</div>' + '<div class="d_tl_div_Opername">' + OperatorName + '</div></div>' +
        '<div style="width: 64%;float: left;">将' + '<span style="margin-left: 5px;" id="wd_c_name' + Id + '">' + Name + '</span>' +
        ' ' + cm_content + '</div>' +
        '</div>'

    $('#thelog_div' + task_id).append(add)
    $('#p_d_logandcomment' + task_id).append(d_add)

    if (task_id == Id) {
        $('#wd_c_name' + Id).remove();
    }
}
function kanban_task_mo(task_id) {

    $('#wd_kanban_task_worp' + task_id).mouseover(function () {
        let offec = $('#wd_kanban_task_worp' + task_id)
        let offectop = offec.position().top
        let offecleft = offec.position().left
        $('#wd_kanban_mo_style_mo' + task_id).show();
        $('#wd_kanban_modity' + task_id).css({
            'position': 'absolute',
            'left': offecleft,
            'top': offectop
        })

    })
    $('#wd_kanban_task_worp' + task_id).mouseleave(function () {
        $('#wd_kanban_mo_style_mo' + task_id).hide();
    })

    // $(document).bind("click", function (e) {
    //     if ($(e.target).closest("#wd_kanban_mo_style_img"+task_id).length > 0) {
    //        let offec =  $('#wd_kanban_mo_style_img'+task_id)
    //        let offectop = offec.position().top
    //        let offecleft =  offec.position().left
    //         $('#wd_kanban_mo_style_mo' + task_id).fadeIn();
    //         $('#wd_kanban_mo_style_mo' + task_id).css({
    //             'position':'absolute',
    //             'left':offecleft,
    //             'top':offectop
    //         })
    //     } else {
    //         $('#wd_kanban_mo_style_mo' + task_id).hide();
    //     }
    // })
    // $("#wd_kanban_mo_style_mo"+task_id).click(function (event) {
    //     event.stopPropagation();
    // });
}
// 判断任务状态
function kanbantaskstate(task_id, State) {
    let taskstate = State;
    if (taskstate == 1) {
        $('#pause' + task_id).html('<img src="/img/blue_begin.png" alt=""  value="1" onclick="Task_Start(\'' + task_id + "','" + task_id + '\')">')
        $('#d_pause' + task_id).html('<img src="/img/blue_begin.png" alt=""  value="1" onclick="Task_Start(\'' + task_id + "','" + task_id + '\')">')
    } else if (taskstate == 2) {
        $('#pause' + task_id).html('<img src="/img/red_end.png" alt=""  value="0" onclick="Task_Start(\'' + task_id + "','" + task_id + '\')">')
        $('#d_pause' + task_id).html('<img src="/img/red_end.png" alt=""  value="0" onclick="Task_Start(\'' + task_id + "','" + task_id + '\')">')
    }

    if (taskstate == 1) {
        var pau = '<img src="/img/blue_begin.png" title ="暂停中" value="1">'
    } else if (taskstate == 2) {
        var pau = '<img src="/img/red_end.png" title ="开始中" value="0">'
    } else {
        var pau = '<img class="kanban_loading_style" src="/img/kb.png" title ="暂停中" value="11">'
    }
    $('#pause' + task_id).html(pau)
    $('#d_pause' + task_id).html(pau)

    if (taskstate == 3) {
        var zrw = '<img src="/img/checked.png" title ="已完成" value="1">'

         // 任务详情页面下修改删除按钮的隐藏
         d_mo_btn_hide(task_id)
         // 任务下修改删除标识隐藏
         k_mo_btn_hide(task_id)
    } else if (taskstate == 2 || taskstate == 1) {
        var zrw = '<img src="/img/uncheck.png" title ="未完成" value="0">'
    } else {
        var zrw = '<img class="kanban_loading_style" src="/img/kb.png" title ="暂停中" value="11">'
    }
    $('#zrw' + task_id).html(zrw)
    $('#d_zrw' + task_id).html(zrw)
}
function pause(task_id, task_id) {
    pause_task(task_id, task_id)
}
function d_pause(task_id, task_id) {
    pause_task(task_id, task_id)
}
//子任务统计
function kanban_task_sub_num(Sub, task_id){
    $('#wd_kanban_taskshow' + task_id).html(task_sub(Sub))
    $('#wd_kanban_taskhide' + task_id).html(task_sub(Sub))

    $('#d_the_details_sub_num' + task_id).html(task_sub(Sub))
    $('#d_the_details_sub_nub' + task_id).html(task_sub(Sub))
}
function kanban_task_sub_show(Sub, task_id) {
    $('#wd_kanban_opensub' + task_id).click(function () {
        $('#wd_kanban_opensub' + task_id).hide();
        $('#wd_kanban_closesub' + task_id).show();
        $('#wd_kanban_suball' + task_id).slideDown();

        $('#wd_task_mo' + task_id).slideUp();
    })

    $('#wd_kanban_closesub' + task_id).click(function () {
        $('#wd_kanban_opensub' + task_id).show();
        $('#wd_kanban_closesub' + task_id).hide();
        $('#wd_kanban_suball' + task_id).slideUp();
    })

    $('#d_the_details_sub_show' + task_id).click(function () {
        $('#d_the_details_sub_hide' + task_id).show();
        $('#d_the_details_sub_show' + task_id).hide();
        $('#the_details_sub' + task_id).slideDown();

        // $('#wd_task_mo' + task_id).slideUp();
    })

    $('#d_the_details_sub_hide' + task_id).click(function () {
        $('#d_the_details_sub_show' + task_id).show();
        $('#d_the_details_sub_hide' + task_id).hide();
        $('#the_details_sub' + task_id).slideUp();
    })

}
// 标准页面下添加子任务

function addsub_open(Sub, task_id) {
    if (Sub != null) {
        for (su in Sub) {
            let sub = Sub[su]
            let sub_id = sub.Id
            let sub_Add_time = sub.Add_time
            let sub_Check_result = sub.Check_result
            let sub_Content = decodeURIComponent(sub.Content.replace(/\+/g, '%20'))
            let sub_End_time = sub.End_time
            let sub_Expect_end_time = sub.Expect_end_time
            let sub_Performance_id = sub.Performance_id
            let sub_Start_time = sub.Start_time
            let sub_State = sub.State
            addsub_open_pubilc(sub_id, sub_Content, sub_Expect_end_time, sub_State, task_id)  //公共子任务的添加
            sub_state_s(task_id, sub_id, sub_State, sub_Performance_id, sub_Check_result)


        }
    }
}
// 子任务状态判断
function sub_state_s(task_id, sub_id, sub_State, sub_Performance_id, sub_Check_result) {
    if (sub_State == 1) {
        var pau = '<img src="/img/blue_begin.png" title ="暂停中" value="1">'
    } else if (sub_State == 2) {
        var pau = '<img src="/img/red_end.png" title ="开始中" value="0">'
    } else {
        var pau = '<img class="kanban_loading_style" src="/img/kb.png" title ="暂停中" value="11">'
    }
    $('#zipause' + sub_id).html(pau)
    $('#d_zipause' + sub_id).html(pau)
    if (sub_State == 1) {
        var subbox = '<img style="width: 17px;" src="/img/uncheck.png" title="未完成" value="0">'
    }
    if (sub_State == 2) {
        var subbox = '<img style="width: 17px;"  src="/img/uncheck.png" title="未完成" value="0">'
    }
    if (sub_State == 3) {
        if (sub_Performance_id != 0) {
            var subbox = '<img style="width: 18px;"  src="/img/saveing.png" title="已保存未提交" value="3">'
            allsubbbox(sub_id)
            pointer_none(sub_id)
            app_div_kanban(sub_id, task_id)  //将这个divappendto

        } else {
            var subbox = '<img style="width: 17px;"  src="/img/checked.png" title="已完成" value="1">'
        }
        sub_btn_hide(sub_id)
    }
    if (sub_State == 4) {
        var subbox = '<img style="width: 21px;margin-left: -4px;position: relative;left: 3px;"  src="/img/assess.png" title="考核中" value="4">'
        sub_btn_hide(sub_id)
        allsubbbox(sub_id)
        app_div_kanban(sub_id, task_id)
    }
    if (sub_State == 5) {
        sub_btn_hide(sub_id)
        allsubbbox(sub_id)
        pointer_none(sub_id)
        if (sub_Check_result == 0) {
            var subbox = '<img style="width: 18px;" src="/img/Task/nothroug.png" title="考核完成，未通过" value="5">'
        } else {
            var subbox = '<img style="width: 18px;" src="/img/GIS-TL.png" style="width: 15px;margin-left: 1px;" alt="考核完成" value="5">'
        }
        $('#addsub_task_form' + sub_id).appendTo('#wd_kanban_rev_sub' + task_id).css('margin-left', '5px')
        $('#d_addsub_task_form' + sub_id).appendTo('#d_wd_kanban_rev_sub' + task_id)
    }
    if (sub_State == -1) {
        $('#addsub_task_form' + sub_id).remove()
        $('#d_addsub_task_form' + sub_id).remove()
    }
    $('#cboxid' + sub_id).html(subbox)
    $('#d_cboxid' + sub_id).html(subbox)

    $('.kanban_loading_style').parent().css('pointer-events', 'none')
}
function pointer_none(sub_id) {
    $('#addsub_task_form' + sub_id).css('pointer-events', 'none');
    $('#d_addsub_task_form' + sub_id).css('pointer-events', 'none');
}
function nopoint_append(sub_id, task_id) {
    $('#addsub_task_form' + sub_id).appendTo('#wd_kanban_subnum' + task_id)
    $('#d_addsub_task_form' + sub_id).appendTo('#the_details_d_sub' + task_id)
    nopoint_a_shan(sub_id)
}
function nopoint_prepend(sub_id, task_id) {
    $('#addsub_task_form' + sub_id).prependTo('#wd_kanban_subnum' + task_id)
    $('#d_addsub_task_form' + sub_id).prependTo('#the_details_d_sub' + task_id)
    nopoint_a_shan(sub_id)
}
// 公共添加子任务
function addsub_open_pubilc(sub_id, sub_Content, sub_Expect_end_time, sub_State, task_id) {
    let addsub = '<form id="addsub_task_form' + sub_id + '"style="clear: both;float: left;width: 97%;" onsubmit="return false" method="post" ><div id="wd_kanban_subtask' + sub_id + '" class="wd_kanban_subtask" >' +
        '<input type="hidden" name="id" value="' + sub_id + '" />' +
        '<div class="wd-kanban-sub-use" id="wd_kanban_sub_use' + sub_id + '" style="margin-left: -22px;">' +
        '<div class="wd_kanban_sub_usetwo" id="wd_knaban_sub_usetwo' + sub_id + '">' +
        '<div style="display: inline;"><img onclick="z_kanban_delect_img(\'' + sub_id + "','" + task_id + '\')" src="/img/box.png" alt="" title="删除"></div>' +
        '<div id="z_kanban_pendiv' + sub_id + '" style="display: inline;margin-left: 7px;">' +
        '<img onclick="z_kanban_mo_img(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')" id="wd_kanban_sub_pen' + sub_id + '" src="/img/pen.png" alt="" title="修改"></div>' +
        '</div>' +

        '</div>' +

        '<div id="s_kanban_sub_png' + sub_id + '" class="wd_kanban_sub_use" style="display:inline;">' +
        '<span id="zipause' + sub_id + '" class="zirenwu" onclick="zipause(\'' + sub_id + "','" + task_id + '\');"></span>' +
        '</div>' +
        '<div class="wd_kanban_sub_check">' +
        '<span class="complete" id="cboxid' + sub_id + '" onclick="zirenwu(\'' + task_id + "','" + sub_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div class="wd_kanban_s_div" id="wd_kanban_s_div' + sub_id + '" style="float: left;width: 80%;text-indent: -4px;">' +
        '<div id="wd_kanban_sub_name' + sub_id + '" class="wd_kanban_sub_name" style="display:inline;">' + sub_Content + '</div>' +
        '<div id="wd_kanban_sub_time' + sub_id + '" class="wd_kanban_sub_time" style="display:inline;">' + ShowTime(decodeURIComponent(sub_Expect_end_time)) + '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    let addsubdetails = '<form id="d_addsub_task_form' + sub_id + '"style="clear: both;float: left;width: 100%;" onsubmit="return false" method="post" ><div style="margin: 0;" id="d_wd_kanban_subtask' + sub_id + '" class="d_wd_kanban_subtask" >' +
        '<input type="hidden" name="id" value="' + sub_id + '" />' +
        '<div class="d_wd-kanban-sub-use" id="d_wd_kanban_sub_use' + sub_id + '" style="margin: 0px;">' +
        '<div class="wd_kanban_sub_usetwo" style="display:none;" id="d_wd_knaban_sub_usetwo' + sub_id + '" style="margin: 0px;">' +
        '<div id="wd_kanban_d_sub_use' + sub_id + '" style="margin: 0px;">' +
        '<div style="display: inline;"><img onclick="z_kanban_delect_img(\'' + sub_id + "','" + task_id + '\')" src="/img/box.png" alt="" title="删除"></div>' +
        '<div id="d_z_kanban_pendiv' + sub_id + '" style="display: inline;margin-left: 7px;">' +
        '<img onclick="z_kanban_mo_img(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')" id="d_wd_kanban_sub_pen' + sub_id + '" src="/img/pen.png" alt="" title="修改"></div>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '<div id="d_s_kanban_sub_png' + sub_id + '" class="wd_kanban_sub_use" style="display:inline;">' +
        '<span id="d_zipause' + sub_id + '" class="zirenwu" onclick="d_zipause(\'' + sub_id + "','" + task_id + '\');"></span>' +
        '</div>' +
        '<div class="d_wd_kanban_sub_check">' +
        '<span class="complete" id="d_cboxid' + sub_id + '" onclick="d_zirenwu(\'' + task_id + "','" + sub_id + '\')">' +

        '</span>' +
        '</div>' +
        '<div class="wd_kanban_s_div" id="d_wd_kanban_s_div' + sub_id + '" style="float: left;width: 71%;text-indent: -4px;margin-left: 10px;">' +
        '<div id="d_wd_kanban_sub_name' + sub_id + '" class="d_wd_kanban_sub_name" style="display:inline;">' + decodeURIComponent(sub_Content) + '</div>' +
        '<div id="d_wd_kanban_sub_time' + sub_id + '" class="wd_kanban_sub_time" style="display:inline;margin-left: 5px;">' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '</div>' +
        '</div>' +
        '</div>' +
        '</form>'
    // var index = layer.load(1)
    $('#wd_kanban_subnum' + task_id).append(addsub)

    $('#the_details_d_sub' + task_id).append(addsubdetails)

    //子任务修改
    z_kanban_mo(sub_id, sub_Content, sub_Expect_end_time)
}
//子任务修改
function z_kanban_mo_img(sub_id, sub_Content, sub_Expect_end_time) {
    let add = '<div class="s_kanban_text" style="margin-left: 5px;"><input name="content" id="s_kanban_content' + sub_id + '" value="' + sub_Content + '"  placeholder="子任务内容" type="text"  /></div>' +
        '<div style="margin-left: 9px;"><input  name="expect_end_time"  id="s_ecpect_time' + sub_id + '" value="' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '" placeholder="预计完成时间" type="text" /></div>' +
        '<div><input onclick="subtask_save(\'' + sub_id + '\')" type="submit" value="保存">' +
        '<input type="button" onclick="z_kanban_subtask_reset(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')" value="取消">' +
        '</div>'
    let dadd = '<div class="s_kanban_text" style="margin-left: 5px;"><input name="content" id="d_s_kanban_content' + sub_id + '" value="' + sub_Content + '"  placeholder="子任务内容" type="text"  /></div>' +
        '<div style="margin-left: 15px;"><input  name="expect_end_time"  id="d_s_ecpect_time' + sub_id + '" value="' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '" placeholder="预计完成时间" type="text" /></div>' +
        '<div style="margin-top: 4px;"><input onclick="d_subtask_save(\'' + sub_id + '\')" type="submit" value="保存">' +
        '<input type="button" onclick="z_kanban_subtask_reset(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')" value="取消">' +
        '</div>'
    $('#wd_kanban_s_div' + sub_id).html(add).fadeOut().fadeIn()
    $('#d_wd_kanban_s_div' + sub_id).html(dadd).fadeOut().fadeIn().css({
        'margin': '0',
        'margin-left': '10px'
    })
    laydate.render({
        elem: '#s_ecpect_time' + sub_id
    });
    laydate.render({
        elem: '#d_s_ecpect_time' + sub_id
    });
    $('#z_kanban_pendiv' + sub_id).html('<img onclick="z_kanban_return_mo(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')"src="/img/pen.png"title="修改"></div>')
    $('#d_z_kanban_pendiv' + sub_id).html('<img onclick="z_kanban_return_mo(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')"src="/img/pen.png"title="修改"></div>')
}
function z_kanban_return_mo(sub_id, sub_Content, sub_Expect_end_time) {
    let add = '<div id="wd_kanban_sub_name' + sub_id + '" class="wd_kanban_sub_name" style="display:inline;">' + sub_Content + '</div>' +
        '<div id="wd_kanban_sub_time' + sub_id + '" class="wd_kanban_sub_time" style="display:inline;">' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '</div>'
    let dadd = '<div id="d_wd_kanban_sub_name' + sub_id + '" class="wd_kanban_sub_name" style="display:inline;">' + decodeURIComponent(sub_Content) + '</div>' +
        '<div id="d_wd_kanban_sub_time' + sub_id + '" class="wd_kanban_sub_time" style="display:inline;margin-left: 5px;">' + dateyear(decodeURIComponent(sub_Expect_end_time)) + '</div>'
    $('#wd_kanban_s_div' + sub_id).html(add).fadeOut().fadeIn()
    $('#d_wd_kanban_s_div' + sub_id).html(dadd).fadeOut().fadeIn().css({
        'margin-left': '10px',
        'margin-top': '8px'
    })

    $('#z_kanban_pendiv' + sub_id).html('<img onclick="z_kanban_mo_img(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')"src="/img/pen.png"title="修改"></div>')
    $('#d_z_kanban_pendiv' + sub_id).html('<img onclick="z_kanban_mo_img(\'' + sub_id + "','" + sub_Content + "','" + sub_Expect_end_time + '\')"src="/img/pen.png"title="修改"></div>')
}
function z_kanban_subtask_reset(sub_id, sub_Content, sub_Expect_end_time) {
    z_kanban_return_mo(sub_id, sub_Content, sub_Expect_end_time)
    $('#wd_kanban_sub_use' + sub_id).hide();
    $('#d_wd_knaban_sub_usetwo' + sub_id).hide();

}
//子任务修改
function z_kanban_mo(sub_id, sub_Content, sub_Expect_end_time) {
    $('#wd_kanban_subtask' + sub_id).mouseover(function () {
        let offec = $('#wd_kanban_subtask' + sub_id)
        let offectop = offec.position().top
        let offecleft = offec.position().left

        $('#wd_kanban_sub_use' + sub_id).css({
            'position': 'absolute',
            'left': offecleft,
            'top': offectop
        })
        $('#wd_kanban_sub_use' + sub_id).show();
        // $('#wd_knaban_sub_usetwo' + sub_id).show();
    })
    $('#wd_kanban_subtask' + sub_id).mouseleave(function () {
        $('#wd_kanban_sub_use' + sub_id).hide();
    })

    $('#d_wd_kanban_subtask' + sub_id).mouseover(function () {
        $('#d_wd_knaban_sub_usetwo' + sub_id).show();
        // $('#wd_knaban_sub_usetwo' + sub_id).show();
    })
    $('#d_wd_kanban_subtask' + sub_id).mouseleave(function () {
        $('#d_wd_knaban_sub_usetwo' + sub_id).hide();
    })
}
function kanban_task_note(Note, task_id) {
    if (Note == '' || Note == null) {
        $('#wd_kanban_note' + task_id).hide();
    } else {
        $('#wd_kanban_note' + task_id).attr('title', Note).show();
    }
}
//任务标签
function kanban_show_tag(task_tag, task_id) {
    let stand_tag = decodeURIComponent(task_tag)
    let tag = stand_tag.split(',');
    var number = '';
    for (t = 0; t < tag.length; t++) {
        if (tag[t] == '<BUG>') {
            number += '<a class="detail_task_tag" style="text-align: center;background-color:#df7d7d;font-size: 12px;display: inline-block;" value="' + htmlspecialchars(tag[t]) + '" title="系统标签">' + htmlspecialchars(tag[t]) + '</a>'
        }
        else if (tag[t] == '<延迟>') {
            number += '<a class="detail_task_tag" style="text-align: center;background-color:#B8860B;font-size: 12px;display: inline-block;" value="' + htmlspecialchars(tag[t]) + '" title="系统标签">' + htmlspecialchars(tag[t]) + '</a>'
        }
        else {
            number += '<a class="detail_task_tag" style="text-align: center;font-size: 12px;background-color:rgb(135, 138, 236);display: inline-block;" value="' + htmlspecialchars(tag[t]) + '" title="自定义标签">' + tag[t] + '</a>'
        }
    }
    if (tag != '') {
        $('.wd_knaban_tag' + task_id).html(number)
    } else {
        $('.wd_knaban_tag' + task_id).html('')
    }
}

// 子任务统计的变化
function k_fs(task_id) {
    var rrr = new Array();
    // $('#zipause'+k+i).html('<img src="/img/blue_begin.png" value="1">');
    let arr = $('#wd-kanban-alltask' + task_id + ' .complete img');
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].getAttribute('value') >= 1) {
            rrr.push(arr[j].getAttribute('value'));
        }
    }
    let len = rrr.length;
    return len
}
function d_k_fs(task_id) {
    var rrr = new Array();
    // $('#zipause'+k+i).html('<img src="/img/blue_begin.png" value="1">');
    let arr = $('#the_details_sub' + task_id + ' .complete img');
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].getAttribute('value') >= 1) {
            rrr.push(arr[j].getAttribute('value'));
        }
    }
    let len = rrr.length;
    return len
}
function k_fallsub(task_id) {
    var rrr = new Array();
    let arr = $('#wd-kanban-alltask' + task_id + ' .complete img');
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
function d_sub_number(task_id) {

    let fractional = (k_fs(task_id)) + '/' + (k_fallsub(task_id))
    $('#wd_kanban_taskshow' + task_id).html(fractional)
    $('#wd_kanban_taskhide' + task_id).html(fractional)
    $('#d_the_details_sub_num' + task_id).html(fractional)
    $('#d_the_details_sub_nub' + task_id).html(fractional)
}
function d_sub_complete_num(task_id) {
    let numval = $('#wd_kanban_taskshow' + task_id).text()
    let numa = numval.split('/')
    let fractional = (k_fs(task_id)) + '/' + String(numa[1])
    $('#wd_kanban_taskshow' + task_id).html(fractional)
    $('#wd_kanban_taskhide' + task_id).html(fractional)
    $('#d_the_details_sub_num' + task_id).html(fractional)
    $('#d_the_details_sub_nub' + task_id).html(fractional)
}

function dsub_d_sub_complete_num(task_id) {
    let numval = $('#d_the_details_sub_num' + task_id).text()
    let numa = numval.split('/')
    let fractional = (d_k_fs(task_id)) + '/' + String(numa[1])
    $('#wd_kanban_taskshow' + task_id).html(fractional)
    $('#wd_kanban_taskhide' + task_id).html(fractional)
    $('#d_the_details_sub_num' + task_id).html(fractional)
    $('#d_the_details_sub_nub' + task_id).html(fractional)
}
