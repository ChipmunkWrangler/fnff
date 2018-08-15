"use strict";
const POINT_BLANK = {
    DC: 10,
    listedRangeFraction: 0
};
const CLOSE = {
    DC: 15,
    listedRangeFraction: 0.25
};

const MEDIUM = {
    DC: 20,
    listedRangeFraction: 0.5
};

const LONG = {
    DC: 25,
    listedRangeFraction: 1
};
const EXTREME = {
    DC: 30,
    listedRangeFraction: 2
};
const TOO_FAR = {
    DC: 999,
    listedRangeFraction: 999
};

const RANGE_CATEGORIES = [
    POINT_BLANK,
    CLOSE,
    MEDIUM,
    LONG,
    EXTREME,
    TOO_FAR
]

function GetRangeDC(dist, listedRange) {
    for (let rangeCategory of RANGE_CATEGORIES) {
	if (dist <= listedRange * rangeCategory.listedRangeFraction) {
	    return rangeCategory.DC;
	}
    }
}


const dist = document.getElementById("distance").value;
console.log(dist);
const listedRange = document.getElementById("listedRange").value;
console.log( GetRangeDC(dist, listedRange) );

const c = document.getElementById("rangeCategory");
console.log(c);
