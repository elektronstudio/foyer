import React, { useState, useEffect } from "react";
import { Math as M } from "three";

export const degToRad = M.degToRad;
export const radToDeg = M.radToDeg;

export const range = (from, to, step = 1) => {
  const length = Math.floor((to - from) / step) + 1;
  return Array.from({ length }).map((_, i) => from + i * step);
};

export const random = (from = 0, to = 1) => from + Math.random() * (to - from);

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const doFetch = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        if (!signal.aborted) {
          setResponse(json);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, []);
  return { response, error, loading };
};

export const pointsMidpoint = ([x1, y1], [x2, y2]) => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];

export const pointsAngle = ([x1, y1], [x2, y2]) => Math.atan2(y2 - y1, x2 - x1);

export const pointsDistance = ([x1, y1], [x2, y2]) =>
  Math.hypot(x2 - x1, y2 - y1);
