import { ScrollingCards, CardsListContainer } from "../../components";
import * as types from "../../utils/types";

interface IContent{
	courses: types.Course[];
	populateCoursesBySearch: (keyword: string) => Promise<void>;
}

export default function Content({ courses, populateCoursesBySearch}: IContent) {
	return (
		<main className="sm:-mt-48 -mt-40">
			<ScrollingCards searchCourses={populateCoursesBySearch} />
			<div className="mx-auto px-6 pb-6 sm:px-20 lg:px-20 rounded-lg">
				<CardsListContainer
					courses={courses}
					searchCourses={populateCoursesBySearch}
				/>
			</div>
		</main>
	)
}