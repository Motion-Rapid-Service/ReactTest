import * as React from "react";
const { createContext } = React;
import * as timelimeRender from "./timelimeRender";
type MediaObjectContextValue = {
  //   sta: Number;
  //   end: Number;
  mediaObjectAreaElement: any;
  mediaObjectRender: timelimeRender.TypeMediaObjectRender;
  mediaObjectRenderSetState: Function;
  mediaObjectUUID: string;
  mediaObejctIndex: number;
  // areaFocus:boolean;
};

export const MediaObjectContext = createContext<MediaObjectContextValue>({} as MediaObjectContextValue);

type TimelineAreaDivContextValue = {
  timelineMainElement: any;
  timelineAreaElement: any;
  timelineScrollElement: any;
  // timelineUpdate: boolean;
  // timelineUpdateDOM: Function;
  // animationOpenUpdate: boolean;
  // animationOpenUpdateDOM: Function;
  mediaObejctDivHeightSetStateValue: Function;
  mediaObjectSwopInsertionDestination: Function;
  focusMediaObjectSpace: number;
  focusMediaObjectSpaceSetState: Function;

  // elementTimelineWidth: number;
  // elementLayerPanelWidth: number;
  // elementLayerDurationWidth: number;
};

export const TimelineAreaDivContext = createContext<TimelineAreaDivContextValue>({} as TimelineAreaDivContextValue);

type TimelineAreaRightContextValue = {
  timelineAreaRightElement: any;
};

export const TimelineAreaRightContext = createContext<TimelineAreaRightContextValue>({} as TimelineAreaRightContextValue);

// type MediaObjectGenerationContextValue = {
//   // MouseSelectedSetValue:Function;
//   // MouseUnselectedSetValue:Function;
// };
// export const MediaObjectGenerationContext =
// createContext<MediaObjectGenerationContextValue>({} as MediaObjectGenerationContextValue);

type LayerPanelContextValue = {
  timelineAreaLayerPanelElement: any;
};

export const LayerPanelContext = createContext<LayerPanelContextValue>({} as LayerPanelContextValue);

type LayerDurationContextValue = {
  timelineAreaLayerDurationElement: any;
};

export const LayerDurationContext = createContext<LayerDurationContextValue>({} as LayerDurationContextValue);

type LayerPanelAnimaterContextValue = {
  Animator_ID: string;
  Animator_propertySpecies: string;
  AnimatorGroup_Species: string;
};
export const LayerPanelAnimaterContext = createContext<LayerPanelAnimaterContextValue>({} as LayerPanelAnimaterContextValue);

export type TypeSetCSSpropertyValueAction = { actionType: string; cssValue: string };
export type TypeSetCSSpropertyUnitAction = { actionType: string; cssUnit: string };

type AnimaterCSSpropertyContextValue = {
  animaterCSSpropertyValue: string;
  animaterCSSpropertyUnit: string;
  animaterCSSpropertyValueUpdate: Function;
  animaterCSSpropertyUnitUpdate: Function;
};
export const AnimaterCSSpropertyContext = createContext<AnimaterCSSpropertyContextValue>({} as AnimaterCSSpropertyContextValue);
