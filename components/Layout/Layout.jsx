import { Header, Footer } from "@/components";
import styles from "./Layout.module.scss";
import PropTypes from "prop-types";

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};
