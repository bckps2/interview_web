"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  if(isAuthenticated){
    return (<p>Authenticated</p>);
  }else{
    return (<p>NO Authenticated</p>);
  }
}
