<script> 
import { files, activeFile } from '../stores.js';

let activeFilelocal = $files.filter(item => item.isactive == true)[0];

function activateFile(file) {
    const newArr = $files.map(item => {
        if (item.id == activeFilelocal.id) {
            return {...item, isactive: false};
        }
        if (item.id == file.id) {
            return {...item, isactive: true};
        }

        return item;
    });
    
    $files = newArr;
    activeFilelocal = file;
    $activeFile = activeFilelocal.src;
}

</script>
<div class="px-4 py-6 sm:px-0">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-3 bg-white sm:p-3">
            <p class="text-lg font-semibold">Files</p>
            {#each $files as file}
            <ul class="sm:text-sm">
                <li class="text-gray-900 hover:bg-indigo-500 hover:text-white cursor-default py-2 {file.isactive ? 'bg-indigo-200 ' : ''}" 
                    id="listbox-option-0" 
                    role="option"
                    on:click={() => activateFile(file)}>
                    <div class="flex items-center">
                        <span class="font-normal ml-3 block truncate">{file.src}</span>
                    </div>
                </li>
            </ul>
            {/each}
        </div>
    </div>
</div>

  