import useEmblaCarousel from 'embla-carousel-react';
import '../styles/masters.css'; 
import { masters } from '../utils/Masters';
import type { Master } from '../types';

export const Masters = () => {
    const [emblaRef] = useEmblaCarousel({ 
        loop: true,           
        slidesToScroll: 1,
    }); 

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {masters.map((master: Master) => (
                    <div className="embla__slide" key={master.id}>
                        <div className="slide-container">
                            <img
                                src={master.image}
                                alt={master.name}
                                className="master-image"
                                loading="lazy"
                            />
                            <div className="master-info">
                                <h3 className="master-name">{master.name}</h3>
                                <p className='master-description'>{master.profession}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};