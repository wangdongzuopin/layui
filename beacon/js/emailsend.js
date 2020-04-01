$(function () {
    var state = false;
    $('#reg_4_1').focus(function () {
        if (state == false) {
            $(this).val();
        }
    })
    $('#reg_4_1').blur(function () {
        if ($(this).val() == '') {
            $('#login_3_3').text('邮箱不能为空');
            $(' #login_3_2,#login_3_3').css('display', 'block');
            $(this).val();
        }
        else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $('#login_3_3').text('邮箱格式不正确');
                $(' #login_3_2,#login_3_3').css('display', 'block');
                $(this).val();
            }
            else {
                $('#login_3_2').text('');
                $('#login_3_2').append('');
                $(' #login_3_2,#login_3_3').css('display', 'none');
                state = true;
            }
        }
    })
/* click事件验证email*/
    $('#action1').click(function () {
        if ($('#login_3_1').val() == "") {
            $('#login_3_3').text('邮箱不能为空');
            $(' #login_3_2,#login_3_3').css('display', 'block');
            return false;
        }
        else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $('#login_3_3').text('邮箱格式不正确');
                $('#login_3_2,#login_3_3').css('display', 'block');
                return false;
            }
        }
    })
})


