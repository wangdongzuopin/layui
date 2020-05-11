// import Axios from "axios";

var u1 = new Vue({
    delimiters: ['${', '}'],
    el: '#nav',
    data: {
        lists: '',
        winhref: '',
    },
    methods: {

    },
    beforeMount: function () {
        let user = JSON.parse(localStorage.getItem('user'));
        const userid = user.data.ugid
        this.lists = [{
                name: '项目',
                href: '/project/list'
            },
            {
                name: '动态',
                href: '/dynamic/'
            },
            {
                name: '团队',
                href: '/team/'
            },
            {
                name: '我自己',
                href: "/team/member/" + userid
            },
            {
                name: '绩效考核',
                href: '/performance/'
            }
        ]
        this.winhref = '/' + window.location.href.split('/')[3] + '/' + window.location.href.split('/')[4];
    }
})

window.addEventListener("resize", function () {
    myChart.resize();
});

// 任务头与任务列表
var p1 = new Vue({
    delimiters: ['${', '}'],
    el: '#project_info',
    data() {
        return {
            tabPosition: 'right',
            editableTabsValue: '2',

            addtask: false, //添加任务的弹出
            activeName: '1', //任务展示
            gid: '',
            add_user: '',
            mmb_user: [],
            task_tag: [],

            tasklist:[],
            // 添加任务表单
            add_ruleForm: {
                tcid: '',
                head_user_id: '',
                name: '',
                expect_end_time: '',
                tag: '',
                note: ''
            },
            // 规则
            add_rules: {
                head_user_id: [{
                    required: true,
                    message: '请选择任务负责人',
                    trigger: 'change'
                }, ],
                name: [{
                        required: true,
                        message: '请输入任务名称',
                        trigger: 'blur'
                    },
                ],
                expect_end_time: [{
                    required: true,
                    message: '请输入任务预计完成时间',
                    trigger: 'change'
                }],
            },
            // 添加任务时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    methods: {
        haddtask() {
            this.addtask = true
        },
        addtasklist() {
            console.log('222');
        },
        mmber() {
            this.gid = pset.gid
            // 发起ajax
            axios.get('/project/member/' + this.gid + '')
                .then(res => {
                    var {
                        add_user,
                        mmb_user
                    } = res.data.data
                    add_user = JSON.parse(decodeURIComponent(add_user))
                    var id = Object.keys(add_user)[0]
                    var name = decodeURIComponent(add_user[id])
                    this.add_user = {
                        'id': id,
                        'name': name
                    }

                    this.mmb_user = JSON.parse(decodeURIComponent(mmb_user)).map(item => {
                        var mid = Object.keys(item)[0]
                        return {
                            id: mid,
                            name: decodeURIComponent(item[mid])
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        },
        tag() {
            axios.get('/project/tag/' + this.gid + '')
                .then(res => {
                    this.task_tag = res.data.data.map(item => {
                        return [decodeURIComponent(item).replace('\'', '').replace('\'', '')].join(',')
                    })
                })
        },
        submitForm(formName) {
            adddata = {
                'tcid':this.add_ruleForm.tcid,
                'head_user_id':this.add_ruleForm.head_user_id,
                'name':this.add_ruleForm.name,
                'expect_end_time':this.add_ruleForm.expect_end_time,
                'tag':this.add_ruleForm.tag,
                'note':this.add_ruleForm.note
            }

            const temp = JSON.parse(JSON.stringify(adddata))
            let pargarm = {};
            const ketData = Object.keys(temp)
            ketData.map(v => {
                if (Array.prototype.isPrototypeOf(temp[v])) {
                    console.log(temp[v]);
                    temp[v] = "'" + temp[v].join("','") + "'"
                }
            })
            Object.assign(pargarm, temp)
            var par = window.Qs.stringify(pargarm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.add_ruleForm);
                    axios.post('/task/add',par)
                    
                    .then(res =>{
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                          });
                          this.addtask = false
                    }).catch(error =>{
                        this.$message.error(error);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        task(){
            axios.get('/project/task/'+this.gid+'').then(res =>{
              this.tasklist = JSON.parse(decodeURIComponent(res.data.data)).map(item =>{
                  this.add_ruleForm.tcid = item.Id
                    return {
                        'id':item.Id,
                        'name':decodeURIComponent(item.Name),
                        'Serial':item.Serial,
                        'State':item.State,
                        'Task':item.Task
                    }
                })
                
            }).catch(error =>{

            })
        }
    },
    mounted() {
        this.mmber()
        this.tag()
        this.haddtask()
        this.task()
    }
})