import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <h1 className="rounded-lg bg-blue-300 w-fit p-1 text-black text-xs m-2 absolute">
        {import.meta.env.MODE === "development" ? "Development" : "Production"}
      </h1>
      <Header />
      <main className="min-h-[calc(100vh-120px)] w-full overflow-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
