import { websiteData as data } from "@/data/websiteData";
import "../../styles/hero-section/index.scss";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section id="hero-section">
        <div className="hero-section">
          <div className="hero-section-content">
            <h1>{data.heroSection.title}</h1>
            <p>{data.heroSection.subTitle}</p>
            <Link href="#">{data.heroSection.target}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection;