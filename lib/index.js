/*

  이 파일은 절대 수정하지 마세요!

 */

/**
 * A collection of `async` utility functions.
 * @module Utils
 */

import each from "./01_each";
import every from "./02_every";
import filter from "./03_filter";
import some from "./04_some";
import map from "./05_map";
import reduce from "./06_reduce";
import memoize from "./07_memoize";
import groupBy from "./08_groupBy";
import series from "./09_series";
import detect from "./10_detect";
import whilst from "./11_whilst";
import forever from "./12_forever";
import times from "./13_times";
import promisify from "./14_promisify";
import promiseReduce from "./15_promise_reduce";

export default {
  detect: detect,
  each: each,
  every: every,
  filter: filter,
  forever: forever,
  groupBy: groupBy,
  map: map,
  memoize: memoize,
  reduce: reduce,
  series: series,
  some: some,
  times: times,
  whilst: whilst,
  promisify: promisify,
  promiseReduce: promiseReduce
};

export {
  detect,
  each,
  every,
  filter,
  forever,
  groupBy,
  map,
  memoize,
  reduce,
  series,
  some,
  times,
  whilst,
  promisify,
  promiseReduce
};
