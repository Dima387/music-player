import { useState } from "react"
import tracks from "../../data/tracks.js"
import TrackListItem from "../../components/TrackListItem/TrackListItem"
import './search.css';

export default function Search() {
    const [query, setQuery] = useState("")
    const filteredTracks = tracks.filter(track => track.title?.toLowerCase().includes(query) || track.artist?.toLowerCase().includes(query))
    return (
        <div className="search-page">
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Search tracks..."
                value={query}
                onChange={e => setQuery(e.target.value.toLowerCase())}
            />
            <div className="tracks-list">
                {filteredTracks.map(track => (
                    <TrackListItem
                        key={track.id}
                        track={track}
                    />
                ))}
            </div>
        </div>
    )
}