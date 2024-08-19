import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAdminStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { sendLessonRequest } from "../api/sendLessonRequest";

type FormFields = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  selectedDate: string;
  time: string;
};

const LessonForm = observer(() => {
  const store = useAdminStore();

  //Для React-hook-form
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  useEffect(() => {
    setValue("selectedDate", store.selectedDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [store.selectedDate]);

  //Отправка данных из формы на сервер:
  const onLessonFormSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await sendLessonRequest(data);
      if (response.ok) {
        // Очистить значения ввода в форме
        reset();
      }
    } catch (error) {
      // Обработка ошибок при выполнении запроса
      console.error("Request error:", error);
      setError("root", {
        message: "Something went wrong, please refresh the page and try again",
      });
    }
  };

  return (
    <>
      <form
        id="appointmentForm"
        className="flex flex-col gap-5"
        autoComplete="off"
        onSubmit={handleSubmit(onLessonFormSubmit)}
      >
        <input
          {...register("name", { required: "Please enter your name" })}
          type="text"
          placeholder="Name"
          className="p-2 rounded-md text-black w-full"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <input
          {...register("surname", { required: "Please enter your surname" })}
          type="text"
          placeholder="Surname"
          className="p-2 rounded-md text-black w-full"
        />
        {errors.surname && (
          <div className="text-red-500">{errors.surname.message}</div>
        )}
        <input
          {...register("phone", {
            required: "Please enter a valid phone number",
            pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
          })}
          type="tel"
          placeholder="Phone"
          className="p-2 rounded-md text-black w-full"
        />
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
        <input
          {...register("email", {
            required: "Please enter a valid email",
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
          type="email"
          placeholder="Email"
          className="p-2 rounded-md text-black w-full"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <input
          {...register("selectedDate", {
            required: "Please choose a preferable date in the calendar",
          })}
          readOnly
          name="selectedDate"
          type="text"
          placeholder="Select a date"
          className="p-2 rounded-md text-black w-full"
        />
        {errors.selectedDate && (
          <div className="text-red-500">{errors.selectedDate.message}</div>
        )}

        <label htmlFor="time">Choose suitable time:</label>
        <select
          {...register("time", {
            required: "Please choose your most suitable time",
          })}
          id="time"
          name="time"
          className="p-2 rounded-md text-black w-full"
        >
          <option value="8">8 am</option>
          <option value="9">9 am</option>
          <option value="10">10 am</option>
          <option value="11">11 am</option>
        </select>
        {errors.time && (
          <div className="text-red-500">{errors.time.message}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-400 p-2 rounded-md"
        >
          {isSubmitting ? "Loading" : "Submit"}
        </button>
      </form>
      <div id="message" style={{ display: "none" }}></div>
    </>
  );
});

export default LessonForm;
