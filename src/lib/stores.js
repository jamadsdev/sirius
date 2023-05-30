import { writable } from 'svelte/store';

export const storeValue = writable(1);

export const storeCurrentUrl = writable(undefined);
