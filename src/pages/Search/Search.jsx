import { useState } from "react"
import tracks from "../../data/tracks.js"
import TrackCard from "../../components/TrackCard/TrackCard"
export default function Search() {
    const [query, setQuery] = useState("")
    const filteredTracks = tracks.filter(track => track.title.includes(query) || track.artist.includes(query))
    return (
        <div className="search-page">
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Search tracks..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            {filteredTracks.map(track => (
                <TrackCard
                    key={track.id}
                    title={track.title}
                    artist={track.artist}
                    cover={track.cover}
                />
            ))}
        </div>
    )
}