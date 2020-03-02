const callBackend = () => {
	$.ajax({
		url: 'http://localhost:8080/hello',
		method: 'GET'
	}).done((data) => {
		console.log(data)
	})
}

$(document).ready(() => {
	console.log("Jquery ready");

	$("#drink").click(() => {
		callBackend()
	})
})