export default function PlayerControls({ onShuffle, onPrevious, onTogglePlay, onNext, onRepeat, isPlaying }) {
    return (
        <div className="player-controls">
            <button type="button" className="mixbtn" onClick={onShuffle}>⇄</button>
            <button type="button" className="previousbtn" onClick={onPrevious}>⏮</button>
            <button type="button" className="playbtn" onClick={onTogglePlay}>{isPlaying ? '⏸' : '▶'}</button>
            <button type="button" className="nextbtn" onClick={onNext}>⏭</button>
            <button type="button" className="repeatbtn" onClick={onRepeat}>↻</button>
        </div>
    )
}