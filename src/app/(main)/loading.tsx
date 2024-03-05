import PageLoader from "@/components/loading/page-loader";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
