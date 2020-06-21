
var userInfo;
// 登陆状态判断
const url = 'http://106.54.134.214:3000/users/'


// 当前用户
var user;	

// 背景颜色
const COLOR = [
  'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
  'linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
  'linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%)',
 'linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%)',
'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'
]
 // 使用promise包装异步ajax请求
var promise = new Promise(function(resolve,reject){
	// 提交ajax请求
	$.ajax({
	    url:url,//url地址
	    dataType:"json",//返回的数据类型
	    type:"get",//发起请求的方式
		xhrFields: {
		      withCredentials: true    // 要在这里设置
		  },
		statusCode:{
			400:function(){
				alert('未登陆')
				window.location.href = '../login/index.html'
			},
			402:function(err){
				alert('未知错误')
				window.location.href = '../login/index.html'
	
			},
			401:function(err){
				alert('自动登录失效,请重新登陆')
				window.location.href = '../login/index.html'
			},
			200:function(res){
				console.log(res)
				resolve(res)
			}
		}
	}); 
})
// 回调函数
promise.then(res => {
	userInfo = res.data
	user = userInfo.username
}).then(() => {
	console.log(userInfo)
	// 为了避免频繁操作DOM,使用文档碎片将DOM结构一次生成,避免多次回流重绘损耗性能
	var oFragmeng1 = document.createDocumentFragment(); 
	document.body.style.backgroundImage = COLOR[userInfo.bg]
	// 根据返回的json数据生成DOM结构
	for(let i = 0; i < userInfo.divides.length;i++)
	{
		console.log(userInfo)
		if(i===0)
		{
			$('.navWrapper').append($(`<div class="nav-divide" id=${userInfo.divides[i].id}><h4>${userInfo.divides[i].name}</h4><div class="nav-item-box" id="${i}nav"></div></div>`))
		}
		else
		$('.navWrapper').append($(`<div class="nav-divide" id=${userInfo.divides[i].id}><h4>${userInfo.divides[i].name}</h4><div class="nav-item-box" id="${i}nav"></div><div class="divide-delete" id='${i}del'></div></div>`))
		let urls = userInfo.divides[i].urls
		let fragment = document.createDocumentFragment();
		
		if(userInfo.divides[i].urls.length === 0)
		{
			 fragment.appendChild($(`<div class="add-item" id='${i}add'></div>`)[0])
			 $(`#${i}nav`).append(fragment)	
		}
		
		for(let j = 0;j < userInfo.divides[i].urls.length;j++){
			let navItem = $(`<div class='nav-item' id=${urls[j].id} style='background-image: url(${urls[j].ico?urls[j].ico:'https://s1.ax1x.com/2020/06/17/NEHFF1.png'});'>${urls[j].ico?'':urls[j].name}<div class='cover'><a ontouchstart = "return false;"  target='_blank' name='${urls[j].url}' href=${urls[j].url} class="link"></a>${urls[j].name}<div class='delete'></div></div></div>`)[0]		    					 
		   //navItem.insertBefore(`#${i}add`)
		   fragment.appendChild(navItem)
		   if(j === userInfo.divides[i].urls.length - 1)
		   fragment.appendChild($(`<div class="add-item" ></div>`)[0])
		}



		 
		$(`#${i}nav`).append(fragment)		
	}
	$(document).ready(function(){
	// 删除元素
	$('.navWrapper').on("click",".delete",function(e){
		console.log(e.target.parentNode.parentNode)
		let id = e.target.parentNode.parentNode.id
	//	console.log(user)
			let delURL = 'http://106.54.134.214:3000/users/'
			console.log(url)
			$.ajax({
			    url:delURL,//url地址
			    dataType:"json",//返回的数据类型
			    type:"delete",//发起请求的方式
				xhrFields: {
				      withCredentials: true    
				  },
				  data:{
					  username:user,
					  id:id
				  },
				statusCode:{
					200:function(){
						location.reload()
					}
				}
			}); 
	})
	
	// 删除分类
	$('.navWrapper').on("click",".divide-delete",function(e){
		//console.log(e.target.parentNode)
		let id = e.target.parentNode.id
		let url = 'http://106.54.134.214:3000/users/divide'
		//console.log(id)
		//console.log(user)
			console.log(url)
			$.ajax({
			    url:url,//url地址
			    dataType:"json",//返回的数据类型
			    type:"delete",//发起请求的方式
				xhrFields: {
				      withCredentials: true    
				  },
				  data:{
					  username:user,
					  id:id
				  },
				statusCode:{
					200:function(){
						location.reload()
						
					}
				}
			}); 
	})
	// 添加元素
	 $(".navWrapper").on("click",".add-item",function(e){
	 	//console.log(e.target.parentNode.parentNode.id)
	 	$('.dialog').css('display','block')
	 	$('.maincover').css('display','block')
	 	// 添加链接
	 	$('.subAdd').click(function(){
	 		let addURL = 'http://106.54.134.214:3000/add/nav'
	 		let addName = $('#addName').val()
	 		let addUrl = $('#addUrl').val()
	 		let dividedId = e.target.parentNode.parentNode.id
	 		if(!dividedId || !user) return
	 		
	 		var urlReg = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
	 		if(!urlReg.test(addUrl) || !addName)
	 		return alert('请输入正确的URL,或者检查名称')
	 
	 	//	console.log(addName)
	 		// ajax
	 		$.ajax({
	 		    url:addURL,//url地址
	 		    dataType:"json",//返回的数据类型
	 		    type:"post",//发起请求的方式
	 			xhrFields: {
	 			      withCredentials: true    // 携带信息头,cookie跨域
	 			  },
	 			  data:{
	 				  username:user,
	 				  name:$('#addName').val(),
	 				  url:$('#addUrl').val(),
	 				  id:dividedId
	 			  },
	 			statusCode:{
	 				200:function(){	
	 						alert('添加成功')
	 						$('#addName').text('')
	 						$('#addUrl').text('')
	 						location.reload()
	 			}
	 		}}); 
	 	})
	  });
	});
	$('.maincover').click(function(){
		console.log(1223)
		$('.maincover').css('display','none')
		$('.dialog').css('display','none')
		$('.dialog-divide').css('display','none')
	})
	
	$('.add-divide').click(function(){
		console.log(123)
		$('.dialog-divide').css('display','block')
		$('.maincover').css('display','block')
		
	})
	// 更换背景
	$('.color-item').click(function(e){
		let url = 'http://106.54.134.214:3000/users/bg'
		console.log(e.target.id)
		let id = e.target.id
		$.ajax({
		    url:url,//url地址
		    dataType:"json",//返回的数据类型
		    type:"post",//发起请求的方式
			xhrFields: {
			      withCredentials: true    // 携带信息头,cookie跨域
			  },
			  data:{
				  username:user,
				  colorid:id		  
			  },
			statusCode:{
				200:function(res){	
					console.log(res)
						document.body.style.backgroundImage = COLOR[id]
						//location.reload()
			}
		}}); 
	})
	// 添加分类
	$('.subDivideAdd').click(function(){
		if(!$('#divideName').val()) return alert('请输入分类名')
		
		let addURL = 'http://106.54.134.214:3000/add/divide/'
		// ajax
		$.ajax({
		    url:addURL,//url地址
		    dataType:"json",//返回的数据类型
		    type:"post",//发起请求的方式
			xhrFields: {
			      withCredentials: true    // 携带信息头,cookie跨域
			  },
			  data:{
				  username:user,
				  name:$('#divideName').val()			  
			  },
			statusCode:{
				200:function(){	
					setTimeout(function(){
						alert('添加成功')
						location.reload()
				})
			}
		}}); 
	})
	
		function b(){
		var i = false;
		return function(){
			console.log(i)
			if(i === false)
			{
				i = true
				$('.colorEdit').css('display','flex')
				
			}
			else
			{
				i = false
				$('.colorEdit').css('display','none')
			}
		}
	}
let s = b()
	$('.bgColor').click(function(){
		
		s()
	})

})






