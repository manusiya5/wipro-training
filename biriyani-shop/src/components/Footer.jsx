import { Link } from "react-router-dom";
function Footer()
{
return (

    <footer className="  my-4 px-5 p-5 py-5 w-full flex items-center justify-between bg-black text-amber-50" >
      <div className ="text-xl font-bold p-10"> 
        <p>Anusiya</p>
        <p>6379458274</p>
        <Link to="/contact">Contact us</Link>
        </div>
      <i className=" font-light ">Spice that hits the soul😊</i>
      <a className ="text-xl font-bold p-10" href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu/@13.0479859,79.8789951,10z/data=!3m1!4b1!4m6!3m5!1s0x3a5265ea4f7d3361:0x6e61a70b6863d433!8m2!3d13.0843007!4d80.2704622!16zL20vMGM4dGs?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D">Visit</a>
</footer>
);


}
export default Footer;