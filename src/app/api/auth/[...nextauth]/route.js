import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: 'admin123',
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const {username, password} = credentials;

                const user = {
                    id: 1,
                    name: 'Admin',
                    username: 'admin1234',
                    role: 'admin',
                };

                if (username === "admin123" && password === "12345678") {
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (account?.provider === "credentials") {
                token.username = user.username;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if ("username" in token) {
                session.user.username = token.username;
            }

            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }

            if ("role" in token) {
                session.user.role = token.role;
            }

            return session;
        }
    },
    pages: {
        signIn: '/auth',
        error: '/auth',
    }
};

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}