import styles from '@/app/styles/Header.module.css';

const Header = ({ children }: { children: React.ReactNode }) => {
    return <header className={styles.header}>{children}</header>;
};

export default Header;
