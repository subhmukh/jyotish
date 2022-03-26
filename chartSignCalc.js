'use strict';
const PLANET_NUM = Object.freeze({
	"As": 0, "Su": 1, "Mo": 2,
	"Me": 3, "Ve": 4, "Ma": 5, "Ju": 6, "Sa": 7, "Ra": 8, "Ke": 9
});
const PLANET_UNCHA = Object.freeze({
	"Su": 1, "Mo": 2,
	"Me": 6, "Ve": 12, "Ma": 10, "Ju": 4, "Sa": 7
});
const PLANET_NEECHA = Object.freeze({
	"Su": 7, "Mo": 8,
	"Me": 12, "Ve": 6, "Ma": 4, "Ju": 10, "Sa": 1
});
const PLANET_MOOLTRIKON = Object.freeze({
	"Su": 5, "Mo": 2,
	"Me": 6, "Ve": 7, "Ma": 1, "Ju": 9, "Sa": 11, "Ra": 6, "Ke": 12
});
const PLANET_ASPECTS = Object.freeze({
    "Su": [4, 7, 8], "Mo": [4, 7, 8], "Me": [4, 7, 8], "Ve": [4, 7, 8],
    "Ma": [4, 5, 8, 9], "Ju": [3, 5, 9, 10], "Sa": [3, 7, 10]
});
const SIGN_LORDS = ["Ma", "Ve", "Me", "Mo", "Su", "Me",
    "Ve", "Ma", "Ju", "Sa", "Sa", "Ju"];
