import React, { useReducer } from 'react';
import './App.css';
import { reactPostToRNWebView, CommonContext } from '@universalnamespace/common';

function App() {
  const [payload, setPayload] = React.useState("none");
  const [payloadType, setPayloadType] = React.useState("none");
  const [payloadTime, setPayloadTime] = React.useState("none");


  const [state, dispatch] = useReducer(CommonContext.mainReducer, CommonContext.defaultSessionContext);

  const messageResolvers = new Map<string, (value: any) => void>();

  async function webMessage<T>(messageType: string): Promise<T> {
    window.addEventListener(
      'message',
      (event: MessageEvent) => {
        if (event && event.data) {
          const eventData = JSON.parse(event.data);
          setPayload(JSON.stringify(eventData.payload));
          setPayloadType(JSON.parse(event.data).type);

          if (eventData && eventData.type) {
            const resolve = messageResolvers.get(eventData.type);


            if (!resolve) {
              throw Error('No resolver for event type');
            }

            resolve(eventData.payload);
            setPayloadTime(eventData.payload.time);
          }
        }
      },
      false
    );

    return new Promise<T>(resolve => {
      messageResolvers.set(messageType, resolve);
    });
  }

  async function something() {
    // if I listen to something that does not exist it will fail...
    await webMessage('hello');
  }

  something();

  return (
    <CommonContext.MainContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          <p>{"Received payload:"}</p>
          <p>{payload}</p>
          <p>{"Payload type:"}</p>
          <p>{payloadType}</p>
          <p>{"Payload time:"}</p>
          <p>{payloadTime}</p>
          <button onClick={() => reactPostToRNWebView(window, new Date())}>test</button>
        </header>
      </div>
    </CommonContext.MainContext.Provider>
  );
}

export default App;
