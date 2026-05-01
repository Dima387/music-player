import { useContext } from "react"
import TrackCard from "../../components/TrackCard/TrackCard.jsx"
import { PlayerContext } from "../../context/PlayerContext"
import './favourites.css';

export default function Favourites() {
    const { favorites } = useContext(PlayerContext)

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favourites-page">
                <h1>Favourites</h1>
                <p>Список порожній</p>
            </div>
        )
    }

    return (
        <div className="favourites-page">
            <h1>Favourites</h1>
            {favorites.map(t => (
                <TrackCard
                    key={t.id}
                    id={t.id}
                    name={t.name}
                    artist={t.artist}
                    cover={t.cover}
                    src={t.src}
                    variant="row"
                />
            ))}
        </div>
    )
}