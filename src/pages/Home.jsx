import React, { lazy } from "react";
import Hero from "../components/hero/Hero";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import BrandArea from "../components/brands/brands";
import HomeInfoSection from "../components/homeInfoSection/HomeInfoSection";
import ProjectsTestimonial from "../components/projectsTestimonial/ProjectsTestimonial";
import { home_testimonials } from "../utils/variables";
import Stats from "../components/stats/Stats";
import viceChairmanImage from '../assets/img/about/yousaf_sb.webp'
import viceChairmanImageMobile from '../assets/img/about/yousaf_sb_sm.jpg'


// import HeroWithTypingTest from "../components/hero/HeroWithTyping.test";
const HeroContent = lazy(() =>
  import("../components/heroContent/HeroContent")
);
const DonationForm = lazy(() =>
  import("../components/donationForm/DonationForm")
);

const DonationFeatures = lazy(() =>
  import("../components/donationfeatures/DonationFeatures")
);
const Mission = lazy(() =>
  import("../components/mission/Mission")
);
const Directors = lazy(() => import("../components/directors/Directors"));
const Projects = lazy(() => import("../components/projects/Projects"));
const DonationCta = lazy(() =>
  import("../components/donationCta/DonationCta")
);
const Footer = lazy(() => import("../components/footer/Footer"));
// const Partners = lazy(() => import("../components/partners/Partners"));

const Home = ({ showHomeInfoSection = false }) => {
  // Simple progressive loading - components load when they're about to enter viewport
  const [restRef] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
          <Hero />    
            <HeroContent />
            
      {/* Rest of components - Load when near viewport */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
              <DonationFeatures />
              <div id="about-section">
               <Mission />
                </div>
                 <Directors
                              imageUrl={viceChairmanImage}
                              mobileImageUrl={viceChairmanImageMobile}
                              directorName="Molana Yousaf Jamil"
                              directorRole="Vice Chairman's Message"
                              directorTexts={[
                                "Molana Yousaf Jamil continues the legacy of service with a relentless focus on community uplift. He oversees programs that bring educational and spiritual guidance to families across Pakistan.",
                                "As Vice Chairman, he champions initiatives that strengthen social welfare, ensuring transparency and compassion remain at the heart of every MTJ Foundation project.",
                                "His vision inspires our teams to lead with humility, fostering a culture rooted in faith, integrity, and inclusive progress.",
                              ]}
                            />
              <div id="programs-section">
                  <Projects />
              </div>
              {/* <ImpactNumbers /> */}
              <Stats />
              <BrandArea />
              <ProjectsTestimonial
                videos={home_testimonials.videos}
                title={home_testimonials.title}
                subtitle={home_testimonials?.subtitle}
              />
              {showHomeInfoSection && <HomeInfoSection />}
                <div id="contact-section">
                   <DonationForm />
                </div>
              <DonationCta />
               <Footer />
      </div>
    </>
  );
};

export default Home;
