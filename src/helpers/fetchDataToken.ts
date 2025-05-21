import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export const getDataToken = (request: NextRequest) => {
    try {
        const accessToken = request.cookies.get("accessToken")?.value
        const decodedToken: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        return decodedToken.id
    } catch (error) {
        throw new Error(error.message)
    }
}