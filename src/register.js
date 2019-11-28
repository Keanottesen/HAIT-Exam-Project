$(document).ready(function() {
let knowUser = true;

if (!knowUser) {
		$("#loginForm").hide();
		$("#registerForm").show();

} else {
		$("#loginForm").show();
		$("#registerForm").hide();
}


$("#hideLogin").click(function() {
	$("#loginForm").hide();
	$("#registerForm").show();
});

$("#hideRegister").click(function() {
	$("#loginForm").show();
	$("#registerForm").hide();
});

});
