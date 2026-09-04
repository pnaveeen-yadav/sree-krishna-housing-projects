"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
 const [message,setMessage]=useState(""); const router=useRouter();
 async function login(){
   const {error}=await supabase.auth.signInWithPassword({email,password});
   if(error) setMessage(error.message); else router.push("/admin");
 }
 return <main className="loginPage"><div className="loginBox"><p className="eyebrow dark">ADMIN ACCESS</p><h1>SKHP Admin Login</h1>
 <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
 <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
 <button className="btn gold" onClick={login}>Login</button><p>{message}</p></div></main>
}