function ownsHouses(plnt, lagna) {
    var owns = [];
    for (var i = 0; i < 12; i++) {
        if (SIGN_LORDS[i] === plnt) owns.push((i>lagna)?(i - lagna + 2):(i+14-lagna));
    }
    return owns;
};
const lagnaBasedBeneficMalefics = {
    1: {
        sign: 1,
        benefic: ["Ma", "Ju", "Su"],
        malefic: ["Me", "Ra", "Ke", "Sa", "Ve"],
        neutral: ["Mo"]
    },
    2: {
        sign: 2,
        benefic: ["Sa", "Ma", "Me", "Ve"],
        malefic: ["Ju", "Ra", "Ke", "Mo"],
        neutral: ["Su"],
        yogakaraka: "Sa"
    },
    3: {
        sign: 3,
        benefic: ["Me", "Ve", "Sa"],
        malefic: ["Ma", "Ra", "Ke", "Ju", "Su"],
        neutral: ["Mo"]
    },
    4: {
        sign: 4,
        benefic: ["Ma", "Ju"],
        malefic: ["Ve", "Me"],
        neutral: ["Mo", "Ra", "Ke", "Su"],
        yogakaraka: "Ma"
    },
    5: {
        sign: 5,
        benefic: ["Su", "Ma", "Ju"],
        malefic: ["Ve", "Ra", "Ke", "Me"],
        neutral: ["Sa", "Mo"],
        yogakaraka: "Ma"
    },
    6: {
        sign: 6,
        benefic: ["Ve", "Me"],
        malefic: ["Ma", "Ra", "Ke", "Mo", "Ju"],
        neutral: ["Sa", "Su"]
    },
    7: {
        sign: 7,
        benefic: ["Ve", "Sa", "Ma", "Me"],
        malefic: ["Ju", "Ra", "Ke", "Su"],
        neutral: ["Mo"],
        yogakaraka: "Sa"
    },
    8: {
        sign: 8,
        benefic: ["Mo", "Ju", "Ma"],
        malefic: ["Me", "Ra", "Ke", "Ve", "Sa"],
        neutral: ["Su"]
    },
    9: {
        sign: 9,
        benefic: ["Ju", "Ma", "Su"],
        malefic: ["Ve", "Ra", "Ke", "Me", "Sa"],
        neutral: ["Mo"]
    },
    10: {
        sign: 10,
        benefic: ["Sa", "Me", "Ve"],
        malefic: ["Ma", "Ra", "Ke", "Mo", "Ju"],
        neutral: ["Su"],
        yogakaraka: "Ve"
    },
    11: {
        sign: 11,
        benefic: ["Sa", "Ve", "Ma", "Su"],
        malefic: ["Ju", "Ra", "Ke", "Mo"],
        neutral: ["Me"],
        yogakaraka: "Ve"
    },
    12: {
        sign: 12,
        benefic: ["Ma", "Mo", "Ju"],
        malefic: ["Sa", "Ve", "Me", "Ra", "Ke", "Su"],
        neutral: []
    }
};
function planetStrengthDisposition(p, sg) {
    var status = "";
    if (PLANET_UNCHA[p] === sg) status = "UNCHA";
    else if (PLANET_NEECHA[p] === sg) status = "NEECHA";
    else if (PLANET_MOOLTRIKON[p] === sg) status = "MOOLTRIKON";
    else if (SIGN_LORDS[sg - 1] === p) status = "SWAGRIHA";
    return status;
};
function planetBeneficDisposition(p, sg0) {
    var status = "neutral";
    var lagnaStatus = lagnaBasedBeneficMalefics[sg0];
    if (lagnaStatus.sign === sg0 && lagnaStatus.benefic.includes(p)) status = "benefic";
    else if (lagnaStatus.sign === sg0 && lagnaStatus.malefic.includes(p)) status = "malefic";
    else if (lagnaStatus.sign === sg0 && lagnaStatus.neutral.includes(p)) status = "neutral";
    if (lagnaStatus.sign === sg0 && p === lagnaStatus.yogakaraka) status += " yogakaraka";
    return status;
};
class chartSignCalc {
	constructor(planetSignsArray) {
        this.planetSigns = [];
        this.lagnaSign = planetSignsArray[0];
		planetSignsArray.forEach(e => this.planetSigns.push(e));
		this.planetSigns[9] = (planetSignsArray[8] > 6) ?
            planetSignsArray[8] - 6 : planetSignsArray[8] + 6;
    }
    get planetHousesMap() {
        var hzs = new Map();
        for (const e in PLANET_NUM) {
            var sg = this.planetSigns[PLANET_NUM[e]];
            var hz = (sg - this.lagnaSign + 1 > 0) ? (sg - this.lagnaSign + 1) : (13 + sg - this.lagnaSign);
            hzs.set(e, hz);
            var ownHzs = ownsHouses(e, this.lagnaSign);
            for (const p in ownHzs) hzs.set("L" + ownHzs[p], hz);
        }
        return hzs;
    }
    get planetSignsMap() {
        var sgs = new Map();
        for (const e in PLANET_NUM) {
            var sg = this.planetSigns[PLANET_NUM[e]];
            sgs.set(e, sg);
            var ownHzs = ownsHouses(e, this.lagnaSign);
            for (const p in ownHzs) sgs.set("L" + ownHzs[p], sg);
        }
        return sgs;
    }
	get disposition() {
		const dsp = new Map();
        for (const e in PLANET_NUM) {
            if (PLANET_NUM[e] > 0) {
                var sg = this.planetSigns[PLANET_NUM[e]];
                var status = planetStrengthDisposition(e, sg) + " " + planetBeneficDisposition(e, this.planetSigns[0]);
                dsp.set(e, status.trim() + " in " + this.planetSigns[PLANET_NUM[e]]);
                var hzs = ownsHouses(e, this.lagnaSign);
                for (const p in hzs) {
                    dsp.set("L"+hzs[p], status.trim() + " in " + this.planetSigns[PLANET_NUM[e]]);
                }
            }
		};
		return dsp;
    };
    get allAssociations() {
        const assocMap = new Map();
        for (var hz1 = 1; hz1 <= 12; hz1++) {
            for (var hz2 = hz1 + 1; hz2 <= 12; hz2++) {
                var sg1 = (this.lagnaSign + hz1 - 1) > 12 ? (this.lagnaSign + hz1 - 13) : (this.lagnaSign + hz1 - 1);
                var sg2 = (this.lagnaSign + hz2 - 1) > 12 ? (this.lagnaSign + hz2 - 13) : (this.lagnaSign + hz2 - 1);
                var p1 = SIGN_LORDS[sg1 - 1];
                var p2 = SIGN_LORDS[sg2 - 1];
                if (p1 != p2) {
                    var assoc = this.planetsAssociation(p1, p2);
                    if (assoc != null) //console.log(hz1 + "-" + hz2 + "-->" + this.planetsAssociation(p1, p2));
                        assocMap.set("L" + hz1 + "-L" + hz2, assoc);
                        assocMap.set(p1 + "-" + p2, assoc);
                }
            }
        }
        return assocMap;
    };
    lordsAssociation(hz1, hz2) {
        var sg1 = (this.lagnaSign + hz1 - 1) > 12? (this.lagnaSign + hz1 - 13): (this.lagnaSign + hz1 - 1);
        var sg2 = (this.lagnaSign + hz2 - 1) > 12? (this.lagnaSign + hz2 - 13): (this.lagnaSign + hz2 - 1);
        return this.planetsAssociation(SIGN_LORDS[sg1 - 1], SIGN_LORDS[sg1 - 1]);
    };
	planetsAssociation(p1, p2) {
        var dsp = null;
        var sg1 = this.planetSigns[PLANET_NUM[p1]];
        var sg2 = this.planetSigns[PLANET_NUM[p2]];
        var ld1 = SIGN_LORDS[sg1 - 1];
        var ld2 = SIGN_LORDS[sg2 - 1];
        var asp = (sg2 > sg1) ? (sg2 - sg1 + 1) : (13 + sg2 - sg1);
        var aspType = (asp % 5 === 0) ? "trine" : ((asp % 4 === 0) ? "quad" : (asp === 3 || asp === 10) ? "sextile" : "");
        if (sg1 === sg2) dsp = "together (" + p1 + ", " + p2 + ")";
        else if (asp === 7) dsp = "opposite (" + p1 + ", " + p2 + ")";
        else if (ld1 === p2 && ld2 === p1) dsp = "swapped signs (" + p1 + ", " + p2 + ")";
        else if (PLANET_ASPECTS[p1].includes(asp) && PLANET_ASPECTS[p2].includes(asp)) dsp = aspType + " bi-directional aspect (" + p1 + ", " + p2 + ")";
        else if (PLANET_ASPECTS[p1].includes(asp) && !PLANET_ASPECTS[p2].includes(asp)) dsp = aspType + " uni-directional aspect (" + p1 + " aspects " + p2 + ")";
        else if (!PLANET_ASPECTS[p1].includes(asp) && PLANET_ASPECTS[p2].includes(asp)) dsp = aspType + " uni-directional aspect (" + p2 + " aspects " + p1 + ")";
		return dsp;
	}
};
const getChartObject = function (chartJSON) {
    var plntNames = Object.keys(PLANET_NUM);
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const hz in chartJSON) {
        var sg = chartJSON[hz].sign;
        if (chartJSON[hz].house === 1) arr[0] = sg;
        if (chartJSON[hz].planets.length > 0) {
            for (const plnt in chartJSON[hz].planets) {
                for (var i = 0; i < plntNames.length; i++) {
                    if (chartJSON[hz].planets[plnt].name === plntNames[i]) {
                        arr[i] = sg;
                        break;
                    }
                }
            }
        }
    }
    //console.log(arr);
    return new chartSignCalc(arr);
}

export {getChartObject};
