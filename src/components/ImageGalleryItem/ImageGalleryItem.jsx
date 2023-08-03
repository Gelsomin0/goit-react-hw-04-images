import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ card, onOpenOverlay }) => {
    const { id, webformatURL, largeImageURL, tags } = card;
    return (
        <li key={id} className={css.gallery_item}>
            <img
                className={css.imageGalleryItem_image}
                src={webformatURL} alt={tags}
                onClick={()=>onOpenOverlay(largeImageURL)}
            />
        </li>
    );    
}

ImageGalleryItem.propType = {
    card: PropTypes.objectOf({
        id: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
    }),
    onOpenOverlay: PropTypes.func.isRequired,
}