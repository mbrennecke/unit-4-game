$(document).ready(function() {
	
	var champPicked = false;
	var challengerPicked = false;
	var heroCard;
	var challengerCard;
	var elf = {
		health: 110,
		attack: 11,
		counter: 16,
		attackInc: 11,
		healthReturn : function(){return this.health}
	};
	var mage = {
		health: 100,
		attack: 10,
		counter: 15,
		attackInc: 10,
		healthReturn : function(){return this.health}
	};
	var orc = {
		health: 140,
		attack: 14,
		counter: 19,
		attackInc: 14,
		healthReturn : function(){return this.health}
	};
	var goblin = {
		health: 120,
		attack: 12,
		counter: 17,
		attackInc: 12,
		healthReturn : function(){return this.health}
	};
	var elfPointer = elf.healthReturn();
	var magePointer = mage.healthReturn();
	var orcPointer = orc.healthReturn();
	var goblinPointer = goblin.healthReturn();


function gameReset() {
	$(".hideButton").hide();
	champPicked = false;
	challengerPicked = false;
	elf.health = 110;
	mage.health = 100;
	orc.health = 140;
	goblin.health = 120;
	elf.attack = 11;
	mage.attack = 10;
	orc.attack = 14;
	goblin.attack = 12;

}
// I spent too many hours trying to make this scalable, for getting the health data
// I was too burnt to make the colPos scalable, as it would have required the same // hack
// I spent hours checking scope and all possible ways to concatenate the string
// to make the function work. When it worked, I quit and said, "it works"
function cardPlaceReset() {
	var colPos = [1, 4, 5, 8];
	for (var i = 1; i <=4; i++){
		var card = "#card" + i;
		var slot = "#slot" + colPos[(i-1)];
		$(card).detach().appendTo(slot);
		if (slot == 1 || slot == 5) {
			if ($(card).hasClass("float-right")) {
			$(card).removeClass("float-right");
		}
		}
		var cardHP = $(card).data("name");
		var test = cardHP + "Pointer";
		var className = "." + cardHP;
		$(className).text(eval(test) + " HP");
	}
}

function createHero() {
	var picked = event.target;
	picked = $(picked).data("cardelement");
	heroCard = ("#card" + picked);
	if ($(heroCard).hasClass("float-right")) {
		$(heroCard).removeClass("float-right");
	}
	$(heroCard).detach().appendTo("#slot2");
	champPicked = true;
	$("#instructions").text("Pick your challenger");
}

function createChallenger() {
	var picked = event.target;
	picked = $(picked).data("cardelement");
	challengerCard = ("#card" + picked);
	if (!$(challengerCard).hasClass("float-right")) {
		$(challengerCard).addClass("float-right");
	}
	$(challengerCard).detach().appendTo("#slot3");
	challengerPicked = true;
	$("#instructions").html("Click <span class='attack'>Attack</span> button to attack challenger");
	$(".hideButton").show();
}

function dead(whoDead, card) {
	if (mage.health > 0 && goblin.health > 0 && orc.health > 0 && elf.health > 0) { 
		return true;
	}
	if (whoDead == 1) {
		challengerDead(card);
	} 
	if (whoDead == 2) {
		heroDead(card);
	}
}

function challengerDead(card){
	//var charCard = "#" + card;
	$(card).empty;
}

function heroDead(card) {
	cardPlaceReset();
	$("#instructions").html("<span class='attack'>Hero defeated.</span> Click a new hero to play again");
	gameReset();
}


function damage(damageCard, attackCard, whoDead) {
	var attack = 0;
	if (attackCard == "#card1") {
		attack = mage.attack;
	} else if (attackCard == "#card2") {
		attack = goblin.attack;
	} else if (attackCard == "#card3") {
		attack = orc.attack;
	} else if (attackCard == "#card4") {
		attack = elf.attack;
	} 
		
	if (damageCard == "#card1") {
		mage.health -= attack;
		if (mage.health < 0) {
			dead(whoDead, damageCard);
		}
		$(".mage").text(mage.health + " HP");
	} 
	if (damageCard == "#card2") {
		goblin.health -= attack;
		if (goblin.health < 0) {
			dead(whoDead, damageCard);
		}
		$(".goblin").text(goblin.health  + " HP");
	}
	if (damageCard == "#card3") {
		orc.health -= attack;
		if (orc.health < 0) {
			dead(whoDead, damageCard);
		}
		$(".orc").text(orc.health  + " HP");
	}
	if (damageCard == "#card4" ) {
		elf.health -= attack;
		if (elf.health < 0) {
			dead(whoDead, damageCard);
		}
		$(".elf").text(elf.health  + " HP");
	}	
}

function attackModifier (card) {
	if (card == "#card1") {
		mage.attack += mage.attackInc;
	} else if (card == "#card2") {
		goblin.attack += goblin.attackInc;
	} else if (card == "#card3") {
		orc.attack += orc.attackInc;
	} else if (card == "#card4") {
		elf.attack += elf.attackInc;
	} 
}
		
$(".card").click(function(event) {
	if (challengerPicked){
		return true;
	}
	if (champPicked == false){
		createHero();
	} else {createChallenger();}
});

$(".btn").click(function(event) {
	damage(challengerCard, heroCard, 1);
	damage(heroCard, challengerCard, 2);
	attackModifier(heroCard);
});

gameReset();

});
