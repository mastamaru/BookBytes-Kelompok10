const API_URL = "https://book-bytes-kelompok10.vercel.app";

export const fetchEmployees = async () => {
  try {
    const employeeResponse = await fetch(`${API_URL}/employee`);
    if (!employeeResponse.ok) {
      throw new Error("Network response was not ok for employee");
    }
    const employeesData = (await employeeResponse.json()).data; // Perubahan disini

    return employeesData;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

export const delEmployees = async (employId) => {
  try {
    const response = await fetch(`${API_URL}/employee/${employId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Employee Deleted Successfully!");
    } else {
      const errorData = await response.json();
      alert("Fail");
      console.log(errorData);
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};
