// �ж��������м�����ɵ�������
function checkTask_sub(Task_sub){
	if(Task_sub != null){
		var totalsub = new Array();
		// �����״̬�����塰-1��Ϊ�����ã���0��Ϊ����״̬����1��Ϊ����(δ��ʼ����ͣ)����2��Ϊ��ʼ״̬����3��Ϊ����ɣ�Ĭ��Ϊ��1����
		// let totalsub = Task_sub.length;
		let subok = 0;
		for(let k=0;k<Task_sub.length;k++){
			let sub_state = Task_sub[k].Sub_state;
			// -1 Ϊɾ��״̬����ͳ����ɾ����
			if (sub_state != '-1')
			{
				totalsub.push(sub_state);
				if (sub_state == '3')
				{
					subok +=1;
				}
			}
		}
		var subtask = subok+'/'+totalsub.length;
		
	}else{
		var subtask = '0/0';
	}

	return subtask;
}

// ������������Ϣ
function loadTask_sub(Task_sub,k){
	if(Task_sub != null){
		for(let i = 0;i < Task_sub.length; i++) {
			let Sub_id = decodeURIComponent(Task_sub[i].Sub_id);
			let Sub_content = decodeURIComponent(Task_sub[i].Sub_content);
			let Sub_end_time = decodeURIComponent(Task_sub[i].Sub_end_time);
			let Sub_start_time = decodeURIComponent(Task_sub[i].Sub_start_time);
			let Sub_expect_end_time = decodeURIComponent(Task_sub[i].Sub_expect_end_time);
			let Sub_state = decodeURIComponent(Task_sub[i].Sub_state);
			var zipau = check_state(decodeURIComponent(Task_sub[i].Sub_state));

			if (Sub_state == 3){
				var subbox = 'value="0"'
			}else{
				var subbox = 'value="1"'
			}
			if (Sub_state != '-1'){
				$('#todolist'+k).append('<div class="todolist-2-1" id="zirenwua'+k+i+'"><div class="todo-2" id="todo-zi'+k+i+'"><span id="zipause'+k+i+'" class="zirenwu" onclick="zipause('+k+','+i+',\''+Sub_id+'\');">'+zipau+'</span></div><div class="todo-2" onclick="deletetask(1,'+k+i+',\''+Sub_id+'\');"><img src="/img/box.png"></div><div class="todo-2"><span class="complete"><input type="checkbox" id="cboxid'+k+i+'" '+subbox+'class="" onclick="zirenwu(this,'+k+','+i+',\''+Sub_id+'\')"></span></div><div class="todo-2"><span>'+Sub_content+'</span><span>('+Sub_expect_end_time.split('+')[0]+')</span></div></div>');

				if (Sub_state == 3){
					$('#cboxid'+k+i).attr('checked',true);
					// $('#zirenwua'+k+i+' div').css('text-decoration','line-through');
					$('#zipause'+k+i).css('pointer-events','none');
					$('#todo-zi'+k+i).css('cursor','not-allowed');
				}
			}

		}
	}
}

