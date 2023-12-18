import styles from './Header.module.css';

function Header({handleSettings}) {

  return (
    <div className={styles.header}>
      <div className={styles.logo}><i className="fa-regular fa-circle-check"></i> Pomofocus</div>
      <div className={styles.header_controls}>
        <button onClick={handleSettings}>
        <i className="fa-solid fa-gear"></i>  Settings
        </button>
        <button>
        <i className="fa-solid fa-circle-user"></i> Login
        </button>
      </div>
    </div>
  )
}

export default Header;