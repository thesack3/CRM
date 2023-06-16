import React, { useState, useEffect } from 'react';
import {Device, Connection, PStream,PreflightTest} from 'twilio-client';

const VoiceCall = () => {
  const [callStatus, setCallStatus] = useState('idle');
  const [callError, setCallError] = useState('');

  const connectCall = () => {
    debugger;
    setCallStatus('connecting');

    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzY3ZGFlYjBhZmU0YzYzNjA5NTIzMDQxZTdmMjNkOWY1LTE2ODY5MTIzMzEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyIiwidm9pY2UiOnsiaW5jb21pbmciOnsiYWxsb3ciOnRydWV9LCJvdXRnb2luZyI6eyJhcHBsaWNhdGlvbl9zaWQiOiJBUGY2NzdiMjY1YmE2N2U4NDA3NTZmMTBiNDU0ZmNmZThhIn19fSwiaWF0IjoxNjg2OTEyMzMxLCJleHAiOjE2ODY5MTU5MzEsImlzcyI6IlNLNjdkYWViMGFmZTRjNjM2MDk1MjMwNDFlN2YyM2Q5ZjUiLCJzdWIiOiJBQzVkNzQ5MTdiMGExZDgzYzE1ODc0YmJhMjU5NTdkZjM0In0.9eBrUP4gvDEFwwZf4-h2tVNkHLsxm-xHYzR7N5ZRe0M';
    const device = new Device(accessToken);

    device.on('ready', () => {
      setCallStatus('ready');
    });

    device.on('error', (error) => {
      setCallStatus('error');
      setCallError(error.message);
    });

    const params = {
      To: '+923038861205',
    };

    const connection = device.connect(params);
    connection.on('disconnect', () => {
      setCallStatus('idle');
    });
  };

  // useEffect(() => {
  //   return () => {
  //     // Clean up the device when the component unmounts
  //     Device.destroy();
  //   };
  // }, []);

  return (
    <div>
      <button onClick={connectCall}>
        Start Call
      </button>
      {callStatus === 'error' && <p>{callError}</p>}
    </div>
  );
};

export default VoiceCall;
