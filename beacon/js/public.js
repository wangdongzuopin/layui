// 获取当前时间(年月日)(暂时没有用到)
function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
    month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
    }
    // let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    // + " " + date.getHours() + seperator2 + date.getMinutes()
    // + seperator2 + date.getSeconds();
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}

// 标题规则解析
function parsing(a){
    // var regex = /^(#[a-zA-Z0-9\u4e00-\u9fa5]+#\s){2}[a-zA-Z0-9\u4e00-\u9fa5]+/
    // let reg = /^!\s/
    let regex = /(#[a-zA-Z0-9\u4e00-\u9fa5]+#\s)+/
    let reg = /[a-zA-Z0-9\u4e00-\u9fa5]+/
    // r = a.match(reg)
    // ra = a.match(regex)
    
    let str = $.trim(a)
    let th = str.search('!')
    if(th ==  0){
        str = str.replace('!','')
        var point = '<span class="parsing-point" title="重点标记" style="margin:0px;">! </span>'
    }else{
        var point = ''
    }
    let res = str.split('#')
    // console.log('1111',res)
    let name = res.pop()
    // console.log('1111',res)
    if(name.length >0){
        var names = '<span class="parsing-name" title="任务名称" style="margin:0px;">'+name+'</span>'
    }else{
        var names = ''
    }
    // console.log(res)
    if(th ==  0){
        res.shift()
        let normal = res.join("");
        // console.log('111',r)
        if(normal.length > 0){
            r = str.match(regex)
            if(r != null){
                ra = r[0].split('# #')
                let ssr = ''
                for (var i = 0; i < ra.length; i++) {
                    // console.log('aaa',ra[i])
                    rrr = ra[i].match(reg)
                    ssr += '<span class="parsing-label" title="自定义标签" style="margin-left: 0.5px;">'+rrr[0]+'</span>'
                }
                var biaoqian = ssr
            }else{
               var biaoqian = '' 
            }
            // console.log(ssr)
            
        }else{
            var biaoqian = ''
        }
    }else{
        let normal = res.join("");
        if(normal.length > 0){
            r = str.match(regex)
            if(r != null){
                ra = r[0].split('# #')
                let ssr = ''
                for (var i = 0; i < ra.length; i++) {
                    // console.log('aaa',ra[i])
                    rrr = ra[i].match(reg)
                    ssr += '<span class="parsing-label" title="自定义标签" style="margin-left: 0.5px;">'+rrr[0]+'</span>'
                }
                var biaoqian = ssr
            }else{
               var biaoqian = '' 
            }
        }else{
            var biaoqian = ''
        }
    }
    


    // a = a.replace(/\+/g,' ')
    // b = a.split(' ')
    // // let name = b[b.length-1]
    // // console.log(b)
    // name = b.pop()
    // if (name) {
    //     var names = '<span class="parsing-name" title="任务名称" style="margin:0px;">'+name+'</span>'
    // }else{
    //     var names = ''
    // }
    // // console.log(b)
    // if (b[0]){
    //     // 如果数组中没有井号，则进入判断内
    //     if(b[0].indexOf('#') == -1)
    //     {
    //         var tanhao = b[0]
    //         b.shift();
    //     }
    //     var normal = b.join(' ').replace(/#/g,'')
    //     // console.log(b[0].indexOf('#'))
    // }
    // if (tanhao){
    //     var point = '<span class="parsing-point" title="重点标记" style="margin:0px;">'+tanhao+'</span>'
    // }else{
    //     var point = ''
    // }

    // if (normal) {
    //     var biaoqian = '<span class="parsing-label" title="自定义标签" style="margin:0px;">'+normal+'</span>'
    // }else{
    //     var biaoqian = ''
    // }
    // console.log(names)
    let n = point + biaoqian + names

    // let normal = b.join(' ').replace(/#/g,'')
    // // let nnn = normal.replace(/!/g,'!')
    // // console.log(normal)
    // // console.log(normal.indexOf('！'))
    // if(normal.indexOf('!') >= 0 || normal.indexOf('！') >= 0){
    //     var biaoqian = '<span class="tanhao">'+b[0]+'</span><span class="parsing-label">'+normal+'</span>'
    // }else{

    //     var biaoqian = '<span class="parsing-label">'+normal+'</span>'
    // }
    // // let nnn = normal.replace(/!/g,'<span class="tanhao">!</span>')
    
    // let n = biaoqian + name
    // if(a.indexOf('！') > 0 )
    // {
    //     alert(a)
    // }
    // !#1#+#临时任务#+#紧急#+#前端界面#+测试C 谁谁谁谁谁谁水水水水水水水水
    // let a = '!#1#+#临时任务#+#紧急#+测试C'
    // console.log(a)
    // let normal = a.replace(/#/g,'')
    // let normals = normal.replace(/\+/g,' ')
    // let n = normals.replace(/!/g,'<span class="tanhao">!</span>')
    // console.log(normals)
    return n
}

// 比较时间大小函数(暂时没有用到)
function tab(date1,date2){
    let oDate1 = new Date(date1);
    let oDate2 = new Date(date2);
    let overdue
    if(oDate1.getTime() < oDate2.getTime()){
        overdue = '<span class="overdue">延期</span>'
    } else {
        overdue = ''
    }
    return overdue
}

// 处理传输过来的信息带加号的问题
function parsingcontent(content){
    let cont = content.replace(/\+/g, '');
    // console.log(cont)
    let cnn = cont.split(':')[1];
    // console.log(cnn)
    let cxn = cnn.split('}')[0];
    // console.log(cxn)
    let cvv = cxn.replace('"', ' ');
    let cff = cvv.replace('"', ' ');
    return cff
}
// 根据时间判断当时是周几
function checkToday(dateStr){
    let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    // let dateStr = "2008-08-08";
    let myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return weekDay[myDate.getDay()]; 
}
// 去掉动态页面里时间中的时分秒
function ymdtime(tempArr){
    tempArr.forEach((val, key) => {
        // val['add_time_his'] = decodeURIComponent(val['add_time'].split('+')[1])
        let add_time_his = decodeURIComponent(val['add_time'].split('+')[1]).split(':')
        val['add_time_his'] = add_time_his[0] + ':' + add_time_his[1]
        val['add_time'] = decodeURIComponent(val['add_time'].split('+')[0])
        val['content'] =decodeURIComponent(val['content']);
        val['main_gid'] = decodeURIComponent(val['main_gid'].replace(/\+/g, '%20'));
        val['main_name'] = decodeURIComponent(val['main_name'].replace(/\+/g, '%20'));
        val['operator'] = decodeURIComponent(val['operator'].replace(/\+/g, '%20'));
        val['type'] = decodeURIComponent(val['type'].replace(/\+/g, '%20'));
        val['pj_id'] = decodeURIComponent(val['pj_id'].replace(/\+/g, '%20'));
        val['pj_name'] = decodeURIComponent(val['pj_name'].replace(/\+/g, '%20'));
        // console.log(val['add_time'])
    })
    return tempArr
}

// 遍历子任务以用来判断总共几个子任务和已完成几个子任务
function forsub(Task_sub){
    if (Task_sub != null){
        var totalsub = new Array();
        // 检查项状态，定义“-1”为不可用，“0”为冻结状态，“1”为正常(未开始或暂停)，“2”为开始状态，“3”为已完成，默认为”1“。
        // let totalsub = Task_sub.length;
        let subok = 0;
        for(let k=0;k<Task_sub.length;k++){
            if(Task_sub != null){
            let sub_state = Task_sub[k].Sub_state;
            // -1 为删除状态。不统计已删除的
            if (sub_state != '-1'){
                totalsub.push(sub_state);
                if (sub_state == '3'){
                subok +=1
            }
            }
            }
            // console.log(sub_state);
            
        }
        var subtask = subok+'/'+totalsub.length
    }else{
        var subtask = '0/0'
    }
    return subtask;

    }
function sub_CurentTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日                           
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒                       
    var clock = year + "-";
    if (month < 10)
        clock += "0";
        clock += month + "-";
    if (day < 10)
        clock += "0";
        clock += day + " ";
    if (hh < 10)
        clock += "0";
        clock += hh + ":";
    if (mm < 10) clock += '0';
        clock += mm + ":";
    if (ss < 10) clock += '0';
        clock += ss;
    return (clock);
}

