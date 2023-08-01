import Logo1 from '../../assets/Cube_small 1.png';
import Logo2 from '../../assets/Sphere_small 1.png';

export default function Header() {
	return (
		<header className="sm:py-32 flex flex-row justify-between items-center text-center bg-custom-purple h-[30rem] pt-20 pb-32">
			
			<img src={Logo1} alt="Gaddr Logo" className="w-60 h-60 mt-48 ml-16" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-xs font-semibold uppercase text-[#6136FF] tracking-wide">
					Sök & Registrera dig på kurs
				</h1>
				<h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
					Business Courses
				</h1>
				<h1 className="text-lg text-[#E9E9E9] font-light mt-5">
					Gaddr Academy courses are developed and taught by industry experts to improve your practical experience.
					Expand your skillset regardless of industry and background. You can also request a personalised course.
				</h1>
			</div>

			<img src={Logo2} alt="Another Logo" className="w-50 h-40 mb-48 mr-40" />
		</header>
	)
}
