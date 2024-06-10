import { useRouter } from 'next/navigation';

/* eslint-disable @next/next/no-img-element */
// /components/FacilityCard.js
const sportsEmojis = {
  basketball_available: '🏀',
  football_available: '⚽',
  volleyball_available: '🏐',
};

const dayAbbreviations = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const BuyCard = ({ facility }) => {
  const router = useRouter();
  const availableDays = [
    facility.monday_available,
    facility.tuesday_available,
    facility.wednesday_available,
    facility.thursday_available,
    facility.friday_available,
    facility.saturday_available,
    facility.sunday_available,
  ];

  const handleShowMore = () => {
    router.push(`slot/${facility.slot_id}`);
  };

  return (
    <div className="bg-white shadow-xl rounded-md overflow-hidden border border-gray-200">
      <div className="flex justify-center items-center border-b border-gray-300">
        <img src={facility.slot_photo} alt={facility.name} className="object-cover h-52 w-full" />
      </div>

      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{facility.name}</h2>
        </div>
        <div className="flex space-x-1">
          {Object.keys(sportsEmojis).map((key) => facility[key] && <span key={key}>{sportsEmojis[key]}</span>)}
        </div>
      </div>

      <div className="p-4 border-t border-gray-300">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Availability</h3>
        <div className="flex space-x-1">
          {dayAbbreviations.map((day, index) => (
            <span
              key={day}
              className={`px-2 py-1 rounded-full ${availableDays[index] ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              {day}
            </span>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {facility.start_time} - {facility.end_time}
        </p>
        <p className="mt-2 text-sm text-gray-500">{facility.address}</p>
      </div>

      <div className="p-4 border-t border-gray-300 flex justify-between items-center">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={handleShowMore}>
          Show More
        </button>
      </div>
    </div>
  );
};

export default BuyCard;
