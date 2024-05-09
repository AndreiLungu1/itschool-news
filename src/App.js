// Import componentele ce tin de routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NewsDetails from "./pages/NewsDetails";
import NewsCategory from "./pages/NewsCategory";
import { useReducer } from "react";
import { favoritesReducer, initialState } from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

// Ne definim rutele necesare aplicatiei
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Page404 />,
	},
	{
		path: "/favourites",
		element: <Favourites />,
	},
	{
		path: "/category/:categoryId",
		element: <NewsCategory />,
	},
	{
		path: "/news/:newsId",
		element: <NewsDetails />,
	},
]);




function App() {
	// Daca am state in localStorage, il prieau, daca nu pornesc de la initialState.
	const [initialLocalStorageState] = useLocalStorage("favorites", initialState);
// initializez reducer-ul pentru stirile favorite
	const [favoritesState, favoritesDispatch] = useReducer(favoritesReducer, initialLocalStorageState);
	// Creez un obiect ce va fi pasat ca valoare contextului 
	const favoritesContextValue = {
		favoritesState,
		favoritesDispatch
	};
	return (
		<div className="App">
			<FavoritesContext.Provider value={favoritesContextValue}>
			{/* Adaugam provider-ul de rute */}
			<RouterProvider router={router} />
			</FavoritesContext.Provider>
		</div>
	);
}

export default App;
