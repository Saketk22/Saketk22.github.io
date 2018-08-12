function twitchApi(searchClicked = false, link = '', currentPage = 1) {
  // event handler
	var url = '';
	if(searchClicked){
		var query = document.getElementById('inputQuery').value;
		var checkValue = validateQuery(query);
		if(!checkValue){
			alert('Please enter the query in the search field')
		} else {
			url = 'https://api.twitch.tv/kraken/search/streams?q='+query+'&offset=10';
			callApi(url)
		}
	}else{
		url = link;
		callApi(url);
	}
	function callApi(url){
		var resultComponent = document.getElementById('resultComp');
		resultComponent.innerHTML = '';
		if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
		      httpRequest = new XMLHttpRequest();
		  } else if (window.ActiveXObject) { // IE 6 and older
		      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		  }
		if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
		      httpRequest = new XMLHttpRequest();
		  } else if (window.ActiveXObject) { // IE 6 and older
		      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		  }
		 httpRequest.open( 'GET', url, true);
		 httpRequest.setRequestHeader("Client-ID", "1j05pdpabp2crz1qdfjih7uja7p3d8");
		 httpRequest.responseType = 'json';
		 httpRequest.timeout = 10000;
		 httpRequest.send();
		 httpRequest.onreadystatechange = function(){
			 if (this.readyState == 4 && this.status == 200 ) {
				 let total = this.response._total;
				 let streamArr = this.response.streams;
				 if (total==0 || this.response.streams.length == 0){
					 var paginationComp = document.getElementById('paginationComponent');
					 if (paginationComp) {
						 document.getElementById('paginationComponent').innerHTML = '';
					 }
					 document.getElementById('total').innerHTML = '';
			        	alert('Sorry no result found, Please use different queries');
				 }else {
					 document.getElementById('total').innerHTML =total;
					 queryRendering(streamArr, total, this.response._links, streamArr.length, currentPage, createPagination);
				 }
			    }
			};
		httpRequest.ontimeout = function (e) {
			alert("** Timeout Occured. Please contact Support **");
		};
		httpRequest.onerror = function () {
			  alert("** An error occurred during the query processing **");
		};
	};
	}
		
		

