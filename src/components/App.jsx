import { Component } from 'react';
import css from './App.module.css';
import { getSearchData } from 'tools/getSearchData';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { FallingLinesComponent } from './FallingLinesComponent/FallingLinesComponent';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    searchData: [],
    page: 1,
    isLoadedGallery: true,
    canLoadMore: false,
    isloadingMore: false,
    isModalOpen: false,
    largeImageURL: '',
  };

  onSubmit = (newQuery) => {
    if (!newQuery) {
      Notiflix.Notify.failure('Please, enter some keyword');
      return;
    };

    this.setState({
      searchQuery: newQuery,
      searchData: [],
      page: 1,
      canLoadMore: false,
      isLoadedGallery: true,
    });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.searchQuery === '') {
      return;
    };

    if (
      prevState.searchQuery !== this.state.searchQuery
      || prevState.page !== this.state.page
    ) {
      this.setState({ isLoadedGallery: false });
      getSearchData(this.state.searchQuery, this.state.page)
        .then(res => res.json())
        .then(({ hits, total }) => {
          if (!total) {
            Notiflix.Notify.failure('This is no result by your keyword!');
            this.setState({ isLoadedGallery: true });
            return;
          }
          if (total > 0) this.setState({ canLoadMore: true });
          if (hits.length !== 12) this.setState({ canLoadMore: false });

          if (this.state.searchData.length >= 12) {
            this.setState((prevState) => {
              return {
                searchData: [...prevState.searchData, ...hits],
                isLoadedGallery: true,
              };
            });
          } else {
            this.setState({
              searchData: [...hits],
              isLoadedGallery: true,
            });
            Notiflix.Notify.success(`We found ${total} images for you.`);
          };
          this.setState({ isloadingMore: false });
          return;
        });
      return;
    };
  };

  onLoadMore = () => {
    this.setState((prevState) => {
      return {
        isloadingMore: true,
        canLoadMore: false,
        page: prevState.page + 1,
      };
    });
  };

  onOpenOverlay = (imageURL) => {
    this.setState({
      isModalOpen: true,
      largeImageURL: imageURL,
    });
  };

  closeModalByClick = ({ target, currentTarget }) => {
    if (target === currentTarget) this.setState({ isModalOpen: false });
  };

  closeModalByESC = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.setState({ isModalOpen: false });
    });
  };

  handleModalEventListener = () => {
    this.closeModalByESC();
    document.removeEventListener('keydown', this.closeModalByESC);
  };
  
  render() {
    return (
      <>
        {this.state.isModalOpen &&
          <Modal
            imageURL={this.state.largeImageURL}
            closeModalByClick={this.closeModalByClick}
            handleModalEventListener={this.handleModalEventListener}
          />}
        <div className={css.app}>
          <Searchbar
            onSubmit={this.onSubmit}
          />

          {!this.state.isLoadedGallery && <FallingLinesComponent />}
          {this.state.searchData.length > 0 &&
            <ImageGallery
              collection={this.state.searchData}
              onOpenOverlay={this.onOpenOverlay}
            />
          }
          {this.state.canLoadMore && <Button onLoadMore={this.onLoadMore} />}
          {this.state.isloadingMore && <FallingLinesComponent/>}
        </div>
      </>
    );
  };
};
