import Header from '../../components/App/Header/Header';
import style from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <div className={style.container}>
        <div className={style.contentHome}>
          <Header />

          <div className={style.textContainer}>
            <h1 className={style.title}>
              Take good <span className={style.spanHome}> care </span> of your
              small pets
            </h1>
            <p className={style.text}>
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </p>
          </div>
        </div>
        <img
          className={style.imgHome}
          srcSet="../../../home-img1x.png, ../../../home-img2x.png"
          src="../../../home-img1x.png"
          alt="img"
        />
      </div>
    </>
  );
}
