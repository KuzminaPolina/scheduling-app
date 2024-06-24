import { Link } from "react-router-dom";
import { june } from "../constants";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";

//const AUTH_URL = '/api_admin/authorization'
/* const AUTH_DATA = {
  username: 'qq@qq.qq',
  mail: 'qq@qq.qq',
  password: 'qq@qq.qq'
}
 */
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const today = currentDate.getDate();
const currentDay = `${currentYear}-${currentMonth}-${today}`


const getCurrentMonthLessonsUrl = `/api_admin/get_lessons_for_a_month/${currentDay}`;

interface lesson {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  selectedDate: string,
  selectedTime: string,
  confirmed: boolean,
}

interface month {
  id: number,
  date: string,
  lessons:lesson[],
}

//Запрос на бэк на получение данных об уроках на месяц
const AdminPanel = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //устанавливаю состояние для "текущего месяца". При получении ответа от сервера, сюда будет подставляться инфа от сервера
  const [currentMonthLessons, setCurrentMonthLessons] = useState<month[]>(june);

  useEffect(()=>{
    const getCurrentMonthLessons = async () => {
      setIsLoading(true);
      try {
        const request = new Request(getCurrentMonthLessonsUrl, {
          method: "GET",
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udEBmcm9udC5mcm9udCIsImV4cCI6MTcxNzQzNDA2M30.F05xtGoPaBwRkzBXlb67thgYpyyTT2TcyqWjTPEAAUE',
          }
        })
        const response = await fetch(request)
        const data = await response.json() as month[];
        getCurrentMonthLessons();
        setCurrentMonthLessons(data);   
      } catch (e: any) {
        console.error("Request error:", e);
        setError(e);        
      } finally {
        setIsLoading(false);
      }
    }
  }, [])

  
  if (isLoading) {
    return (
      <section id="reviews" className="px-4 md:px-10 lg:px-32 py-28">
      <div className="max-w-[80rem] mx-auto mb-24">
        <div className="relative">
          <p className="text-3xl md:text-6xl text-[#c8b0c9] text-right">
            Admin's Panel
          </p>
          <h2 className="text-4xl md:text-5xl text-[#754444] font-bold text-right mr-28 md:mr-[280px] mt-[-10px] z-20">
            控制面板
          </h2>
        </div>
      </div>
      <Link to="/english-teacher-website" className="cursor-pointer my-5">
        ← Back to home page
      </Link>
      <div className="max-w-[90rem] mx-auto diagonal flex justify-center py-20">
        <div>Content is Loading...</div>
      </div>
    </section>
    )
  }

  if (error) {
    return (
      <section id="reviews" className="px-4 md:px-10 lg:px-32 py-28">
      <div className="max-w-[80rem] mx-auto mb-24">
        <div className="relative">
          <p className="text-3xl md:text-6xl text-[#c8b0c9] text-right">
            Admin's Panel
          </p>
          <h2 className="text-4xl md:text-5xl text-[#754444] font-bold text-right mr-28 md:mr-[280px] mt-[-10px] z-20">
            控制面板
          </h2>
        </div>
      </div>
      <Link to="/english-teacher-website" className="cursor-pointer my-5">
        ← Back to home page
      </Link>
      <div className="max-w-[90rem] mx-auto diagonal flex justify-center py-20">
        <div>Something went wrong, please reload the page</div>
      </div>
    </section>
    )
  }

  return (
    <section id="reviews" className="px-4 md:px-10 lg:px-32 py-28">
      <div className="max-w-[80rem] mx-auto mb-24">
        <div className="relative">
          <p className="text-3xl md:text-6xl text-[#c8b0c9] text-right">
            Admin's Panel
          </p>
          <h2 className="text-4xl md:text-5xl text-[#754444] font-bold text-right mr-28 md:mr-[280px] mt-[-10px] z-20">
            控制面板
          </h2>
        </div>
      </div>
      <Link to="/english-teacher-website" className="cursor-pointer my-5">
        ← Back to home page
      </Link>
      <div className="max-w-[90rem] mx-auto diagonal flex justify-center py-20">
        <table>
          <thead>
            <tr>
              <th className="w-[150px] h-[100px] text-center text-black">Date</th>
              <th className="w-[150px] h-[100px] text-center text-black">Time</th>
              <th className="w-[150px] h-[100px] text-center text-black">Name</th>
              <th className="w-[150px] h-[100px] text-center text-black">Email</th>
              <th className="w-[150px] h-[100px] text-center text-black">Phone</th>
              <th className="w-[150px] h-[100px] text-center text-black">Confirmation</th>
            </tr>
          </thead>
          <tbody>
            {currentMonthLessons.map((day)=>(
              <Fragment key={day.id}>
                {day.lessons.map((lesson)=>(
                  <tr className="gradient-bg" key={lesson.id}>
                    <td className="w-[150px] h-[50px] text-center text-black">{day.date}</td>
                    <td className="w-[150px] h-[50px] text-center text-black">{lesson.selectedTime}</td>
                    <td className="w-[150px] h-[50px] text-center text-black">{lesson.lastName} {lesson.firstName}</td>
                    <td className="w-[150px] h-[50px] text-center text-black">{lesson.email}</td>
                    <td className="w-[150px] h-[50px] text-center text-black">{lesson.phone}</td>
                    <td className="w-[150px] h-[50px] text-center text-black">{lesson.confirmed ? "Yes" : "No"}</td>
                  </tr>                  
                ))}              
              </Fragment>
            ))}  
          </tbody>                  
        </table>
      </div>
    </section>
  );
};


export default AdminPanel;
