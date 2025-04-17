import Hero from "../components/layout/hero/hero";
import HomeMenu from "../components/layout/HomeMenu/HomeMenu";
import SectionHeaders from "../components/SectionHeaders/SectionHeaders";

export default function Home() {
  return (
   <>
    
    <Hero />
    <HomeMenu />
    <section id="about" className="  text-center my-16 ">
      <SectionHeaders 
        subHeader={'Our story'}
        minHeader={'About us'}
      />
      <div className=" text-gray-500 max-w-md mx-auto flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque officia eum beatae dolorum, quia minima dolore consectetur, reiciendis, porro ad sapiente nihil qui dolores! Nisi praesentium soluta delectus repudiandae necessitatibus.  
        </p>
        <p>
           consectetur adipisicing elit. Id minus voluptatem nemo explicabo nulla earum minima eveniet et consequatur ipsum labore maiores unde, hic sint vel velit. Blanditiis, recusandae temporibus?
        </p>
          <p>
             Qui rem animi nemo, ducimus error nam dicta perferendis quas ullam molestiae sunt aliquid illum, dignissimos debitis provident iure quidem suscipit quasi.
          </p>
      </div>
    </section>
    <section id="contact" className=" text-center my-8">
    <SectionHeaders 
        subHeader={'Don\'t hesitate'}
        minHeader={'Contact us'}
      />
      <div className=" mt-8">
        <a className=" text-4xl underline text-gray-500"
          href="tel:01141663546" >
        01141663546
        </a>
      </div>
    </section>
   
   </>
  );
}
