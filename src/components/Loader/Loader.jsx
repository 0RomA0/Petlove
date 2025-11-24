import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.circleLoader}>
      <div className={style.percent}>85%</div>
      <svg>
        <circle cx="199" cy="199" r="198"></circle>
      </svg>
    </div>
  );
}
