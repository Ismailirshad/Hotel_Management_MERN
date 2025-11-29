import { useState } from "react";
import { FaHome, FaFilm, FaInfoCircle, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [signup, setSignup] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: "Home", id: "home", icon: <FaHome /> },
        { name: "Hotels", id: "hotels", icon: <FaFilm /> },
        { name: "Offers", id: "offers", icon: < FaEnvelope /> },
        { name: "About us", id: "about", icon: < FaInfoCircle /> },
    ];

    return (
        <nav className="fixed top-0 w-full bg-gray-900/80 text-white shadow-lg z-50 ">
            <div className="mx-auto px-4">
                <div className="flex justify-around items-center h-16">
                    <div className="flex items-center">
                        <img
                            src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                            alt="Theatre Logo"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="ml-2 text-xl font-bold">Hotex</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                className="flex items-center space-x-1  transition-all duration-300 ease-in-out hover:scale-60 hover:-translate-y-1"
                                href={`#${link.id}`}
                            >
                                <span>{link.icon}</span>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden ">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-red-500 transition-colors duration-200"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>



                    {/* <!-- Modal toggle --> */}
                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="text-black bg-slate-300 box-border border 
                     hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-1.5 focus:outline-none
                      transition-all duration-300 ease-in hover:scale-105" type="button">
                        {signup ? "Signup" : "Login"}
                    </button>

                    {/* <!-- Main modal --> */}
                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 
                    z-80 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full rounded-xl bg-gray-900/80">
                            {/* <!-- Modal content --> */}
                            <div className="relative bg-neutral-primary-soft border border-default rounded-xl shadow-sm p-4 md:p-6">
                                {/* <!-- Modal header --> */}
                                <div className="flex items-center justify-center pb-4 md:pb-5">
                                    <h3 className="text-2xl font-medium text-heading px-36">
                                        {signup ? "Signup" : "Login"}
                                    </h3>
                                    <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form onSubmit={handleSubmit} className="pt-4 md:pt-6">
                                    {signup && (

                                        <div className="mb-4">
                                            <label for="name" className="block mb-2.5 text-sm font-medium text-heading">Name</label>
                                            <input type="text" id="name" value={form.name} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Enter name" required />
                                        </div>
                                    )}
                                    <div >
                                        <label for="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                                        <input type="email" id="email" value={form.email} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Enter email" required />
                                    </div>
                                    <div>
                                        <label for="password" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
                                        <input type="password" id="password" value={form.password} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••" required />
                                    </div>
                                    <div className="flex items-start my-6">
                                        <div className="flex items-center">
                                            <input type="checkbox" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                                            <label for="checkbox-remember" className="ms-2 text-sm font-medium text-heading">Remember me</label>
                                        </div>
                                        <a href="#" className="ms-auto text-sm font-medium text-fg-brand hover:underline">Lost Password?</a>
                                    </div>
                                    <button type="submit" className="text-white bg-brand box-border border  hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-xl px-4 py-2.5 focus:outline-none w-full mb-3">{signup ? "Signup" : "Login"} </button>
                                    <div className="text-sm font-medium text-body">{signup ? "Already have an account?" : "Not registered?"}  <a onClick={() => setSignup(!signup)} className="text-fg-brand hover:underline cursor-pointer">{signup ? "Login" : "Create account"}</a></div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden trnasition-all duration-300 ease-in ">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navLinks.map((link, index) => (
                                <button
                                    key={index}
                                    className="flex items-center space-x-2 w-full px-3 py-2 text-white hover:bg-red-700 rounded-md transition-colors duration-200"
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </nav>


    );
};

export default Navbar;
