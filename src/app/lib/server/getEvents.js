export async function getEvents() {
  const res = await fetch(`${process.env.BASE_URL}/api/tickets`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return res.json();
}