import React from 'react';

function ChatbotEmbed () {
  return (
    <div>
      {/* Chatbot iframe */}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/Ww9WFrPCismHCxm2u7Os4"
        width="100%"
        style={{ height: '100%', minHeight: '350px', borderRadius: '10px' }}
        frameBorder="0"
        title="Chatbot"
      ></iframe>

      {/* Chat bubble script */}
      <script>
        {`
          window.chatbaseConfig = {
            chatbotId: "Ww9WFrPCismHCxm2u7Os4"
          };
        `}
      </script>
      <script
        src="https://www.chatbase.co/embed.min.js"
        id="Ww9WFrPCismHCxm2u7Os4"
        defer
      ></script>
    </div>
  );
};

export default ChatbotEmbed;
