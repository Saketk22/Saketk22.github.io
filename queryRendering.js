function queryRendering(response, total, _links, streamArr_length, currentPage, createPagination) {
	var detailComponent = document.getElementById("resultComp");
    var components = document.getElementById('component');
	response.forEach((responseObj, index) => {
		var items = document.createElement("div");
		var imageDiv = document.createElement("div");
		imageDiv.setAttribute('class', 'imgDiv');
		var img = document.createElement("img");
		var infoDiv =  document.createElement("div");
		infoDiv.setAttribute('class', 'info');
		var ul = document.createElement("list");
		var li = document.createElement("li");
		img.src = responseObj.preview.medium;
		imageDiv.appendChild(img);
		items.appendChild(imageDiv);
		var headingTag =  document.createElement("h2");
		headingTag.innerHTML += responseObj.channel.display_name;
		infoDiv.appendChild(headingTag);
		li.innerHTML += 'Game name: '+responseObj.game+' <br/>'+responseObj.viewers+ ' viewers <br/>';
		li.innerHTML += 'Stream Discription:<br/>' + 'ID: '+responseObj._id+ '<br/>Type: '+responseObj.stream_type
		ul.appendChild(li);
		infoDiv.appendChild(ul);
		items.appendChild(infoDiv);
		items.setAttribute('id', 'streamComponent'+index);
		items.setAttribute('class', 'streamComponent');
		detailComponent.appendChild(items);
	}); 
	components.appendChild(detailComponent);
	createPagination(total, _links, streamArr_length, currentPage);
}