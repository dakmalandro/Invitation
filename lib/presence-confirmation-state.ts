export type PresenceConfirmationState = {
  status: "idle" | "success" | "error";
  message?: string;
  submittedAt?: number;
};

export const initialPresenceConfirmationState: PresenceConfirmationState = {
  status: "idle",
};
