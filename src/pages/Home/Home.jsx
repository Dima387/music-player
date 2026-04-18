import TrackCard from "../../components/TrackCard/TrackCard";
import tracks from "../../data/tracks";
import './home.css';

export default function Home() {
    return (
        <div className="home-page">
            <h1>Welcome back!</h1>
            <div className="tracks">
                {tracks.map((track) => <TrackCard key={track.id} id={track.id} name={track.name} artist={track.artist} cover={track.cover}/>)}
            </div>
        </div>
    )
}