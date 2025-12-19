"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import BuildLogsContainer from "@/components/build-logs-container";
import CustomBadge from "@/components/custom-badge";
import DeployProjectForm from "@/components/DeployProjectForm";
import ProjectPreview from "@/components/project-preview";
import { Button } from "@/components/ui/button";
import { ProjectType } from "@/types";
import { BrickWall, ExternalLink, Github, TrendingUp } from "lucide-react";
import Link from "next/link";

const ProjectPage = () => {
    const searchParams = usePathname();
    const id = searchParams.split("/").pop();

    const [project, setProject] = useState<ProjectType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) {
                setError("Project ID missing from URL.");
                setLoading(false);
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthenticated please log in.");
                setLoading(false);
                return;
            }

            try {
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

                const res = await fetch(`/api/project/get-project/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error(`Failed to fetch project (${res.status})`);

                const json = await res.json();
                if (!json.success) throw new Error(json.error || "Unexpected error");

                setProject(json.data);
            } catch (err: unknown) {
                console.error(err);
                setError(err instanceof Error ? err.message : "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return <div className="p-10 text-center text-gray-400">Loading project...</div>;
    }

    if (error || !project) {
        return (
            <div className="p-10 text-center text-red-400">
                {error || "Project not found."}
            </div>
        );
    }

    const state = project.deployment?.state || "not started";

    return (
        <div className="w-full max-w-5xl mx-auto p-5 bg-background">
            {/* Header */}
            <div className="w-full py-6 flex items-start md:items-center justify-between flex-col lg:flex-row gap-5">
                <h1 className="text-lg md:text-2xl font-semibold leading-normal capitalize">
                    {project?.projectName}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                    <Link href={project?.gitUrl || ""} target="_blank">
                        <Button
                            variant={"outline"}
                            className="cursor-pointer flex items-center gap-2 px-2 py-1.5"
                        >
                            <Github size={16} />
                        </Button>
                    </Link>

                    <Link href={`http://${project?.subDomain}.localhost:8001`} target="_blank">
                        <Button className="cursor-pointer flex items-center gap-2 px-2 py-0.5">
                            <ExternalLink size={14} />
                            Live
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Deployment Header */}
            <div className="w-full py-5 flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-lg md:text-2xl font-semibold leading-normal capitalize">
                    Production Deployment
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                    <Link href={"#build-logs"}>
                        <Button
                            variant={"outline"}
                            className="cursor-pointer flex items-center gap-2 px-2 py-1.5"
                        >
                            <BrickWall size={16} />
                            Build Logs
                        </Button>
                    </Link>
                    <Link href={`/dashboard/analytics/${project._id}`}>
                        <Button
                            variant={"outline"}
                            className="cursor-pointer flex items-center gap-2 px-2 py-1.5"
                        >
                            <TrendingUp size={16} />
                            Visit Analytics
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3 flex-wrap">
                        <Link href={`/dashboard/project/${project._id}/deployments`}>
                            <Button
                                variant="outline"
                                className="px-3 py-2 rounded-lg text-sm font-semibold border-gray-500/40 hover:bg-gray-100/10 transition-colors"
                            >
                                All Deployments
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Info Card */}
            <div className="w-full rounded-xl border border-white/10 bg-gray-100/5 p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 md:col-span-2">
                    <ProjectPreview subDomain={project.subDomain} />
                </div>

                <div className="w-full space-y-6 md:col-span-3 flex flex-col justify-center">
                    <div className="space-y-1">
                        <h5 className="text-xs uppercase tracking-wider text-gray-400">Deployment</h5>
                        <Link
                            href={project ? `https://${project.subDomain}.nikhilsaiankilla.blog` : "#"}
                            target="_blank"
                            className="text-base font-medium text-white hover:text-gray-300 flex items-center gap-2"
                        >
                            {project?.subDomain}.nikhilsaiankilla.blog
                            <ExternalLink size={14} className="opacity-70" />
                        </Link>
                    </div>

                    <div className="space-y-1">
                        <h5 className="text-xs uppercase tracking-wider text-gray-400">Status</h5>
                        <CustomBadge variant="state" type={state} className="capitalize" />
                    </div>

                    <div className="space-y-1">
                        <h5 className="text-xs uppercase tracking-wider text-gray-400">Last Updated</h5>
                        <p className="text-sm text-gray-200 font-medium">{project?.updatedAt && new Date(project.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}</p>
                    </div>
                </div>
            </div>

            {/* Deploy Form */}
            <div className="w-full mt-2 space-y-3.5 bg-gray-100/5 rounded-md border border-gray-300/20 p-3">
                <DeployProjectForm projectId={id!} />
            </div>

            {/* Logs */}
            <div
                id="build-logs"
                className="w-full mt-2 space-y-3.5 bg-gray-100/5 rounded-md border border-gray-300/20 p-3"
            >
                <div className="w-full">
                    <h1 className="text-lg md:text-2xl font-semibold leading-normal capitalize">
                        Latest Build Logs
                    </h1>
                </div>
                {project?.deployment?.latestDeploymentId ? (
                    <BuildLogsContainer deploymentId={project.deployment?.latestDeploymentId} />
                ) : null}
            </div>
        </div>
    );
};

export default ProjectPage;
