import React, { useEffect } from 'react';

function CchatBot() {
  useEffect(() => {
    // Set the Intercom settings
    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'l95f1wan',
    //   name: user.name, // Full name
    //   email: user.email, // Email address
    //   created_at: user.createdAt, // Signup date as a Unix timestamp
    };

    // Load the Intercom widget script
    (function () {
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === 'function') {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        var d = document;
        var i = function () {
          i.c(arguments);
        };
        i.q = [];
        i.c = function (args) {
          i.q.push(args);
        };
        w.Intercom = i;
        var l = function () {
          var s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://widget.intercom.io/widget/l95f1wan';
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        };
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();
  }, []);

  return <div></div>; // You can render something here if needed
}

export default CchatBot;
