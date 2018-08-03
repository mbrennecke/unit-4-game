var champPicked = false;

$(document).ready(function() {
	if (!champPicked) {
		$(".card").click(function(event) {
			alert(event.target.id);
		});
	
	}
});


 $("#slot1").on("click", function() {
		$("#card1").detach().appendTo("#slot2");
		
      });