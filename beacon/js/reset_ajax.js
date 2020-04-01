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
            alert("异常");
        }
    })
}