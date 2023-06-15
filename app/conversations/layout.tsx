import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <ConversationList initialItems={conversations!} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
