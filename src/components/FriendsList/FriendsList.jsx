import style from './FriendsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFriends } from '../../redux/friends/operations';
import { SelectFriends, selectIsLoading } from '../../redux/friends/selectors';
import FriendsItem from '../FriendsItem/FriendsItem';

export default function FriendsList() {
  const dispatch = useDispatch();
  const friends = useSelector(SelectFriends);
  const isLoading = useSelector(selectIsLoading);

  //   console.log(friends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  if (!isLoading && friends.length === 0) {
    return <p> No data </p>;
  }

  return (
    <>
      <div className={style.container}>
        <h2> Our friends </h2>
        <ul className={style.list}>
          {friends.map((item) => (
            <li className={style.item} key={item._id}>
              <FriendsItem
                friendsTitle={item.title}
                friendsEmail={item.email}
                friendsAddress={item.address}
                friendsPhone={item.phone}
                friendsPhoto={item.imageUrl}
                Friendswork={item.workDays}
                // newsId={item.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
