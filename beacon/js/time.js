//验证发送 60s之后重置
var clock = '';
var nums = 60;
var btn;
function sendCode(thisBtn) {
    btn = thisBtn;
    btn.disabled = true; //将按钮置为不可点击
    $(btn).css('background', '#ccc');
    btn.value = nums + '秒后可重新获取';
    clock = setInterval(doLoop, 1000); //一秒执行一次
}
function doLoop() {
    nums--;
    if (nums > 0) {
        btn.value = nums + '秒后可重新获取';
    } else {
        clearInterval(clock); //清除js定时器
        btn.disabled = false;
        $(btn).css('background', '#169BD5');
        btn.value = '点击发送验证码';
        nums = 60; //重置时间
    }
}
function showHidePassword() {
    $("#reg_5_1").attr('type','text');
    // $("#reg_5_1").attr('type','password');
    $('.reg_eyes').html('<img id="reg_5_4" style="width: 24px;" src="/img/closeeyes.png" onclick="showPassword()">')
}
function showPassword(){
    $("#reg_5_1").attr('type','password');
    // $("#reg_5_1").attr('type','password');
    $('.reg_eyes').html('<img id="reg_5_4" style="width: 24px;" src="/img/eyes.png" onclick="showHidePassword()">')
}

//text框失去焦点把text框的值赋值给password框
function textBlur() {
    $("#reg_5_1").val($("#reg_5_1_1").val());
}

//password框失去焦点把password框的值赋值给text框
function passwordBlur() {
    $("#reg_5_1_1").val($("#reg_5_1").val());
}

//让一个带有id的span在“8s”内隐藏
/*$(function(){
    setTimeout(function(){
        $("#number1").css('display','none');
    },8000);
})
//show()方法，显示
$(document).ready(function () {
    $("#btn").click(function () {
        $("#number1").show();
    })
})*/
