export const mediaObjectMousePosition = (
  //mediaObjectに対してMouseの座標を取得
  event: any,
  //   timelinemediaObjectAreaElement: any,
  mediaObjectLayerDurationAreaElement: any
  //   timelineScrollElement: any
) => {
  const clientX = event.clientX;
  const clientY = event.clientY;

  const ElementBoundingClientRect = mediaObjectLayerDurationAreaElement.current.getBoundingClientRect();

  const ElementLeft = ElementBoundingClientRect.left;
  const ElementTop = ElementBoundingClientRect.top;

  const mouseAreaX = clientX - ElementLeft;
  const mouseAreaY = clientY - ElementTop;

  return [mouseAreaX, mouseAreaY];
};

export const mediaObjectTimelinePostion = (
  //timelineに対してmediaObjectの座標を取得
  timelineAreaElement: any,
  mediaObjectAreaElement: any
) => {
  const timelineElementBoundingClientRect = timelineAreaElement.current.getBoundingClientRect();
  const timelineElementLeft = timelineElementBoundingClientRect.left;
  const timelineElementTop = timelineElementBoundingClientRect.top;

  const mediaObjectElementBoundingClientRect = mediaObjectAreaElement.current.getBoundingClientRect();
  const mediaObjectElementLeft = mediaObjectElementBoundingClientRect.left;
  const mediaObjectElementTop = mediaObjectElementBoundingClientRect.top;

  const x = mediaObjectElementLeft - timelineElementLeft;
  const y = mediaObjectElementTop - timelineElementTop;
  return [x, y];
};

export const elementSize = (
  //mediaObjectのサイズを取得
  mediaObjectAreaElement: any
) => {
  const mediaObjectElementBoundingClientRect = mediaObjectAreaElement.current.getBoundingClientRect();
  const mediaObjectElementWidth = mediaObjectElementBoundingClientRect.width;
  const mediaObjectElementHeight = mediaObjectElementBoundingClientRect.height;

  return [mediaObjectElementWidth, mediaObjectElementHeight];
};

export const timelineMousePostion = (
  //タイムラインに対してのマウスを取得
  event: any,
  timelineAreaElement: any
) => {
  const clientX = event.clientX;
  const clientY = event.clientY;
  const timelineElementBoundingClientRect = timelineAreaElement.current.getBoundingClientRect();
  const timelineElementLeft = timelineElementBoundingClientRect.left;
  const timelineElementTop = timelineElementBoundingClientRect.top;

  //console.log("timelineMousePostion",timelineElementLeft,timelineElementTop)
  const x = clientX - timelineElementLeft;
  const y = clientY - timelineElementTop;
  return [x, y];
};
