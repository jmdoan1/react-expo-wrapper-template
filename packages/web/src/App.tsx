import React from 'react';
import './App.css';
import { reactPostToRNWebView } from '@universalnamespace/common';

function App() {
  const [message, setMessage] = React.useState("1");
  const [message2, setMessage2] = React.useState("2");
  const [message3, setMessage3] = React.useState("3");

  const messageResolvers = new Map<string, (value: any) => void>();

  async function webMessage<T>(messageType: string): Promise<T> {
    window.addEventListener(
      'message',
      (event: MessageEvent) => {
        if (event && event.data) {
          const eventData = JSON.parse(event.data);
          setMessage(JSON.stringify(eventData.payload));
          setMessage2(JSON.parse(event.data).type);

          if (eventData && eventData.type) {
            const resolve = messageResolvers.get(eventData.type);


            if (!resolve) {
              throw Error('No resolver for event type');
            }

            resolve(eventData.payload);
            setMessage3(eventData.payload.time);
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
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <p>{message2}</p>
        <p>{message3}</p>
        <button onClick={() => reactPostToRNWebView(window, new Date())}>test</button>
      </header>
    </div>
  );
}

export default App;
