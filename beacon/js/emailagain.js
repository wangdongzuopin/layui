$(function () {
    var state = false;
    $('#ag_2').focus(function () {
        if (state == false) {
            $(this).val();
        }
    })
    $('#ag_2').blur(function () {
        if ($(this).val() == '') {
            $('#ag_2_2').text('邮箱不能为空');
            $(' #ag_2_1,#ag_2_2').css('display', 'block');
            $(this).val();
        }
        else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $('#ag_2_2').text('邮箱格式不正确');
                $(' #ag_2_1,#ag_2_2').css('display', 'block');
                $(this).val();
            }
            else {
                $('#ag_2_2').text('');
                $('#ag_2_2').append('');
                $(' #ag_2_1,#ag_2_2').css('display', 'none');
                state = true;
            }
        }
    })
    /*emailagain click */
    $('#ag_6').click(function () {
        if ($('#ag_2').val() == '') {
            $('#ag_2_2').text('邮箱不能为空');
            $(' #ag_2_1,#ag_2_2').css('display', 'block');
            return false;
        }
        else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($('#ag_2').val()) == false) {
                $('#ag_2_2').text('邮箱格式不正确');
                $(' #ag_2_1,#ag_2_2').css('display', 'block');
                return false;
            }
        }
    })

    /*重新设置密码 */
    $('#ag_5').blur(function () {
        var val = $(this).val();
        if (val == "") {
            $('#ag_5_2').text('密码不能为空');
            $(' #ag_5_1,#ag_5_2').css('display', 'block');
            $(this).val();
        }
        else {
            if (val.length < 7) {
                $('#ag_5_2').text('不得低于八位');
                $(' #ag_5_1,#ag_5_2').css('display', 'block');
                $(this).val();
            }
            else {
                $('#ag_5_2').text('');
                $('#ag_5_1,#ag_5_2 ').css('display', 'none');
                return false;
            }
        }
    })

    /*click password */
    $('#ag_6').click(function () {
        if ($('#ag_5').val() == "") {
            $('#ag_5_2').text('密码不能为空');
            $(' #ag_5_1,#ag_5_2').css('display', 'block');
            return false;
        }
        else {
            if ($('#reg_5').val() < 7) {
                $('#ag_5_2').text('不能低于八位');
                $(' #ag_5_1,#ag_5_2').css('display', 'block');
                return false;
            }
        }
    })
})
/*$(function click() {
    $("#ag_5_3").on("mouseover", function () {
        $("#ag_5").prop("type", "text");
    });
    $("#ag_5_3").on("mouseout", function () {
        $("#ag_5").prop("type", "password");
    });
});*/
function showHidePassword() {
    $("#text").toggle();
    $("#ag_5").toggle();
}

//text框失去焦点把text框的值赋值给password框
function textBlur() {
    $("#ag_5").val($("#text").val());
}

//password框失去焦点把password框的值赋值给text框
function passwordBlur() {
    $("#text").val($("#ag_5").val());
}

function login() {
    var ag_2 = $('#ag_2').val();
    var ag_5 = $('#ag_5').val();
    var sign1=$('#sign1').val();
    $.ajax({
        url: "reset_passwd_check",
        async: false,
        type: "post",
        data: { mail: ag_2, passwd: ag_5,sign: sign1 },
        success: function (result, testStatus) {
            if (result.state == 0) {
                //alert(result.msg);
                $('#ag_2_3').text(result.msg);
                $('#ag_2_3').css('display', 'block');
                //window.location = "http://192.168.241.130/index.html"

            } else if (result.state == 1) {
                $('#ag_2_3').text(result.msg);
                $('#ag_2_3').css('display', 'block');
                // alert(result.msg);
                setTimeout(function(){
                     window.location = "/login";
         },900);
            }
          
        },
        error: function (xhr, errorMessage, e) {
            $('#ag_2_3').text('系统异常');
                $('#ag_2_3').css('display', 'block');
        }
    })
}