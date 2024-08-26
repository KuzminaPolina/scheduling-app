
export const checkTokenValidity = async (year: number, month: number, day: number) => {
    if (localStorage.getItem("token")) {
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

        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};
