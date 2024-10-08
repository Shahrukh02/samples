import { useState } from 'react';
import ApiManager from '../helpers/api-manager';

const useNextLessonData = () => {
  const [nextLessonData, setNextLessonData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getYourNextLesson = async (fromDate, toDate) => {
    setLoader(true);
    try {
      let { data } = await ApiManager('get', `bookings?from=${fromDate}&to=${toDate}`);
      if (data?.bookings.length > 0) {
        setNextLessonData(data?.bookings);
        setLoader(false);
      } else {
        setNextLessonData([]);
      }
    } catch (error) {
      console.log("Error fetching next lesson data:", error);
      setNextLessonData([]);
    } finally {
      setLoader(false);
    }
  };

  return { nextLessonData, loader, getYourNextLesson };
};

export default useNextLessonData;
