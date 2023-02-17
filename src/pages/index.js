import Image from 'next/image'
import homeImage from '@/images/Business_SVG.svg'
import Link from 'next/link'

const Hero = () => (
  <section className="text-gray-800 min-h-screen">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl">Unlock Your
				<span className="text-violet-400"> Potential,</span><br/>Pass Your <span className="text-violet-400">Exams</span>
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">Practice for your competitive exams
			<br/>
				<br className="hidden md:inline lg:hidden"/> Get ready for your exam by practicing with our quiz questions from various subjects.
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link rel="noopener noreferrer" href="/practice" className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-violet-900 hover:bg-violet-600 hover:text-white">Start Practice</Link>
				{/* <Link rel="noopener noreferrer" href="/login" className="px-8 py-3 text-lg font-semibold border-2 rounded border-gray-100 hover:text-violet-600 hover:border-violet-600">login</Link> */}
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<Image src={homeImage} width='auto' height='auto' alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
)

export default Hero
