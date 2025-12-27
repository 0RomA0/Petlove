import style from './Loader.module.css';

export default function Loader({ color = '#0d0d0d' }) {
  return (
    <div className={style.circleLoader}>
      <div className={style.percent} style={{ color }}>
        85%
      </div>
      <svg viewBox="0 0 200 200" className={style.svg}>
        <circle cx="100" cy="100" r="90" style={{ stroke: color }} />
      </svg>
    </div>
  );
}
