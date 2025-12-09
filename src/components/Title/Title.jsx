import style from './Title.module.css';

export default function Title({ text }) {
  return <h2 className={style.title}> {text} </h2>;
}
