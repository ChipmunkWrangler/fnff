"use strict";

const RANGE_CATEGORIES = [
    {
	id: "pointBlank",
	DC: 10,
	listedRangeFraction: 0
    },
    {
	id: "close",
	DC: 15,
	listedRangeFraction: 0.25,
    },
    {
	id: "medium",
	DC: 20,
	listedRangeFraction: 0.5,
    },
    {
	id: "long",
	DC: 25,
	listedRangeFraction: 1
    },
    {
	id: "extreme",
	DC: 30,
	listedRangeFraction: 2
    },
    {
	id: "tooFar",
	DC: 999,
	listedRangeFraction: 999
    },
]

function GetRangeCategory(dist, listedRange) {
    for (let rangeCategory of RANGE_CATEGORIES) {
	if (dist <= listedRange * rangeCategory.listedRangeFraction) {
	    return rangeCategory;
	}
    }
}


const dist = document.getElementById("distance").value;
const listedRange = document.getElementById("listedRange").value;
const rangeCategory = GetRangeCategory(dist, listedRange);
const rangeCategoryElement = document.getElementById(rangeCategory.id);
rangeCategoryElement.checked = true;
console.log(rangeCategory.id);
