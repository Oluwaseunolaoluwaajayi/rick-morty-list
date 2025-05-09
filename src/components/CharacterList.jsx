import { useState, useEffect } from 'react';
import axios from 'axios';
import ListComponent from './ListComponent';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageUrl, setPageUrl] = useState('https://rickandmortyapi.com/api/character');
  const [pagination, setPagination] = useState({ next: null, prev: null });

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(pageUrl);
      setCharacters(response.data.results);
      setPagination({ next: response.data.info.next, prev: response.data.info.prev });
    } catch (err) {
      setError('Failed to fetch characters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [pageUrl]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button onClick={fetchCharacters} style={{ marginLeft: '10px', padding: '5px 10px' }}>
          Retry
        </button>
      </div>
    );
  }

  const renderCharacter = (character) => (
    <div className="character-item">
      <img src={character.image} alt={character.name} className="character-image" />
      <div>
        <h3>{character.name}</h3>
        <p>Species: {character.species}</p>
        <p>Status: {character.status}</p>
      </div>
    </div>
  );

  return (
    <div>
      <ListComponent
        items={characters}
        renderItem={renderCharacter}
        emptyMessage="No characters found"
      />
      <div className="pagination">
        <button
          disabled={!pagination.prev}
          onClick={() => setPageUrl(pagination.prev)}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Previous
        </button>
        <button
          disabled={!pagination.next}
          onClick={() => setPageUrl(pagination.next)}
          style={{ padding: '5px 10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;