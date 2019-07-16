/*

  이 파일은 절대 수정하지 마세요!

 */


/**
 * A collection of `async` utility functions.
 * @module Utils
 */

import each from './01_each'
import every from './02_every'
import filter from './03_filter'
import some from './04_some'
import map from './05_map'
import reduce from './06_reduce'
import memoize from './07_memoize'
import groupBy from './08_groupBy'
import series from './09_series'
import parallel from './10_parallel'
import waterfall from './11_waterfall'
import detect from './12_detect'
import whilst from './13_whilst'
import forever from './14_forever'
import times from './15_times'

export default {
    detect: detect,
    each: each,
    every: every,
    filter: filter,
    forever: forever,
    groupBy: groupBy,
    map: map,
    memoize: memoize,
    parallel: parallel,
    reduce: reduce,
    series: series,
    some: some,
    times: times,
    waterfall: waterfall,
    whilst: whilst,

    // aliases
    all: every,
    any: some,
    forEach: each,
    inject: reduce,
    foldl: reduce,
    select: filter,
};

export {
    detect as detect,
    each as each,
    every as every,
    filter as filter,
    forever as forever,
    groupBy as groupBy,
    map as map,
    memoize as memoize,
    parallel as parallel,
    reduce as reduce,
    series as series,
    some as some,
    times as times,
    waterfall as waterfall,
    whilst as whilst,

    // Aliases
    every as all,
    some as any,
    each as forEach,
    reduce as inject,
    reduce as foldl,
    filter as select,
};

