import { getStarsRatingCount } from '../../utils/getStarsRatingCount';
import { useModalEffects } from '../../utils/useModalEffects';
import style from './ModalNotice.module.css';

export default function ModalNotice({
  isOpen,
  onClose,
  AnimalImg,
  AnimalName,
  AnimalTitle,
  AnimalBirthday,
  AnimalCategory,
  AnimalSex,
  AnimalSpecies,
  AnimalReating,
  AnimalText,
  AnimalPrice,
}) {
  useModalEffects(isOpen, onClose);

  if (!isOpen) return null;

  const starsArray = [1, 2, 3, 4, 5];
  const starsCount = getStarsRatingCount(AnimalReating);

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>

        <div className={style.divWrapper}>
          <div className={style.wrapperImg}>
            <div className={style.categoryWrapper}>
              <p className={style.category}>{AnimalCategory}</p>
            </div>

            <img className={style.image} src={AnimalImg} alt={AnimalName} />
          </div>
          <div className={style.contentContainet}>
            <div className={style.wrapper}>
              <div className={style.textContent}>
                <h2 className={style.title}> {AnimalTitle} </h2>
                <div className={style.reating}>
                  <div className={style.stars}>
                    {starsArray.map((star) => (
                      <svg
                        key={star}
                        className={
                          star <= starsCount
                            ? style.starActive
                            : style.starInactive
                        }
                      >
                        <use href="/sprite.svg#icon-star" />
                      </svg>
                    ))}
                  </div>
                  <p className={style.reatingNumb}> {AnimalReating} </p>
                </div>
              </div>
              <div className={style.content}>
                <p className={style.info}>
                  Name <span className={style.infoText}>{AnimalName}</span>
                </p>
                <p className={style.info}>
                  Birthday
                  <span className={style.infoText}>{AnimalBirthday}</span>
                </p>
                <p className={style.info}>
                  Sex <span className={style.infoText}>{AnimalSex}</span>
                </p>
                <p className={style.info}>
                  Species
                  <span className={style.infoText}>{AnimalSpecies}</span>
                </p>
              </div>
              <p className={style.text}> {AnimalText} </p>
            </div>
            <div className={style.btnTextContent}>
              <p className={style.price}>${AnimalPrice || 'no price'}</p>
              <div className={style.btnContainer}>
                <button className={style.btnAddTo}>
                  Add to
                  <svg className={style.heartIcon}>
                    <use href="/sprite.svg#icon-heart" />
                  </svg>
                </button>
                <button className={style.btnContact}> Contact </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
