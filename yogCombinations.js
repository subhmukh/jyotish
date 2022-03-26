'use strict';
import { yogRulesList } from "./yogRulesList.js";
import { getChartObject } from './chartSignCalc.js';

const calculate = (chart) => {
    const yogsFound = new Map();
    const sgnSet = new Set();
    const hzSet = new Set();
    var chartObj = getChartObject(chart);
    var disp = chartObj.disposition; //console.log(disp);
    var assocs = chartObj.allAssociations; //console.log(assocs);
    var hzsMap = chartObj.planetHousesMap; //console.log(hzsMap);
    var sgnMap = chartObj.planetSignsMap; //console.log(sgnMap);
    var planets7 = ["Su", "Mo", "Me", "Ve", "Ma", "Ju", "Sa"];
    planets7.forEach((p7) => {
        sgnSet.add(sgnMap.get(p7));
        hzSet.add(hzsMap.get(p7));
    }); //console.log("Signs: "+[...sgnSet]+", Houses: "+[...hzSet]);
    for (const rule in yogRulesList) {
        var title = yogRulesList[rule].title;
        var p1 = Array.isArray(yogRulesList[rule].planets) ? yogRulesList[rule].planets[0] : (yogRulesList[rule].planets != undefined ? yogRulesList[rule].planets : null); 
        var p2 = (Array.isArray(yogRulesList[rule].planets) && yogRulesList[rule].planets.length === 2) ? yogRulesList[rule].planets[1] : null;
        var disposition = yogRulesList[rule].disposition != undefined && Array.isArray(yogRulesList[rule].disposition) ? yogRulesList[rule].disposition : null;
        var ruleElementPassed = 0;
        var mismatch = [];
        var enhanced = 0;
        var el2pass = Object.keys(yogRulesList[rule]).filter(k => !["title", "planets", "enhanceif"].includes(k)).length;
        //console.log("---" + yogRulesList[rule].title + "[" + Object.keys(yogRulesList[rule]) + "] - " + el2pass + " rules to pass");
        var p1c = [];
        var p2c = [];
        Object.keys(yogRulesList[rule]).forEach((el) => {
            switch (el) {
                case "planetsAll7WithSignsCount":
                    var signCount = yogRulesList[rule].planetsAll7WithSignsCount;
                    if (sgnSet.size===signCount) ruleElementPassed++;
                    else mismatch.push("Planets in " + sgnSet.size + " unique signs, not " + signCount);
                    break;
                case "planetsAll7InSigns":
                    var sgns = yogRulesList[rule].planetsAll7InSigns;
                    var matchOf7 = 0;
                    sgnSet.forEach((s7) => {if (sgns.includes(s7)) matchOf7++;});
                    if (matchOf7===7) ruleElementPassed++;
                    else mismatch.push("Out of 7, " + matchOf7 + " found in '" + sgns + "'");
                    break;
                case "planetsAll7InHouses":
                    var hzs = yogRulesList[rule].planetsAll7InHouses;
                    var matchOf7 = 0;
                    planets7.forEach((p7) => {if (hzs.includes(hzsMap.get(p7))) matchOf7++;});
                    if (matchOf7===7) ruleElementPassed++;
                    else mismatch.push("Out of 7, " + matchOf7 + " found in '" + hzs + "'");
                    break;
                case "planetsByDisposition":
                    Object.entries(disp).forEach(([key, value]) => {
                        var anyOf1, anyOf2;
                        anyOf1 = anyOf2 = false;
                        if (!Array.isArray(yogRulesList[rule].planetsByDisposition) && disp.get(key).includes(yogRulesList[rule].planetsByDisposition)) anyOf1 = true;
                        else if (!Array.isArray(yogRulesList[rule].planetsByDisposition[0]) && disp.get(key).includes(yogRulesList[rule].planetsByDisposition[0])) anyOf1 = true;
                        else if (Array.isArray(yogRulesList[rule].planetsByDisposition[0])) yogRulesList[rule].planetsByDisposition[0].forEach((pde) => anyOf1 = anyOf1 || disp.get(key).includes(pde));
                        if (anyOf1) p1c.push(key);
                        if (Array.isArray(yogRulesList[rule].planetsByDisposition) && yogRulesList[rule].planetsByDisposition.length === 2) {
                            if (!Array.isArray(yogRulesList[rule].planetsByDisposition[1]) && disp.get(key).includes(yogRulesList[rule].planetsByDisposition[1])) anyOf2 = true;
                            else if (Array.isArray(yogRulesList[rule].planetsByDisposition[1])) yogRulesList[rule].planetsByDisposition[1].forEach((pde) => anyOf2 = anyOf2 || disp.get(key).includes(pde));
                            if (anyOf2) p2c.push(key);
                        }
                    });
                    p1 = (p1c.length > 1) ? p1c[0] : null;
                    p2 = (p2c.length > 1) ? p2c[0] : null;
                    if (p1 != null && p2 != null) ruleElementPassed++;
                    else if (p1 != null) mismatch.push("> Found " + p1 + " as '" + yogRulesList[rule].planetsByDisposition[0] + " but not another with '" + yogRulesList[rule].planetsByDisposition[1] + "']");
                    else if (p2 != null) mismatch.push("> Found " + p2 + " as '" + yogRulesList[rule].planetsByDisposition[1] + " but not first planet with '" + yogRulesList[rule].planetsByDisposition[0] + "']");
                    else mismatch.push("> Did not find 2 planets with disposition '" + yogRulesList[rule].planetsByDisposition[0] + "' and '" + yogRulesList[rule].planetsByDisposition[1] + "']");
                    break;
                case "inHouse":
                    if (yogRulesList[rule].inHouse.includes(hzsMap.get(p1))) ruleElementPassed++;
                    else mismatch.push("> Incorrect position failed - [" + p1 + " in " + hzsMap.get(p1) + " and not in '" + yogRulesList[rule].inHouse + "']");
                    break;
                case "disposition":
                    var anyOf = false;
                    if (Array.isArray(yogRulesList[rule].disposition)) yogRulesList[rule].disposition.forEach((de) => anyOf = anyOf || disp.get(p1).includes(de));
                    else if (disp.get(p1).includes(yogRulesList[rule].disposition)) anyOf = true;
                    if (anyOf) ruleElementPassed++;
                    else mismatch.push("> Incorrect disposition failed - [" + p1 + " is '" + disp.get(p1) + "' and not any of '" + yogRulesList[rule].disposition + "']");
                    break;
                case "aspect":
                    if ((p1 != null && p2 != null) || (p1c.length > 1 && p2c.length > 1)) {
                        var anyOf = false;
                        if (p1c.length > 1 && p2c.length > 1) {
                            p1c.forEach((ep1c) => {
                                p2c.forEach((ep2c) => {
                                    var assoc = (assocs.has(ep1c + "-" + ep2c)) ? assocs.get(ep1c + "-" + ep2c) : (assocs.has(ep2c + "-" + ep1c) ? assocs.get(ep2c + "-" + ep1c) : null);
                                    if (assoc != null && Array.isArray(yogRulesList[rule].aspect)) yogRulesList[rule].aspect.forEach((ae) => anyOf = anyOf || assoc.includes(ae));
                                    else if (assoc != null && assoc.includes(yogRulesList[rule].aspect)) anyOf = true;
                                });
                            });
                            if (anyOf) ruleElementPassed++;
                            else mismatch.push("> Could not find required aspect '" + yogRulesList[rule].aspect + "'");
                        } else {
                            var assoc = (assocs.has(p1 + "-" + p2)) ? assocs.get(p1 + "-" + p2) : (assocs.has(p2 + "-" + p1) ? assocs.get(p2 + "-" + p1) : null);
                            if (assoc != null && Array.isArray(yogRulesList[rule].aspect)) yogRulesList[rule].aspect.forEach((ae) => anyOf = anyOf || assoc.includes(ae));
                            else if (assoc != null && assoc.includes(yogRulesList[rule].aspect)) anyOf = true;
                            if (anyOf) ruleElementPassed++;
                            else mismatch.push("> Incorrect aspect between " + p1 + " and " + p2 + "[Is '" + assoc + "' and not any of '" + yogRulesList[rule].aspect + "']");
                        }
                    }
                    break;
                case "enhanceif":
                    Object.keys(yogRulesList[rule].enhanceif).forEach((eni) => {
                        switch (eni) {
                            case "disposition":
                                var anyOf = false;
                                if (Array.isArray(yogRulesList[rule].enhanceif.disposition)) yogRulesList[rule].enhanceif.disposition.forEach((de) => anyOf = anyOf || disp.get(p1).includes(de));
                                else if (disp.get(p1).includes(yogRulesList[rule].enhanceif.disposition)) anyOf = true;
                                if (anyOf) enhanced++;
                                else mismatch.push("> WEAK, NOT ENHANCED disposition - [" + p1 + " is '" + disp.get(p1) + "' and not any of '" + yogRulesList[rule].enhanceif.disposition + "']");
                                break;
                        }

                    });
                    break;
                case "excludeif":
                    Object.keys(yogRulesList[rule].excludeif).forEach((exi) => {
                        switch (exi) {
                            case "disposition":
                                var anyOf = false;
                                if (Array.isArray(yogRulesList[rule].excludeif.disposition)) yogRulesList[rule].excludeif.disposition.forEach((de) => anyOf = anyOf || disp.get(p1).includes(de));
                                else if (disp.get(p1).includes(yogRulesList[rule].excludeif.disposition)) anyOf = true;
                                if (!anyOf) ruleElementPassed++;
                                else mismatch.push("> EXCLUDED disposition - [" + p1 + " is '" + yogRulesList[rule].excludeif.disposition + "']");
                                break;
                        }
                    });
                    break;
            }
        });
        if (ruleElementPassed >= el2pass) yogsFound.set(yogRulesList[rule].title, JSON.stringify(yogRulesList[rule]));
        else console.log("---" + yogRulesList[rule].title + " failed due to " + ruleElementPassed + " of " + el2pass + " matches [" + mismatch + "]");
    }
    
    return yogsFound;

};
export {calculate};