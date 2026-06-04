import Image from 'next/image'
import Envelope from '../icons/Envelope'
import LinkedIn from '../icons/LinkedIn'

export default function Footer() {

    const contactInfo = [
        {
            icon: <Envelope />,
            label: 'Email',
            href: 'mailto:kmd98x@hotmail.com',
            target: '_self',
            value: 'kmd98x@hotmail.com'
        },
        {
            icon: <LinkedIn />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/kmd98/',
            target: '_blank',
            value: 'Martina Doekharan'
        }
    ]

    return (
        <footer className="relative py-24">
            <div className="w-[1102px] h-[812px] absolute top-0 right-0">
                <Image src="/footer-foto.png" alt="Logo" width={1102} height={812} className="w-full h-full object-cover" />
            </div>

            <section className="max-w-[1364px] mx-auto">
                <h2 className='text-7xl font-montez'>Neem contact op</h2>
                <p className='max-w-[70ch] text-2xl font-alegreya-sans mt-6'>Zin om samen te werken of gewoon even hallo te zeggen? Stuur me dan gerust een bericht via onderstaand e-mailadres of LinkedIn.</p>

                <div className="flex gap-20 mt-10 items-center">
                    {contactInfo.map((item) => (
                        <div key={item.label} className='flex gap-3 item-center'>
                            <div className="w-20 h-20 rounded-full bg-[#231F1C] flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div className='flex flex-col justify-center'>
                                <p className='font-alegreya-sans'>{item.label}</p>
                                <a href={item.href} target={item.target} className='text-2xl font-alegreya-sans'>{item.value}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </footer>
    )
}
