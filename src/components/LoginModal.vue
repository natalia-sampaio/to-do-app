<script setup>
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';

defineProps({ dark: Boolean })

const formData = reactive({
    email: "",
    password: ""
});

const rules = computed(() => {
    return {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    }
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    const result = await v$.value.$validate();
    if (result) {
        //handle login with firebase
        alert('you will be able to login soon :)')
        return
    }
    console.log('error')
}

const googleSignIn = () => {
    alert('you will be able to login with a google account soon :)')
}
</script>

<template>
    <label for="my-modal" class="btn ml-4" :data-theme="dark ? 'dark' : 'aqua'">login</label>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle" :data-theme="dark ? 'dark' : 'aqua'">
        <div class="modal-box">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input v-model="formData.email" type="text" placeholder="Type here" class="input input-bordered w-full" aria-label="name input" />
                <label class="label text-red-600" v-for="error in v$.email.$errors" :key="error.$uid">
                    {{ error.$message }}
                </label>
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input v-model="formData.password" type="password" placeholder="Type here" class="input input-bordered w-full" aria-label="password input" />
                <label class="label text-red-600" v-for="error in v$.password.$errors" :key="error.$uid">
                    {{ error.$message }}
                </label>
            </div>
            <div class="modal-action justify-between">
                <label for="my-modal" class="btn" @click="googleSignIn">Sign in with Google</label>
                <label class="btn" @click="submitForm">Sign in with email</label>
            </div>
        </div>
    </div>
</template>