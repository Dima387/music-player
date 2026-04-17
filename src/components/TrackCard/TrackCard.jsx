import './trackcard.css';
export default function TrackCard({ name, artist, cover }) {
    return(
        <div className="track-card-big">
            <img src={`../../../public/images/${cover}`} alt="Album cover"/>
            <div className="track-info">
                <h3>{name}</h3>
                <p>{artist}</p>
            </div>
        </div>
    )
}