function sub_Curentqian() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate() - 1;            //日                           
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒                       
    var clock = year + "-";
    if (month < 10)
        clock += "0";
        clock += month + "-";
    if (day < 10)
        clock += "0";
        clock += day + " ";
    if (hh < 10)
        clock += "0";
        clock += hh + ":";
    if (mm < 10) clock += '0';
        clock += mm + ":";
    if (ss < 10) clock += '0';
        clock += ss;
    return (clock);
}

//如果时间是今天就显示今天，如果是以前的就显示日期
function todayOrYestoday(add_time){
    var MandD = add_time.split('-')
    if(add_time.split(' ')[0] == sub_CurentTime().split(' ')[0]){
        var thetime = "今天"
    }else{
        var thetime = MandD[1]+'/'+MandD[2]
    }

    return thetime
}

// team_member页面中点击评论时，检测时间是不是今天，是今天昨天前天就显示今天昨天前天，不是就显示时间
function updatetime(add_time){
    // 把加号替换成空格
    let cont = add_time.replace(/\+/g, ' ');
    // 按照空格分割
    let Mand = cont.split(' ');
    // 按：分割取出小时和分钟
    let Mandhms = Mand[1].split(':');
    let Mandhm = Mandhms[0]+':'+Mandhms[1]

    // 按照-分割取出月份和日
    // let Mandymd = Mand[0].split('-');
    // let Mandym = Mandymd[1] + '-' + Mandymd[2]
    // 判断传递过来的值是否等于今天
    let showtime = checktimes(Mand[0],Mandhm)
    // if(Mand[0] == GetDateStr(0)){
    //     var showtime = "今天 " + Mandhm;
    // }else if(Mand[0] == GetDateStr(-1)){
    //     var showtime = "昨天 " + Mandhm;
    // }else if(Mand[0] == GetDateStr(-2)){
    //     var showtime = "前天 " + Mandhm;
    // }else{
    //     var showtime = Mandym +' '+ Mandhm;
    // }

    return showtime;
}

