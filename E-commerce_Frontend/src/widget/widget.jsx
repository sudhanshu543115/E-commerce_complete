import { ChatCRMWidget } from "bitmax-crm-widget";

function Widget() {
  return (
    <>
      <div className="chat-widget-container">
        <ChatCRMWidget
          apiKey="sk_868826de5015e2e1280f34f8943c81f041237db4804894baa86d2dad10f22479"
          apiUrl="https://chat-crm-backend-7mzo.onrender.com"
          primaryColor="#c4023c"
          classname="z-index"
        />
      </div>
    </>
  );
}

export default Widget;
