
/*$(function () {
    $("#login_4_5").on("mouseover", function () {
        $("#login_4_1").prop("type", "text");
    });
    $("#login_4_5").on("mouseout", function () {
        $("#login_4_1").prop("type", "password");
    });
});*/
function showHidePassword() {
    $("#login_4_1_1").toggle();
    $("#login_4_1").toggle();
}

//text框失去焦点把text框的值赋值给password框
function textBlur() {
    $("#login_4_1").val($("#login_4_1_1").val());
}

//password框失去焦点把password框的值赋值给text框
function passwordBlur() {
    $("#login_4_1_1").val($("#login_4_1").val());
}
