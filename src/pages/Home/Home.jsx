import tracks from "../../data/traks"
import TrackCard from "../../components/TrackCard/TrackCard"

return (
  <div>
    <h1>All tracks</h1>

    <div className="tracks-list">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  </div>
)