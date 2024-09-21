interface PhotoCardProps {
  photo: {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: {
      id: number;
      title: string;
      user: {
        id: number;
        name: string;
        email: string;
      };
    };
  };
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-lg font-semibold mb-2">{photo.title}</h2>
      <p className="text-sm mb-1">Album: {photo.album.title}</p>
      <p className="text-sm mb-1">User: {photo.album.user.name}</p>
      <p className="text-sm">Email: {photo.album.user.email}</p>
    </div>
  );
}