// ������Ŀ�ʼ
function Task_Start(id,callback){
	// console.log('111',id)
	// https://192.168.1.189:8888/task/start/c7b0673ae271b3dcbb8f6ff78460cd52
	$.ajax({
		url: "/task/start/" + id,
		async: false,
		type: "GET",
		success: function (data) {
			callback(null,data)
				// setTimeout(function(){
				// 	$('#pause'+k).html('<img src="/img/loadinga.gif" title ="�ȴ���">');
				// });
				// setTimeout(function(){
				// 	if (data.state == 1) {
				// 		layer.msg(data.msg)
				// 		$('#pause'+k).html('<img src="/img/red_end.png" title ="��ʼ��" value="0">');
				// 	}
				// 	if (data.state == 0){
				// 		layer.msg(data.msg)
				// 		$('#pause'+k).html('<img src="/img/blue_begin.png" title ="��ͣ��" value="1">');
				// 	}
				// },700);
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	});
}

// ���������ͣ
function Task_Pause(id,callback){
	// console.log('222',id)
	// https://192.168.1.189:8888/task/start/c7b0673ae271b3dcbb8f6ff78460cd52
	$.ajax({
		url: "/task/pause/" + id,
		async: false,
		type: "GET",
		success: function (data) {
			callback(null,data)
			// setTimeout(function(){
			// 	$('#pause'+k).html('<img src="/img/loadinga.gif" title ="�ȴ���">');
			// });
			// setTimeout(function(){
			// 	// console.log(data)
			// 	if (data.state == 1) {
			// 		layer.msg(data.msg)
			// 		$('#pause'+k).html('<img src="/img/blue_begin.png" title ="��ʼ��" value="1">');
			// 	}
			// 	if (data.state == 0){
			// 		layer.msg(data.msg)
			// 		$('#pause'+k).html('<img src="/img/red_end.png" title ="��ͣ��" value="0">');
			// 	}
			// },700);

		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	});
}

// ������Ŀ�ʼ
function sub_Start(id,callback){
	// console.log('aaa',id)
	// https://192.168.1.189:8888/task/start/c7b0673ae271b3dcbb8f6ff78460cd52
	$.ajax({
		url: "/task/sub_start/" + id,
		async: false,
		type: "GET",
		success: function (data, msg, testStatus, result) {
			callback(null,data)
			// setTimeout(function(){
			// 	$('#zipause'+k+i).html('<img src="/img/loadinga.gif" title ="�ȴ���">');
			// });
			// setTimeout(function(){
			// 	if (data.state == 1) {
			// 		layer.msg(data.msg)
			// 		$('#zipause'+k+i).html('<img src="/img/red_end.png" title ="��ʼ��" value="0">');
			// 		$('#pause'+k).html('<img src="/img/red_end.png" title ="��ʼ��" value="0">');
			// 	}
			// 	if (data.state == 0){
			// 		layer.msg(data.msg)
			// 		$('#zipause'+k+i).html('<img src="/img/blue_begin.png" title ="��ͣ��" value="1">');
			// 	}
			// },700);
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	});
}

// ���������ͣ
function sub_Pause(id,callback){
	// console.log('bbb',id)
	// https://192.168.1.189:8888/task/start/c7b0673ae271b3dcbb8f6ff78460cd52
	$.ajax({
		url: "/task/sub_pause/" + id,
		async: false,
		type: "GET",
		success: function (data) {
			callback(null,data)
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	});
	
}

// ����������
function Task_complete(id,callback){
	$.ajax({
		url: "/task/complete/" + id,
		async: false,
		type: "GET",
		success: function (data) {
			callback(null,data)
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	})
}
// ������Ĵ�
function Task_Reopen(id,callback){
	$.ajax({
		url: "/task/reopen/" + id,
		async: false,
		type: "GET",
		success: function (data) {
			callback(null,data)
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	})
}
// ����������
function sub_Complete(sub_id,callback){
	// console.log('saaa',sub_id)
	$.ajax({
		url: "/task/sub_complete/" + sub_id,
		async: false,
		type: "GET",
		success: function (data) {
			callback(null,data)
			// setTimeout(function(){
			// 	$('#cboxid'+k+i).html('<img src="/img/loading.gif" title ="�ȴ���">');
			// });
			// setTimeout(function(){
			// 	// console.log(data)
			// 	if (data.state == 1) {
			// 		layer.msg(data.msg)
			// 		$('#cboxid'+k+i).html('<img src="/img/checked.png" title ="�����" value="1">');
			// 	}
			// 	if (data.state == 0){
			// 		layer.msg(data.msg)
			// 		$('#cboxid'+k+i).html('<img src="/img/uncheck.png" title ="δ���" value="0">');
			// 	}
			// },300);
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	})
}
// ������Ĵ�
function sub_Reopen(sub_id,callback){
	// console.log('sbbb',sub_id)
	$.ajax({
		url: "/task/sub_reopen/" + sub_id,
		async: false,
		type: "GET",
		success: function (data, msg, testStatus, result) {
			callback(null,data)
			// setTimeout(function(){
			// 	$('#cboxid'+k+i).html('<img src="/img/loading.gif" title ="�ȴ���">');
			// });
			// setTimeout(function(){
			// 	// console.log(data)
			// 	if (data.state == 1) {
			// 		layer.msg(data.msg)
			// 		$('#cboxid'+k+i).html('<img src="/img/uncheck.png" title ="δ���" value="0">');
					
			// 	}
			// 	if (data.state == 0){
			// 		layer.msg(data.msg)
			// 		$('#cboxid'+k+i).html('<img src="/img/checked.png" title ="�����" value="1">');
			// 	}
			// },300);
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	})
}


function add_data(id,page,limit,counter,callback){
	counter = counter+1
	// let id = {{.ugid}};
	$.ajax({
		url : "/team/member/add_task",
		type : 'post',
		dataType:'json',
		data : 'id='+id+'&limit='+limit+'&page='+page,
		success: function (datas) {
			callback(null,datas)
			// console.log('1111111111111111111111')
		},
		error: function (xhr,textStatus,errorThrown) {
			callback(errorThrown)
		}
	})
}


// ɾ��������ӿ�
function task_del(id) {
	var datas;
    $.ajax({
        url: "/task/delete/" + id,
        async: false,
        type: "GET",
        success: function (data) {
        	datas = data;
        },
        error: function (xhr, errorMessage, e) {
            alert("ϵͳ�쳣");
        }
        })
    return datas;
}
