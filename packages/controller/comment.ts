import { NextFunction, Request, RequestHandler, Response } from "express";
import { ICommentService } from "../services";
import {
  ErrorResponse,
  IdQueryParams,
  Nullable,
  PageQueryParams,
  SuccessResponse,
} from "../types";

export interface ICommentController {
  find: RequestHandler<IdQueryParams>;
  findAll: RequestHandler<PageQueryParams>;
  findAllByFeed: RequestHandler<IdQueryParams>;
  create: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}

export class CommentController implements ICommentController {
  private static _instance: Nullable<CommentController> = null;
  private _service: ICommentService;

  private constructor(service: ICommentService) {
    this._service = service;
  }

  static getInstance(service: ICommentService) {
    if (!this._instance) {
      this._instance = new CommentController(service);
    }

    return this._instance;
  }

  find = async (
    req: Request<IdQueryParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const feed = await this._service.find(id);
      res
        .status(200)
        .json(
          new SuccessResponse(feed, "Comment retrieved successfully").toDTO()
        );
    } catch (err) {
      if (!(err instanceof ErrorResponse)) return;
      next(err);
    }
  };

  findAll = async (
    req: Request<PageQueryParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const feeds = await this._service.findAll();
      res
        .status(200)
        .json(
          new SuccessResponse(feeds, "Comments retrieved successfully").toDTO()
        );
    } catch (err) {
      if (!(err instanceof ErrorResponse)) return;
      next(err);
    }
  };

  findAllByFeed = async (
    req: Request<IdQueryParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const clubId = Number(req.params.id);
      const feeds = await this._service.findAllByFeed(clubId);
      res
        .status(200)
        .json(
          new SuccessResponse(feeds, "Comments retrieved successfully").toDTO()
        );
    } catch (err) {
      if (!(err instanceof ErrorResponse)) return;
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any)?.decoded?.id;
      const clubId = Number(req.params.id);
      const commentCreate = req.body;
      const commentId = await this._service.create(
        userId,
        clubId,
        commentCreate
      );
      res
        .status(201)
        .json(
          new SuccessResponse(commentId, "Comment created successfully").toDTO()
        );
    } catch (err) {
      if (!(err instanceof ErrorResponse)) return;
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const commentUpdate = req.body;
      const commentId = await this._service.update(id, commentUpdate);
      res
        .status(200)
        .json(
          new SuccessResponse(commentId, "Comment updated successfully").toDTO()
        );
    } catch (err) {
      if (!(err instanceof ErrorResponse)) return;
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const deletedId = await this._service.delete(id);
      res
        .status(200)
        .json(
          new SuccessResponse(deletedId, "Comment deleted successfully").toDTO()
        );
    } catch (err) {
      if (!(err instanceof ErrorResponse)) return;
      next(err);
    }
  };
}
