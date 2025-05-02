import styles from "./CTASection.module.scss";
import MobileSearch from "@/app/components/MobileSearch";

const CTASection = ({}) => {
    return (
        <div className={styles["cta-section"]}>
            <h3>Let's find your perfect stay</h3>
            {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                cupiditate?
            </p> */}
            <div className={styles["cta-section__search-wrapper"]}>
                <MobileSearch searchTxt={"Start your search"} />
            </div>
        </div>
    );
};

export default CTASection;
