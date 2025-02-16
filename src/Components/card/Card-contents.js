import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SERVER_ROOT } from "../config/config"

const SimpleSlider = (mediaList) => {
    function isOverOne(list) {
        if (list.length > 1) {
            return true
        }
        return false
    }

    const settings = {
        dots: true,
        infinite: isOverOne(mediaList),
        speed: 500,
        draggable: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
    };

    return (
        <div className="card-medias">
            <Slider {...settings}>
                {
                    mediaList.map(media => (
                        <div className="media-item-div" key={media.mediaIdx}>
                            <img className="media-item"  src={`${SERVER_ROOT}/file/downloads/${media.mediaIdx}`} alt={media.mediaIdx} />
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}

export default function CardContents({ card }) {
    return (
        <div>
            <div className="hashTags grid">
                {
                    card.hashTags.map((hashTag, index) => <p key={index}>{hashTag}</p>)
                }
            </div>
            <div className="grid">
                {
                    card.contents && (
                        <div className="card-contents">
                            {card.contents}
                        </div>
                    )
                }
                {
                    card.mediaList && card.mediaList.length > 0 && (
                        SimpleSlider(card.mediaList)
                    )
                }
            </div>
        </div>
    )
}