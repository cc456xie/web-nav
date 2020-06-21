var nameConfirm = false
var pwd1Confirm = false
var pwd2Confirm = false

var submit = $('#submit')



// 用户名格式判断
$('#username').bind('input propertychange', function(e) { 
 //进行相关操作 
 let value = e.target.value
 let tip = $('#tip1')
   nameConfirm = false
 if(value.length === 0)
 {
	  disable()
	 return tip.text('请输入用户名')
 }
 	
 else
 	  tip.text('')
 
 if(value.length < 3)
 {
 	   disable()
	return tip.text('长度必须大于等于三')
}
 else
	  tip.text('')
	  
 
 if(value.length > 10 )
 {
 	   disable()
 	return tip.text('长度必须小于十')
}
 else
 	  tip.text('')	  
	  
   nameConfirm = true
   canSubmit()
});

// 密码格式判断
$('#password').bind('input propertychange', function(e) { 
 //进行相关操作 
 pwd1Confirm = false
 console.log(e.target.value)
 let value = e.target.value
 let tip = $('#tip2')
 if(value.length === 0)
 {
	   disable()
 	return tip.text('请输入密码')
}
 else
 	  tip.text('')
 
 if(value.length < 5)
 {
	 disable()
	return tip.text('长度必须大于四')
}
 else
	  tip.text('')
	  
 
 if(value.length > 15 )
 {
	   disable()
 	return tip.text('长度必须小于15')
}
 else
 	  tip.text('')	  
pwd1Confirm = true
  canSubmit()
});

// 确认密码格式判断
$('#password2').bind('input propertychange', function(e) { 
 //进行相关操作 
 pwd2Confirm = false
 console.log(e.target.value)
 let value = e.target.value
 let tip = $('#tip3')
 if(value !== $('#password').val())
 {
	  disable()
 	return tip.text('两次密码不相等')
}
 else
 	  tip.text('')  
pwd2Confirm = true
  canSubmit()
});

function canSubmit(){
	if(nameConfirm && pwd1Confirm && pwd2Confirm)
	{
		
		submit.css({'color':'#00a896','pointer-events':'all'})
		
		$('#submit').click(function(){
			const url = 'http://106.54.134.214:3000/users/regist'
			let username = $('#username').val()
			let password = $('#password').val()
			// 提交ajax请求
			$.ajax({
			    url:url,//url地址
			    dataType:"json",//返回的数据类型
			    type:"post",//发起请求的方式
			    data:{
			        'username':username,
			        'password':password
			    },
				statusCode:{
					200:function(){
						window.location.href = '../login/index.html'
					},
					400:function(){
						alert('用户名已存在')
						location.reload()
					},
					402:function(){
						alert('注册失败')
						location.reload()
					}
				}
			});   
		})
		// 提交注册
			}
	else
	    disable()
}



function disable(){
	submit.css({"pointer-events":"none",'color':'lightgray'})
}
