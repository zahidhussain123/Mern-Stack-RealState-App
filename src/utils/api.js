import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"

export const api = axios.create({
  baseURL: "https://mern-stack-real-state-app-server.vercel.app/api"
})

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/residency");
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("Something went wrong!")
    throw error
  }
}

export const getSingleProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`);
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("Something went wrong!")
    throw error
  }
}

// export const createUser = async (email, token) => {
//    try {
//    const response = await api.post(`user/register`, {email}, {
//       headers: {
//          Authorization: `Bearer ${token}`
//       }
//    })
//    // return response      
//    } catch (error) {
//       toast.error("Something went wrong")
//    }
// }

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const bookingVisitDetails = async (token, email, id, date) => {
  if (!token) return
  try {
    await api.post(`/user/bookVisit/${id}`, { email, id, date: dayjs(date).format("DD/MM/YYYY") }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    toast.error(error.message)
    throw error;
  }
}

export const cancelBooking = async (id, email, token) => {
  try {
    await api.post(`/user/cancelBookVisit/${id}`, { email }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    toast.error(error.message)
  }
}

export const toFav = async (id, email, token) => {
  try {
    const res = await api.post(`/user/favResidency/${id}`, { email }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res?.data;
  } catch (error) {
    toast.error(error.message)
    throw error
  }
}


export const getAllFav = async (email, token) => {
  if (!token) return
  try {
    const res = await api.post("/user/allFav", { email }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data["favResidenciesID"]
  } catch (error) {
    toast.error(error.message)
    throw error
  }
}

export const getAllBook = async (email, token) => {
  if (!token) return
  try {
    const res = await api.post("/user/getBookVisit", { email }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data?.allbooked["bookedVisits"]
  } catch (error) {
    toast.error(error.message)
    throw error
  }
}

export const createRESIDENCY = async (data, token) => {
  if (!token) return
  try {
    await api.post("/residency/create", { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    throw error
  }
}