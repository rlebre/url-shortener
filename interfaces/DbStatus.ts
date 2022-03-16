import { StatusCode } from '../constants/StatusCodes';

export default interface DbStatus {
  status: StatusCode;
  message: string;
}
