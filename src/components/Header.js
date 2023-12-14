import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}><i class="fa-regular fa-circle-check"></i> Pomofocus</div>
      <div className={styles.header_controls}>
        <button>
        <i class="fa-solid fa-gear"></i>  Settings
        </button>
        <button>
        <i class="fa-solid fa-circle-user"></i> Login
        </button>
      </div>
    </div>
  )
}

export default Header;