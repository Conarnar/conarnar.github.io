statuses =
	["Attack Up< [%P1-10|1-100%]%T1-5%>",
	"Defense Up< [%P1-10|1-100%]%T1-5%>",
	"Healing Up< [%P1-10|1-100%]%T1-5%>",
	"Recovery Up< [%P1-10|1-100%]%T1-5%>",
	"Regen< [%V1-10%]%T1-5%>",
	"Vampire< [%V1-100%%]%T1-5%>",
	"Haste< [%V50-200%%]%T1-5%>",
	"Quick<%T1-5%>",
	"{Attack |Guard |Charge |Spell |}Spread<%T1-5%>",
	"{Multi-|}Mitigator< [%V1-10%]%T1-5%>",
	"Barrier< [%V1-50%]>",
	"Reflect<%T1-5%>",
	"Evasion< [%V1-100%%]%T1-5%>",
	"Counterattack< [%V1-100%%]%T1-5%>",
	"Invisible<%T1-5%>",
	"Reraise< [%V1-20%]%T1-5%>",
	"Bubble",
	"Energize< [%V1-10%]%T1-5%>",
	"Attack Down< [%P1-10|1-100%]%T1-5%>",
	"Defense Down< [%P1-10|1-100%]%T1-5%>",
	"Healing Down< [%P1-10|1-100%]%T1-5%>",
	"Recovery Down< [%P1-10|1-100%]%T1-5%>",
	"{Burn|Poison|Bleed}< [%V1-10%]%T1-5%>",
	"{Stun|Freeze}< [%V1-100%%]%T1-5%>",
	"Sleep",
	"Blind< [%V1-100%%]%T1-5%>",
	"{Attack Block|Guard Break|Charge Block|Silence}<%T1-5%>",
	"Undead< [%V1-10%]%T1-5%>",
	"{Attack|Guard|Charge|Spell}< Encore%T1-5%>",
	"Dizzy<%T1-5%>",
	"Berserk<%T1-5%>",
	"Slow<%T1-5%>",
	"Death Sentence<%T1-5%>",
	"Banish<%T1-5%>",
	"Focus< [X]%T1-5%>",
	"Bait<%T1-5%>",
	"Cover< [X]%T1-5%>",
	"{Attack |Guard |Charge |}Dicelock< [%V1-5%d%V5-20%]%T1-5%>",
	"Lifelink< [X]%T1-5%>",
	"{<%S% >Sword|<%S% >Enchantment|Guard Enhancement< [%S%]>|Charge Enhancement< [%S%]>}<%T1-5%>",
	"<%S% >{Shield|Spikes}< [%V1-100%%]%T1-5%>",
	"%S+% Immunity<%T1-5%>",
	"Surrounded< by [%S%]%T1-5%>",
	"Protected< by [%S%]%T1-5%>",
	"Bide",
	"Limit< [%V1-100%]>",
	"Spellbreak< [%V1-100%]>",
	"Untouchable< [{All Allies|All Enemies|Everyone}]%T1-5%>",
	"<Power [%V1-5%] %S%>",
	"<%S% >Aura< [{All Allies|All Enemies|Everyone}]%T1-5%>",
	"<%S-% && %S%>"
	];

function getStatus(turns, meta) {
	var status = statuses[Math.floor(Math.random() * 51)];
	
	
	var patt = /{(.*?)}/;
	var res = patt.exec(status);
	while (res != null) {
		var choices = res[1].split("|");
		status = status.replace(patt, choices[rand(0, choices.length - 1)]);
		res = patt.exec(status);
	}
	
	patt = /<(.*?)>/;
	res = patt.exec(status);
	while (res != null) {
		if (meta) {
			status = status.replace(patt, res[1]);
		} else {
			status = status.replace(patt, "");
		}
		res = patt.exec(status);
	}
	
	patt = /\%P(\d+)-(\d+)\|(\d+)-(\d+)\%/;
	res = patt.exec(status);
	
	while (res != null) {
		if (Math.random() < 0.5) {
			status = status.replace(patt, rand(res[1], res[2]));
		} else {
			status = status.replace(patt, rand(res[3], res[4]) + "%");
		}
		res = patt.exec(status);
	}
	
	patt = /\%V(\d+)-(\d+)\%/;
	res = patt.exec(status);
	while (res != null) {
		status = status.replace(patt, rand(res[1], res[2]));
		res = patt.exec(status);
	}
	
	patt = /\%S([-+]?)\%/;
	res = patt.exec(status);
	while (res != null) {
		status = status.replace(patt, getStatus(res[1] != "-", res[1] != "+"));
		res = patt.exec(status);
	}
	
	patt = /\%T(\d+)-(\d+)\%/;
	res = patt.exec(status);
	while (res != null) {
		if (turns) {
			var i = rand(res[1], res[2]);
			status = status.replace(patt, " (" + i + " turn" + (i == 1 ? "" : "s") + ")");
		} else {
			status = status.replace(patt, "");
		}
		res = patt.exec(status);
	}
	
	return status;
}

function rand(min, max) {
	min = parseInt(min, 10);
	max = parseInt(max, 10);
	return min + Math.floor(Math.random() * (max - min + 1));
}

function generateStatuses() {
	var result = "";
	
	for (var i = 0; i < 50; i++) {
		result += getStatus(true, true) + "<br>";
	}
	
	return result;
}