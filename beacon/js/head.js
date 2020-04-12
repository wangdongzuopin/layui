
var u1 = new Vue({
    delimiters: ['${', '}'],
    el : '#nav',
    data :{
        lists :'',
        winhref:'',
    },
    methods:{

    },
    beforeMount:function(){
        let user = JSON.parse(localStorage.getItem('user'));
        const userid = user.data.ugid
        this.lists = [
                {name:'项目',href:'/project/list'},
                {name:'动态',href:'/dynamic/'},
                {name:'团队',href:'/team/'},
                {name:'我自己',href:"/team/member/"+userid},
                {name:'绩效考核',href:'/performance/'},
            ]
        this.winhref = '/'+window.location.href.split('/')[3] + '/' + window.location.href.split('/')[4];
    }
})