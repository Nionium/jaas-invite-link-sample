This repo exemplifies the JaaS (Jitsi as a Service) branding option to customize the invite url.

Prerequisites:
* node
* ngrok

Steps:<br/>
<code>npm install</code><br/>
<code>npm start</code><br/>
<code>ngrok http http://localhost:3000</code><br/>

Copy the Forwarding domain provided by ngrok and paste it in your JaaS console as the invite domain.

Test the endpoints as follows:
* <code>https://${uuid}.ngrok-free.app/meet?appId=${appId}&roomName=randomRoomName&jwt=${jwt}</code>
* <code>https://${uuid}.ngrok-free.app/meet/randomRoomName</code>
