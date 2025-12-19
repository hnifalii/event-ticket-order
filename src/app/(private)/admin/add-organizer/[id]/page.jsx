import Form from "./Form";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page({ params }) {
  const events = await getEvents();
  const { id } = await params;
  const selectedEvent = events.find((e) => e.event_id == id);

  return selectedEvent == null ? (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-semibold text-2xl">Event Tidak Tersedia</h1>
    </div>
  ) : (
    <Form
      selectedEventId={selectedEvent.event_id}
      selectedEventName={selectedEvent.name}
    />
  );
}
