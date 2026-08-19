"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const CompareContext = createContext(null);
const STORAGE_KEY = 'compareList';
const MAX_ITEMS = 4;

export const CompareProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setItems(Array.isArray(stored) ? stored : []);
    } catch {
      setItems([]);
    }
  }, []);

  const persist = (next) => {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const toggle = (product) => {
    setItems(prev => {
      const exists = prev.some(i => i._id === product._id);
      let next;
      if (exists) {
        next = prev.filter(i => i._id !== product._id);
      } else {
        if (prev.length >= MAX_ITEMS) return prev;
        next = [...prev, product];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const remove = (id) => persist(items.filter(i => i._id !== id));
  const clear = () => persist([]);
  const isCompared = (id) => items.some(i => i._id === id);

  return (
    <CompareContext.Provider value={{ items, toggle, remove, clear, isCompared, max: MAX_ITEMS }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
};
