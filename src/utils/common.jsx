import { toast } from "react-toastify";

export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavBooking = (id, favorites) => {
  try {
    if (Array.isArray(favorites) && favorites.includes(id)) {
      return favorites?.filter((fav) => fav !== id);
    } else {
      return [...favorites, id];
    }
  } catch (error) {
    throw error;
  }
};

export const persistfav = (id, favourites) => {
  return Array.isArray(favourites) && favourites?.includes(id)
    ? "red"
    : "white";
};

export const checkNull = (val) => {
  return val === null || val === undefined || val === ""
}

export const validateValue = (val) => {
  return val?.length < 3 || checkNull(val) ? "Must contains at least 3 characters" : null 
}
