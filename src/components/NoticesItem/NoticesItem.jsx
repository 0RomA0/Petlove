import { useDispatch, useSelector } from 'react-redux';
import style from './NoticesItem.module.css';
import {
  selectFavoriteNotices,
  selectIsLoggedIn,
} from '../../redux/auth/selectors';
import { useEffect, useState } from 'react';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import { getCurrentUserFull } from '../../redux/auth/operations';
import { addFavorite, removeFavorite } from '../../redux/notices/operations';

export default function NoticesItem({
  isProfilePage,
  noticesPhoto,
  noticesTitle,
  noticesName,
  noticesBirthday,
  noticesSex,
  noticesSpecies,
  noticesCategory,
  noticesReating,
  noticesText,
  noticesPrice,
  noticesId,
  type,
}) {
  const [modalAttentionOpen, setModalAttentionOpen] = useState(false);
  const [modalNoticeOpen, setModalNoticeOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const dispatch = useDispatch();

  const loggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavoriteNotices);

  const isFavorite = favorites.some((notice) => notice._id === noticesId);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getCurrentUserFull());
    }
  }, [dispatch, loggedIn]);

  const handleLearnMore = () => {
    if (!loggedIn) {
      setModalAttentionOpen(true);
      return;
    }

    setSelectedAnimal({
      noticesPhoto,
      noticesTitle,
      noticesName,
      noticesBirthday,
      noticesCategory,
      noticesSex,
      noticesSpecies,
      noticesReating,
      noticesText,
      noticesPrice,
    });

    setModalNoticeOpen(true);
  };

  const handlefavorite = async () => {
    if (!loggedIn) {
      setModalAttentionOpen(true);
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(noticesId);
      } else {
        await addFavorite(noticesId);
      }

      await dispatch(getCurrentUserFull()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div
          className={
            isProfilePage ? style.cardImgWrapperProfile : style.cardImgWrapper
          }
        >
          <img
            className={style.imgNotices}
            src={noticesPhoto}
            alt={noticesName}
          />
        </div>

        <div className={style.contentContainet}>
          <div className={isProfilePage ? style.wrapperProfile : style.wrapper}>
            <div className={style.textContent}>
              <h2 className={style.title}>{noticesTitle}</h2>

              <div className={style.reating}>
                <div className={style.starIconWrapper}>
                  <svg className={style.starIcon}>
                    <use href="/sprite.svg#icon-star" />
                  </svg>
                </div>

                <p className={style.reatingNumb}>{noticesReating}</p>
              </div>
            </div>

            <div
              className={isProfilePage ? style.contentProfile : style.content}
            >
              <p className={style.info}>
                Name <span className={style.infoText}>{noticesName}</span>
              </p>
              <p className={style.info}>
                Birthday
                <span className={style.infoText}>{noticesBirthday}</span>
              </p>
              <p className={style.info}>
                Sex <span className={style.infoText}>{noticesSex}</span>
              </p>
              <p className={style.info}>
                Species <span className={style.infoText}>{noticesSpecies}</span>
              </p>
              <p className={style.info}>
                Category
                <span className={style.infoText}>{noticesCategory}</span>
              </p>
            </div>

            <p className={style.text}>{noticesText}</p>
          </div>

          <div className={style.btnTextContent}>
            <p className={style.price}>${noticesPrice || 'no price'}</p>

            <div className={style.btnContainer}>
              <button
                className={`${style.btnLearnMoreBase} ${
                  isProfilePage
                    ? style.btnLearnMoreProfile
                    : style.btnLearnMoreNotices
                }
                ${type === 'viewed' ? style.btnLearnMoreViewed : ''}`}
                onClick={handleLearnMore}
              >
                Learn more
              </button>
              {type !== 'viewed' && (
                <button className={style.btnHeart} onClick={handlefavorite}>
                  <svg className={style.icon}>
                    <use
                      href={
                        loggedIn && isFavorite
                          ? '/sprite.svg#icon-trash'
                          : '/sprite.svg#icon-heart'
                      }
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalAttentionOpen && (
        <ModalAttention
          isOpen={modalAttentionOpen}
          onClose={() => setModalAttentionOpen(false)}
        />
      )}

      {modalNoticeOpen && (
        <ModalNotice
          isOpen={modalNoticeOpen}
          onClose={() => setModalNoticeOpen(false)}
          AnimalImg={selectedAnimal.noticesPhoto}
          AnimalName={selectedAnimal.noticesName}
          AnimalTitle={selectedAnimal.noticesTitle}
          AnimalBirthday={selectedAnimal.noticesBirthday}
          AnimalCategory={selectedAnimal.noticesCategory}
          AnimalSex={selectedAnimal.noticesSex}
          AnimalSpecies={selectedAnimal.noticesSpecies}
          AnimalReating={selectedAnimal.noticesReating}
          AnimalText={selectedAnimal.noticesText}
          AnimalPrice={selectedAnimal.noticesPrice}
        />
      )}
    </>
  );
}
