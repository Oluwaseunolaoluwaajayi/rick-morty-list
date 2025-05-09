import { useState, useEffect } from 'react';
import axios from 'axios';
import ListComponent from './ListComponent';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (err) {
        setError('Failed to fetch characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
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
    <ListComponent
      items={characters}
      renderItem={renderCharacter}
      emptyMessage="No characters found"
    />
  );
};

export default CharacterList;