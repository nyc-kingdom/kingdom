//icon buttons
import arrowLeft from './iconButtons/arrowLeft.png';
import arrowRight from './iconButtons/arrowRight.png';
import castle from './iconButtons/castleIcon.png';
import castleTower from './iconButtons/castleTower.png';
import sword from './iconButtons/sword.png';
import swordSingleButton from './iconButtons/swordSingleButton.png';
import bridgeShield from './iconButtons/shieldBrooklynUpdate.png';

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

import lynbrookS from './kingdoms/lynbrookS.png';
import lynbrookMarker from './kingdoms/lynbrookMarker.gif';
import lynbrookEst from './kingdoms/lynbrookEst.png';

import ravenswoodS from './kingdoms/ravenswoodS.png';
import ravenswoodMarker from './kingdoms/ravenswoodMarker.gif';
import ravenswoodEst from './kingdoms/ravenswoodEst.png';

//default
import defaultS from './kingdoms/defaultS.png'
import test from './kingdoms/test.gif'
import searchResult from './kingdoms/SearchMarker.gif';
import defaultEst from './kingdoms/castleTower.png';

const userClass = {
    'King': king,
    'Lord': lord,
    'Knight': knight,
    'Shepard': shepard,
    'Stone Mason': blacksmith,
}

//kingdom shields
const kingdomMark = {
    undefinedKingdom: defaultS,
    'Bedford': bedfordS,
    'Bushwick': bushwickS,
    'Financial District': financialDistrictS,
    'Lynbrook': lynbrookS,
    'Astoria': ravenswoodS,
    'Ravenswood': ravenswoodS,
}

const markersImages = {
    Bedford: bedfordMarker,
    Ravenswood: ravenswoodMarker,
    none: test,
    undefinedKingdom: test,
    Lynbrook: financialDistrictMarker,
    'South Slope': cityHallMarker,
    Bushwick: bushwickMarker,
    Astoria: ravenswoodMarker
}

const estCastle = {
    Bedford: bedfordEst,
    Ravenswood: ravenswoodEst,
    none: defaultEst,
    undefinedKingdom: defaultEst,
    Lynbrook: lynbrookEst,
    'South Slope': cityHallEst,
    Bushwick: bushwickEst,
    Astoria: ravenswoodEst,
    'Financial District': financialDistrictEst
}

export { userClass, kingdomMark, arrowLeft, arrowRight, castle, castleTower, sword, bridgeShield, gem, anvil, scroll, wand, king, lord, shepard, knight, blacksmith, knightsword, bushwickS, bushwickMarker, cityHallS, cityHallMarker, financialDistrictS, financialDistrictMarker, lynbrookS, lynbrookMarker, ravenswoodS, ravenswoodMarker, test, searchResult, swordSingleButton, markersImages, estCastle };
