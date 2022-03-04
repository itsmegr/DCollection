import moment from "moment";

export default function GetDateDisplayFormat(date: Date): string {
    return moment(date).format("lll");
}