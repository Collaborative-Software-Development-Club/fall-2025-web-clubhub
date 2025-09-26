import Navbar from "../components/ui/navbar";

export default function Home() {
    return (
      <>
        <main>
          <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
              <Content />
          </div>
        </main>
      </>
    );
}

function Content() {
  console.log("Rendering authenticated content");
  return (
    <>
      <header className="w-full flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">ClubHub</h1>
        <Navbar />
      </header>
      <div className="w-full text-center mt-12">
        <p className="text-muted-foreground">This is a simple placeholder page.</p>
      </div>
    </>
  );
}
