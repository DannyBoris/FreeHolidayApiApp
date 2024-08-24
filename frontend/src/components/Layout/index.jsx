import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const exludeOnRoutes = ["/checkout"];
  return exludeOnRoutes.includes(window.location.pathname) ? children : (
    <div className="bg-gray-50">
      {/* <h1 className="rounded-lg bg-blue-300 w-fit p-1 text-black text-xs m-2 absolute">
        {import.meta.env.MODE === "development" ? "Development" : "Production"}
      </h1> */}
      <Header />
      <main className="min-h-[calc(100vh-160px)]  overflow-auto max-w-[1400px] m-auto border-l border-l-gray-200 border-r border-r-gray-200 bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
