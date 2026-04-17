export default function ProgressBar({currTime, duration}) {
    return (
        <div className="progress-bar">
            <span className="current-time">{currTime}</span>
            <input type="range" min="0" max={duration} value={currTime} className="slider"/>
            <span className="duration">{duration}</span>
        </div>
    )
}