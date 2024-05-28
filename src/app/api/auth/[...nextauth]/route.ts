import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import EmailProvider from 'next-auth/providers/email';

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }),
  secret: process.env.NEXTAUTH_SECRET,
});
