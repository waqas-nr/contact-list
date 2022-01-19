/*
  Messages Received Filter Component
*/

import React, {ChangeEvent} from 'react';

// Import Input Component
import Input from '../UI/Input';

type MessageReceivedProps = {
  messageSentMin: string,
  messageSentMax: string,
  handleInputChange: (object:{event: ChangeEvent<HTMLInputElement>, field: string}) => void,
}

const MessageReceived = ({ messageSentMin, messageSentMax, handleInputChange }: MessageReceivedProps) => (
  <div className="mb-3">
    <h6>Message Received:</h6>
    <div className="d-flex justify-content-between">
      <Input
        id="message-received-min"
        placeholder="Min"
        value={messageSentMin}
        className="input me-2"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange({event, field: 'messageReceivedMin'})}
      />
      <Input
        id="message-received-max"
        placeholder="Max"
        value={messageSentMax}
        className="input"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange({event, field: 'messageReceivedMax'})}
      />
    </div>
  </div>
);

export default MessageReceived;