import _ from "lodash"; // Import the entire lodash library

//import { sampleProducts } from "../Data/no-weight";
//import { sampleProducts } from "../Data/sample-products";
import { sampleProducts } from "../Data/no-products";

const generateId = (dt) =>
  dt.reduce((acc, current) => Math.max(acc, current.ProductID), 0) + 1;

export const insertItem = (item, data) => {
  data.shift(item);

  item.ProductID = generateId(data);
  item.inEdit = false;

  data.unshift(item);

  return data;
};

export const getItems = () => {
  let data = [...sampleProducts];
  return data;
};

export const updateItem = (item, data) => {
  let index = data.findIndex((record) => record.ProductID === item.ProductID);
  data[index] = item;
  return data;
};

export const deleteItem = (item, source) => {
  let index = source.findIndex((record) => record.ProductID === item.ProductID);
  source.splice(index, 1);

  return source;
};

//calculate the weight to be equally distributed
export const calculateWeight = (data) => {
  let weight = 100 / data.length;

  weight = (Math.round(weight * 100) / 100).toFixed(2);
  return weight;
};

//find out if the logic for setting equal weight can be applied to the data set
export const checkEqualWeight = (data) => {
  //check if there is data
  if (data.length === 0) {
    return true;
  } else {
    //check if there is any weight value
    //if a value is found return false,
    //otherwise return true
    for (const [i, product] of data.entries()) {
      if (product.Weight !== undefined) {
        return false;
      } else {
        return true;
      }
    }
  }
};

export const resetWeight = (data, updated) => {
  let sum = 0;
  let weightLeft = 100;
  let equalWeight = 0;

  for (const [i, product] of data.entries()) {
    if (updated.includes(product.ProductID)) {
      //sum up the weight of the updated
      sum += product.Weight;
    }
  }
  weightLeft = weightLeft - sum;

  //avoid dividing by zero
  if (data.length === updated.length) return data;
  equalWeight = Math.round(weightLeft / (data.length - updated.length)).toFixed(
    2
  );

  for (const [i, product] of data.entries()) {
    if (updated.includes(product.ProductID)) {
      continue;
    } else {
      product.Weight = equalWeight;
    }
  }

  return data;
};
