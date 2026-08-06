-- Codifikai · esquema del panel admin del blog (Supabase)
-- Ejecutar una sola vez en el SQL Editor del proyecto de Supabase.

create extension if not exists "pgcrypto";

create table if not exists blog_topics (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  city text not null,
  department text not null check (department in ('Cundinamarca', 'Boyacá')),
  keyword text not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'en_uso', 'publicado')),
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null default '',
  description text not null default '',
  content text not null default '',
  city text not null default '',
  department text not null default 'Cundinamarca' check (department in ('Cundinamarca', 'Boyacá')),
  keyword text not null default '',
  keywords text[] not null default '{}',
  author text not null default 'Equipo Codifikai',
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  topic_id uuid references blog_topics(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists blog_posts_status_idx on blog_posts (status);
create index if not exists blog_posts_updated_at_idx on blog_posts (updated_at desc);

alter table blog_topics enable row level security;
alter table blog_posts enable row level security;

-- Panel de un solo usuario: cualquier cuenta autenticada (creada a mano en
-- Supabase Auth para el dueño del sitio) tiene acceso total de lectura/escritura.
create policy "authenticated full access on topics"
  on blog_topics for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "authenticated full access on posts"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- El blog público lee directamente de Supabase (sin esto, un visitante
-- anónimo no puede ver ningún post aunque esté publicado: la policy de
-- arriba solo cubre al admin autenticado).
drop policy if exists "public read published posts" on blog_posts;
create policy "public read published posts"
  on blog_posts for select
  using (status = 'published');

-- Seed: banco de temas migrado de content/blog/TOPICS.md
insert into blog_topics (topic, city, department, keyword, status) values
  ('Automatización con IA para pymes', 'Chía y Zipaquirá', 'Cundinamarca', 'automatización IA Chía', 'publicado'),
  ('Transformación digital en el corredor industrial', 'Tunja, Duitama y Sogamoso', 'Boyacá', 'transformación digital Boyacá', 'publicado'),
  ('Atención al cliente con IA, guía práctica', 'Cundinamarca (general)', 'Cundinamarca', 'atención al cliente IA Cundinamarca', 'publicado'),
  ('Cómo elegir un desarrollador de software a medida en Soacha', 'Soacha, Cundinamarca', 'Cundinamarca', 'desarrollo de software Soacha', 'pendiente'),
  ('SEO local para negocios en Facatativá: guía paso a paso', 'Facatativá, Cundinamarca', 'Cundinamarca', 'SEO local Facatativá', 'pendiente'),
  ('Automatización de inventario para comercios de Fusagasugá', 'Fusagasugá, Cundinamarca', 'Cundinamarca', 'automatización inventario Fusagasugá', 'pendiente'),
  ('IA para el sector agroindustrial en Girardot y el Alto Magdalena', 'Girardot, Cundinamarca', 'Cundinamarca', 'inteligencia artificial agroindustria Cundinamarca', 'pendiente'),
  ('Por qué tu empresa en Cajicá necesita un sistema de ventas, no solo una página web', 'Cajicá, Cundinamarca', 'Cundinamarca', 'sistema de ventas Cajicá', 'pendiente'),
  ('Automatización para logística y transporte en Mosquera y Funza', 'Mosquera y Funza, Cundinamarca', 'Cundinamarca', 'automatización logística Cundinamarca', 'pendiente'),
  ('Cómo digitalizar un negocio familiar en Madrid, Cundinamarca sin arriesgar la operación', 'Madrid, Cundinamarca', 'Cundinamarca', 'digitalización pymes Madrid Cundinamarca', 'pendiente'),
  ('Marketing digital con IA para negocios turísticos de Villa de Leyva', 'Villa de Leyva, Boyacá', 'Boyacá', 'marketing digital Villa de Leyva', 'pendiente'),
  ('Software a medida para empresas manufactureras de Duitama', 'Duitama, Boyacá', 'Boyacá', 'software a medida Duitama', 'pendiente'),
  ('Automatización de cotizaciones para el sector siderúrgico en Sogamoso', 'Sogamoso, Boyacá', 'Boyacá', 'automatización de cotizaciones Sogamoso', 'pendiente'),
  ('Por qué las empresas de Tunja están cambiando Excel por sistemas conectados', 'Tunja, Boyacá', 'Boyacá', 'sistemas empresariales Tunja', 'pendiente'),
  ('Comercio electrónico con IA para negocios de Chiquinquirá', 'Chiquinquirá, Boyacá', 'Boyacá', 'comercio electrónico Chiquinquirá', 'pendiente'),
  ('Automatización de agenda y reservas para negocios de Paipa (turismo y bienestar)', 'Paipa, Boyacá', 'Boyacá', 'automatización reservas Paipa', 'pendiente'),
  ('Errores comunes al automatizar WhatsApp Business en pymes de Cundinamarca', 'Cundinamarca (general)', 'Cundinamarca', 'automatización WhatsApp Business Colombia', 'pendiente'),
  ('Cómo saber si tu empresa en Boyacá está lista para adoptar IA', 'Boyacá (general)', 'Boyacá', 'inteligencia artificial empresas Boyacá', 'pendiente'),
  ('Automatización de facturación y cartera para pymes de la Sabana de Bogotá', 'Sabana de Bogotá, Cundinamarca', 'Cundinamarca', 'automatización facturación pymes Colombia', 'pendiente'),
  ('SEO para empresas industriales de Sogamoso: cómo aparecer primero en Google', 'Sogamoso, Boyacá', 'Boyacá', 'SEO industrial Sogamoso', 'pendiente'),
  ('Del Excel al sistema: modernización de procesos para distribuidoras en Zipaquirá', 'Zipaquirá, Cundinamarca', 'Cundinamarca', 'modernización de procesos Zipaquirá', 'pendiente')
on conflict do nothing;

-- ============================================================
-- Storage: bucket público para imágenes del blog (portada + inline)
-- Bloque nuevo — si ya corriste el resto de este archivo antes, solo
-- necesitas ejecutar esta parte.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

create policy "public read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "authenticated upload blog images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "authenticated update blog images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "authenticated delete blog images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
