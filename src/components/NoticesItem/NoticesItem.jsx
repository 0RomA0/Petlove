import { useSelector } from 'react-redux';
import style from './NoticesItem.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useState } from 'react';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';

export default function NoticesItem({
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
}) {
  const loggedIn = useSelector(selectIsLoggedIn);

  const [modalAttentionOpen, setModalAttentionOpen] = useState(false);
  const [modalNoticeOpen, setModalNoticeOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

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
      noticesSex,
      noticesSpecies,
      noticesReating,
      noticesText,
      noticesPrice,
    });

    setModalNoticeOpen(true);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.cardImgWrapper}>
          <img
            className={style.noticesImg}
            src={noticesPhoto}
            alt={noticesName}
          />
        </div>

        <div className={style.contentContainet}>
          <div className={style.wrapper}>
            <div className={style.textContent}>
              <h2 className={style.title}>{noticesTitle}</h2>

              <div className={style.reating}>
                <svg className={style.starIcon}>
                  <use href="/sprite.svg#icon-star" />
                </svg>
                <p className={style.reatingNumb}>{noticesReating}</p>
              </div>
            </div>

            <div className={style.content}>
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
              <button className={style.btnLearnMore} onClick={handleLearnMore}>
                Learn more
              </button>

              <button
                className={style.btnHeart}
                onClick={() => {
                  if (!loggedIn) {
                    setModalAttentionOpen(true);
                    return;
                  }
                }}
              >
                <svg className={style.heartIcon}>
                  <use href="/sprite.svg#icon-heart-1" />
                </svg>
              </button>
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
