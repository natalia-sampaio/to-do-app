import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todos: [],
      newItem: ''
    }
  },
  getters: {
    todoLength(state) {state.todos.length}
  },
  actions: {
    addTodo() {
      this.todos.push({id: this.todoLength +1, content: this.newItem})
    }
  }
})
