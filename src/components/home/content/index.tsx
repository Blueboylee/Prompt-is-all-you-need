import Image from "next/image";
import styles from "./index.module.scss";

export function Hero() {
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Discover and Find Your Own Fashion!</h1>
          <p>Explore our curated collection of stylish clothing and accessories tailored to your unique taste.</p>
          <button className={styles.exploreButton}>
            EXPLORE NOW
          </button>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/fashion-model.jpg"
            alt="Fashion model"
            width={500}
            height={600}
            priority
          />
        </div>
      </div>
    </main>
  );
}