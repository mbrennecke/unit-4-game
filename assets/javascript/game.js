$(document).ready(function() {
	
	var champPicked = false;
	var challengerPicked = false;
	var heroCard;
	var challengerCard;
	var elf = {
		health: 110,
		attack: 11,
		counter: 16,
		attackInc: 11
	};
	var mage = {
		health: 100,
		attack: 10,
		counter: 15,
		attackInc: 10
	};
	var orc = {
		health: 140,
		attack: 14,
		counter: 19,
		attackInc: 14
	};
	var goblin = {
		health: 120,
		attack: 12,
		counter: 17,
		attackInc: 12
	};

function reset() {
	$("#hideButton").hide();
	champPicked = false;
	challengerPicked = false;
	heroCard;
	challengerCard;
	elfHealth = 110;
	mageHealth = 100;
	orcHealth = 140;
	goblinHealth = 130;
	elfAttackPower = 11;
	mageAttackPower = 10;
	orcAttackPower = 14;
	goblinAttackPower = 12;
}

function createHero() {
	var picked = event.target;
	picked = $(picked).attr("data-cardElement");
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
	picked = $(picked).attr("data-cardElement");
	challengerCard = ("#card" + picked);
	if (!$(challengerCard).hasClass("float-right")) {
		$(challengerCard).addClass("float-right");
	}
	$(challengerCard).detach().appendTo("#slot3");
	challengerPicked = true;
	$("#instructions").html("Click <span class='attack'>Attack</span> button to attack challenger");
	$("#hideButton").show();
}

function damage(damageCard, attackCard) {
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
		$(".warMage").text(mage.health);
	} else if (damageCard == "#card2") {
		goblin.health -= attack;
		$(".goblin").text(goblin.health);
	} else if (damageCard == "#card3") {
		orc.health -= attack;
		$(".orc").text(orc.health);
	} else if (damageCard == "#card4") {
		elf.health -= attack;
		$(".elf").text(elf.health);
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
	damage(challengerCard, heroCard);
	damage(heroCard, challengerCard);
	attackModifier(heroCard);
});

reset();

});
