import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar vertical withoutMap />
      <main className="min-h-screen grid place-items-center">
        <h1 className="text-3xl">Mapbox</h1>
      </main>
    </>
  );
}
