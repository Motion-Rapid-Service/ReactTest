//require('raw-loader!./input.txt');

import { testJoin, textReplace, hasKeyFound } from "./buildAuxiliaryFunction";
import * as buildSourceSpecies from "./buildSourceSpecies";
import CSSBuildMain from "./../buildCSS/buildCSSMain";
import * as buildQue from "../buildQue";

import * as middleDataClass from "./../../MiddleData/middleDataClass";

import UUID from "uuidjs";

let rootHtmlID: string;
let rootStyleID: string;
let rootScriptID: string;
let compositeTimeFlag: boolean;

let zIndex: number;

const htmlBuildMain = (jsonDataCentral: any, compositeID: string, send_compositeTimeFlag: boolean = false) => {
  buildQue.alldeleteHtmlElementQue();
  buildQue.alldeleteCSSElementQue();
  buildQue.alldeleteJavaScriptElementQue();

  const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = jsonDataCentral.OwnedClass_Composite;
  const OwnedClass_MediaObject: { [name: string]: middleDataClass.MediaObject } = jsonDataCentral.OwnedClass_MediaObject;
  const OwnedClass_AnimatorGroup: { [name: string]: middleDataClass.AnimatorGroup } = jsonDataCentral.OwnedClass_AnimatorGroup;
  const OwnedClass_Animator: { [name: string]: middleDataClass.Animator } = jsonDataCentral.OwnedClass_Animator;
  const OwnedClass_Keyframe: { [name: string]: middleDataClass.Keyframe } = jsonDataCentral.OwnedClass_Keyframe;
  const OwnedClass_CSSProperty: { [name: string]: middleDataClass.CSSProperty } = jsonDataCentral.OwnedClass_CSSProperty;

  compositeTimeFlag = send_compositeTimeFlag;

  const thenComposite: middleDataClass.Composite = OwnedClass_Composite[compositeID];
  let htmlText;
  let compositePreviewTime: number; //previewの時に各コンポジション内でプレイヘッド基準で出力を決めるときに使う変数(各コンポジション基準)
  let compositeOutputModeTime = 0; //現在処理してるコンポジションの開始地点(全体基準)

  if (compositeTimeFlag) {
    htmlText = String(require("./../buildFormat/htmlFormatPreview.txt")["default"]);
    compositePreviewTime = thenComposite.playheadTimePos;
  } else {
    htmlText = String(require("./../buildFormat/htmlFormat.txt")["default"]);
    compositePreviewTime = 0;
  }

  console.log("posFixed", compositePreviewTime);

  //htmlFormatPreview

  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  let indentHTML: number = 3; //root等を考慮した値

  zIndex = Object.keys(OwnedClass_MediaObject).length;
  // let cssText: string = "";
  // // console.log("cssText", cssText);

  // const writeCSS = (send_AddCssText: string) => {
  //   cssText += "\n";
  //   cssText += send_AddCssText;
  //   cssText += "\n";
  // };

  rootHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementTopClass());
  rootStyleID = buildQue.pushCSSElementQue(new buildQue.cssElementTopClass());
  rootScriptID = buildQue.pushJavaScriptElementQue(new buildQue.javascriptElementTopClass());

  // const bodyID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault("body", ""), rootStyleID);
  // buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("margin : 0;"), bodyID);

  // buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("min-width : 100vw;"), bodyID);
  // buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("min-height : 100vh;"), bodyID);
  // const cssAttribute: { [name: string]: string } = { type: "text/css" };
  // buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("style", cssAttribute), rootStyleID);
  // parseComposite(getJsonDataCentral, rootHtmlID, compositeID,compositePreviewTime);

  const newRootHeightText = buildQue.pushCSSElementQue(new buildQue.cssElementDefault("root", "#"), rootStyleID);
  const rootHeigth = "height :" + thenComposite.Composite_Duration + "px" + ";";
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(rootHeigth), newRootHeightText);

  const newRootPreviewFixedText = buildQue.pushCSSElementQue(new buildQue.cssElementDefault("previewFixed", "#"), rootStyleID);
  const rootPreviewFixed = "width : 0px ; height : 9px ; left : 0px ; top : " + compositePreviewTime + "px; position : absolute;";
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(rootPreviewFixed), newRootPreviewFixedText);

  buildSourceSpecies.sourceSpeciesFunctionComposite(
    getJsonDataCentral,
    rootHtmlID,
    thenComposite.Composite_ID,
    rootHtmlID,
    rootStyleID,
    compositePreviewTime,
    compositeTimeFlag,
    compositeOutputModeTime
  );

  const outputHtml = recursiveHtml(rootHtmlID);
  const outputStyle = recursiveCSS(rootStyleID);
  const outputScript = recursiveScript(rootScriptID);

  console.log("outputHtml", outputHtml);
  console.log(buildQue.htmlElementQue);
  console.log(buildQue.cssElementQue);
  console.log(buildQue.javascriptElementQue);

  const replaceData = {
    "%rootEdit%": outputHtml,
    "%rootTitle%": "TestMotionRapid",
    "%rootStyle%": outputStyle,
    "%rootScript%": outputScript,
    "\n": "",
  };
  const htmlTextReplace = textReplace(htmlText, replaceData);

  return htmlTextReplace;
};

