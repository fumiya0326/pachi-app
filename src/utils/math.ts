/**
  * 平均μを求める
  * @param count 
  * @param probability 
  * @returns 
  */
export const average = (
  tryCount: number,
  probability: number,
) => {
  return tryCount * probability;
}

/**
 * 標準偏差
 * @param tryCount 
 * @param probability 
 */
export const standardDeviation = (
  tryCount: number,
  probability: number,
) => {
  return Math.sqrt((tryCount * probability) * (1 - probability))
}

/**
 * 偏差値
 * @param value 
 * @param tryCount 
 * @param probability 
 * @returns 
 */
export const deviationValue = (
  value: number,
  tryCount: number,
  probability: number,
) => {
  return ((value - average(tryCount, probability)) / standardDeviation(tryCount, probability)) * 10 + 50
}




