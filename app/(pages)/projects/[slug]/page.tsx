// app/projects/[slug]/page.tsx
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProjectDetailContent } from '@/components/sections/ProjectDetailContent'; 
import { DetailedProject } from '@/lib/types';


// 1. Static Generation
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  // Log available slugs during dev for debugging static param generation
  if (process.env.NODE_ENV !== 'production') {
    console.log('generateStaticParams -> slugs:', slugs);
  }
  return slugs;
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | My Portfolio`,
    description: project.shortDescription,
  };
}

// 3. Main Page Component
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Debug logging to help diagnose 404s in dev
  if (process.env.NODE_ENV !== 'production') {
    console.log('ProjectDetailPage -> requested slug:', slug, 'found:', Boolean(project));
  }

  if (!project) {
    notFound();
  }

  const detailedProject = project as DetailedProject;

  // Send the fetched data to the Client Component for rendering
  return <ProjectDetailContent project={detailedProject} />;
}