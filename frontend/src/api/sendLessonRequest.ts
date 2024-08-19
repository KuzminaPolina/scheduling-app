type FormFields = {
    name: string;
    surname: string;
    phone: string;
    email: string;
    selectedDate: string;
    time: string;
};

export const sendLessonRequest = async (data:FormFields) => {
    const response = await fetch (
        "/api_calendar/receiving-data-from-the-calendar",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
};