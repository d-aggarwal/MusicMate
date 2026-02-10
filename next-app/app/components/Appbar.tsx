"use client";
import { signIn, useSession, signOut } from "next-auth/react";

export function Appbar() {

  const session = useSession();
  return (
    <div>
      <div className ="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div>
          MusicMate
        </div>
        <div>
          {session.data?.user && <button className = "px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={() => signOut()}>Signout</button>}
            {!session.data?.user && 
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={() => signIn()}>Signin</button>}
        </div>
      </div>
        
    </div>
  );
}