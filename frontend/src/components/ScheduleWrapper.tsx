import { observer } from "mobx-react-lite";
import Calendar from "./Calendar";
import LessonForm from "./LessonForm";

const ScheduleWrapper = observer(() => {
  return (
    <div className="md:grid grid-cols-2">
      <Calendar />
      <LessonForm />
    </div>
  );
});

export default ScheduleWrapper;
