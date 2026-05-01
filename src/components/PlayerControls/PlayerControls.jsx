export default function PlayerControls({ onShuffle, onPrevious, onTogglePlay, onNext, onRepeat, isPlaying, shuffle, repeat }) {
    return (
        <div className="player-controls">
            <button type="button" className={`mixbtn ${shuffle ? 'active' : ''}`} onClick={onShuffle}>⇄</button>
            <button type="button" className="previousbtn" onClick={onPrevious}>⏮</button>
            <button type="button" className="playbtn" onClick={onTogglePlay}>{isPlaying ? '⏸' : '▶'}</button>
            <button type="button" className="nextbtn" onClick={onNext}>⏭</button>
            <button type="button" className={`repeatbtn ${repeat ? 'active' : ''}`} onClick={onRepeat}>↻</button>
        </div>
    )
}