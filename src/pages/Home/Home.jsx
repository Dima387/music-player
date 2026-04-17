import TrackCard from "../../components/TrackCard/TrackCard";
import tracks from "../../data/tracks";

export default function Home() {
    return (
        <div className="home-page">
            <h1>Welcome back!</h1>
            {tracks.map((track, index) => <TrackCard key={index} title={track.title} artist={track.artist} cover={track.cover}/>)}
        </div>
    )
}