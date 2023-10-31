import './explore.css'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Loader from '../loader/Loader'
import UserList from '../userList/UserList';

export default function Explore() {
  const [searchText, setSearchText] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleUserSearch = async () => {
    setSearched(true);
    setIsLoading(true);
    await fetch(process.env.REACT_APP_SERVER_URI + 'users/explore/' + searchText)
      .then((resp) => { return resp.json() })
      .then((data) => {
        setUsersData(data.users)
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }

  return (
    <div className="explore">
      <div className="exploreWrapper">
        <div className="exploreSearch">
          <input className='exploreSearchBox' type="text" placeholder='Search User' onChange={(e) => setSearchText(e.target.value)} />
          <div id='searchBtn' className="exploreSearchIcon" onClick={handleUserSearch}><SearchIcon /></div>
        </div>

        <div className="exploreList">
          <div className="exploreListUsers">
            {
              isLoading
                ? <div className="loading"><Loader /> </div>
                : !searched
                  ? <div className="idle"><div className='idleText'>Explore this world ..!</div><div className='idleText'>Here, search for any user</div></div>
                  : usersData.length !== 0
                    ? usersData.map((element) => (
                      <UserList data={element} />
                    ))
                    : <div className="nodata">Not found ! Try something else </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
