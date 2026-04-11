import TrackCard from "../../components/TrackCard/TrackCard";
import tracks from "../../data/tracks";

export default function Home(user) {
    const tracklist = tracks.map(track => <TrackCard title={track.title} artist={track.artist} cover={track.cover}/>)
    return (
        <div className="home-page">
            <h1>Welcome back, {user}!</h1>
            {tracklist}
        </div>
    )
}