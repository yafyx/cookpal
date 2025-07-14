import MealCard from './MealCard';

interface MealPlan {
  day: string;
  recipe: {
    name: string;
    image: string;
  };
}

const mockMealPlan: MealPlan[] = [
  {
    day: 'Mon',
    recipe: {
      name: 'Kangkung',
      image:
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    day: 'Tue',
    recipe: {
      name: 'Beef Burger',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    day: 'Wed',
    recipe: {
      name: 'Kangkung',
      image:
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    day: 'Thur',
    recipe: {
      name: 'Kangkung',
      image:
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    day: 'Fri',
    recipe: {
      name: 'Kangkung',
      image:
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    day: 'Sat',
    recipe: {
      name: 'Kangkung',
      image:
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
    },
  },
  {
    day: 'Sun',
    recipe: {
      name: 'Kangkung',
      image:
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
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
