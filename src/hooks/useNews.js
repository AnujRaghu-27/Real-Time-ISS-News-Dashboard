import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export const useNews = (query = 'space') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (searchQuery = query) => {
    if (!GNEWS_API_KEY) {
      setError('GNews API Key is missing. Please add VITE_GNEWS_API_KEY to your .env file.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          q: searchQuery,
          token: GNEWS_API_KEY,
          lang: 'en',
          max: 10
        }
      });
      setArticles(response.data.articles);
      setError(null);
    } catch (err) {
      setError('Failed to fetch news. Please check your API key or connection.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, refetch: fetchNews };
};
