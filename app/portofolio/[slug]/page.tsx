import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyek" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <SiteFrame>
      <ProjectDetail project={project} />
    </SiteFrame>
  );
}
