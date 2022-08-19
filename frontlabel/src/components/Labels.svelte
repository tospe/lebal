<script>
  import { fly } from 'svelte/transition';
  import { labelColors, labels } from '../stores.js';
  let beforeEditCache = '';
  let tempId = 2
  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;

  let newTodoTitle = '';

	function addTodo(event) {
		if (event.key === 'Enter') {
			// $labels = [...$labels, {
      //   id: tempId,
      //   completed: false,
      //   title: newTodo
      // }];

			$labels.push({
				id: tempId,
        color:labelColors[~~(Math.random() * labelColors.length)],
				title: newTodoTitle,
				editing: false
			})

			$labels = $labels;
			tempId = tempId + 1;
			newTodoTitle = '';
		}
	}
	
	function editTodo(todo) {
    beforeEditCache = todo.title;
		todo.editing = true;
		$labels = $labels;
	}

	function doneEdit(todo) {
		if (todo.title.trim() === '') {
      todo.title = beforeEditCache
    }
    todo.editing = false;
    $labels = $labels;
	}

	function doneEditKeydown(todo, event) {
		if (event.key === 'Enter') {
      doneEdit(todo);
    }

    if (event.key === 'Escape') {
      todo.title = beforeEditCache;
      todo.editing = false;
      $labels = $labels;
    }
	}

	function deleteTodo(id) {
		$labels = $labels.filter(todo => todo.id !== id);
	}
</script>

<div class="px-4 py-6 sm:px-0">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="px-4 py-1 bg-white space-y-1 sm:p-3">
        <div class="grid grid-cols-3 gap-6">
          <div id="filter-section-mobile-0">
            <div class="py-3">
              <p class="text-lg font-semibold">Labels</p>
              <input type="text" class="border-solid border-2 border-indigo-200 rounded-md" placeholder="Add Label" bind:value={newTodoTitle} on:keydown={addTodo}>
            </div>
            <div class="space-y-1">
              
              {#each $labels as todo}
                <div class="flex row items-center">
                  <div class="p-0" transition:fly="{{ y: 20, duration: 300 }}">
                    {#if !todo.editing}
                      <div class="items-center column {todo.color} rounded-md p-1" class:completed={todo.completed} on:dblclick={() => editTodo(todo)}>{todo.title}</div>
                    {:else}
                      <input class=" " bind:value={todo.title} type="text" on:blur={() => doneEdit(todo)} on:keydown={() => doneEditKeydown(todo, event)} autofocus>
                    {/if}
                  </div>
                  <div class="items-center row-reverse">
                    <span class="px-4 float-right" on:click={() => deleteTodo(todo.id)}>
                      &times;
                    </span>
                  </div>
                </div>
              {/each}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>