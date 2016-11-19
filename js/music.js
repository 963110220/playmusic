document.addEventListener("DOMContentLoaded",function(){
	var player = new Audio();
	var $btnPlay = $("#btnPlay");
	var $swp = document.querySelector("section .swiper-wrapper");
	var width = $("body").width();
	console.log(width);
	$("header span").eq(1).on("tap",function(){
		$(this).siblings().removeClass("blod");
		$(this).addClass("blod");
		$swp.style = "transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);transition:transform 300ms"; 
	});
	$("header span").eq(2).on("tap",function(){
		$(this).siblings().removeClass("blod");
		 $(this).addClass("blod");
		$swp.style = "transition-duration: 0ms; transform: translate3d(-"+width+"px, 0px, 0px);transition:transform 300ms";
	});
	$("header span").eq(3).on("tap",function(){
		$(this).siblings().removeClass("blod");
		$(this).addClass("blod");
		$swp.style = "transition-duration: 0ms; transform: translate3d(-"+2*width+"px, 0px, 0px);transition:transform 300ms";
	});
	 
	 var $txt = $("#txt");
	 var $find = $("#find");
	 $find.on("tap",function(){
	 var tval = $txt.val(); 
	 	if(tval===""){
	 		alert("请输入搜索信息")
	 	}else{
	 		$.ajax({
	 			type:"get",
	 			url:" http://apis.baidu.com/geekery/music/query",
	 			headers:{
	 				apikey:'bfa91e993c34940be862874bca50f785'
	 			},
	 			data:{
	 				s:tval
	 			},
	 			success:function(res){
	 			var res=JSON.parse(res);
	 			console.log(res);
	 			var $songlist = $(".songlist");
	 			$songlist.empty();
	 			res.data.data.forEach(function(e){
	 				var $li = $("<li/>");
	 				var $div = $("<div/>");
	 				$div.addClass("sole").attr("id",e.hash);
	 				var $span = $("<span/>");
	 				$span.html(e.songname).appendTo($div);
	 				var $span = $("<span/>");
	 				$span.html(e.filename).appendTo($div);
	 				$div.appendTo($li);
	 				var $div = $("<div/>");
	 				$div.addClass("iconfont icon-tianjia1").attr("id","add").appendTo($li);
	 				$li.appendTo($songlist);
	 			});				 
	 			}
	 		});
	 		
	 	}
	 });
	 var $songname = $(".songname");
	 var $singer = $(".singer");
	 var $singimg = $("#singimg");
	 $(".songlist").on("tap",".sole",function(){
	 	var id =  $(this).attr("id");
	 	$.ajax({
	 		type:"get",
	 		url:" http://apis.baidu.com/geekery/music/playinfo",
	 		headers:{
	 			apikey:'bfa91e993c34940be862874bca50f785'
	 		},
	 		data:{
	 			hash:id
	 		},
	 		success:function(res){
	 			var res = JSON.parse(res);
	 			console.log(res);
	 			player.src = res.data.url;
	 			player.play();
	 			$songname.html("<marquee scrollamount=2>"+res.data.songName+"</marquee>");
	 			$singer.html("<marquee scrollamount=2>"+res.data.singerName+"</marquee>");
	 		}
	 	});
	 	$("#minelist li").eq(index).removeClass("active");
 		$(this).closest("li").siblings().find(".sole").removeClass("active");
		$(this).addClass("active");
	 });
	 $btnPlay.on("tap",function(){
	 	if(player.paused){
	 		$btnPlay.removeClass("icon-bofangzanting").addClass("icon-zantingbofang");
			player.play();
		}else{
			player.pause();
			$btnPlay.removeClass("icon-zantingbofang").addClass("icon-bofangzanting");
			
		}
	 })
	
	 player.onplay=function(){
	 	$btnPlay.removeClass("icon-bofangzanting").addClass("icon-zantingbofang");
	 	$singimg.addClass('playing');
	 	$singimg.css("animationPlayState","running");
	 	console.log(index);
	 	$("#minelist li").eq(index).siblings().removeClass("active");
	 	$("#minelist li").eq(index).addClass("active");
	 }
 
	 player.onpause = function(){
		// 移除图片旋转效果
		$singimg.css("animationPlayState","paused");
		$btnPlay.removeClass("icon-zantingbofang").addClass("icon-bofangzanting");
	}
	var $minelist = $("#minelist");
	var datalist = localStorage.getItem('datalist');
	datalist = datalist ?JSON.parse(datalist):[];
	console.log(datalist);
	$("section").on("tap","#add",function(){
		var id = $(this).siblings().attr("id");
		$.ajax({
	 		type:"get",
	 		url:" http://apis.baidu.com/geekery/music/playinfo",
	 		headers:{
	 			apikey:'bfa91e993c34940be862874bca50f785'
	 		},
	 		data:{
	 			hash:id
	 		},
	 		success:function(res){
	 			var res = JSON.parse(res);
	 			console.log(res);
	 			console.log(res.data.url);
	 			var songlist = {"id":id,"songurl":res.data.url,"singerName":res.data.singerName,"songName":res.data.songName,"songtime":res.data.timeLength};
				datalist.push(songlist);
				localStorage.setItem('datalist',JSON.stringify(datalist)); 
			 	var songmsg = localStorage.getItem('datalist');
			 	songmsg = JSON.parse(songmsg);
			 	console.log(songmsg);
			 	$minelist.empty();
			 	songmsg.forEach(function(item,idx){
				var $li = $("<li/>");
				$li.attr("data-idx",idx);
				var $div = $("<div/>");
				var $span = $("<span/>");
				$span.html(item.songName).appendTo($div);
				var $span = $("<span/>");
				$span.html(item.singerName).appendTo($div);
				$div.addClass("sole").attr("id",item.id).appendTo($li);
				var $div = $("<div/>");
				var $span = $("<span/>");
				$span.addClass('iconfont icon-woxihuande').appendTo($div);
				var $span = $("<span/>");
				$span.addClass('iconfont icon-shanchu').appendTo($div);
				$div.attr("id","del").appendTo($li);
				$li.appendTo($minelist);	
			 	})
	 		}
	 	});
	});
	
	
	
	var playlist = [];
	var index = 0;
	var modle = 0;
	playlist = datalist;
	datalist.forEach(function(item,idx){
				var $li = $("<li/>");
				$li.attr("data-idx",idx);
				var $div = $("<div/>");
				var $span = $("<span/>");
				$span.html(item.songName).appendTo($div);
				var $span = $("<span/>");
				$span.html(item.singerName).appendTo($div);
				$div.addClass("sole").attr("id",item.id).appendTo($li);
				var $div = $("<div/>");
				var $span = $("<span/>");
				$span.addClass('iconfont icon-woxihuande').appendTo($div);
				var $span = $("<span/>");
				$span.addClass('iconfont icon-shanchu').appendTo($div);
				$div.attr("id","del").appendTo($li);
				$li.appendTo($minelist);
				
	})
	
	if(playlist[index]){
		player.src = playlist[index].songurl;
		$(".songname").html(playlist[index].songName);
		$(".singer").html(playlist[index].singerName);
		console.log(playlist.length);
	 }
	function play(){
			if(index<0){
				index = playlist.length-1;
			}else if(index > playlist.length-1){
				index = 0;
			}
			player.src = playlist[index].songurl;
			$(".songname").html(playlist[index].songName);
		    $(".singer").html(playlist[index].singerName);
			player.play();
		}
	$("#btnPrev").on("tap",function(){
		index--;
		play();
	});
	
	$("#btnNext").on("tap",function(){
		index++;
		console.log(index);
		play();
	});
	
	$("#minelist").on("tap",".sole",function(){
		index = $(this).parent().attr('data-idx');
		play();
	});
	
	var idxm = 0;
	var modlelist = ['iconfont icon-yuledanquxunhuan','iconfont icon-shunxubofang','iconfont icon-yulexunhuanbofang','iconfont icon-suijibofang'];
	$("#model").on("tap",function(){
		idxm++;
		idxm = idxm%4;
		modle = idxm;
		$(this).attr({"id":"model","class":modlelist[idxm],"data-model":idxm+1});
	});
	$(".process").on("change",function(){
		var processval = $(this).val();
		player.currentTime = player.duration*processval/100;
	});
	
	player.ontimeupdate = function(){
		updateTime();
	}
	
	player.onended = function(){
		var modelval = parseInt($("#model").attr("data-model"));
		switch(modelval){
			case 1:
				play();
				break;
			case 2:
				if(index<playlist.length-1){
					index++;
					play();
				}
				break;
			case 3:
				index++;
				play();
				break;
			case 4:
				index = Math.round(Math.random()*playlist.length);
				play();
				break;
		}
	}
	
	// 歌曲能播放时
	player.oncanplay = function(){
		init();
	}
	
	function init(){
		updateTime();
	}
	
	function updateTime(){
		$(".process").val(player.currentTime/player.duration*100);
	}
	

})