async function getOrganizers(id) {
  const res = await fetch(`http://localhost:3000/api/event/${id}/organizers`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  const organizers = await getOrganizers(id);

  console.log(organizers);

  return (
    <div className="flex flex-col gap-5 px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-semibold">Daftar Panitia</h1>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iste.
      </p>

      {organizers.length > 0 ? (
        <div className="flex flex-col gap-3">
          {organizers.map((u) => (
            <div key={u.id} className="w-full p-3 border-b-[0.5px] border-b-black/40">
              <h1 className="font-medium">Nama : {u.name}</h1>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto py-10">
          <h1 className="font-medium">Belum ada panitia terdaftar.</h1>
        </div>
      )}
    </div>
  );
}
