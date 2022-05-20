
function logoutClicked(){
	$.get("/logout",function(data){
		window.location = data.redirect;
	});
	return false;             
}


$(document).ready(function(){ 
  console.log("adminsession ready");

	$.get("/adminInfo",function(data){
	    if (data.names) {
//add or modify.  Display the names.
            }
	});

	$("#logout").click(logoutClicked);


});  		
    


