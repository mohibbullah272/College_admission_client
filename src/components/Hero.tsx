



import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const Hero7 = ({
  heading = "Explore Colleges. Shape Your Future",
  description = "From admission requirements to campus insights — find everything you need to choose the right college. Our portal makes it simple to search, compare, and apply, helping you take the next step toward your academic dreams.",
  button = {
    text: "Discover all Colleges",
    url: "/colleges",
  },
 
}: Hero7Props) => {
  return (
    <section className="py-32">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <Link to={button.url}>{button.text}</Link>
        </Button>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
        
 
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
