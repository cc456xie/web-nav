	$('#login').click(function(){
			const url = 'http://106.54.134.214:3000/users/login'
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
				xhrFields: {
				        withCredentials: true    // 要在这里设置
				  },
				statusCode:{
					200:function(){
						location.href = '../index/index.html'
					},
					402:function(err){
						alert('未知错误')
						throw err
					},
					401:function(err){
						alert('用户名或密码错误')
						throw err
					}
				}
			});   
		})