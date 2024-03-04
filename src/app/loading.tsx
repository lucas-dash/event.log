import PageLoader from "@/components/loading/page-loader";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PageLoader />;
    </div>
  );
}
