import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
export const authConfig:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId:"364281981935-j7jra9t72kiaml3mtcpkip3jdd6vko8n.apps.googleusercontent.com",
            clientSecret:"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",
        })
    ]
}
