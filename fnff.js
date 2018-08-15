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
const eDC = document.getElementById("dc");
var curRangeCategory;

function onDistanceOrRangeInput() {
    updateRangeCategory( GetRangeCategory(eDistance.value, eListedRange.value) );
    updateRangeCategoryDisplay();
}

function updateRangeCategoryDisplay() {
    document.getElementById(curRangeCategory.id).checked = true;
}

function onRangeCategoryInput(e) {
    const rangeCategoryId = e.target.id;
    updateRangeCategory(RANGE_CATEGORIES.find(category => category.id == rangeCategoryId));
    updateDistanceDisplay();
}

function updateDistanceDisplay() {
    eDistance.value = Math.floor(eListedRange.value * curRangeCategory.listedRangeFraction);
}

function updateRangeCategory(rangeCategory) {
    curRangeCategory = rangeCategory;
    updateDCDisplay(curRangeCategory.value);
}

function updateDCDisplay(dc) {
    //eDC.text = dc;
}

eDistance.addEventListener("change", onDistanceOrRangeInput);
eListedRange.addEventListener("change", onDistanceOrRangeInput);
for (let eRangeCategory of document.querySelectorAll("#rangeCategory")) {
    eRangeCategory.addEventListener("change", onRangeCategoryInput);
}

onDistanceOrRangeInput();