export default htmlBuildMain;

const recursiveScript = (jsID: string) => {
  const jsElement: buildQue.javascriptElement = buildQue.getJavaScriptElementQue(jsID);

  console.log("recursiveScript", jsID, jsElement);

  if (!jsElement) {
    return "";
  }

  const newTextArray: Array<string> = jsElement.getText();
  const childIDArray: Array<string> = jsElement.childID;

  let recursiveText = "";

  if (jsElement.species === buildQue.javascriptElementSpeciesList[1]) {
    recursiveText += newTextArray[0];
  }

  if (jsElement.species === buildQue.javascriptElementSpeciesList[2]) {
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = recursiveScript(childIDArray[i]);
      recursiveText += returnText;
    }
  }

  console.log("recursiveScript", recursiveText);

  return recursiveText;
};

const recursiveCSS = (cssID: string) => {
  const cssElement: buildQue.cssElement = buildQue.getCSSElementQue(cssID);

  if (!cssElement) {
    return "";
  }

  const newTextArray: Array<string> = cssElement.getText();
  const childIDArray: Array<string> = cssElement.childID;

  let recursiveText = "";

  if (cssElement.species === buildQue.cssElementSpeciesList[1]) {
    recursiveText += newTextArray[0];
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = recursiveCSS(childIDArray[i]);
      recursiveText += returnText;
    }
    recursiveText += newTextArray[1];
  }

  if (cssElement.species === buildQue.cssElementSpeciesList[2]) {
    recursiveText += newTextArray[0];
  }

  if (cssElement.species === buildQue.cssElementSpeciesList[3]) {
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = recursiveCSS(childIDArray[i]);
      recursiveText += returnText;
    }
  }

  return recursiveText;
};

const recursiveHtml = (htmlID: string) => {
  const htmlElement: buildQue.htmlElement = buildQue.getHtmlElementQue(htmlID);
  const newTextArray: Array<string> = htmlElement.getText();
  const childIDArray: Array<string> = htmlElement.childID;

  let recursiveText = "";

  if (htmlElement.species === buildQue.htmlElementSpeciesList[1]) {
    // recursiveText += "\n";
    recursiveText += newTextArray[0];

    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = recursiveHtml(childIDArray[i]);
      recursiveText += returnText;
    }
    recursiveText += newTextArray[1];
    // recursiveText += "\n";
  }
  if (htmlElement.species === buildQue.htmlElementSpeciesList[2]) {
    recursiveText += newTextArray[0];
  }
  if (htmlElement.species === buildQue.htmlElementSpeciesList[3]) {
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = recursiveHtml(childIDArray[i]);
      recursiveText += returnText;
    }
  }
  return recursiveText;
};

export const parseComposite = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  parentID: string,
  compositeID: string,
  compositePreviewTime: number,
  compositeOutputModeTime: number
) => {
  console.log(getJsonDataCentral);
  const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = getJsonDataCentral().OwnedClass_Composite;
  const thenComposite: middleDataClass.Composite = OwnedClass_Composite[compositeID];
  //console.table(thenComposite);

  const OwnedID_MediaObject = thenComposite.OwnedID_MediaObject;

  console.log(compositeID);

  for (let i = 0; i < OwnedID_MediaObject.length; i++) {
    const thenMediaObjectID = OwnedID_MediaObject[i];
    console.log("解析(c) : ", thenMediaObjectID);
    parseMediaObject(getJsonDataCentral, parentID, compositeID, thenMediaObjectID, compositePreviewTime, compositeOutputModeTime);
  }
  return;
};

