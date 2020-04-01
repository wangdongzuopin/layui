
// array[array[array[array[]]]]
$(document).ready(function(){
    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth() + 1; //当前月
    var nowYear = now.getFullYear(); //当前年
    var allnow = nowYear+'年'+nowMonth+'月'+nowDayOfWeek+'日';

    // var nowMonth = getMonth(); //当前月
})

var dataArr = [];
　　var data = new Date();
　　var year = data.getFullYear();
　　data.setMonth(data.getMonth()+1)           //获取到当前月份,设置月份
　　for (var i = 0; i < 12; i++) {
　　　　data.setMonth(data.getMonth() - 1);     //每次循环一次 月份值减1
　　　　var m = data.getMonth() + 1;
　　　　m = m < 10 ? "0" + m : m;
　　　　dataArr.push(data.getFullYear() + "-" + (m));
    }