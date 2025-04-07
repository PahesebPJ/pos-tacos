import { IoSearchOutline } from 'react-icons/io5';
import styles from '@/app/styles/tablePage.module.css';
import { SearchBarProps } from '../props/components/SearchBarProps';

function SearchBar({searchTerm, setSearchTerm}: SearchBarProps) {
  return (
    <div className={styles.search}>
        <div className={styles.container_search}>
            <IoSearchOutline />
            <input
                type="search"
                placeholder="Buscar productos por nombre o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default SearchBar