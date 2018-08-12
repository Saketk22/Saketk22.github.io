function createPagination(totalResult, links, currentStreams, currentPage) {
	
	if(totalResult > 10){
		var pagination;
		var mainComp = document.getElementById('component');
		var pgComp = document.getElementById('infoPanel');
		var pagination = document.getElementById("paginationComponent");
		if (pagination)
			pagination.innerHTML='';
		else
			pagination = document.createElement("span");
		
		var prevValue = 1;
		var prev = document.createElement("span");
		prev.setAttribute('id', 'prev');
		prev.setAttribute('class', 'arrow-left');
		var next = document.createElement("span");
		next.setAttribute('id', 'next');
		next.setAttribute('class', 'arrow-right');
		pagination.appendChild(prev);
		var page = currentPage ? currentPage : 1;
		pagination.innerHTML += '<span id=currentPage>'+page+'</span>'+'/'+currentStreams;
		pagination.setAttribute('id', 'paginationComponent');
		pagination.appendChild(next);
		pgComp.appendChild(pagination);
		mainComp.insertBefore(pgComp, mainComp.childNodes[0]);
		document.getElementById('prev').onclick = function() {
			var currentPage = document.getElementById('currentPage');
			var currentPageNumber = currentPage.innerHTML;
			if(currentPageNumber!=1){
				currentPage.innerHTML = '';
				currentPage.innerHTML = parseInt(currentPageNumber)-1;
				twitchApi(false, links.prev, parseInt(currentPageNumber)-1 );
			}
		};
		document.getElementById('next').onclick = function() {
			var currentPage = document.getElementById('currentPage');
			var getOffsetCount = links.next.split('&');
			var currentPageNumber = currentPage.innerHTML;
			var link = links.next;
			var nextCount = parseInt(getOffsetCount.filter(word => word.indexOf('offset') > -1)[0].split('=')[1]);
			if(nextCount>totalResult){
				var nextPageCount = nextCount - (nextCount-totalResult);
				link.replace(nextCount.toString(), nextPageCount);
				document.getElementById('next').removeEventListener("click");
			}
			twitchApi(false, link, parseInt(currentPageNumber)+1);
			
			currentPage.innerHTML = '';
			currentPage.innerHTML = parseInt(currentPageNumber)+1;
		};
	}	
}