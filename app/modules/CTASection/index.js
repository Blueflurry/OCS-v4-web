import Button from "@/app/components/Button";
import styles from "./CTASection.module.scss";
import Image from "next/image";

const CTASection = ({}) => {
    return (
        <div className={styles["cta-section"]}>
            <h3>Let's find your perfect stay</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, cupiditate?</p>
            <Button type="primary" large>
                <Image src="/assets/images/search.svg" alt="Search" width={20} height={20} />
                Start your search
            </Button>
        </div>
    );
};

export default CTASection;
