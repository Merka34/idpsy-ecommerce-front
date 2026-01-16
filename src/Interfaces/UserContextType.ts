export interface UserContextType {
    userInfo: any,
    setUserInfo: React.Dispatch<React.SetStateAction<{}>>,
    loading: boolean,
    checkSession: any,
    getUserId: any,
    isAuthenticated: boolean,

}