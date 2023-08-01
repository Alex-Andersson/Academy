import { selectData, useAppSelector } from "../../state";

import * as types from "../../utils/types";

export default function Header() {
  const { currentCourse } = useAppSelector(selectData);

	return (
		<header className="relative overflow-hidden pt-32 pb-72">
			<div className="max-w-7xl pb-12 px-6 py-6 sm:px-20 lg:px-20 ">
				<span aria-hidden="true" className="absolute inset-0 z-[-100]">
					<div className="bg-[url('/images/bg.png')] w-full h-full bg-center bg-cover bg-[#628700] bg-blend-multiply" />
				</span>
				<h1 className="relative mt-auto text-6xl font-extrabold text-white mt-2 tracking-tight">
					{currentCourse !== undefined
						? currentCourse.course.course_name
						: "Inte tillgänglig"}
				</h1>
				<h1 className="relative mt-6 text-xl text-[#D1D5DB] font-normal mt-5">
					{currentCourse !== undefined
						? currentCourse.subcategories.join(", ")
						: ""}
				</h1>
			</div>
		</header>
	)
}