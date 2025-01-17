//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス
import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "../AppContext";

import SetupConfig from "./SetupConfig";
import { SetupEditorContext } from "./SetupEditorContext";
import { SetupUndoContext } from "./SetupUndoContext";

let undoRedoPointer: number = -1; //editHistoryStackのどのデータを戻すかという数値 たいてい、データ返却直前に数値が変更される
let editHistoryStack: { [name: number]: EditHistoryData }; //redo undo
class EditHistoryData {
  jsonData: any;
  constructor(send_jsonData: any) {
    this.jsonData = send_jsonData;
  }
}

const SetupUndo = () => {
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);

  useEffect(() => {
    initEditHistory();

    console.log("initEditHistory");
  }, []);

  const initEditHistory = () => {
    editHistoryStack = {};

    const dataCentral = AppContextValue.getDataCentral();
    dataCentral.DataCentral_MediaTable = null;

    const newHistoryData = new EditHistoryData(dataCentral);
    editHistoryStack[0] = newHistoryData;
    undoRedoPointer = 0;
  };

  const pushEditHistory = () => {
    const dataCentral = AppContextValue.getDataCentral();
    dataCentral.DataCentral_MediaTable = null;

    // const deleteQuantity = editHistoryStack.length - undoRedoPointer;
    // console.log("undoRedoPointer deleteQuantity", deleteQuantity);

    // if (deleteQuantity > 0) {
    //   for (let i = 0; i < deleteQuantity; i++) {
    //     console.log("deleteQuantity del");
    //     editHistoryStack.pop(); //指定個数分後ろ側から削除してしまう
    //   }
    // }

    const newHistoryData = new EditHistoryData(dataCentral);
    undoRedoPointer += 1;
    editHistoryStack[undoRedoPointer] = newHistoryData;
    console.log("editHistoryStack", editHistoryStack, undoRedoPointer);
    console.log("undoRedoPointer", undoRedoPointer);
  };

  const undoEditHistory = () => {
    if (undoRedoPointer < 0) {
      return;
    }
    undoRedoPointer -= 1;
    console.log("undoRedoPointer -", undoRedoPointer, editHistoryStack);

    const thenStack = editHistoryStack[undoRedoPointer];
    const dataCentral = AppContextValue.getDataCentral();
    thenStack.jsonData.DataCentral_MediaTable = dataCentral.DataCentral_MediaTable;
    console.log("thenStack.jsonData undo", thenStack.jsonData, undoRedoPointer, SetupEditorContextValue.previewUpdateDOM);

    AppContextValue.replaceDataCentral(thenStack.jsonData);
    SetupEditorContextValue.previewUpdateDOM();

    return;
  };

  const redoEditHistory = () => {
    if (undoRedoPointer < 0) {
      return;
    }
    undoRedoPointer += 1;
    console.log("undoRedoPointer +", undoRedoPointer, editHistoryStack);

    const thenStack = editHistoryStack[undoRedoPointer];
    const dataCentral = AppContextValue.getDataCentral();
    thenStack.jsonData.DataCentral_MediaTable = dataCentral.DataCentral_MediaTable;
    console.log("thenStack.jsonData redo", thenStack.jsonData, undoRedoPointer);

    AppContextValue.replaceDataCentral(thenStack.jsonData);
    SetupEditorContextValue.previewUpdateDOM();

    return;
  };

  const fireUndoRedo = (event: any) => {
    console.log(event.key === "Z", event.ctrlKey || event.metaKey, event.shiftKey);
    if (event.key === "Z" && (event.ctrlKey || event.metaKey) && event.shiftKey) {
      // redoの処理
      console.log("redo run ");
      redoEditHistory();
    } else if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
      // undoの処理
      console.log("undo run");
      undoEditHistory();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", fireUndoRedo);

    return () => {
      window.removeEventListener("keydown", fireUndoRedo);
    };
  }, []);

  return (
    <SetupUndoContext.Provider
      value={{ initEditHistory: initEditHistory, pushEditHistory: pushEditHistory, undoEditHistory: undoEditHistory, redoEditHistory: redoEditHistory }}
    >
      <SetupConfig />
    </SetupUndoContext.Provider>
  );
};

export default SetupUndo;
