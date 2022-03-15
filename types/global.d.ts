import mongoose from "mongoose";

export interface global { }

//globals.d.ts
declare global {
    var mongoose: mongoose;
}