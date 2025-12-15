import PetsItem from '../PetsItem/PetsItem';
import style from './PetsList.module.css';

export default function PetsList({ pets }) {
  return (
    <ul>
      {pets.map((pet) => (
        <li className={style.item} key={pet._id}>
          <PetsItem
            petId={pet._id}
            petImg={pet.imgUrl}
            petTitle={pet.title}
            petName={pet.name}
            petBirthday={pet.birthday}
            petSex={pet.sex}
            petSpecies={pet.species}
          />
        </li>
      ))}
    </ul>
  );
}
