import { sign } from 'jsonwebtoken'

export const createAccessToken = (email: string) => {
    return sign({emailId: email}, "gyiyuijkiyiyshdkh", {
        expiresIn: "30d"
    })
}