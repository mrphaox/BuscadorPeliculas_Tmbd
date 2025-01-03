import "./globals.css";
import { FavoritesProvider } from "../context/FavoritesContext";
import Footer from "@/components/Footer";
import { IoIosHome } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";

export const metadata = {
  title: "I Can See ?",
  description: "Explora las películas más populares y guarda tus favoritas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>I Can See ? </title>
      </head>
      <body className="bg-gray-900 text-white">
        <FavoritesProvider>
          <header className="bg-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              {/* Logo/Heading */}
              <a
                href="/"
                className="hover:text-green-400 transition duration-300"
              >
                <h1 className="text-3xl font-bold text-green-400">
                  I Can See ?
                </h1>
              </a>

              {/* Navigation */}
              <nav>
                <ul className="flex space-x-6 text-lg">
                  {/* Home Link */}
                  <li>
                    <a
                      href="/"
                      className="hover:text-green-400 transition duration-300 flex items-center space-x-2"
                    >
                      <span>Home</span>
                      <IoIosHome className="text-2xl sm:text-3xl md:text-4xl" />
                    </a>
                  </li>

                  {/* Favorites Link */}
                  <li>
                    <a
                      href="/favorites"
                      className="hover:text-green-400 transition duration-300 flex items-center space-x-2"
                    >
                      <span>Favorites</span>
                      <GrFavorite className="text-xl sm:text-3xl md:text-4xl" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </FavoritesProvider>
        <Footer />
      </body>
    </html>
  );
}
