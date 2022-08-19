<script> 
    import { boxes, labels } from '../stores.js';
    import Bbox from './Bbox.svelte';
    
    function deleteBox(i) {
        $boxes.splice(i, 1);
        $boxes = $boxes;
    }
    </script>

<div class="px-4 py-6 sm:px-0">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-3 bg-white sm:p-3">
            <p class="text-lg font-semibold">Boxes</p>
            {#each $boxes as box, i}
            <div class="grid grid-cols-3 gap-4 text-gray-900 hover:bg-indigo-300 hover:text-white cursor-default py-2 {box.isActive ? 'bg-indigo-200 ' : ''}" >
                <div class="font-normal ml-3 block truncate">{i}</div>
                <div class=""> <span class=" rounded-md p-1 {$labels.find(x => x.id === box.labelId).color}">{$labels.find(x => x.id === box.labelId).title} </span></div>
                <div class="px-4 float-right" on:click={() => deleteBox(i)}>&times;</div>
            </div>
            {/each}
        </div>
    </div>
</div>
    
      