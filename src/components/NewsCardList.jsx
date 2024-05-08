import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewsCard from "./NewsCard";

export default function NewsCardList(props) {
	// Extrag props-urile necesare
	const { newsList } = props;
	// Folosesc grid-ul de bootstrap pentru a aseza elemente in pagina
	return (
		<Container>
			<Row>
				{/* Interam prin lista de stiri, si pentru fiecare stire randez un card */}
				{newsList.map((news) => {
					return (
						<Col xs={12} md={6} lg={4} className="mb-4" key={news.id}>
							{/* newsId, imgSrc, title, description  */}
							<NewsCard
								newsId={news.id}
								imgSrc={news.thumbnail}
								title={news.title}
								description={news.description}
								hasCloseButton={news.hasCloseButton}
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
