
//导航栏点击黑色显示

$(document).ready(function () {
    hreff()
});
function hreff() {
    let href = window.location.href;
    let text = href.split('/')
    let windo = text[0] + '//' + text[2] + '/' + text[3] + '/' + text[4];
    let win = text[0] + '//' + text[2] + '/';
    let houmain = text[3] + '/' + text[4];
    if (houmain == houmain) {
        $('#index_1_2 a').css('color', 'black')
        $('#index_1_2 a').css('font-weight', 'bold')

    } else {
    }

    let link = localStorage.getItem('link')
    if(link != null){
        if(link.indexOf('list') > -1){
            return false;
        }else{
            window.location = link;
        }
        window.localStorage.removeItem('link');
    }
}
function archive_recovery() {
    var msg = "确定要激活吗？\n\n请确认！";
    if (confirm(msg) == true) {
        $.ajax({
            url: "/project/archive_recovery/{{.gid}}",
            async: false,
            type: "GET",
            success: function (data, result, msg, testStatus) {
                if (data.state == 0) {
                    alert(data.msg)
                } else if (data.state == 1) {
                    alert(data.msg)
                    window.location.reload();
                }
            },
            error: function (xhr, errorMessage, e) {
                alert("系统异常");
            }
        })

    } else {
        return false;
    }
}



function user_exit() {
    $.ajax({
        url: '/login/exit',
        async: true,
        data: {},
        type: "GET",
        success: function (result, status) {

            if (result.state == 0) {
                alert(result.msg)
            }
            else if (result.state == 1) {
                alert(result.msg)
                window.location = "/login/"
            }
        },
        error: function (xhr, errorMessage, e) {
            alert('系统异常');
        }
    })
}


$(document).ready(function () {
    $("#index_1_9").mouseover(function () {
        $('#index_1_9_1').show();
    });

    $("#index_1_9").mouseover(function () {
        $('#index_1_9_2').show();
    });
    $('#index_1_9').mouseleave(function () {
        $('#index_1_9_1').hide();
    })
    $('#index_1_9').mouseleave(function () {
        $('#index_1_9_2').hide();
    })
})
$(document).ready(function () {
    $("#index_1_10").click(function () {
        $('#index_1_11').toggle();
    })
})


$(function () {
    $(document).bind("click", function (e) {
        if ($(e.target).closest("#index_1_10").length > 0) {
            $("#index_1_11").show();
        } else {
            $("#index_1_11").hide();
        }
    })
    $("#index_1_11").click(function (event) {
        event.stopPropagation();

    });
    $('.pro_guidang').click(function () {
        $('.wd-project-archive').show();
        $('.project_map').hide();
        $('.pro_guidang').css('color', 'black')

        $('.all_pro').css('color', '#aeaaaa')
        all_gui()
    })
    $('.all_pro').click(function () {
        $('.wd-project-archive').hide();
        $('.project_map').show();
        $('.all_pro').css('color', 'black')
        $('.pro_guidang').css('color', '#aeaaaa')
        allhov()
    })
});
function guidang_pro() {
    $('.wd-project-archive').show();
    $('.project_map').hide();
    $('.pro_guidang').css('color', 'black')

    $('.all_pro').css('color', '#aeaaaa')
}
function all_gui(){
    $(".pro_guidang").css("color","black");
    $(".all_pro").css("color","#aeaaaa");
    $(".all_pro").hover(function(){
        $(".all_pro").css("color","#339966");
        },function(){
        $(".all_pro").css("color","#aeaaaa");
      });

      $(".pro_guidang").hover(function(){
        $(".pro_guidang").css("color","black");
        },function(){
        $(".pro_guidang").css("color","black");
      });
}

function all_pro() {
    $('.wd-project-archive').hide();
    $('.project_map').show();
    $('.all_pro').css('color', 'black')
    $('.pro_guidang').css('color', '#aeaaaa')
}
function allhov(){
    $(".all_pro").css("color","black");
    $(".pro_guidang").css("color","#aeaaaa");
    $(".pro_guidang").hover(function(){
        $(".pro_guidang").css("color","#339966");
        },function(){
        $(".pro_guidang").css("color","");
      });

      $(".all_pro").hover(function(){
        $(".all_pro").css("color","black");
        },function(){
        $(".all_pro").css("color","black");
      });
}



function prodd(gid, name, state, y, type,add_time) {
    let addtime = decodeURIComponent(add_time).split(' ')[0]
    // let nam = decodeURIComponent(name)
    // console.log(nam)
    // if(nam.length > 10){
    //    let str = nam.Substring(0,10)
    //     console.log(str)
    // }
    // 判断状态
    if (state == 3) {
        $('.wd-project-archive').hide();
        var project_archive = '<div class="div' + y + '" style="float: left;">' +
            '<a title="创建时间：'+decodeURIComponent(addtime)+'" class="wd-project-arc" onclick="archive(\'' + gid + "','" + y + '\')">' +
            '<label class="wd-project-name' + y + '">' + sign(decodeURIComponent(name)) + '</label>' +
            '</a>' +
            '</div>'
        $('.wd-project-archive').append(project_archive)
    } 
    else if (state == 2) {
        $('.project_map').show();
        var project_view =
            '<div title="创建时间：'+decodeURIComponent(addtime)+'" class="div' + y + '" style="float: left;">' +
            '<a  class="wd-project-list"  href="/project/detail/' + gid + '">' +
            '<label class="wd-project-name' + y + '">' + sign(decodeURIComponent(name)) + '</label>' +
            '</a>' +
            '</div>'
        $('.project_map').append(project_view)
    }
    subjie(y)
    // 判断类型
    // if (type == 1) {     //代表的是看板项目
    //     $('.project_map').hide();
    // } else if (type == 2) { //代表的是标准项目
    //     $('.project_map').show();
    // }

}
// 字符串截取
function subjie(y) {
    var ok = 10;
    let str = $('.wd-project-name' + y).text();
    if (str.length > 10) {
        let arr = str.substring(0, ok) + '...'
        $('.wd-project-name' + y).text(arr)
    } else {
        $('.wd-project-name' + y).text(str)
    }
}
function archive(gid, i) {
    layer.confirm('您真的确定要激活吗？\n\n请确认！', {
        btn: ['是的', '我在想想'] //按钮
    }, function () {
        $.ajax({
            url: "/project/archive_recovery/" + gid,
            async: false,
            type: "GET",
            success: function (data, result, msg, testStatus, state) {
                if (data.state == 0) {
                    layer.msg(data.msg)
                } else if (data.state == 1) {
                    layer.msg(data.msg)
                    window.location.reload();
                }
            },
            error: function (xhr, errorMessage, e) {
                alert("系统异常");
            }
        })
    }, function () {
    });
}
// $(document).ready(function () {
//     $('.pro_guidang').click(function () {
//         $('.wd-project-archive').show();
//         $('.project_map').hide();
//         $('.pro_guidang').css('color', 'black')

//         $('.all_pro').css('color', '#aeaaaa')
//     })
//     $('.pro_guidang').hover('color', '#339966')
//     $('.all_pro').click(function () {
//         $('.wd-project-archive').hide();
//         $('.project_map').show();
//         $('.all_pro').css('color', 'black')
//         $('.all_pro').hover('color', '#339966')
//         $('.pro_guidang').css('color', '#aeaaaa')
//     })
// })