import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { db } from '../main';
import { useUserStore } from './user';

export const useTodoStore = defineStore('todo', {
    state: () => {
        return {
            todos: [],
            allItems: [],
            activeItems: [],
            completedItems: [],
            newItem: '',
            filter: 'all'
        };
    },
    getters: {
        todoLength: (state) => state.allItems.length,
        completedLength: (state) => state.completedItems.length,
        numberOfUncheckedItems() {
            return this.todoLength - this.completedLength;
        },
        isLoggedIn() {
            return useUserStore().isLoggedIn;
        },
        uid() {
            return useUserStore().uid;
        }
    },
    actions: {
        async fetchUserTodoList() {
            if (this.isLoggedIn || this.uid) {
                await this.fetchFromFirestore();
            } else {
                this.fetchFromLocalStorage();
            }
        },
        async fetchFromFirestore() {
            try {
                const docRef = doc(db, this.uid, 'todo-list');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const { items } = docSnap.data();
                    if (items && Array.isArray(items)) {
                        this.allItems = items;
                        this.activeItems = items.filter((item) => !item.checked);
                        this.completedItems = items.filter((item) => item.checked);
                        this.todos = [...this.allItems];
                    }
                } else {
                    this.todos = [];
                    this.allItems = [];
                    this.activeItems = [];
                    this.completedItems = [];
                }
            } catch (error) {
                console.error('Error fetching user todo list:', error);
            }
        },
        fetchFromLocalStorage() {
            const items = JSON.parse(localStorage.getItem('todo-list') || '[]');
            this.updateLocalState(items);
        },
        updateLocalState(items) {
            this.allItems = items;
            this.activeItems = items.filter((item) => !item.checked);
            this.completedItems = items.filter((item) => item.checked);
            this.todos = [...this.allItems];
        },
        async addTodo() {
            if (this.newItem.trim() === '') return;

            const newTodo = {
                id: Date.now(),
                content: this.newItem,
                checked: false
            };

            this.allItems.push(newTodo);
            this.activeItems.push(newTodo);
            this.todos = [...this.allItems];

            if (this.isLoggedIn && this.uid) {
                await this.addToFirestore(newTodo);
            } else {
                this.saveToLocalStorage();
            }

            this.newItem = '';
        },
        async updateCompleted(id) {
            try {
                const itemIndex = this.allItems.findIndex((item) => item.id === id);
                if (itemIndex === -1) return;

                const item = this.allItems[itemIndex];
                item.checked = !item.checked;

                if (item.checked) {
                    this.completedItems.push(item);
                    this.activeItems = this.activeItems.filter((i) => i.id !== id);
                } else {
                    this.activeItems.push(item);
                    this.completedItems = this.completedItems.filter((i) => i.id !== id);
                }

                await this.updateFirestore(this.allItems);

                this.todos = [...this.allItems];
            } catch (error) {
                console.error('Error updating completed status:', error);
            }
        },
        async clearCompleted() {
            try {
                this.allItems = this.allItems.filter((item) => !item.checked);
                this.completedItems = [];
                this.activeItems = this.allItems.filter((item) => !item.checked);

                await this.updateFirestore(this.allItems);

                this.todos = [...this.allItems];
            } catch (error) {
                console.error('Error clearing completed items:', error);
            }
        },
        async addToFirestore(newTodo) {
            try {
                const docRef = doc(db, this.uid, 'todo-list');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    await updateDoc(docRef, {
                        items: arrayUnion(newTodo)
                    });
                } else {
                    await setDoc(docRef, {
                        items: [newTodo]
                    });
                }
            } catch (error) {
                console.error('Error adding to Firestore:', error);
            }
        },
        async updateFirestore(items) {
            try {
                const docRef = doc(db, this.uid, 'todo-list');
                await updateDoc(docRef, { items });
            } catch (error) {
                console.error('Error updating Firestore:', error);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('todo-list', JSON.stringify(this.allItems));
        },
        resetStore() {
            const storedItems = JSON.parse(localStorage.getItem('todo-list') || 'null');
            if (storedItems && Array.isArray(storedItems)) {
                this.updateLocalState(storedItems);
            } else {
                this.todos = [];
                this.allItems = [];
                this.activeItems = [];
                this.completedItems = [];
                this.newItem = '';
                this.filter = 'all';
            }
        }
    }
});
