import styles from './Header.module.css';

function Header({ openSettings, dynamicBarLength }) {

  function testDynamicBarLength() {
    if (dynamicBarLength) { return ({ width: dynamicBarLength })}
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}><i className="fa-regular fa-circle-check"></i>Pomofocus</div>
      <div className={styles.header_controls}>
        <button onClick={openSettings}>
        <i className="fa-solid fa-gear"></i>  Settings
        </button>
        <button>
        <i className="fa-solid fa-circle-user"></i> Login
        </button>
      </div>
      <div className={styles.dynamicBar_background}>
        <div className={styles.dynamicBar} style={testDynamicBarLength()}></div>
      </div>
    </div>
  )
}

export default Header;