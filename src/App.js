import { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { ItemDetails } from "./pages/ItemDetails";
import { List } from "./pages/List";
import { NotFound } from "./pages/NotFound";
import "./styles.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Create protected routes for contact, list, and item details pages
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  // Create a browser router with protected routes
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home loggedIn={isLoggedIn} setLoggedin={setIsLoggedIn} />,
        },
        {
          path: "/contact",
          element: <ProtectedRoute element={<Contact />} />,
        },
        {
          path: "/list",
          element: <ProtectedRoute element={<List />} />,
          children: [
            {
              path: ":itemId",
              element: <ProtectedRoute element={<ItemDetails />} />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
