import { useDiscordContext } from "@/context/DiscordContext";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const CallLayout = () => {
  const { setCall } = useDiscordContext();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }
  return (
    <StreamTheme>
      <h2>Participants: {participantCount}</h2>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls
        onLeave={() => {
          setCall(undefined);
        }}
      />
    </StreamTheme>
  );
};

export default CallLayout;
