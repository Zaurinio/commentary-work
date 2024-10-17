import { ref } from 'vue'
import { defineStore } from "pinia";
import axiosApiInstance from '../api'

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE

export const useAuthStore = defineStore('auth', () => {
    const userInfo = ref({
        token: '',
        email: '',
        userId: '',
        refreshToken: '',
        expiresIn: ''
    })

    const auth = async (payload, type) => {
        const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';

        try {
            let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`, {
                ...payload,
                returnSecureToken: true
            })
            userInfo.value = {
                token: response.data.idToken,
                email: response.data.email,
                userId: response.data.localId,
                refreshToken: response.data.refreshToken,
                expiresIn: response.data.expiresIn,
            }
            localStorage.setItem('userTokens', JSON.stringify({ token: userInfo.value.token, refreshToken: userInfo.value.refreshToken, expiresIn: userInfo.value.expiresIn }))
        } catch (err) {
            console.log(err.response)
            throw error.value
        }
    }

    return { auth, userInfo }
})