const parseMediaObject = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  parentID: string,
  compositeID: string,
  mediaObjectID: string,
  compositePreviewTime: number,
  compositeOutputModeTime: number
) => {
  const jsonDataCentral: middleDataClass.DataCentral = getJsonDataCentral();
  const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = jsonDataCentral.OwnedClass_Composite;
  const OwnedClass_MediaObject: { [name: string]: middleDataClass.MediaObject } = jsonDataCentral.OwnedClass_MediaObject;
  const OwnedClass_AnimatorGroup: { [name: string]: middleDataClass.AnimatorGroup } = jsonDataCentral.OwnedClass_AnimatorGroup;
  const OwnedClass_Animator: { [name: string]: middleDataClass.Animator } = jsonDataCentral.OwnedClass_Animator;
  const OwnedClass_Keyframe: { [name: string]: middleDataClass.Keyframe } = jsonDataCentral.OwnedClass_Keyframe;
  const OwnedClass_CSSProperty: { [name: string]: middleDataClass.CSSProperty } = jsonDataCentral.OwnedClass_CSSProperty;

  zIndex += 1;

  const tag = "div";

  const thenMediaObject: middleDataClass.MediaObject = OwnedClass_MediaObject[mediaObjectID];
  const thenSourceSpeciesClass: buildSourceSpecies.SourceSpeciesClass = thenMediaObject.MediaObject_SourceSpecies;
  const thenSourceSpecies = String(thenSourceSpeciesClass.sourceSpecies);

  const htmlAttribute: { [name: string]: string } = { id: mediaObjectID };
  const newHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass(tag, htmlAttribute), parentID);

  const newZindexID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(mediaObjectID, "#"), rootStyleID);
  const cssZindexText = "z-index :" + zIndex + ";";
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssZindexText), newZindexID);

  const startTime = thenMediaObject.MediaObject_StartTime + compositeOutputModeTime;
  const endTime = thenMediaObject.MediaObject_EndTime + compositeOutputModeTime;

  if (compositeTimeFlag) {
    if (!(startTime <= compositePreviewTime + compositeOutputModeTime && compositePreviewTime + compositeOutputModeTime < endTime)) {
      console.log("範囲外", startTime, compositePreviewTime, endTime);
      buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("display : none;"), newZindexID);
    }
  } else {
    const windowScrollMediaObject = String(require("./../buildFormat/windowScrollMediaObject.txt")["default"]);

    const replaceData = {
      "%MEDIAOBJECTSTARTTIME%": String(startTime) + ";",
      "%MEDIAOBJECTENDTIME%": String(endTime) + ";",
      "%MEDIAOBJECTID%": "'" + thenMediaObject.MediaObject_ID + "'" + ";",
      "%SCROLLFUNCTIONNAME%": "f" + textReplace(String(UUID.generate()), { "-": "" }),
      "\n": "",
    };

    buildQue.pushJavaScriptElementQue(new buildQue.javascriptElementSourceCodeClass(windowScrollMediaObject, replaceData), rootScriptID);
  }

  console.log("解析(m) ; ", thenSourceSpecies, buildSourceSpecies.sourceSpeciesList);

  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[0]) {
    //default
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[1]) {
    //text
    buildSourceSpecies.sourceSpeciesFunctionText(
      getJsonDataCentral,
      newHtmlID,
      rootStyleID,
      mediaObjectID,
      thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesTextClass
    );
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[2]) {
    //Composite

    const thenSourceSpeciesCompositeClass = thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesCompositeClass;

    if (!hasKeyFound(thenSourceSpeciesCompositeClass.compositeID, OwnedClass_Composite)) {
      console.log("解析 : 破棄", thenSourceSpeciesCompositeClass.compositeID, OwnedClass_Composite);
      return;
    }

    // メディアオブジェクトの時間判定機能を一度削除するため(フィールドバックのため)

    const newCompositePreviewTime = compositePreviewTime - thenMediaObject.MediaObject_StartTime;
    const newCompositeOutputModeTime = compositeOutputModeTime + thenMediaObject.MediaObject_StartTime;

    // const newCompositePreviewTime = compositePreviewTime;
    buildSourceSpecies.sourceSpeciesFunctionComposite(
      getJsonDataCentral,
      newHtmlID,
      thenSourceSpeciesCompositeClass.compositeID,
      rootHtmlID,
      rootStyleID,
      newCompositePreviewTime,
      compositeTimeFlag,
      newCompositeOutputModeTime
    );
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[3]) {
    //Image
    buildSourceSpecies.sourceSpeciesFunctionImage(
      getJsonDataCentral,
      newHtmlID,
      thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesImageClass,
      rootStyleID
    );
  }

  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[4]) {
    buildSourceSpecies.sourceSpeciesFunctionShape();
  }
  CSSBuildMain(getJsonDataCentral(), rootStyleID, rootScriptID, compositeID, mediaObjectID, compositeTimeFlag, compositePreviewTime, compositeOutputModeTime);

  return;
};
