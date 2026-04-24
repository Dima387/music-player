export default function VolumeControl({ min, max, value, onChange, onMute, muted }) {
    return (
        <div className="volume-control">
            <button type="button" className="mute-btn" onClick={onMute}>
                {muted ? '🔇' : '🔈'}
            </button>
            <input
                type="range"
                min={min}
                max={max}
                step="0.01"
                value={value}
                className="slider"
                onChange={(e) => onChange?.(Number(e.target.value))}
            />
        </div>
    )
}