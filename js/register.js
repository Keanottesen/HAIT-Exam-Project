$(document).ready(function() {
let knowUser = true;

if (!knowUser) {
		$("#loginForm").hide();
		$("#registerForm").show();

} else {
		$("#loginForm").show();
		$("#registerForm").hide();
}

});
