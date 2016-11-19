		document.addEventListener("DOMContentLoaded",function(){
			$.ajax({
				url:'http://apis.baidu.com/showapi_open_bus/channel_news/channel_news',
				headers:{
					apikey:'bfa91e993c34940be862874bca50f785'
				},
				success:function(res){
					$.each(res.showapi_res_body.channelList, function(idx,item) {
						idx+=1;
						var $a = $("<a/>");
						var $p = $("<p/>");
						$a.attr({"href":"html/channel.html?"+item.channelId});
						$p.attr({"channelId":item.channelId,"name":item.name}).html(idx+"、"+item.name).appendTo($a);
						$a.appendTo("body");
					});
				}
			});
		})
		