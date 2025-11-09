export function addLifeTouched() {
  const current = parseInt(localStorage.getItem("livesTouched") || "0", 10);
  localStorage.setItem("livesTouched", (current + 1).toString());
}
