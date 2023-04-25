import React, { useState, useEffect, createContext } from "react";
import * as tf from "@tensorflow/tfjs";
import {bundleResourceIO} from '@tensorflow/tfjs-react-native'
import modelJSON from "../assets/new_model/model.json";
import modelWeights from "../assets/new_model/modelWeights.bin";

export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState();
  const [loading, setLoading] = useState(true);

  const loadModel = async()=>{
      const plantModel = await tf.loadGraphModel(
          bundleResourceIO(modelJSON, modelWeights)
      ).catch((e)=>{
        console.log("[LOADING ERROR] info:",e)
      })
      return plantModel
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await tf.ready();
      const res = await loadModel();
      setModel(res);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <ModelContext.Provider value={{ model, loading }}>
      {children}
    </ModelContext.Provider>
  );
};
