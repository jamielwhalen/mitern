import JobDetailsClient from "./JobDetailsClient";

export const instant = false;

export default async function JobDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <JobDetailsClient jobId={Number(id)} />;
}