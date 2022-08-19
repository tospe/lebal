<script>
  import Bbox from './components/Bbox.svelte';
  import Files from './components/Files.svelte'
  import BoxesList from './components/BoxesList.svelte'
  import Labels from './components/Labels.svelte'
  import Counter from './lib/Counter.svelte'
  import { files, activeFile } from './stores.js';


</script>

<main>
  <div class="min-h-full">

  
    <header class="bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl tracking-tight font-bold text-white">LebaL</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        <div class="md:grid md:grid-cols-4 md:gap-6">

          <div class="md:col-span-3">
            <!-- Replace with your content -->
            <div class="px-4 py-6 sm:px-0">
              <div class="border-4 border-dashed border-gray-200 rounded-lg h-100">
                <Bbox />
              </div>
              
            </div>
            <!-- /End replace -->
          </div>
        
          <div class="md:col-span-1">
            <BoxesList />
            <Labels />
            <Files />
            <!-- /End replace -->
          </div>

        </div>
      </div>
    </main>
    
  </div>
</main>