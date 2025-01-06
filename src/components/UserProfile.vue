<script setup>
import { useUserStore } from '../stores/user';
import { getAuth, deleteUser } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, email } from '@vuelidate/validators';

const userStore = useUserStore();

const formData = reactive({
    name: '',
    email: ''
});

const rules = computed(() => {
    return {
        name: {
            minLength: minLength(3)
        },
        email: {
            email
        }
    };
});

const v$ = useVuelidate(rules, formData);

const updateUsername = async () => {
    const result = await v$.value.$validate();
    if (result) {
        userStore.$patch({
            name: formData.name
        });
        userStore.updateUsername();
    } else {
        animateButton();
    }
};

const user = getAuth().currentUser;
const router = useRouter();

const deleteAccount = () => {
    deleteUser(user)
        .then(() => {
            alert('Success! This account was deleted');
            router.push('/');
        })
        .catch((error) => {
            alert(error.message);
        });
};

const warn = ref(false);

const animateButton = () => {
    warn.value = true;
    setTimeout(() => {
        warn.value = false;
    }, 1500);
};

onMounted(() => {
    if (user) {
        userStore.isLoggedIn = true;
        userStore.uid = user.uid;
        userStore.getUserInformation;
    }
});

const profilePic = ref(null);
const setFile = (event) => {
    profilePic.value = event.target.files[0];
};
</script>

<template>
    <div class="mx-8 xl:mx-48">
        <h2 v-if="userStore.name != ''" class="text-2xl">
            Welcome,
            <span class="font-normal">{{ userStore.name }}</span
            >.
        </h2>
        <div
            class="font-normal my-10 lg:m-10 border border-blue-very-dark rounded-tl-xl rounded-br-xl p-5 grid grid-rows-3 items-center w-full lg:w-1/2"
        >
            <h3 class="text-xl pb-2 border-b-2 mb-2">This is your profile information:</h3>
            <span
                v-if="userStore.name != ''"
                class="flex justify-between items-center border-b mb-1"
                >Name: {{ userStore.name }} <IconEditPencil @click="userStore.name = ''"
            /></span>
            <FormItem v-else>
                <template #label>Name</template>
                <template
                    #error
                    v-for="error in v$.name.$errors"
                    :key="error.$uid"
                    class="text-red-600"
                    >{{ error.$message }}</template
                >
                <div class="flex items-center relative">
                    <BaseInput
                        type="text"
                        placeholder="e.g. Casimiro Silva"
                        aria-label="name input"
                        v-model="formData.name"
                        class="w-full"
                    />
                    <IconRefresh @click="updateUsername()" class="absolute right-2" />
                </div>
            </FormItem>
            <span v-if="userStore.email != ''" class="flex justify-between items-center"
                >E-mail: {{ userStore.email }}</span
            >
            <FormItem v-else>
                <template #label>E-mail</template>
                <template
                    #error
                    v-for="error in v$.email.$errors"
                    :key="error.$uid"
                    class="text-red-600"
                    >{{ error.$message }}</template
                >
                <BaseInput
                    type="text"
                    placeholder="e.g. casimiro.silva@email.com"
                    aria-label="email input"
                    v-model="formData.email"
                />
            </FormItem>
            <Button @click="deleteAccount()" name="Delete account" class="mt-10">
                <IconClose :fill="'#fff'" />
            </Button>
        </div>
    </div>
</template>
