import "./globals.css";
import { FavoritesProvider } from "../context/FavoritesContext";

export const metadata = {
  title: "Movie Scorer",
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
        <title>Movie Scorer</title>
      </head>
      <body className="bg-gray-900 text-white">
        <FavoritesProvider>
          <header className="bg-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <a
                href="/"
                className="hover:text-green-400 transition duration-300"
              >
                <h1 className="text-3xl font-bold text-green-400">
                  Movie Scorer
                </h1>
              </a>
              <nav>
                <ul className="flex space-x-6 text-lg">
                  <li>
                    <a
                      href="/"
                      className="hover:text-green-400 transition duration-300"
                    >
                      Popular
                    </a>
                  </li>
                  <li>
                    <a
                      href="/favorites"
                      className="hover:text-green-400 transition duration-300"
                    >
                      Favorites
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-gray-800 py-4">
            <div className="container mx-auto text-center">
              <p className="text-sm text-gray-400">
                © 2024 Movie Scorer. Todos los derechos reservados.
              </p>
            </div>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
