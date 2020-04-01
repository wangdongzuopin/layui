// show-div-input

// activation
$(document).ready(function (result) {
    if ($('#action2').val() == ('active invalid')) {
        $('#login_3_5').text('激活无效');
        $('#login_3_5').css('display', 'block');
        $('.wd_reactive').html('<a id="login1" href="/register/">返回<strong>重新发送激活邮件</strong></a>')
    }
    else if ($('#action2').val() == ('user invalid')) {
        $('#login_3_5').text('用户无效');
        $('#login_3_5').css('display', 'block');
        $('.wd_reactive').html('<a id="login1" href="/register/">返回<strong>重新注册</strong></a>')
    }
    else if ($('#action2').val() == ('user state invalid')) {
        $('#login_3_5').text('用户状态无效');
        $('#login_3_5').css('display', 'block');
        $('.wd_reactive').html('<a id="login1" href="/register/">返回<strong>重新注册</strong></a>'+
        '<p>用户可能无效</p>')
    }
    else if ($('#action2').val() == ('active success')) {
        $('#login_3_5').text('激活成功');
        $('#login_3_5').css('display', 'block');
        $('.wd_reactive').html('<a id="login1" href="/login/">返回<strong>登录</strong></a>')
    }
})