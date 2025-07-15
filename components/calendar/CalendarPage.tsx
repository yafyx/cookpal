import MealCard from './MealCard';

interface MealPlan {
  day: string;
  recipe: {
    name: string;
  };
}

const mockMealPlan: MealPlan[] = [
  {
    day: 'Mon',
    recipe: {
      name: 'Kangkung',
    },
  },
  {
    day: 'Tue',
    recipe: {
      name: 'Beef Burger',
    },
  },
  {
    day: 'Wed',
    recipe: {
      name: 'Kangkung',
    },
  },
  {
    day: 'Thur',
    recipe: {
      name: 'Kangkung',
    },
  },
  {
    day: 'Fri',
    recipe: {
      name: 'Kangkung',
    },
  },
  {
    day: 'Sat',
    recipe: {
      name: 'Kangkung',
    },
  },
  {
    day: 'Sun',
    recipe: {
      name: 'Kangkung',
    },
  },
];

export default function CalendarPage() {
  const handleMealClick = (_meal: MealPlan) => {
    // TODO: Implement meal click navigation
  };

  return (
    <div className="flex-1 bg-white px-4 py-6">
      {/* Calendar Content */}
      <div className="flex overflow-x-auto">
        {/* Day Labels */}
        <div className="flex w-[38px] shrink-0 flex-col">
          {mockMealPlan.map((meal) => (
            <div
              className="mb-[-1px] flex h-[96px] items-center justify-start px-0.5"
              key={meal.day}
            >
              <span className="font-normal text-[#181d27] text-[14px] leading-[20px]">
                {meal.day}
              </span>
            </div>
          ))}
        </div>

        {/* Meal Cards Column */}
        <div className="flex flex-1 flex-col">
          {mockMealPlan.map((meal, index) => (
            <div
              className={index < mockMealPlan.length - 1 ? 'mb-[-1px]' : ''}
              key={meal.day}
            >
              <MealCard
                onClick={() => handleMealClick(meal)}
                recipe={meal.recipe}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
