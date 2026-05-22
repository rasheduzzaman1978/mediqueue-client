import EditTutorClient from "./EditTutorClient";

export const metadata = {
  title: "Edit Tutor",
};

export default async function EditTutorPage({
  params,
}) {

  const { id } = await params;

  return (
    <EditTutorClient id={id} />
  );
}