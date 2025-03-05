import { defineStore } from 'pinia';
import { ethers } from 'ethers';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        allItems: [],
        newItem: '',
        filter: 'all',
        provider: null,
        signer: null,
        contract: null,
        account: null,
        isAddingTask: false
    }),
    getters: {
        todoItems: (state) => state.allItems.filter((task) => !task.checked),
        doneItems: (state) => state.allItems.filter((task) => task.checked),
        filteredItems(state) {
            switch (state.filter) {
                case 'notDone':
                    return state.todoItems;
                case 'done':
                    return state.doneItems;
                default:
                    return state.allItems;
            }
        }
    },
    actions: {
        async connectWallet() {
            if (!window.ethereum) {
                alert('MetaMask is required!');
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = await signer.getAddress();

                this.provider = provider;
                this.signer = signer;
                this.account = account;

                // ✅ Contract setup
                const contractAddress = '0x5dA4Ed23ABA289A5b4fb3dc2586D7c7dED69c0c9';
                const abi = [
                    'function addTask(string _content) public',
                    'function completeTask(uint _taskId) public',
                    'function removeTask(uint _taskId) public',
                    'function getTasks() public view returns (tuple(uint id, string content, bool completed)[])'
                ];
                this.contract = new ethers.Contract(contractAddress, abi, signer);

                console.log('Connected to contract:', this.contract);
                await this.fetchTodos();
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        },

        async fetchTodos() {
            if (!this.contract) {
                console.error('Contract not initialized.');
                return;
            }

            try {
                const tasks = await this.contract.getTasks();
                this.allItems = tasks.map((task) => ({
                    id: Number(task.id),
                    content: task.content,
                    checked: task.completed
                }));
                console.log('Fetched blockchain tasks:', this.allItems);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },

        async addTodo() {
            if (this.newItem.trim() === '' || this.isAddingTask) return;
            this.isAddingTask = true;

            try {
                const newTodo = {
                    id: Date.now(),
                    content: this.newItem,
                    checked: false
                };
                this.allItems.push(newTodo); // ✅ Keep local state updated

                if (this.contract) {
                    const tx = await this.contract.addTask(this.newItem);
                    await tx.wait();
                }
                this.newItem = '';
            } catch (error) {
                console.error('Error adding task:', error);
            } finally {
                this.isAddingTask = false;
            }
        },

        async updateCompleted(id) {
            if (!this.contract) return;

            try {
                const index = this.allItems.findIndex((task) => task.id === id);
                if (index === -1) return;

                this.allItems[index].checked = !this.allItems[index].checked;

                if (this.contract) {
                    await this.contract.completeTask(id);
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },

        async deleteItem(id) {
            if (!this.contract) return;

            try {
                this.allItems = this.allItems.filter((task) => task.id !== id);

                if (this.contract) {
                    await this.contract.removeTask(id);
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    }
});
