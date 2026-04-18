import { useRef, useEffect, useState } from 'react';
import './trackcard.css';

export default function TrackCard({ name, artist, cover }) {
    const titleRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            const element = titleRef.current;
            setIsOverflowing(element.scrollWidth > element.clientWidth);
        }
    }, [name]);

    return(
        <div className="track-card-big">
            <img src={`../../../public/images/${cover}`} alt="Album cover"/>
            <div className="track-info">
                <h3 ref={titleRef} className={isOverflowing ? 'scrolling' : ''}>{name}</h3>
                <p>{artist}</p>
            </div>
        </div>
    )
}