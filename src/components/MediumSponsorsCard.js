import React from 'react';
import './MediumSponsorsCard.css';

function MediumSponsorsCard({ title, image, dataAos, weblink, SubSponsorcategory }) {
    return (
        <div className="sponsor-card-container" data-aos={dataAos}>
            <div className="mediumcard">
                <a href={weblink} target="_blank" rel="noreferrer" className="sponsor-link">
                    <img
                        src={image}
                        alt={title || "Sponsor"}
                        className="sponsor-img"
                    />
                </a>
            </div>
        </div>
    )
}

export default MediumSponsorsCard;
