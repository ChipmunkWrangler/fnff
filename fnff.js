"use strict";

const modifiers = [
    { modifier: -3, desc: "Snap Shot (+3 Ini)" },
    { modifier: -3, desc: "Two Actions" },
    { modifier: -3, desc: "Two Weapons" },
    { modifier: 5, desc: "Ambush/Backstab" },
    { modifier: 4, desc: "Target Immobile" },
    { modifier: -2, desc: "Target Dodging" },
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
const eModifiers = document.getElementById("modifiers"); 
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
    return Math.floor(Math.random() * (max - min + 1)) + min; 
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
    return modifiers.filter( o => o.element.checked ).reduce( (sum, o) => sum + o.modifier, 0 );
}

function updateModifiers() {
    eTotalModifier.textContent = getTotalModifier();
    updateDCDisplay();
    updateHitDisplay();
}

function createModifierElement(modifierObj, id) {
    var div = document.createElement("div");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = "modifier";
    checkbox.addEventListener("change", updateModifiers);
    var label = document.createElement("label");
    var mod = modifierObj.modifier;
    if (mod > 0) {
	mod = "+" + mod;
    }
    label.textContent = modifierObj.desc + ": " + mod;
    label.htmlFor = id;
    div.appendChild(checkbox);
    div.appendChild(label);

    modifierObj.element = checkbox;
    return div;
}
function createModifierElements() {
    var i = 0;
    for (let o of modifiers) {
	eModifiers.appendChild(createModifierElement(o, "modifier" + i));
	++i;
    }
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
createModifierElements();
onDistanceOrRangeInput();
updateModifiers();


