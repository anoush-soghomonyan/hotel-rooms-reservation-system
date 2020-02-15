import {getReservations, login, registration, updateReservation} from "../../backend/Apis";

export const API_LOGIN = login;
export const API_REGISTER = registration;
export const API_GET_RESERVATIONS = getReservations;
export const API_ADD_RESERVATION = updateReservation;
