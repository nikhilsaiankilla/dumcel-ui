import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="w-full relative max-w-7xl mx-auto px-4 md:p-10 mb-5">
            {/* Footer note */}
            <p className="text-center text-gray-400 py-5 text-sm">
                Developed by <Link href='https://nikhilsaiankilla.blog' target='_blank' className="font-semibold text-amber-400">Nikhil Sai Ankilla</Link> &mdash; Building Dumcel for effortless React deployments and analytics.
            </p>
        </footer>
    )
}

export default Footer
 