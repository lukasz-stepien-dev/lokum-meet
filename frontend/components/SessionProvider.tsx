'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function ({children}: {children: ReactNode}) {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}