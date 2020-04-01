$('#cbox').ready(function () {
    //实现全选反选
    $("#checkboxall").on('click', function () {
        $("#cb input:checkbox").prop("checked", $(this).prop('checked'));
    })
    $("#cb input:checkbox").on('click', function () {
        //当选中的长度等于checkbox的长度的时候,就让控制全选反选的checkbox设置为选中,否则就为未选中
        if ($("#cb input:checkbox").length === $("#cb input:checked").length) {
            $("#checkboxall").prop("checked", true);
        } else {
            $("#checkboxall").prop("checked", false);
        }
    })
})

$(document).on('click', '.wd_project_system_i', function () {
    // let tag_mo = $('#tag_img')
    $(this).parent().parent().remove();
    quxiaoxiao()
    // layer.msg('删除成功')
});

function newtagg() {
    let tag = '<div class="wd_project_new" style="margin-left: 10px;border: 0;min-width: 70px;height: 25px;line-height: 27px;border-radius: 5px;float: left;border-bottom: 1px dashed;">' +
        '<div>' +
        '<input class="wd_pro_tag_tmp" placeholder="添加标签" type="text" value="" maxlength="6" style="font-size: 12px;min-width: 50px;">' +
        '<i class="wd_project_system_i" style="margin-top: -2px;float: right;cursor: pointer;">x</i>' +
        '</div>' +
        '</div>'

    $('.wd_project_add_tag').before(tag)
    $('.wd_pro_tag_tmp').focus();
    $('.wd_project_add_tag').html('<div id="wd_project_add_ttag" style="margin-left: 5px;display: inline;" onclick="queren()">确认</div>' +
        '<div id="wd_project_add_ttag" style="margin-left: 5px;display: inline;" onclick="quxiaoxiao()">取消</div>')
}
var n = 1;
function queren() {
    var i = n++;
    let va = $('.wd_pro_tag_tmp').val()
    let vaa = va.trim()
    let tag = '<div class="wd_project_custom" style="margin-top:5px;min-width: 70px;height: 25px;line-height: 27px;border-radius: 5px;float: left;margin-left: 6px;">' +
        '<div>' +
        '<input class="wd_tttt' + i + '" readonly="readonly" type="text" name="tag" value="" maxlength="6" style="cursor: default;font-size: 14px;color: white;min-width: 50px;">' +
        '<i class="wd_project_system_i" style="margin-top: -2px;float: right;cursor: pointer;">x</i>' +
        '</div>' +
        '</div>'
    if (vaa != '') {
        $('.wd_project_new').remove();
        $('.wd_project_add_tag').before(tag)
        $('.wd_tttt' + i).val(vaa)
        $('.wd_project_add_tag').html('<div id="wd_project_add_ttag" style="margin-left: 5px;margin-top: 3px;" onclick="newtagg()">添加</div>')
    } else {
        layer.msg('输入标签内容')
        $('.wd_pro_tag_tmp').focus();
    }
}
function quxiaoxiao() {
    $('.wd_project_add_tag').html('<div id="wd_project_add_ttag" style="margin-left: 5px;margin-top: 3px;" onclick="newtagg()">添加</div>')
    $('.wd_project_new').remove();
}
function add_newtagg() {
    let tag = '<div class="wd_project_new" style="margin-left: 10px;border: 0;min-width: 70px;height: 25px;line-height: 27px;border-radius: 5px;float: left;border-bottom: 1px dashed;">' +
        '<div>' +
        '<input class="wd_pro_tag_tmp" placeholder="添加标签"  type="text"  value="" maxlength="6" style="font-size: 12px;min-width: 50px;">' +
        '<i class="wd_project_system_i" style="margin-top: -2px;float: right;cursor: pointer;">x</i>' +
        '</div>' +
        '</div>'

    $('.wd_project_add_tag').before(tag)
    $('.wd_pro_tag_tmp').focus();
    $('.wd_project_add_tag').html('<div id="wd_project_add_ttag" style="margin-left: 5px;display: inline;" onclick="queren()">确认</div>' +
        '<div id="wd_project_add_ttag" style="margin-left: 5px;display: inline;" onclick="quxiaoxiao()">取消</div>')
}
// 看板
function add_kan() {
    let tag = '<div class="wd_project_new" style="margin-left: 10px;margin-top: 3px;border: 0;min-width: 70px;height: 26px;line-height: 27px;border-radius: 5px;float: left;border-bottom: 1px dashed;">' +
        '<div>' +
        '<input class="wd_pro_tag_tmpkan" placeholder="添加标签"  type="text"  value="" maxlength="6" style="font-size: 12px;border: 0;width: 75px;text-align: center;">' +
        '<i class="wd_kanban_system_i" style="margin-top: -2px;float: right;cursor: pointer;">x</i>' +
        '</div>' +
        '</div>'

    $('.wd_kanban_add').before(tag)
    $('.wd_pro_tag_tmpkan').focus();
    $('.wd_kanban_add').html('<div id="wd_project_add_kan" style="margin-left: 5px;display: inline;" onclick="kanbanque()">确认</div>' +
        '<div id="wd_project_add_quxiao" style="margin-left: 5px;display: inline;" onclick="kanbanqu()">取消</div>')
}
$(document).on('click', '.wd_kanban_system_i', function () {
    // let tag_mo = $('#tag_img')
    $(this).parent().parent().remove();
    $('.wd_kanban_add').html('<div id="wd_project_add_kan" style="margin-left: 5px;display: inline;" onclick="add_kan()">添加</div>')
    $('.wd_project_new').remove();
});
function kanbanqu(){
    $('.wd_kanban_add').html('<div id="wd_project_add_kan" style="margin-left: 5px;display: inline;" onclick="add_kan()">添加</div>')
    $('.wd_project_new').remove();
}
var nn = 0;
function kanbanque(){
    var i = n++;
    let va = $('.wd_pro_tag_tmpkan').val()
    let vaa = va.trim()
    let tag = '<div class="wd_project_custom" style="margin-top:5px;min-width: 70px;height: 25px;line-height: 27px;border-radius: 5px;float: left;margin-left: 6px;">' +
        '<div>' +
        '<input class="wd_tttt' + i + '" readonly="readonly" type="text" name="tag" value="" maxlength="6" style="cursor: default;font-size: 14px;color: white;width: 65px;border: 0;border-radius: 5px;background: none;text-align: center;"">' +
        '<i class="wd_project_system_i" style="margin-top: -2px;float: right;cursor: pointer;">x</i>' +
        '</div>' +
        '</div>'
    if (vaa != '') {
        $('.wd_project_new').remove();
        $('.wd_kanban_add').before(tag)
        $('.wd_tttt' + i).val(vaa)
        $('.wd_kanban_add').html('<div id="wd_project_add_ttag" style="margin-left: 5px;margin-top: 3px;" onclick="add_kan()">添加</div>')
    }
    // else if(vaa == '<延迟>'){
    //     layer.msg('已有系统标签')
    //     $('.wd_pro_tag_tmpkan').focus();
    //     return false;
    // }else if(vaa == '<BUG>'){
    //     layer.msg('已有系统标签')
    //     $('.wd_pro_tag_tmpkan').focus();
    // }
    else {
        layer.msg('输入标签内容')
        $('.wd_pro_tag_tmpkan').focus();
    }
}
