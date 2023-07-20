import { createRef } from "react";

export function useMyRef(size: number) {
  return Array(size).fill(0).map(() => createRef<HTMLInputElement>());
}