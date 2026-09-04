"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Admin(){
 const [properties,setProperties]=useState(0);
 const [enquiries,setEnquiries]=useState(0);
 const [visits,setVisits]=useState(0);
 const [title,setTitle]=useState(""); const [location,setLocation]=useState("");
 const router=useRouter();

 useEffect(()=>{(async()=>{
   const {data:{user}}=await supabase.auth.getUser();
   if(!user){router.push("/admin/login");return;}
   const [p,e,v]=await Promise.all([
    supabase.from("properties").select("*",{count:"exact",head:true}),
    supabase.from("enquiries").select("*",{count:"exact",head:true}),
    supabase.from("site_visits").select("*",{count:"exact",head:true})
   ]);
   setProperties(p.count||0);setEnquiries(e.count||0);setVisits(v.count||0);
 })()},[router]);

 async function addProperty(){
   if(!title) return;
   const {error}=await supabase.from("properties").insert({title,location,status:"Available"});
   if(error) alert(error.message); else {alert("Property added");setTitle("");setLocation("");setProperties(properties+1);}
 }
 return <main className="admin"><aside><h2>SKHP Admin</h2><a href="/">View Website</a><a>Dashboard</a><a>Properties</a><a>Enquiries</a><a>Site Visits</a></aside>
 <section><p className="eyebrow dark">ADMIN DASHBOARD</p><h1>Welcome, Admin</h1>
 <div className="dashboardCards"><div><b>{properties}</b><span>Total Properties</span></div><div><b>{enquiries}</b><span>Enquiries</span></div><div><b>{visits}</b><span>Site Visits</span></div></div>
 <div className="addBox"><h2>Add Property</h2><input placeholder="Property Name" value={title} onChange={e=>setTitle(e.target.value)}/><input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)}/><button className="btn gold" onClick={addProperty}>Add Property</button></div>
 </section></main>
}