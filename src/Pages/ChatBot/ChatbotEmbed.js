import React, { useEffect, useRef } from 'react';

function loadChatScript() {
  // Check if the script has already been loaded
  if (document.querySelector('[data-name="wonderchat"]')) {
    return;
  }

  // Add the Wonderchat script dynamically to your website
  const script = document.createElement('script');
  script.src = "https://app.wonderchat.io/scripts/wonderchat.iife.js";
  script.dataset.name = 'wonderchat';
  script.dataset.address = 'app.wonderchat.io';
  script.dataset.id = 'cllo4b1c6006jo021jmcas7t3';
  script.dataset.widgetSize = 'normal'; // Change the attribute name to widgetSize
  script.defer = true;

  document.body.appendChild(script);
}

function WonderChat() {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!scriptLoadedRef.current) {
      loadChatScript();
      scriptLoadedRef.current = true;
    }

    // Clean up the script when the component unmounts
    return () => {
      // You can optionally remove the script if it's not needed anymore
      const script = document.querySelector('[data-name="wonderchat"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="wonderchat-container"></div>;
}

export default WonderChat;
