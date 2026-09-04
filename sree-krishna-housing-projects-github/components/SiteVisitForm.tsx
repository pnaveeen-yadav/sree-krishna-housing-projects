"use client";
import { useState } from "react";

export default function SiteVisitForm() {
 const [form,setForm]=useState({name:"",phone:"",preferredDate:"",preferredTime:""});
 const [message,setMessage]=useState("");
 async function submit(e:React.FormEvent){
  e.preventDefault(); setMessage("Submitting...");
  const res=await fetch("/api/site-visit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
  setMessage(res.ok ? "Thank you! We will contact you shortly." : "Unable to submit. Please try again.");
  if(res.ok) setForm({name:"",phone:"",preferredDate:"",preferredTime:""});
 }
 return <form onSubmit={submit}>
  <input required placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
  <input required placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
  <input required type="date" value={form.preferredDate} onChange={e=>setForm({...form,preferredDate:e.target.value})}/>
  <input placeholder="Preferred Time" value={form.preferredTime} onChange={e=>setForm({...form,preferredTime:e.target.value})}/>
  <button className="btn gold" type="submit">Request Site Visit</button>
  <p className="formMessage">{message}</p>
 </form>
}