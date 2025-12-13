import { useModalEffects } from '../../utils/useModalEffects';
import style from './ModalNotice.module.css';

export default function ModalNotice({
  isOpen,
  onClose,
  AnimalImg,
  AnimalName,
  AnimalTitle,
  AnimalBirthday,
  AnimalSex,
  AnimalSpecies,
  AnimalReating,
  AnimalText,
  AnimalPrice,
}) {
  useModalEffects(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <div className={style.divWrapper}>
          <div className={style.imgWrapper}>
            <img className={style.image} src={AnimalImg} alt={AnimalName} />
            <div className={style.contentContainet}>
              <div className={style.wrapper}>
                <div className={style.textContent}>
                  <h2 className={style.title}> {AnimalTitle} </h2>
                  <div className={style.reating}>
                    <svg className={style.starIcon}>
                      <use href="/sprite.svg#icon-star" />
                    </svg>
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
                <div className={style.btnContainer}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
