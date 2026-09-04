import SiteVisitForm from "../components/SiteVisitForm";

const properties = [
 {name:"Premium Open Plots",location:"Tirupati",type:"Open Plots"},
 {name:"Krishna Enclave",location:"Tirupati",type:"Residential"},
 {name:"Modern Villas",location:"Tirupati",type:"Villas"}
];

export default function Home(){
 return <main>
 <header className="nav"><div className="brand"><span>SK</span><div><b>SREE KRISHNA</b><small>HOUSING PROJECTS</small></div></div>
 <nav><a href="#about">About</a><a href="/properties">Properties</a><a href="#services">Services</a><a href="#contact">Contact</a></nav><a className="btn gold" href="#visit">Book Site Visit</a></header>
 <section className="hero"><div className="heroOverlay"><p className="eyebrow">TIRUPATI • REAL ESTATE • CONSTRUCTION</p><h1>Find a Place You’ll Love to Call <em>Home.</em></h1><p>Discover quality open plots, residential properties and construction opportunities with Sree Krishna Housing Projects.</p><div className="actions"><a className="btn gold" href="/properties">Explore Properties</a><a className="btn outline" href="#visit">Book a Site Visit</a></div></div></section>
 <section id="about" className="section split"><div><p className="eyebrow dark">ABOUT US</p><h2>Your Trusted Property Partner in Tirupati</h2><p>We help customers explore carefully selected property opportunities with a focus on transparency, quality and customer support.</p><div className="checks"><span>✓ Transparent Process</span><span>✓ Prime Locations</span><span>✓ Customer Support</span><span>✓ Investment Guidance</span></div></div><div className="stats"><div><b>10+</b><span>Years Experience</span></div><div><b>100+</b><span>Happy Customers</span></div><div><b>25+</b><span>Projects</span></div><div><b>100%</b><span>Commitment</span></div></div></section>
 <section className="section muted"><div className="sectionHead"><div><p className="eyebrow dark">FEATURED</p><h2>Explore Our Properties</h2></div><a href="/properties">View All →</a></div><div className="grid">{properties.map((p,i)=><article className="card" key={p.name}><div className={"propertyImage img"+i}></div><div className="cardBody"><span className="tag">{p.type}</span><h3>{p.name}</h3><p>📍 {p.location}</p><a href="/properties">View Details →</a></div></article>)}</div></section>
 <section id="services" className="section"><p className="eyebrow dark">WHAT WE DO</p><h2>Complete Real Estate Services</h2><div className="services">{["Open Plot Development","Residential Properties","Construction Services","Property Consultation"].map((x,i)=><div className="service" key={x}><b>0{i+1}</b><h3>{x}</h3><p>Professional support to help you make confident property decisions.</p></div>)}</div></section>
 <section id="visit" className="visit"><div><p className="eyebrow">BOOK A VISIT</p><h2>See Your Future Property in Person</h2><p>Submit your details and our team can contact you regarding a site visit.</p></div><SiteVisitForm/></section>
 <footer id="contact"><div className="brand"><span>SK</span><div><b>SREE KRISHNA</b><small>HOUSING PROJECTS</small></div></div><p>Trusted Real Estate & Construction Experts in Tirupati.</p><p>Business phone, WhatsApp, email and Google Map can be configured before launch.</p><small>© {new Date().getFullYear()} Sree Krishna Housing Projects</small></footer>
 </main>
}