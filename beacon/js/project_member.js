$('#cbox1').ready(function() {
    //实现全选反选
    $("#checkboxall1").on('click', function() {
        $("#u input:checkbox").prop("checked", $(this).prop('checked'));
    })
    $("#u input:checkbox").on('click', function() {
        //当选中的长度等于checkbox的长度的时候,就让控制全选反选的checkbox设置为选中,否则就为未选中
        if($("#u input:checkbox").length === $("#u input:checked").length) {
            $("#checkboxall1").prop("checked", true);
        } else {
            $("#checkboxall1").prop("checked", false);
        }
    })
})


 