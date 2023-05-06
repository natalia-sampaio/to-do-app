import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todos: [],
      newItem: '',
      completedItems: []
    }
  },
  getters: {
    todoLength: (state) => state.todos.length,
    completedLength: (state) => state.completedItems.length,
    numberOfUncheckedItems()  {
      return this.todoLength - this.completedLength
    }

  },
  actions: {
    addTodo() {
      if(this.newItem != '') {
        this.todos.push({id: this.todoLength +1, content: this.newItem});
      }
      this.newItem = '';
    },
    updateCompleted(id) {
      const existingItem = this.completedItems.find(element => element.id === id);

      if(existingItem) {
        this.completedItems.splice(this.completedItems.findIndex(element => element.id === id), 1);
        return;
      }

      this.completedItems.push({id: id});

    }, 
    clearCompleted() {
      const itemsToBeRemoved = this.completedItems.forEach(item => this.todos.find(element => element.id === item.id));

      this.todos.splice(this.todos.findIndex(element => element.id === itemsToBeRemoved.id), 1);
    }
    
  }
})
