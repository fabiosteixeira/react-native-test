import React from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import {
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const modelJson = require('./tensorflow/model/model.json');
const modelWeights = require('./tensorflow/model/weights.bin');

const App = () => {

  const prepareDataToProcessModel = (grau_mastite, reincidencia, grau_agente, data) => {
    let ndarray = require("ndarray")

    let aux0 = 0
    let aux1 = 0
    let aux2 = 0
    // # leve
    if (grau_mastite === 0) {
      aux0 = 0
      aux1 = 1
      aux2 = 0
    }
    // # Modearado
    if (grau_mastite == 1) {
      aux0 = 0
      aux1 = 0
      aux2 = 1
    }
    // # Grave
    if (grau_mastite == 2) {
      aux0 = 1
      aux1 = 0
      aux2 = 0
    }
    let X_test = ndarray(new Float32Array([grau_agente, reincidencia, data["e_coli"], data["enterococcus_spp"], data["klebsiella_enterobacter"], data["lactococcus_spp"], data["outros_gram_neg"], data["outros_gram_pos"], data["prototheca_levedura"], data["pseudomonas_spp"], data["serratia_spp"], data["staph_n_aureus"], data["staph_aureus"], data["strep_agalactiae_dysgalactiae"], data["strep_uberis"], aux0, aux1, aux2]), [1, 18])
    // console.log("🚀 ~ file: Helper-tensorflow.js ~ line 434 ~ prepareDataToProcessModel ~ X_test", X_test)
    // let X_test = ndarray( new Float32Array([0, 1]), [1, 18])



    // # converting list to array
    // # X_test = np.asarray(X_test)
    // # X_test = X_test.astype('float32')
    return X_test
  }

  const getModel = async () => {
    try {
      await tf.setBackend('cpu');
      await tf.ready();
      // load the trained model
      return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    } catch (error) {
      console.log('Could not load model', error);
    }
  };

  const getModel2 = async () => {
    try {
      const model_Url = 'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';
      return await tf.loadGraphModel(model_Url, {fromTFHub: true});
    } catch (error) {
      console.log('Could not load model', error);
    }
  };

  const teste = async () => {
    console.log('TESTE DE MODELO DA DOCUMENTAÇÃO')
    // const model = tf.sequential({
    //     layers: [tf.layers.dense({units: 1, inputShape: [10]})]
    //  })

    //  console.log(model.summary())
    //  model.predict(tf.ones([8, 10]), {batchSize: 4}).print()
    //  let result = model.predict(tf.ones([8, 10]), {batchSize: 4})
    //  console.log(result)
    //  result.arraySync().forEach(res => {
    //     console.log(res)
    //  })

    const model = await getModel()

    console.log(model)
    console.log(model.summary())

    console.log('VAI RODAR O PREDICT')
     let result = model.predict(tf.ones([1, 18]), {batchSize: 4, verbose: true})
    console.log(result)
    result.arraySync().forEach(res => {
      console.log(res)
    })


    // const model2 = await getModel()
    // console.log(model2.summary())

    // const data = { "e_coli": 1, "enterococcus_spp": 0, "grau_mastite": 0, "klebsiella_enterobacter": 0, "lactococcus_spp": 0, "negativo": 0, "num_casos_clinicos": 1, "outros_gram_neg": 0, "outros_gram_pos": 0, "prototheca_levedura": 0, "pseudomonas_spp": 0, "serratia_spp": 0, "staph_aureus": 0, "staph_n_aureus": 0, "strep_agalactiae_dysgalactiae": 0, "strep_uberis": 0 }
    // const X_test = prepareDataToProcessModel(0, 0, 0, data)
    // console.log('TENSOR 2D')
    // console.log(X_test.data)
    // const modelTensor = await tf.tensor2d([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [1, 18])
    // console.log(modelTensor)
    // console.log('PREDICT')
    // let resultado = await model2.predict(modelTensor)
    // console.log('RESULTADOS')
    // resultado.arraySync().forEach(resul => {
    //   console.log(resul)
    // })
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Button title='teste' onPress={teste} />
    </SafeAreaView>
  );
};

export default App;
