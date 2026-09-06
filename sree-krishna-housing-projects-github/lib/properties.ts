export type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  size: string;
  price: string;
  image: string;
  images: string[];
  status: string;

  description: string;

  configuration: string;
  area: string;
  facing: string;
  totalFloors: string;
  parking: string;
  bathrooms: string;
  balconies: string;
  possession: string;

  features: string[];
};

export const properties: Property[] = [
  {
    id: "1",

    name: "Premium Open Plots",

    location: "Tirupati Central",

    type: "Open Plots",

    size: "1500 Sq.ft",

    price: "₹ 12 Lakhs",

    status: "AVAILABLE",

    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",

      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Premium open plots located in a developing area of Tirupati. This property is suitable for residential construction and long-term investment. The location offers convenient access to important areas and essential facilities.",

    configuration: "Open Plot",

    area: "1500 Sq.ft",

    facing: "East / West",

    totalFloors: "N/A",

    parking: "Available",

    bathrooms: "N/A",

    balconies: "N/A",

    possession: "Immediate",

    features: [
      "Clear documentation",
      "Prime location",
      "Good investment opportunity",
      "Road connectivity",
      "Suitable for residential construction",
      "Developing neighbourhood",
    ],
  },

  {
    id: "2",

    name: "Krishna Enclave",

    location: "Renigunta",

    type: "Residential",

    size: "1200 Sq.ft",

    price: "₹ 18 Lakhs",

    status: "AVAILABLE",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",

      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Krishna Enclave is a residential property located in Renigunta. It is designed for comfortable living and offers a good opportunity for families and property investors.",

    configuration: "Residential",

    area: "1200 Sq.ft",

    facing: "East",

    totalFloors: "2 Floors",

    parking: "1 Covered",

    bathrooms: "2",

    balconies: "1",

    possession: "Immediate",

    features: [
      "Residential neighbourhood",
      "Good road connectivity",
      "Parking facility",
      "Family-friendly location",
      "Water facility",
      "Suitable for long-term investment",
    ],
  },

  {
    id: "3",

    name: "Modern Villas",

    location: "Chandragiri",

    type: "Villas",

    size: "2000 Sq.ft",

    price: "₹ 45 Lakhs",

    status: "READY TO MOVE",

    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",

      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Modern villas designed for comfortable family living. The property offers spacious interiors and a peaceful residential environment near Chandragiri.",

    configuration: "Villa",

    area: "2000 Sq.ft",

    facing: "East",

    totalFloors: "2 Floors",

    parking: "2 Covered",

    bathrooms: "3",

    balconies: "2",

    possession: "Immediate",

    features: [
      "Modern architecture",
      "Spacious living area",
      "Covered parking",
      "Peaceful location",
      "Good road access",
      "Ready to move",
    ],
  },

  {
    id: "4",

    name: "Residential Plots",

    location: "Gajulamandyam",

    type: "Open Plots",

    size: "1800 Sq.ft",

    price: "₹ 15 Lakhs",

    status: "NEW LAUNCH",

    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1600&q=80",

      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Residential plots in Gajulamandyam suitable for building your future home or making a long-term property investment.",

    configuration: "Open Plot",

    area: "1800 Sq.ft",

    facing: "East / West",

    totalFloors: "N/A",

    parking: "Available",

    bathrooms: "N/A",

    balconies: "N/A",

    possession: "Immediate",

    features: [
      "New development",
      "Residential layout",
      "Good connectivity",
      "Investment opportunity",
      "Clear access roads",
      "Suitable for construction",
    ],
  },

  {
    id: "5",

    name: "Commercial Property",

    location: "Tirupati Central",

    type: "Commercial",

    size: "2500 Sq.ft",

    price: "₹ 60 Lakhs",

    status: "UNDER CONSTRUCTION",

    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",

      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "Commercial property located in a prime area of Tirupati. Suitable for office space, business operations and commercial investment.",

    configuration: "Commercial Space",

    area: "2500 Sq.ft",

    facing: "Main Road Facing",

    totalFloors: "5 Floors",

    parking: "2 Covered",

    bathrooms: "3",

    balconies: "N/A",

    possession: "Under Construction",

    features: [
      "Prime commercial location",
      "Main road access",
      "Parking facility",
      "Suitable for offices",
      "Commercial investment opportunity",
      "Good accessibility",
    ],
  },

  {
    id: "6",

    name: "New Project",

    location: "Renigunta",

    type: "Residential",

    size: "1400 Sq.ft",

    price: "₹ 20 Lakhs",

    status: "AVAILABLE",

    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",

      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",

      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80",
    ],

    description:
      "A new residential project located in Renigunta with convenient access and good potential for future appreciation.",

    configuration: "Residential",

    area: "1400 Sq.ft",

    facing: "East",

    totalFloors: "2 Floors",

    parking: "1 Covered",

    bathrooms: "2",

    balconies: "1",

    possession: "Upcoming",

    features: [
      "New residential project",
      "Good connectivity",
      "Family-friendly location",
      "Parking facility",
      "Modern planning",
      "Investment opportunity",
    ],
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}