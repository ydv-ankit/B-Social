import SearchIcon from '@mui/icons-material/Search';

import './explore.css'

export default function Explore() {
  return (
    <div className="explore">
      <div className="exploreWrapper">
        <div className="exploreSearch">
          <div className="exploreSearchIcon"><SearchIcon /></div>
          <input className='exploreSearchBox' type="text" />
        </div>
      </div>
    </div>
  )
}
