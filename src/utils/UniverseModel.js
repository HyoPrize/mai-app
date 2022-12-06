import * as tf from "@tensorflow/tfjs";

export const predictStar = async (tokenizedStrList) => {
    const model = await tf.loadLayersModel("http://localhost:5001/models/model.json");
    const listLength = tokenizedStrList.length;
    let newArray = Array.from({ length: 100 - listLength }, () => 0);
    newArray = newArray.concat(tokenizedStrList);
    return model.predict(tf.tensor2d([newArray])).dataSync()[0];
};
