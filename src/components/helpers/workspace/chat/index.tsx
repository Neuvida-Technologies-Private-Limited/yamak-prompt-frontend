import {
  WorkspaceHistory,
  WorkspaceChatInputs,
  WorkspaceChatOutput,
} from 'components/helpers';

const Chat = () => {
  const isDekstopView = window.innerWidth >= 768;

  return (
    <>
      {isDekstopView ? (
        <div className="lg:w-1/5 pt-4 pr-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden">
          <WorkspaceHistory />
        </div>
      ) : null}

      <div className="lg:w-2/6 py-6 px-4 col-span-1">
        <WorkspaceChatInputs />
      </div>
      <div className="lg:w-3/6 pt-6 pl-4 md:col-span-2">
        <WorkspaceChatOutput />
      </div>
    </>
  );
};

export default Chat;
