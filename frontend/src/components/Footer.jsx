import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-3">
                        LuxStay
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Experience luxury stays with world-class comfort, premium rooms,
                        and exceptional hospitality designed for unforgettable moments.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="/hotels" className="hover:text-white">Hotels</a></li>
                        <li><a href="/rooms" className="hover:text-white">Rooms</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Luxury Rooms</li>
                        <li>Online Booking</li>
                        <li>24/7 Support</li>
                        <li>Premium Amenities</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Bengaluru, India</li>
                        <li>+91 XXXXXXXX</li>
                        <li>support@luxstay.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-400">
                © {new Date().getFullYear()} LuxStay. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
