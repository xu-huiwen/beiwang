var app = angular.module('reminder',[]);
app.directive("wdL",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:"<ul class='noFinishedEvent'><div ng-transclude></div></ul>",
		link:function($scope,el){
			$(el).on("click",".nofinishx",function(){
				$(".finished").removeClass("btbxb")
				$(".nofinishx").removeClass("btbxb")
//				$(".btbxb1").removeClass("btbxb")
				$(this).addClass("btbxb")
			})
		}
	}
}])
app.directive("xyX",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:"<ul class='finishedEvent'><div ng-transclude></div></ul>",
		link:function($scope,el){
			$(el).on("click",".finished",function(){
				$(".nofinishx").removeClass("btbxb")
				$(".finished").removeClass("btbxb")
//				$(".btbxb1").removeClass("btbxb")
				$(this).addClass("btbxb")
			})
		}
	}
}])
app.directive("myButton",[function(){
	return {
		restrict:"A",
		replace:true,
		transclude:true,
		template:"<span class='selector {{lists[cu].theme}}'>选项<div ng-transclude></div></span>",
		link:function($scope,el){
			$(document).on("keyup",":input",false)
			$(el).on("click",function(){
			$(".selectorShow").toggle()
				return false;
			})
			$(".selectorShow").on("click",false)
			$(document).on("click",function(){
				$(".selectorShow").hide();
			})
			$("#back").on("click",function(){
				$(".selectorShow").hide();
			})
		}
	}
}])
app.directive("myUl",[function(){
	return {
		restrict:"A",
		replace:true,
		transclude:true,
		template:"<ul><div ng-transclude></div></ul>",
		link:function ($scope,el){
			$(el).on("click","li",function(){
				$(el).on("keyup",false)
				$(el).find("li").removeClass("focus");
				$(this).addClass("focus")
				var self=this;
				$scope.$apply(function(){
					$scope.cu=$(self).index()
				})
			})
			$(document).on("keyup",function(e){
				if(e.keyCode===8){
					var index=$(".focus").index();
					
					 $scope.$apply(function(){
                    	if(index==-1){
                    		return;
                    	}else {	                        		
                    		$scope.save2local()
                    		if($scope.lists.length===1){	                        			                    return	                        			
                    		}else{
//              				$scope.cu=$scope.cu-1;
                				$scope.lists.splice(index,1);
//              				$(el).find("li").removeClass("active");
                			}
                    			                        		
                    	}
                    })
				}
			})
		}
	}
}])
app.controller('ctrl', ['$scope', function($scope){
	$scope.colors=['purple','green','blue','yellow','brown','pink','orange'];
	$scope.cu=0
	if(localStorage.re){
		$scope.lists= JSON.parse(localStorage.re);
	}else{
		$scope.lists=[
			{
				id:1003,
				name :"三国杀",
				theme:"blue",
				todos:[
					{name:"三国",state:1},
					{name:"水壶",state:0}
				]
			}
		]
	}
	$scope.save2local = function(){
		localStorage.re= JSON.stringify($scope.lists);
	}
	function maxId(){
		var max = -Infinity;
		for(var i=0;i<$scope.lists.length;i++){
			var v=$scope.lists[i];
			if(v.id>max){
				max = v.id;
			}
		}
		return (max === -Infinity) ? 1000 : max;
	}
	$scope.addList = function (){
		var len = $scope.lists.length;
		var index = len % 7;
		var v={
			id:maxId() + 1,
			name : "新列表" + (len + 1),
			theme:$scope.colors[index],
			todos:[],
		}
		$scope.lists.push(v);
	}
	$scope.count=function(v,i){
		var r=0;
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.state===1){
			    r++;
		   }
		})
		return r;
	}
	$scope.count1=function(v,i){
		var k=0;
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.state===0){
			    k++;
		    }
		})
		return k;
	}
	$scope.delEvent = function(index){
		var eventList = $scope.lists[$scope.cu];
		var newlist = [];
		for(var i = 0;i < $scope.lists[$scope.cu].todos.length;i++){
			if(i != index){
				newlist.push($scope.lists[$scope.cu].todos[i]);
			}
		}
		$scope.lists[$scope.cu].todos = newlist;
		$scope.lists[$scope.cu] = eventList;
		$scope.save2local();
	}
     
    $scope.del=function(){
    	$(document).on("click","#del",false);
    	$scope.lists.splice($scope.lists[$scope.cu],1)
    }

	$scope.save=function(e){
		e.stopPropagation()
		if(e.keyCode == 13){				
			$scope.save2local()										
		}			
	}
	

}])