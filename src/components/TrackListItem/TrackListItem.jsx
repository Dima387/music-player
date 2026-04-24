import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import './tracklistitem.css';

export default function TrackListItem({ track }) {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(PlayerContext);
    const isFavorite = favorites.some(fav => fav.id === track.id);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(track.id);
        } else {
            addToFavorites(track);
        }
    };

    return (
        <div className="track-list-item">
            <img src={`../../../public/images/${track.cover}`} alt="Album cover" className="track-cover" />
            <div className="track-details">
                <h4>{track.name}</h4>
                <p>{track.artist}</p>
            </div>
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    );
}