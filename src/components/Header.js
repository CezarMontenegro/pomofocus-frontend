import styles from './Header.module.css';

function Header({ openSettings, dynamicBarLength }) {
  const estiloDoComponente = {
    backgroundColor: 'white',
    height: '3px',
    width: dynamicBarLength,
    borderRadius: '10%',
    opacity: '1',
  };



  return (
    <div className={styles.header}>
      <div className={styles.logo}><i className="fa-regular fa-circle-check"></i> Pomofocus</div>
      <div className={styles.header_controls}>
        <button onClick={openSettings}>
        <i className="fa-solid fa-gear"></i>  Settings
        </button>
        <button>
        <i className="fa-solid fa-circle-user"></i> Login
        </button>
      </div>
      <div className={styles.dynamicBar_background}>
        <div className="border_bottom" style={estiloDoComponente}></div>
      </div>
    </div>
  )
}

export default Header;