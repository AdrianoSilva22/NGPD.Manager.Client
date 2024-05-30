import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

require('dotenv').config()

const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      // Persista o id_token OAuth no token logo após o login
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Envie propriedades para o cliente, como o id_token de um provedor.
      session.id_token = token.id_token;
      return session;
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions };

