import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import NewsList from '../../components/NewsList/NewsList';

const Main = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null); // Добавлено состояние для ошибок

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (response && response.news) {
          setNews(response.news);
          console.log(response.news);
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
      {news.length > 0 ? <NewsBanner item={news[13]} /> : null}
      {/* <NewsList news={news} /> */}
    </main>
  );
};

export default Main;
