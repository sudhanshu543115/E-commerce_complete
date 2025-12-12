import { ChatCRMWidget } from "bitmax-crm-widget";

function Widget() {
  return (
    <>
      <div className="chat-widget-container">
        <ChatCRMWidget
          apiKey="sk_2703d07530080a595027b08cf03f428f1325636f95325bcde459bbeacbf1a3a4"
          apiUrl="https://chat-crm-backend-7mzo.onrender.com"
          primaryColor="#c4023c"
          classname="z-index"
        />
      </div>
    </>
  );
}

export default Widget;
