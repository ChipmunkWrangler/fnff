"use strict";

const modifiers = [
    { id: "snapshot", modifier: -3 },
    { id: "multipleActions", modifier: -3 },
    { id: "twoWeapons", modifier: -3 },
    { id: "targetImmobile", modifier: 4 },
    { id: "targetDodging", modifier: -2 },
];

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
const eHit = document.getElementById("hit");
const eAttribute = document.getElementById("attribute");
const eSkill = document.getElementById("skill");
const eHitRoll = document.getElementById("hitRoll");
const eTotalRoll = document.getElementById("totalRoll");
const eTotalModifier = document.getElementById("totalModifier");
var curRangeCategory;

function onDistanceOrRangeInput() {
    updateRangeCategory( GetRangeCategory(eDistance.value, eListedRange.value) );
    updateRangeCategoryDisplay();
}

function onRangeCategoryInput(e) {
    const rangeCategoryId = e.target.id;
    updateRangeCategory(RANGE_CATEGORIES.find(category => category.id == rangeCategoryId));
    updateDistanceDisplay();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function onRoll() {
    eHitRoll.value = getRandomIntInclusive(1,10);
    updateHitDisplay();
}

function updateHitDisplay() {
    const rollTotal = getRollTotal();
    const isHit = rollTotal >= getDCTotal();
    eHit.textContent = isHit ? "Hit" : "Miss";
    eHit.style.color = isHit ? "green" : "red";
    eTotalRoll.textContent = rollTotal;
}

function getRollTotal() {
    return Number(eHitRoll.value) + Number(eAttribute.value) + Number(eSkill.value);
}

function getDCTotal() {
    return curRangeCategory.DC - getTotalModifier();
}

function updateRangeCategoryDisplay() {
    document.getElementById(curRangeCategory.id).checked = true;
}

function updateDistanceDisplay() {
    eDistance.value = Math.floor(eListedRange.value * curRangeCategory.listedRangeFraction);
}

function updateRangeCategory(rangeCategory) {
    curRangeCategory = rangeCategory;
    updateDCDisplay();
    updateHitDisplay();
}

function updateDCDisplay() {
    eDC.textContent = getDCTotal();
}

function getTotalModifier() {
    var totalModifier = 0;
    for (let modifierDescriptor of modifiers) {
	if (modifierDescriptor.element.checked) {
	    totalModifier += modifierDescriptor.modifier;
	}
    }
    return totalModifier;
}

function updateModifiers() {
    eTotalModifier.textContent = getTotalModifier();
    updateDCDisplay();
    updateHitDisplay();
}

eDistance.addEventListener("change", onDistanceOrRangeInput);
eListedRange.addEventListener("change", onDistanceOrRangeInput);
eHitRoll.addEventListener("change", updateHitDisplay );
eAttribute.addEventListener("change", updateHitDisplay );
eSkill.addEventListener("change", updateHitDisplay );
document.getElementById("roll").addEventListener("click", onRoll);
for (let eRangeCategory of document.querySelectorAll("#rangeCategory")) {
    eRangeCategory.addEventListener("change", onRangeCategoryInput);
}
for (let modifierDescriptor of modifiers) {
    modifierDescriptor.element = document.getElementById(modifierDescriptor.id);
    modifierDescriptor.element.addEventListener("change", updateModifiers);
}
onDistanceOrRangeInput();
updateModifiers();


