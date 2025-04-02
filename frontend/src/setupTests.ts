import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

// DOMエラーの出力を最小化する
configure({
  getElementError: (message, container) => {
    const error = new Error(message);
    error.name = "TestingLibraryElementError";
    error.stack = ""; // スタックトレースも消す（任意）
    return error;
  },
});
