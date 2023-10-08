import {defineStore} from "pinia";
import {url} from "~/common/constants/api";
import {sessionResponseSchema} from "~/common/models/session-response";
import {logoutResponseSchema} from "~/common/models/logout-response";

type User = {
    id: string
    name: string
    isAdmin: boolean
}

export const useUser = defineStore('user', () => {
    const user = ref<User | null>(null)
    const router = useRouter();

    async function fetchUser() {
        return useAsyncData('session', async () => {
            try {
                const response = await $fetch(url('/auth/session'), {
                    method: 'get',
                    credentials: "include",
                });

                const data = sessionResponseSchema.parse(response)

                if (!data.success) {
                    return
                }

                user.value = data.data;
            } catch {}
        }, {
            server: false,
            lazy: true,
        });
    }

    async function logout() {
        return useAsyncData('logout', async () => {
            const response = await $fetch(url('/auth/logout'), {
                method: 'get',
                credentials: "include",
            })
            const data = logoutResponseSchema.parse(response);
            if(data?.success) {
                user.value = null;
                await router.push('/');
            }
        });
    }

    return {
        user,
        fetchUser,
        logout,
    }
})