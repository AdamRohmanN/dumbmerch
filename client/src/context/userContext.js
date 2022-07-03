import { createContext, useReducer } from 'react'

export const UserContext = createContext()

const initialState = { //nilai awal
    isLogin: false,
    user: {}
}

const reducer = (state, action) => { //mengurus perubahan data
    const { type, payload } = action //data didalam payload

    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token) //menyetel token ke header browser
            return {
                isLogin: true,
                user: payload
            }
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token') //menghapus token yang tersimpan di header browser
            return {
                isLogin: false,
                user: {}
            }
        default:
            throw new Error()
    }
}

export const UserContextProvider = ({ children }) => { //memberikan konteks pada semua komponen yang dibungkus
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}