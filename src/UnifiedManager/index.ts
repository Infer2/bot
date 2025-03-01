import expressServer from './src/expressServer';
import { client } from './src/discordClient';

const PORT = process.env.PORT || 8080;

expressServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

client.login(process.env.token);
