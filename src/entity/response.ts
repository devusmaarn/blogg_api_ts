import type { Response } from "express";

export class ResponseEntity {
  public status: number;
  public message?: string;
  public data?: any;
  public errors?: any;

  constructor(status: number, message?: string, data?: any, errors?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  public static badRequest(res: Response, message: string, errors?: any) {
    const response = new ResponseEntity(400, message, null, errors);
    res.status(response.status).json(response);
  }

  public static validationError(res: Response, errors?: any) {
    ResponseEntity.badRequest(res, "Validation Error", errors);
  }

  public static success(res: Response, status: number, data?: any) {
    const response = new ResponseEntity(status, "Success", data, null);
    res.status(response.status).json(response);
  }

  public static serverError(res: Response, message: string) {
    const response = new ResponseEntity(500, message, null, null);
    res.status(response.status).json(response);
  }
}
