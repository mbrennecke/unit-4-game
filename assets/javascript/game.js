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
		colPos: 8
	};
	var mage = {
		health: 100,
		attack: 10,
		counter: 15,
		attackInc: 10,
		colPos: 1
	};
	var orc = {
		health: 140,
		attack: 14,
		counter: 19,
		attackInc: 14,
		colPos: 5
	};
	var goblin = {
		health: 120,
		attack: 12,
		counter: 17,
		attackInc: 12,
		colPos: 4
	};
	var challengersLeft = 3;
	var winCheck = false;


function gameReset() {
	$(".hideButton").hide();
	$(".card").show();
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
	challengersLeft = 3;
	$(".mage").html( 100 + " HP");
	$(".elf").html( 110 + " HP");
	$(".orc").html( 140 + " HP");
	$(".goblin").html( 120 + " HP");
}

function cardCase(card) {
	var slot = "#slot";
	switch($(card).data("name")) {
		case "mage":
			
			slot += mage.colPos;
			$(card).removeClass("float-right")
			break;
		case "elf":
			
			slot += elf.colPos;
			break;
		case "orc":
			
			slot += orc.colPos;
			$(card).removeClass("float-right")
			break;
		case "goblin":
			
			slot += goblin.colPos;
			break;
		default:
			break;
		}
		$(card).detach().appendTo(slot);

}

function cardPlaceReset() {
	for (var i = 1; i <=4; i++){
		var card = "#card" + i;
		cardCase(card);	
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
		heroDead();
	}
}

function challengerDead(card){
	cardCase(card);
	$(card).hide();
	challengerPicked = false;
	$("#instructions").text("Pick next your challenger");
	challengersLeft--;
	if (challengersLeft == 0) {
		$("#instructions").html("<span class='attack'>You Win!</span> Click a new hero to play again");
		winCheck = true;
		cardPlaceReset();
		gameReset();
		console.log("i happened reset");
	};
	
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
		winCheck = false;
	} else {createChallenger();}
});

$(".btn").click(function(event) {
	damage(challengerCard, heroCard, 1);
	damage(heroCard, challengerCard, 2);
	if (winCheck){
		gameReset() ;
		return;
	}
	attackModifier(heroCard);
	console.log("i happened btn click")
});

gameReset();

});
