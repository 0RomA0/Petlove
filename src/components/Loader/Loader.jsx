import style from './Loader.module.css';

export default function Loader({ color }) {
  return (
    <div className={style.circleLoader}>
      <div className={style.percent} style={{ color }}>
        85%
      </div>
      <svg>
        <circle cx="199" cy="199" r="198" style={{ stroke: color }}></circle>
      </svg>
    </div>
  );
}
