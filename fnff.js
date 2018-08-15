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

function GetRangeCategory(distance, listedRange) {
    for (let rangeCategory of RANGE_CATEGORIES) {
	if (distance <= listedRange * rangeCategory.listedRangeFraction) {
	    return rangeCategory;
	}
    }
}

const eDistance = document.getElementById("distance");
const eListedRange = document.getElementById("listedRange");
var curRangeCategory;

function onDistanceOrRangeInput() {
    curRangeCategory = GetRangeCategory(eDistance.value, eListedRange.value);
    console.log(curRangeCategory.id);
    document.getElementById(curRangeCategory.id).checked = true;
}

function onRangeCategoryInput(e) {
    const rangeCategoryId = e.target.id;
    curRangeCategory = RANGE_CATEGORIES.find(category => category.id == rangeCategoryId);
    eDistance.value = eListedRange.value * curRangeCategory.listedRangeFraction;
    console.log(rangeCategoryId);
}

eDistance.onchange = onDistanceOrRangeInput;
eListedRange.onchange = onDistanceOrRangeInput;
for (let eRangeCategory of document.querySelectorAll("#rangeCategory")) {
    eRangeCategory.onchange = onRangeCategoryInput;
}

onDistanceOrRangeInput();


