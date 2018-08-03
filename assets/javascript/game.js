var champPicked = false;
var heroCard;

function createHero() {
	var picked = event.target;
	picked = $(picked).attr("data-cardElement");
	heroCard = ("#card" + picked);
	$(heroCard).detach().appendTo("#slot2");
	champPicked = true;
	$("#instructions").html("&nbsp;");
}


		
$(".card").click(function(event) {
	if (champPicked == false) {
		createHero();
	}
});
