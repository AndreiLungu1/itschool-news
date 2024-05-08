// Primul pas este sa imi tin intr-o constanta api-key-ul
// Nu este neaparat safe sa tinem key de genul aici, insa fara un server e in regula sa o punem aici.
const API_KEY = "edb89ca5-ab9a-4fb2-91f3-86bb29cc9b60";

// definesc functia care returneaza endnpoint-ul folosit pentru o anumita categorie de stiri
export function getNewsCategoriesEndpoint(
	category,
	pageNumber = 1,
	pageSize = 20
) {
    // Imi construiesc query string-ul pe care am sa il trimit catre API.
    const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

    // Returnesc link-ul complet catre API_ul care imi returneaza stirle pe categorie
    return `https://content.guardianapis.com/search${queryParams}`;
}
 export function getNewsDetailsEndpoint (newsId) {
    const queryParams = `?api-key=${API_KEY}&show-fields=all`;

    return `https://content.guardianapis.com/${newsId}${queryParams}`;
 }

