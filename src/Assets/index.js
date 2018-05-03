//icon buttons
import arrowLeft from './iconButtons/arrowLeft.png';
import arrowRight from './iconButtons/arrowRight.png';
import castle from './iconButtons/castleIcon.png';
import castleTower from './iconButtons/castleTower.png';
import sword from './iconButtons/sword.png';
import swordSingleButton from './iconButtons/swordSingleButton.png';
import bridgeShield from './iconButtons/shieldBrooklynUpdate.png';
import changeKingdom from './iconButtons/shield1.png';

//resources
import gem from './Resources/gem.png';
import anvil from './Resources/anvil.png';
import scroll from './Resources/scroll.png';
import wand from './Resources/wand.png';

//characters
import king from './characters/king.gif';
import lord from './characters/Lord.gif';
import knight from './characters/knight.gif';
import shepard from './characters/shepard.gif';
import blacksmith from './characters/blacksmith.gif';
import knightsword from './characters/knightsword.gif';

//kingdom art
import bedfordS from './kingdoms/bedfordS.png';
import bedfordMarker from './kingdoms/bedfordMarker.gif';
import bedfordEst from './kingdoms/bedfordEst.png';

import bushwickS from './kingdoms/bushwickC.png';
import bushwickMarker from './kingdoms/bushwickMarker.gif';
import bushwickEst from './kingdoms/bushwickEst.png';

import cityHallS from './kingdoms/cityHallS.png';
import cityHallMarker from './kingdoms/cityHallMarker.gif';
import cityHallEst from './kingdoms/cityHallEst.png';

import financialDistrictS from './kingdoms/financialDistrictS.png';
import financialDistrictMarker from './kingdoms/financialDistrictMarker.gif';
import financialDistrictEst from './kingdoms/financialDistrictEst.png';

import sample from './kingdoms/sample.png';
import leffertsGardenMarker from './kingdoms/leffertsGardenMarker.gif';
import leffertsGardenEst from './kingdoms/leffertsGardenEst.png';


import lynbrookS from './kingdoms/lynbrookS.png';
import lynbrookMarker from './kingdoms/lynbrookMarker.gif';
import lynbrookEst from './kingdoms/lynbrookEst.png';

import ravenswoodS from './kingdoms/ravenswoodS.png';
import ravenswoodMarker from './kingdoms/ravenswoodMarker.gif';
import ravenswoodEst from './kingdoms/ravenswoodEst.png';

import southSlopeS from './kingdoms/southSlopeS.png';
import southSlopeMarker from './kingdoms/southSlopeMarker.gif';
import southSlopeEst from './kingdoms/southSlopeEst.png';

//default
import defaultS from './kingdoms/defaultS.png';
import test from './kingdoms/test.gif';
import searchResult from './kingdoms/SearchMarker.gif';
import defaultEst from './kingdoms/castleTower.png';

import sample3 from './kingdoms/sample3.png';
import sample4 from './kingdoms/sample4.png';
import sample5 from './kingdoms/sample5.png';

const userClass = {
    King: king,
    Lord: lord,
    Knight: knight,
    Shepard: shepard,
    'Stone Mason': blacksmith,
    Knightsword: knightsword,
}

//kingdom shields
const kingdomMark = {
    undefinedKingdom: {1: defaultS, 2: sample4},
    Bedford: bedfordS,
    Bushwick: bushwickS,
    'Financial District': financialDistrictS,
    'Lefferts Gardens': sample,
    Lynbrook: lynbrookS,
    Astoria: ravenswoodS,
    Ravenswood: ravenswoodS,
    'South Slope': southSlopeS,
    'Bath Beach': sample5,
    'Ocean Hill': sample3,
    'Southern Tip': sample,
    Arlen: sample,
    Qarth: sample,
    Dragonstone: sample
}

const kingdomShields = {
    a: defaultS,
    b: sample4,
    c: bedfordS,
    d: bushwickS,
    e: financialDistrictS,
    f: sample,
    g: lynbrookS,
    h: ravenswoodS,
    i: southSlopeS,
    j: sample5,
    k: sample3
}

const markersImages = {
    Bedford: bedfordMarker,
    Ravenswood: ravenswoodMarker,
    none: searchResult,
    undefinedKingdom: test,
    'Lefferts Gardens': leffertsGardenMarker,
    Lynbrook: lynbrookMarker,
    'South Slope': southSlopeMarker,
    Bushwick: bushwickMarker,
    Astoria: ravenswoodMarker,
    'Southern Tip': leffertsGardenMarker,
    Arlen: test,
    Qarth: test,
    Dragonstone: test
}

const estCastle = {
    Bedford: bedfordEst,
    Ravenswood: ravenswoodEst,
    none: defaultEst,
    undefinedKingdom: defaultEst,
    'Lefferts Gardens': leffertsGardenEst,
    Lynbrook: lynbrookEst,
    'South Slope': southSlopeEst,
    Bushwick: bushwickEst,
    Astoria: ravenswoodEst,
    'Financial District': financialDistrictEst,
    'Southern Tip': leffertsGardenEst,
    Arlen: defaultEst,
    Qarth: defaultEst,
    Dragonstone: defaultEst
}

export { userClass, kingdomMark, arrowLeft, arrowRight, castle, castleTower, sword, bridgeShield, gem, anvil, scroll, wand, king, lord, shepard, knight, blacksmith, knightsword, bushwickS, bushwickMarker, cityHallS, cityHallMarker, financialDistrictS, financialDistrictMarker, lynbrookS, lynbrookMarker, ravenswoodS, ravenswoodMarker, test, searchResult, swordSingleButton, markersImages, estCastle, changeKingdom, kingdomShields };
