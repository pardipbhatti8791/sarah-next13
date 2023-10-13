import axios from "axios";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL, URI } from "./service";
import { useStore } from "@/store/store";

export const authOptions: NextAuthOptions = {
  secret: "gpcoders123gpcoders",
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, _) {
        try {
          const response = await axios.post(BASE_URL + URI.auth.signin, {
            email: credentials!.email,
            password: credentials!.password,
          });
          const setToken = useStore.getState().setToken;
          const { data } = response;

          setToken(data.access_token);
          return {
            id: data.email,
            name: data.first_name + " " + data.last_name,
            email: data.email,
            username: data.email,
            token: data.access_token,
            ...data,
          };
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
      credentials: undefined,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
