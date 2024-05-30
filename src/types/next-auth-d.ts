import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            email: string;
            image: string;
            name: string;
        };
        expires: string;
        id_token: string;
    }
}
