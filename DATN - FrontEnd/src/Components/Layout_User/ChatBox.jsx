import  { useEffect } from 'react'

function ChatBox() {
  useEffect(()=>{
    (function(d, m){
        var kommunicateSettings = {
            "appId": "17b341b8c49ddc75211692672e9506851", 
            "popupWidget": true, 
            "automaticChatOpenOnNavigation": true
        };
        var s = document.createElement("script"); 
        s.type = "text/javascript"; 
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; 
        h.appendChild(s);
        window.kommunicate = m; 
        m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  },[])
    return (
    <div>
      
    </div>
  )
}

export default ChatBox
