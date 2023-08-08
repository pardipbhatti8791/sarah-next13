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
          const response = await axios.post(BASE_URL + URI.auth, {
            email: credentials!.email,
            password: credentials!.password,
          });
          const setToken = useStore.getState().setToken;
          const { data } = response;

          setToken(data.access_token);
          return {
            id: data.user.email,
            name: data.user.first_name + " " + data.user.last_name,
            email: data.user.email,
            username: data.user.email,
            token: data.access_token,
          };
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
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
