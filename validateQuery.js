function validateQuery(){
	var query = document.getElementById('inputQuery').value;
	if (query.length==0)
		return false;
	else {
		return query;
	}
}