import React from "react";
import { useNavigate } from "react-router-dom";

let instance = useNavigate();

export const navigate = (obj) => {
  instance(obj);
};