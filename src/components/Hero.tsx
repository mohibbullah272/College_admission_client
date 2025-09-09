

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { Link } from "react-router";

interface Hero115Props {
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  button?: {
    text: string;

  };
}

const Hero = ({

  heading = "Explore Colleges. Shape Your Future",
  description = "From admission requirements to campus insights — find everything you need to choose the right college. Our portal makes it simple to search, compare, and apply, helping you take the next step toward your academic dreams",
  button = {
    text: "Discover Now",
  
   
  },


}: Hero115Props) => {
  return (
    <section className="overflow-hidden py-32 px-7">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
             <Logo></Logo>
            </span>
            <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" asChild>
                <Link to={'/colleges'}>
                  {button.text} 
                </Link>
              </Button>
             
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
};

export { Hero };
