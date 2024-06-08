import { atom } from 'jotai';

export const globalStateAtomId = atom<string >('');
export const institutionClassIdAtom = atom<string | null>(null);