function checktimes(ymd,Mandhm){
    if(Mandhm){
        if(ymd == GetDateStr(0)){
            var showtime = "今天 " + Mandhm;
        }else if(ymd == GetDateStr(-1)){
            var showtime = "昨天 " + Mandhm;
        }else if(ymd == GetDateStr(-2)){
            var showtime = "前天 " + Mandhm;
        }else{
            let Mandymd = ymd.split('-');
            let Mandym = Mandymd[1] + '-' + Mandymd[2]
            var showtime = Mandym +' '+ Mandhm;
        }
    }else{
        if(ymd == GetDateStr(0)){
            var showtime = "今天";
        }else if(ymd == GetDateStr(-1)){
            var showtime = "昨天";
        }else if(ymd == GetDateStr(-2)){
            var showtime = "前天";
        }else{
            let Mandymd = ymd.split('-');
            let Mandym = Mandymd[1] + '/' + Mandymd[2]
            var showtime = Mandym;
        }
    }
    return showtime;
}
// 前天："+GetDateStr(-2)  昨天："+GetDateStr(-1) 今天："+GetDateStr(0)) 明天："+GetDateStr(1)) 后天："+GetDateStr(2)) 大后天："+GetDateStr(3)
function GetDateStr(AddDayCount){
    var dd = new Date(); 
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();//获取当前年份的日期 
    var m = dd.getMonth()+1;//获取当前月份的日期 
    var d = dd.getDate();//获取当前天数的日期
    var h = dd.getHours(); //获取当前小时数
    var mm = dd.getMinutes(); //获取当前分钟数
    var s = dd.getSeconds(); //获取当前描述
    if(m >=10){
        zm = m;
    }else{
        zm = "0" + m;
    }
    if(d >= 10){
            return y + "-" + zm + "-" + d;
        }else{
            return y + "-" + zm + "-0" + d; 
        }
}

