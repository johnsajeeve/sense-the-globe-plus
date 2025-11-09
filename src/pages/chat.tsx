import { ChatBox } from "@/components/chatbox";
import { useProfile } from "@/hooks/useProfile";

export default function ChatPage() {
  const { profile, loading } = useProfile();

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!profile) return <p className="p-6">Please log in to use the chat assistant.</p>;

  return (
    <div className="p-6">
      <ChatBox profile={profile} />
    </div>
  );
}
