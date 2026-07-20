"use server";

// TODO: wire up to the database once the backend is ready.
export async function submitPresenceConfirmation(formData: FormData) {
  const confirmation = {
    fullName: formData.get("fullName"),
    attending: formData.get("attending"),
    adults: formData.get("adults"),
    children: formData.get("children"),
    dietary: formData.get("dietary"),
    message: formData.get("message"),
  };

  console.log("Presence confirmation submitted:", confirmation);
}