function ShowTime(alltime){
    let alltimes = alltime.replace(/\+/g, ' ');
    // console.log(alltime)
    let datay = alltimes.split(' ');
    if(datay[0] == GetDateStr(0)){
        var times = "今天"
    }else if(datay[0] == GetDateStr(-1)){
        var times = "昨天"

    }else if(datay[0] == GetDateStr(-2)){
        var times = "前天"
        
    }else if(datay[0] == GetDateStr(1)){
        var times = "明天"
        
    }else if(datay[0] == GetDateStr(2)){
        var times = "后天"
        
    }else{
        var times = datay[0]
    }
    // console.log(times)
    return times

}
function timeout(alltime){
    let alltimes = alltime.replace(/\+/g, ' ');
    // console.log(alltime)
    let datay = alltimes.split(' ')[0];
    
    // console.log(times)
    return datay

}

// 时间之间进行对比，求出相差值，用于添加考核任务表
function daybetween(sub_add_time,sub_end_time){
    var time1 = Date.parse(sub_add_time);
    var time2 = Date.parse(sub_end_time);
    var nDays = Math.abs(parseInt((time2 - time1)/1000/3600/24));
    return nDays +1;
}

// let newArrA = []
let formateArrData = (initialArr, name, newArr) => {
  // 判定传参是否符合规则
  if (!(initialArr instanceof Array) || !(newArr instanceof Array)) {
    return '请传入正确格式的数组'
  }
  if (!name) {
    return '请传入对象属性'
  }
  // 每一个类型的单独数组，注意此处不能return出每个alikeArr，
  // 因为递归的返回值只返回最后一次的值
  let alikeArr = []
  let propertyName = ''
  if (initialArr.length > 0) {
    propertyName = initialArr[0][`${name}`]
    let tempArr = []
    // 将拥有共同propertyName属性的对象放到此次遍历的alikeArr中，
    // 将其他的对象放入到tempArr中，等待下次遍历
    initialArr.forEach((val, key) => {
      if (val[`${name}`] === propertyName) {
        alikeArr.push(val)
      } else {
        tempArr.push(val)
      }
    })
    newArr.push(alikeArr)
    initialArr = tempArr
    return formateArrData(initialArr, name, newArr)
  } else {
    return newArr
  }
}

