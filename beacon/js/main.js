
/*用户*/
$(function () {
    $('#reg_3_1').blur(function () {
        var val = $(this).val();
        if (val == "") {
            $('#reg_3_2').text('用户名不为空');
            $(' #reg_3_3,#reg_3_2').css('display', 'block');
            $(this).val();
        }
        else {
            $('#reg_3_2').text('');
            $('#reg_3_3,#reg_3_2 ').css('display', 'none');
            return false;
        }
    })
    /*clickusername */
    $('#reg_7_1').click(function () {
        if ($('#reg_3_1').val() == "") {
            $('#reg_3_2').text('用户名不为空');
            $(' #reg_3_3,#reg_3_2').css('display', 'block');
            return false;
        }
        else {
            $('#reg_3_2').text('');
            $('#reg_3_3,#reg_3_2 ').css('display', 'none');
            return false;
        }
    })

    /* 邮箱*/
    var state = false;
    $('#reg_4_1').focus(function () {
        if (state == false) {
            $(this).val();
        }
    })
    $('#reg_4_1').blur(function () {
        if ($(this).val() == '') {
            $('#reg_4_3').text('邮箱不能为空');
            $(' #reg_4_3,#reg_4_2').css('display', 'block');
            $(this).val();
        }
        else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $('#reg_4_3').text('邮箱格式不正确');
                $(' #reg_4_3,#reg_4_2').css('display', 'block');
                $(this).val();
            }
            else {
                $('#reg_4_3').text('');
                $('#reg_4_3').append('');
                $('#reg_4_2,#reg_4_3 ').css('display', 'none');
                state = true;
            }
        }
    })

    /*密码*/
    $('#reg_5_1').blur(function () {
        var val = $(this).val();
        if (val == "") {
            $('#reg_5_3').text('密码不能为空');
            $(' #reg_5_2,#reg_5_3').css('display', 'block');
            $(this).val();
        }
        else {
            if (val.length < 7) {
                $('#reg_5_3').text('不得低于八位');
                $(' #reg_5_2,#reg_5_3').css('display', 'block');
                $(this).val();
            }
            else {
                $('#reg_5_3').text('');
                $('#reg_5_2,#reg_5_3 ').css('display', 'none');
                return false;
            }
        }
    })

    /*click password */
    $('#reg_7_1').click(function () {
        if ($('#reg_5_1').val() == "") {
            $('#reg_5_3').text('密码不能为空');
            $(' #reg_5_2,#reg_5_3').css('display', 'block');
            return false;
        }
        else {
            if ($('#reg_5_1').val() < 7) {
                $('#reg_5_3').text('不能低于八位');
                $(' #reg_5_2,#reg_5_3').css('display', 'block');
                return false;
            }
        }
    })
    /* 验证码*/
    $('#reg_6_1').blur(function () {
        var val = $(this).val();
        if (val == "") {
            $('#reg_6_4').text('验证码不能为空');
            $(' #reg_6_3,#reg_6_4').css('display', 'block');
            $(this).val();
        }
        else {
            if (val.length < 6) {
                $('#reg_6_4').text('请输入有效的验证码');
                $(' #reg_6_3,#reg_6_4').css('display', 'block');
                $(this).val();
            }
            else {
                $('#reg_6_4').text('');
                $('#reg_6_3,#reg_6_4 ').css('display', 'none');
                return false;
            }
        }
    })
})
function register() {
    var reg_3_1 = $('#reg_3_1').val();
    var reg_4_1 = $('#reg_4_1').val();
    var reg_5_1 = $('#reg_5_1').val();
    $.ajax({
        url: "check",
        async: false,
        type: "post",
        data: { name: reg_3_1, mail: reg_4_1, passwd: reg_5_1 },
        success: function (result, testStatus) {
            if (result.state == 0) {
                layer.msg(result.msg)
                
            }
            else if (result.state == 1) {
                layer.msg(result.msg)
                $('#reg_7_1').css('background-color', 'white');
                $('#reg_7_1').css('color', 'gainsboro');
                $('#reg_7_1').css('cursor', 'no-drop');
                $('#reg_7_1').css('border', '1px solid');
                setTimeout(function () {
                    window.location = "/login";
                }, 1500);
            }
        },

        error: function (xhr, errorMessage, e) {
            layer.msg(e)
        }
    })
}
/*
$(document).ready(function(){

        $('#reg_7_1').click('display','none');

     if($('#reg_4_1').val() !==""){
        $('#reg_7_1').click('display','none');
    }
    else if($('#reg_5_1').val() !==""){
        $('#reg_7_1').click('display','none');
    }
})*/


















