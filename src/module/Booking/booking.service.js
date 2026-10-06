import { BadRequestException, UnAuthorizedException } from "../../common/index.js";
import { bookingModel } from "../../database/model/booking.model.js";

export const createBooking = async (body, user) => {
    let { title, bookingData, status, userID } = body;
    if (userID !== user.id) return UnAuthorizedException()
    if (bookingData < new Date()) return BadRequestException({ message: "Booking Past" })
    let data = await bookingModel.create({ title, status, userID, bookingData })
    if (data) return { message: "Done", data }
    else return BadRequestException({ message: "Error" })
}

export const getAllBooking = async (user) => {
    let data = await bookingModel.find({ userID: user.id }).populate()
    if (data) return { message: "Done", data }
    else return BadRequestException({ message: "Error" })
}

export const upadateBooking = async (params, user, body) => {
    let id = params
    let { title, bookingData, userID } = body
    if (userID !== user.id) return UnAuthorizedException()
    let data = await bookingModel.findOneAndUpdate({ id: new ObjectId(id) }, { title, bookingData })
    console.log(data);
    if (data) {

        return { message: "Done", data }
    }
    else return BadRequestException()
}

export const deleteBooking = async (params, user) => {
    let { title, bookingData, userID } = params
    if (userID !== user.id) return UnAuthorizedException()
    let data = await bookingModel.findOneAndDelete({ title, bookingData })
    if (data) return { message: "Done" }
    else return BadRequestException()
}