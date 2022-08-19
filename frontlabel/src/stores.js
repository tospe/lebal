import { writable } from 'svelte/store';

export const files = writable([
    {
        id: 1,
        src: './images/frutas.jpg',
        isactive: true,
      },
      {
        id: 2,
        src: './images/veg.jpg',
        isactive: false,
      }
]);


export const  labels = writable([
  {
    id: 1,
    color: "bg-orange-200",
    title: 'Exemplo',
    editing: false,
  }
]);

export const boxes = writable([
  { id: 0, x1: 68, y1: 200, x2: 203, y2:400, color: "DeepSkyBlue", lineWidth: 1, isActive: false, labelId: 1 }
]);


export const activeFile = writable('./images/frutas.jpg');

export const labelColors = [
    "bg-teal-200", "bg-red-200", "bg-orange-200", "bg-amber-200","bg-yellow-500", "bg-lime-200", "bg-tealgreen-400", 
    "bg-emerald-200", "bg-cyan-200","bg-sky-400", "bg-blue-400", "bg-violet-400", "bg-purple-400", "bg-fuschia-400",
    "bg-pink-400", "bg-rose-400"];