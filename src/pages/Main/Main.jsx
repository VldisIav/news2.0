import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage) => {
    try {
      const response = await getNews(currentPage, pageSize);
      if (response && response.news) {
        setIsLoading(true);
        setNews(response.news);
        console.log(response.news);
        setIsLoading(false);
      } else {
        setError('Invalid data format from API');
        console.error('Invalid data format from API', response);
      }
    } catch (err) {
      setError(err.message); // Обработка ошибок запроса
      console.error('Error fetching news:', err);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <main className={styles.main}>
      {news.length > 0 && !isloading ? (
        <NewsBanner item={news[13]} />
      ) : (
        <Skeleton count={1} type="banner" />
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      {!isloading ? <NewsList news={news} /> : <Skeleton count={10} type="item" />}

      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Main;
