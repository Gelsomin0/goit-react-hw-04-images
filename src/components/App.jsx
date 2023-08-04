import { useState, useEffect, useRef } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { FallingLinesComponent } from './FallingLinesComponent/FallingLinesComponent';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadedGallery, setIsLoadedGallery] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isloadingMore, setIsloadingMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const isFirstRender = useRef(true);
  const prevSearchData = useRef(searchData);

  const onSubmit = (newQuery) => {
    if (!newQuery) {
      Notiflix.Notify.failure('Please, enter some keyword');
      return;
    };

    setSearchQuery(newQuery);
    setSearchData([]);
    setPage(1);
    setCanLoadMore(false);
    setIsLoadedGallery(true);
  };
  
  useEffect(() => {
    if (isFirstRender.current || searchQuery === '') {
      isFirstRender.current = false;
      return;
    }

    setIsLoadedGallery(false);
    getSearchData(searchQuery, page)
      .then(res => res.json())
      .then(({ hits, total }) => {
        setIsLoadedGallery(true);

        if (!total) {
          Notiflix.Notify.failure('This is no result by your keyword!');
          return;
        }
        if (total > 0) setCanLoadMore(true);
        if (hits.length !== 12) {
          setCanLoadMore(false);
          Notiflix.Notify.info('We have no more images for you!');
        }

        if (searchData.length >= 12) {
          setSearchData([...prevSearchData.current, ...hits]);
          prevSearchData.current = [...searchData, ...hits];
        } else {
          setSearchData([...hits]);
          Notiflix.Notify.success(`We found ${total} images for you.`);
          prevSearchData.current = [...hits];
        };

        setIsloadingMore(false);
      });


  }, [searchQuery, page]);
  
  const onLoadMore = () => {
    setIsloadingMore(true);
    setCanLoadMore(false);
    setPage((prevState) => prevState + 1);
  };

  const onOpenOverlay = (imageURL) => {
    setIsModalOpen(true);
    setLargeImageURL(imageURL);
  };

  const closeModalByClick = ({ target, currentTarget }) => {
    if (target === currentTarget) setIsModalOpen(false);
  };

  const closeModalByESC = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    });
  };

  const handleModalEventListener = () => {
    closeModalByESC();
    document.removeEventListener('keydown', closeModalByESC);
  };
  
  return (
    <>
      {isModalOpen &&
        <Modal
          imageURL={largeImageURL}
          closeModalByClick={closeModalByClick}
          handleModalEventListener={handleModalEventListener}
        />}
      <div className={css.app}>
        <Searchbar
          onSubmit={onSubmit}
        />

        {!isLoadedGallery && <FallingLinesComponent />}
        {searchData.length > 0 &&
          <ImageGallery
            collection={searchData}
            onOpenOverlay={onOpenOverlay}
          />
        }
        {canLoadMore && <Button onLoadMore={onLoadMore} />}
        {isloadingMore && <FallingLinesComponent/>}
      </div>
    </>
  );
};
