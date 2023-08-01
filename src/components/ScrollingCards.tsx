import { selectData, useAppSelector, useAppDispatch, setSelectedCategory, setSearchKeyword } from "../state";
import { Category } from "../utils/types";

interface CardProps {
  title: string;
  dispatch: any;
  searchCourses: (keyword: string) => void;
  category?: Category;
}

const Card: React.FC<CardProps> = ({ title, dispatch, searchCourses, category }) => (
  <button
    onClick={() => {
      dispatch(setSearchKeyword(""))
      searchCourses("")
      if (category) {
        dispatch(setSelectedCategory(category))
      }
    }}
    className="relative w-[202px] h-[135px] rounded-lg p-6 flex flex-col justify-center items-center overflow-hidden hover:opacity-75 xl:w-auto"
  >
    <span aria-hidden="true" className="absolute inset-0">
      <div className="bg-purple w-full h-full object-center object-cover" />
    </span>
    <span className="relative text-center text-xl font-bold text-white font-['Assistant'] font-semibold">
      {title}
    </span>
  </button>
)

interface IScrollingCards {
  searchCourses: (keyword: string) => void;
}

export default function ScrollingCards({ searchCourses }: IScrollingCards) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectData);
  const cards = ["Tech", "Design", "Marketing", "Business"];

  return (
    <div className="py-16 sm:py-24 xl:max-w-[861px] xl:mx-auto">
      <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
        <h2 className="text-base font-medium text-[#E9E9E9]">Välj kategori:</h2>
      </div>

      <div className="mt-2 flow-root">
        <div className="-my-2">
          <div className="box-content py-2 relative h-[135px] overflow-x-auto xl:overflow-visible">
            <div className="absolute px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-4 xl:gap-x-4">
              {cards.map(title => (
                <Card title={title} dispatch={dispatch} searchCourses={searchCourses} />
              ))}
              {categories.map(category => (
                <Card title={category.category_name} dispatch={dispatch} searchCourses={searchCourses} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
