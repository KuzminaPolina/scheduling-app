type lesson = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    selectedDate: string;
    selectedTime: string;
    confirmed: boolean;
};

type month = {
    id: number;
    date: string;
    lessons: lesson[];
};

export const getLessonsForProvidedDate = async (year:number, month:number, day:number) => {
    const request = new Request(
        `/api_admin/get_lessons_for_a_month/${year}-${month}-${day}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    const response = await fetch(request);
    const data = (await response.json()) as month[];
    return data;
};
