export interface Property {
  id: string;

  title: string;

  property_type: string | null;

  location: string | null;

  price: string | null;

  area: string | null;

  description: string | null;

  amenities: string[] | null;

  image_urls: string[] | null;

  status: string | null;

  slug: string | null;

  configuration: string | null;

  facing: string | null;

  total_floors: string | null;

  parking: string | null;

  bathrooms: string | null;

  balconies: string | null;

  possession: string | null;

  approvals: string | null;

  project_status: string | null;

  main_image: string | null;

  gallery_images: string[] | null;

  badge: string | null;

  category: string | null;

  is_featured: boolean | null;

  is_active: boolean | null;

  display_order: number | null;

  created_at: string | null;

  updated_at: string | null;
}