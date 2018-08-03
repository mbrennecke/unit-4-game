var champPicked = false;

$(document).ready(function() {
	if (!champPicked) {
		
		$(".card").click(function(event) {
			var picked = event.target;
			alert($(picked).attr("data-cardElement"));
		});
	
	}
});


 $("#slot1").on("click", function() {
		$("#card1").detach().appendTo("#slot2");
		
      });