/*
  *   功能:实现VBScript的DateAdd功能.
  *   参数:interval,字符串表达式，表示要添加的时间间隔.
  *   参数:number,数值表达式，表示要添加的时间间隔的个数.
  *   参数:date,时间对象.
  *   返回:新的时间对象.
  *   var   now   =   new   Date();
  *   var   newDate   =   DateAdd( "d ",5,now);
  *---------------   DateAdd(interval,number,date)   -----------------
*/ 
function DateAdd(interval,number,date) 
{
    // let date = new Date();
    switch(interval) 
    { 
            case   "y "   :   { 
                    date.setFullYear(date.getFullYear()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            case   "q "   :   { 
                    date.setMonth(date.getMonth()+number*3); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            case   "m "   :   { 
                    date.setMonth(date.getMonth()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            case   "w "   :   { 
                    date.setDate(date.getDate()+number*7); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            case   "d "   :   { 
                    date.setDate(date.getDate()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            case   "h "   :   { 
                    date.setHours(date.getHours()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0];  
                    break; 
            } 
            case   "m "   :   { 
                    date.setMinutes(date.getMinutes()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            case   "s "   :   { 
                    date.setSeconds(date.getSeconds()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
            default   :   { 
                    date.setDate(d.getDate()+number); 
                    let dateee = new Date(date).toJSON();
                    return   dateee.split('T')[0]; 
                    break; 
            } 
    } 
} 
/*
    功能：查看传递过来的是否是周五，不是就将时间加到该周周五并返回年-月-日格式
    参数：week，字符串，传递过来的周几
    参数：checkNndDate，字符串，传递过来的绩效结束日期
    weekAdd(周三,2019-09-18)
*/
function weekAdd(week,checkNndDate){
    // console.log(week)
    let dates = new Date(checkNndDate);
    switch(week)
    {
        case "周一" :{
            let nn = DateAdd("d ",4,dates);
            return nn;
            break; 
            }
        case "周二" :{
            let nn = DateAdd("d ",3,dates);
            return nn;
            break; 
            }
        case "周三" :{
            let nn = DateAdd("d ",2,dates);
            return nn;
            break; 
            }
        case "周四" :{
            let nn = DateAdd("d ",1,dates);
            return nn;
            break; 
            }
        case "周五" :{
            let nn = DateAdd("d ",0,dates);
            return nn;
            break; 
            }
        case "周六" :{
            let nn = DateAdd("d ",-1,dates);
            return nn;
            break; 
            }
        case "周日" :{
            let nn = DateAdd("d ",-2,dates);
            return nn;
            break; 
            }
        default : {
            return '异常';
            break;
        }
    }
}

// 冒泡排序
function paopao(new_per){
    // var array=[10,20,9,8,79,65,100];
    //比较轮数
    for (var i = 0; i < new_per.length; i++) {
        for (k = i + 1; k < new_per.length; k++) {
            if (new_per[i].check_end_date > new_per[k].check_end_date) {
                let temp = new_per[i];
                new_per[i] = new_per[k];
                new_per[k] = temp;
            }
        }
    }
    return new_per
}


// 获取当前年所有周五
function getAllweeks(){
    let date=new Date();
    let year=date.getFullYear();
    let m,d,day,dayNum,result="";
    for(m=1;m<=12;m++){
        switch(m){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
            dayNum=31;
            break;
            case 4:
            case 6:
            case 9:
            case 11:
            dayNum=30;
            break;
            case 2:
            if(year%4==0&&year%100!=0||year%400==0){
                dayNum=29;
            }else{
                dayNum=28;
            }
            break;
        }
        for(d=1;d<=dayNum;d++){
            date.setMonth(m-1,d);
            day=date.getDay();
            yy = date.getFullYear();
            mm = (date.getMonth()+1)
            dd = date.getDate()
            // console.log('yy',yy)
            // console.log('mm',mm)
            // console.log('dd',dd)
            if(yy <10){
              yy = '0'+yy
            }
            if(mm <10){
              mm = '0'+mm
            }
            if(dd <10){
              dd = '0'+dd
            }
            if(day==5){
                result+="周五"+yy+"-"+mm+"-"+dd+"<br/>";
            }
        }
    }
    document.write(result);
    return result;
}
// 函数将特殊字符进行转义htmlspecialchars 
function htmlspecialchars (st) {
    st = st.replace(/</g, '&lt;');
    st = st.replace(/>/g, '&gt;');
    return st;
}
function wd_loadding() {
    setTimeout(function () {
        $('.layui-layer-shade').hide();
        $('.layui-layer-page').hide();
        wd_login_load()
    });
    setTimeout(function () {
        $('.layui-layer-shade').hide();
        $('.layui-layer-page').hide();
        $('.load-view').hide();
        wd_login_secomd()
    }, 1200);
    setTimeout(function () {
        $('.load-view').hide();
    }, 2200);
}
function wd_login_load() {
    loading.showLoading({
        type: 2,
        tip: "正在保存"
    })
    $('.load-view').css('z-index','11111')
}
function wd_login_secomd() {
    loading.showLoading({
        type: 2,
        tip: "保存成功"
    })
    $('.fading-circle').html('<img style="width: 60px;" src="/img/img/login_see.png">')
    $('.load-view').css('z-index','11111')
    $('#zhezhao').hide();
}
