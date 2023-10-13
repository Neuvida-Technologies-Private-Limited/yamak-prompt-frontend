import { WorkspaceChatInputs, WorkspaceChatOutput } from 'components/helpers';

const Chat = () => {
  const isDekstopView = window.innerWidth >= 768;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 h-full gap-x-4 sm:gap-y-4 py-4">
      {/* {isDekstopView ? <WorkspaceHistory id={undefined} /> : null} */}
      <WorkspaceChatInputs />
      <WorkspaceChatOutput />
    </div>
  );
};

export default Chat;
