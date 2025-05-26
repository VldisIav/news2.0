import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';

const Main = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (response && response.news) {
          setIsLoading(true);
          setNews(response.news);
          console.log(response.news);
          setIsLoading(false);
        } else {
          setError('Invalid data format from API'); // Обработка неверного формата данных
          console.error('Invalid data format from API', response);
        }
      } catch (err) {
        setError(err.message); // Обработка ошибок запроса
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, []);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>; // Отображение сообщения об ошибке
  }

  return (
    <main className={styles.main}>
      {news.length > 0 && !isloading ? (
        <NewsBanner item={news[13]} />
      ) : (
        <Skeleton count={1} type="banner" />
      )}
      {!isloading ? <NewsList news={news} /> : <Skeleton count={10} type="item" />}
    </main>
  );
};

export default Main;
