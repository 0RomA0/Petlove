import style from './Title.module.css';

export default function Title({ text, className }) {
  return <h2 className={`${style.title} ${className || ''}`}> {text} </h2>;
}
