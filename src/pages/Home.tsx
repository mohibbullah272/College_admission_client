import { Gallery6 } from "@/components/CollegeGallery";
import { Hero } from "@/components/Hero";
import PopularCollege from "@/components/PopularCollege";
import ReviewSection from "@/components/ReviewSection";


const Home = () => {
    return (
        <div >
         <Hero></Hero>
    <div className="max-w-7xl mx-auto px-5">
    <PopularCollege></PopularCollege>
          <Gallery6></Gallery6>
          <ReviewSection></ReviewSection>
    </div>
        </div>
    );
};

export default Home;