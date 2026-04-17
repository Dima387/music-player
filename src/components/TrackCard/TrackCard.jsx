export default function TrackCard({ title, artist, cover }) {
    return(
        <div className="track-card-small">
            <img src={`../../../public/images/${cover}`} alt="Album cover"/>
            <div className="track-info">
                <h3>{title}</h3>
                <p>{artist}</p>
            </div>
            <div className="add-to-favourites"> ♥ </div>
        </div>
    )
}