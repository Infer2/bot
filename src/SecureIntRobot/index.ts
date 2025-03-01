import expressServer from './src/expressServer';

const PORT = process.env.PORT || 8080;

expressServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
