import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todos: [],
      allItems: [],
      activeItems: [],
      completedItems: [],
      newItem: '',
      filter: 'all'
    }
  },
  getters: {
    todoLength: (state) => state.allItems.length,
    completedLength: (state) => state.completedItems.length,
    numberOfUncheckedItems()  {
      return this.todoLength - this.completedLength
    }

  },
  actions: {
    addTodo() {
      if(this.newItem != '') {
        this.allItems.push(
          {
            id: this.todoLength +1, 
            content: this.newItem,
            checked: false
          }
        );
        this.activeItems.push(
          {
            id: this.todoLength + 1,
            content: this.newItem,
            checked: false
          }
        );
      }
      this.newItem = '';
    },
    updateCompleted(id) {
      const existingItem = this.completedItems.find(element => element.id === id);

      if(existingItem) {
        this.completedItems.splice(this.completedItems.findIndex(element => element.id === id), 1);
        this.activeItems.push(existingItem);
        existingItem.checked = false;
        return;
      }

      this.completedItems.push(this.todos.find(element => element.id === id));
      this.todos.find(element => element.id === id).checked = true;
      this.activeItems = this.allItems.filter((element) => !this.completedItems.includes(element));
    },
    clearCompleted() {
      this.allItems = this.allItems.filter((element) => !this.completedItems.includes(element));
      this.todos = this.allItems;
      this.completedItems = [];
    },
    showAll() {
      this.todos = this.allItems;
    },
    showActive() {
      this.todos = this.activeItems;
    },
    showCompleted() {
      this.todos = this.completedItems;
    }
  }
})
