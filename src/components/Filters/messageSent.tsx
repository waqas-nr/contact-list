/*
  Messages Sent Filter Component
*/

import React, {ChangeEvent} from 'react';

// Import React Bootstrap Component
import Input from "../UI/Input";

type MessageSentProps = {
  messageSentMin: string,
  messageSentMax: string,
  handleInputChange: (object:{event: ChangeEvent<HTMLInputElement>, field: string}) => void,
}

const MessageSent = ({ messageSentMin, messageSentMax, handleInputChange }: MessageSentProps) => (
  <div className="mb-4">
    <h6>Message Sent:</h6>
    <div className="d-flex justify-content-between">
      <Input
        id="message-sent-min"
        placeholder="Min"
        value={messageSentMin}
        className="input me-3"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange({event, field: 'messageSentMin'})} />
      <Input
        id="message-sent-max"
        placeholder="Max"
        value={messageSentMax}
        className="input"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange({event, field: 'messageSentMax'})}
      />
    </div>
  </div>
);

export default MessageSent;