/*$(document).ready(function(){
    $('#btn').oclick(function(){
        if(('#btn').click()==''){
        $('#spinfo').test('邮箱不能为空');
        $('spinfo').focus();
    }
    else {
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
            $('#spinfo').text('邮箱格式不正确');
            $(this).focus();
        }
        else{
            $('#spaninfo').test('');
            $('#spaninfo').append('');
        }
    }
    })
})*/


/*焦点 email */
$(function () {
    var state = false;
    $('#login_3_1').focus(function () {
        if (state == false) {
            $(this).val();
        }
    })
    $('#login_3_1').blur(function () {
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
    $('#btn_2').click(function () {
        if ($('#login_3_1').val() == "") {
            $('#login_3_3').text('邮箱不能为空');
            $(' #login_3_2,#login_3_3').css('display', 'block');
            return false;
        }
    })
    
/*焦点 password */

    $('#login_4_1').blur(function () {
        var val = $(this).val();
        if (val == "") {
            $('#login_4_3').text('密码不能为空');
            $(' #login_4_2,#login_4_3').css('display', 'block');
            $(this).val();
        }
        else {
            if (val.length < 7) {
                $('#login_4_3').text('不得低于八位');
                $(' #login_4_2,#login_4_3').css('display', 'block');
                $(this).val();
            }
            else {
                $('#login_4_3').text('');
                $(' #login_4_2,#login_4_3').css('display', 'none');
                return false;
            }
        }
    })

    /*clickpassword */
    $('#btn_2').click(function () {
        if ($('#login_4_1').val() == "") {
            $('#login_4_3').text('密码不能为空');
            $(' #login_4_2,#login_4_3').css('display', 'block');
            return false;
        }
        else {
            if ($('#login_4_1').val() < 7) {
                $('#login_4_3').text('不能低于八位');
                $(' #login_4_2,#login_4_3').css('display', 'block');
                return false;
            }
        }
    })
})

