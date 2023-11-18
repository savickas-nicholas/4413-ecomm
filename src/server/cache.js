
import NodeCache from 'node-cache';

let cache = null;

export const getCache = () => {
  return cache;
}

export const setCache = (c) => {
  cache = c;
}

export const resetCache = (cache) => {
  cache = new NodeCache();
  return cache;
}

export default cache;