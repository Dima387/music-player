export default function VolumeControl({min, max, value}) {
    return (
        <div className="volume-control">
            <button className="mute-btn"> 🔇 </button>
            <input type="range" min={min} max={max} value={value} className="slider"/>
        </div>
    )
}