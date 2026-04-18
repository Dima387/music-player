const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function ProgressBar({ currTime, duration, onSeek }) {
    return (
        <div className="progress-bar">
            <span className="current-time">{formatTime(currTime)}</span>
            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currTime || 0}
                className="slider"
                onChange={(e) => onSeek?.(Number(e.target.value))}
            />
            <span className="duration">{formatTime(duration)}</span>
        </div>
    )
}