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
    addCompleted(id) {
      this.completedItems.push(id)
    },
    clearCompleted(id) {
      const itemToBeDeleted = this.todos.findIndex(element => element.id === id);

      const existingItem = this.todos.find(element => element.id === id);

      if(existingItem){
        this.todos.splice(itemToBeDeleted, 1);
      }
    }
  }
})
